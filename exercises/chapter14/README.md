# Chapter 14

## Goal
* Domain-specific language - 특정 분야 문제를 구현하는데 특화된 언어. 문법과 함수가 해당 영역에서의 개념을 표현하는 코드의 가독성을 최대화하도록 설계되어 있다.
* i.e)
  * `Game` Monad - Text adventure game 개발의 domain-specific language
  * `quickcheck` package - Generative testing의 domain-specific language

## A HTML Data Type
* `Data.DOM.Simple` module의 HTML library는 가장 기초적인 library로 사용성 issue가 있다.
  * HTML 문서를 만들기 번거롭다. 모든 element는 1개 이상의 record와 1개 이상의 data constructor가 필요하다.
  * 유효하지 않은 문서를 생성하기 쉽다.
    * Element name을 잘못 작성
    * Element에 유효하지 않은 속성을 부여
    * Open element를 사용해야 하는 경우에 close element를 사용

## Smart Constructors
* Smart constructor - 유효한 construct data만 export하고 module export list를 이용해 `Element`, `Content`, `Attribute` data constructor를 숨긴다.
* Note. Smart constructor를 이용하더라도 underlying data는 변하지 않기 때문에 `render` 함수는 변화가 없는 장점이 있다. 사용자가 이용하는 외부 api와 내부 data 표현을 분리할 수 있다.
  
## Phantom Types
* Phantom types
  * ```haskell
      newtype AttributeKey a = AttributeKey String
    ```
    `a`는 우변항에 나타나지 않아 phantom type이라고 부른다. Phantom type은 compile 시점에 추가 정보를 제공하기 위한 목적으로만 존재한다. `AttributeKey a`는 runtime에는 string이지만 compile time에는 key의 value가 가져야 하는 type을 알려준다.
* ```haskell
  attribute :: forall a. IsValue a => AttributeKey a -> a -> Attribute
  attribute (AttributeKey key) value = Attribute
    { key: key
    , value: toValue value
    }
  ```
  Phantom type argument `a`는 attribute value가 attribute key에 따라 유효한 type을 가지도록 강제하기 위해 사용되었다. 개발자가 type `AttributeKey a`의 값을 직접 만들지 못하고 library의 상수를 사용해야하기 때문에 모든 attribute의 유효성을 보장할 수 있다.

## The Free Monad
* Goal - `Free` monad를 이용해서 `Content` type을 monad로 변경하고 do notation을 사용할 수 있도록 한다. 
  * 장점 1 - HTML 문서의 element nesting의 명시적 표현
  * 장점 2 - Monadic action의 interpretation과 representation의 분리
  * 장점 3 - 같은 action에 대한 multiple interpretation 사용
* `Free` monad - `Control.Monad.Free` module의 `free` library에 정의됨
  ```haskell
  > import Control.Monad.Free

  > :kind Free
  (Type -> Type) -> Type -> Type
  ```
  Type constructor를 인자로 받아 다른 type constructor를 return 한다.  
  임의의 `Functor`를 `Monad`로 바꾸기 위해 사용할 수 있다.
* i.e)
  ```haskell
  data ContentF a
    = TextContent String a
    | ElementContent Element a

  instance functorContentF :: Functor ContentF where
    map f (TextContent s x) = TextContent s (f x)
    map f (ElementContent e x) = ElementContent e (f x)
  ```
  위와 같이 `ContentF`를 정의하면 `Free` monad를 이용해 `Content` monad를 정의할 수 있다.
  ```haskell
  newtype Content = Free ContentF
  ```
* `liftF` - 어떤 type `a`에 대해 type `f a`의 값에서 free monad의 action을 생성한다.
  ```haskell
  liftF :: forall f a. f a -> Free f a
  ```

## Interpreting the Monad
* `runeFree` - `pure` 결과를 계산하기 위해 사용한다.
  ```haskell
  runFree
    :: forall f a
    . Functor f
    => (f (Free f a) -> Free f a)
    -> Free f a
    -> a
  ```
* `runFreeM` - free monad의 action을 interpret하기 위해 사용한다.
  ```haskell
  runFreeM
    :: forall f m a
    . (Functor f, MonadRec m)
    => (f (Free f a) -> m (Free f a))
    -> Free f a
    -> m a
    ```
* Note. 엄밀하게는 더 강력학 `MonadRec` 제한 조건을 만족하는 moand `m`만 사용하도록 제한된다. `m`이 safe monadic tail recursion을 지원하기 때문에 stack overflow를 걱정하지 않아도 된다.

## Extending the Language
* 기존의 방법으로 HTML 문서의 특정 부분으로 가는 hyperlink를 구현할 때 발생하기 쉬운 issues
  * Unique한 anchor name을 사용하지 않음
  * Anchor name에 오타 발생

## 질문


## Topic
* Smart constructor와 Route의 from query를 관리하는 방식이 유사하게 느껴졌습니다.
```ocaml
  /*
    #home : 최초 회원 가입
    #direct : CRM을 통한 접근
    #subsidyCreate : 보조금 정보 전체 입력
    #subsidyEdit : 보조금 정보 부분 수정
  */
  @deriving(jsConverter)
  type subsidyFlow = [
    | #home
    | #direct
    | @as("subsidy-create") #subsidyCreate
    | @as("subsidy-edit") #subsidyEdit
  ]

  | GovernmentSubsidyProfile({from}) =>
  let u = Url.makeWith(`government-subsidy/profile`, ~base=Env.appFarmmorningUrl)
  u
  ->Url.searchParams
  ->Url.URLSearchParams.append("from", from->Belt.Option.mapWithDefault("", subsidyFlowToJs))
  u->Url.pathname ++ u->Url.search
```
* DIY 언어의 장점과 단점. 편하지만 slang이 너무 많아지지는 않나요?
```haskell
  attribute :: String -> String -> Attribute
  attribute key value = Attribute
    { key: key
    , value: value
    }

  infix 4 attribute as :=

  $ spago repl

  > import Prelude
  > import Data.DOM.Smart
  > import Effect.Console
  > log $ render $ p [ _class := "main" ] [ text "Hello World!" ]

  <p class="main">Hello World!</p>
  unit
```
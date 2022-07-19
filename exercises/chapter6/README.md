# Chapter 6

## Goal
* Type class
  * Purescript의 타입 시스템을 이용한 강력한 추상화 도구
  * (읽기 전)ReScript의 module functor와 비슷한 걸까?
  * (읽은 후)
  * OOP의 `class`와 완전히 다른 의미임. OOP의 `interfacce`와 비슷한 개념이다.
  
## Project Setup
* Dependencies
  * `maybe` : `Maybe` data type
  * `tuples` : `Tuple` data type
  * `either` : `Either` data type. disjoint union
  * `strings` : string을 입력으로 받는 함수들
  * `functions` : Purescript 함수를 정의하는데 도움즐 주는 helper function들

## Show Me!
* ```haskell
  class Show a where
    show :: a -> String
  ```
  `Show`는 type variable a에 의하여 parameterized 되는 `type class`이다.
* Type class의 instance는 type class에서 정의된 함수의 특정 타입에 대한 구현을 포함한다.
i.e type class instance `showBoolean`
  ```haskell
  instance showBoolean :: Show Boolean where
    show true = "true"
    show false = "false"
  ```
  `Boolean` type은 `Show` type class에 속해있다.
* ```haskell
  > import Data.Either
  > show (Left 10)
  The inferred type

      forall a. Show a => String

  has type variables which are not mentioned in the body of the type. Consider adding a type annotation.

  > show (Left 10 :: Either Int String)
  "(Left 10)"
  ```
  타입 추론에 실패한 경우 (unknown type a), `::` 연산자를 이용하여 type을 지정해주어야 한다.
* Type class instance는 두 군데에서 정의할 수 있다.
  * Type class가 정의된 module
  * Type class에 속한(belonging to) type이 정의된 module
  이외의 파일에서 정의된 instance는 [orphan instance](https://github.com/purescript/documentation/blob/master/language/Type-Classes.md#orphan-instances)라고 부르며 PureScript compiler에 의해 거부 당한다.

## Common Type Classes
이 type class들은 관용적인 PureScript의 추상화에서 매우 자주 사용되는 패턴들의 기초를 이루기 때문에 이해하는 것이 좋다.

### Eq
`Eq` type class는 `eq` 함수를 정의한다. `==` operator는 `eq`의 alias이다.
```haskell
class Eq a where
  eq :: a -> a -> Boolean
```
Note. 두 인자가 반드시 같은 type을 가진다.

### Ord
`Ord` type class는 `compare` 함수를 정의한다. 비교 operator `<` , `>`, (non-strict companion) `<=`, `>=`은 `compare`를 이용하여 정의된다.
```haskell
data Ordering = LT | EQ | GT

class Eq a <= Ord a where
  compare :: a -> a -> Ordering
```
`compare` 함수는 두 값을 비교하여 `Ordering`을 반환한다.  
* `LT` - 첫 번재 인자가 두 번째 인자보다 작다.(less)
* `EQ` - 첫 번째 인자와 두 번째 인자가 같다.
* `GT` - 첫 번째 인자가 두 번째 인자보다 크다.(greater)

### Field
`Field` type class는 사칙연산과 같은 numeric operator를 지원하는 type을 식별한다. `Field` type class는 numeric operator들에 대한 추상화를 제공하여 적절하게 재사용 할 수 있도록 한다.  
  
Note. `Eq`나 `Ord` type class들 처럼 `Field`는 PureScript compiler에 의하여 특별한 지원을 받아 `1 * 2 * 3`과 같은 단순한 표현은 간단한 JavaScript로 번역된다. 이는 type class implementation에 의하여 만들어지는 함수들의 호출과 반대된다.  
`Field` type class는 몇몇의 더 일반적인 `superclass`들로 구성되어 있다. 이를 통해 `Field`의 일부 operation만 지원하는 type들에 대하여 추상화할 수 있다.  
  
i.e 자연수는 덧셈과 곱셈에 대하여는 close되어 있지만 뺄셈에 대해서는 그렇지 않다. 따라서 type은 `Semiring` class(`Num`의 `superclass`)의 instance를 가지지만 `Ring`이나 `Field`의 instance를 가지지 않는다.  
  
참고. [numeric type class hierachy](https://harry.garrood.me/numeric-hierarchy-overview/)

### Semigroups and Monoids
* `Semigroup` type class는 `append` operation을 지원하는 type들을 식별한다.
  ```haskell
  class Semigroup a where
    append :: a -> a -> a
  ```
  `<>` operator는 `append`의 alias 이다.
* `Monoid` type class는 `Semigroup` type class를 `mempty`라고 부르는 empty value의 개념까지 확장시킨다.
  ```haskell
  class Semigroup m <= Monoid m where
    mempty :: m
  ```
  `Monoid` type class instance를 위한 type들은 "empty" value에서 시작하여 새로운 결과들을 조합해가며 해당 타입에서 어떻게 결과를 누적(accumulate) 시키는지 묘사한다.
  i.e
  ```haskell
  > foldl append mempty ["Hello", " ", "World"]
  "Hello World"   // "" => "Hello" => "Hello " => "Hello World"
  ```

  ### Foldable
  * `Monoid` type class가 fold의 결과에 대한 타입들을 식별한다.
  * `Foldable` type class는 fold의 source로 사용될 수 있는 type constructor들을 식별한다.
  * `Foldable` type class는 `foldable-traversable` package에 포함되어 있는데 이 package에는 array와 Maybe와 같은 표준 구현체도 포함하고 있다.
  * `Foldable` class에 속하는 함수들의 type signature  
    ```haskell
    class Foldable f where
      foldr :: forall a b. (a -> b -> b) -> b -> f a -> b
      foldl :: forall a b. (b -> a -> b) -> b -> f a -> b
      foldMap :: forall a m. Monoid m => (a -> m) -> f a -> m
    ```
    * i.e `f` = array type constructor  
      `f a`를 `Array a`로 대체할 수 있다. 이 경우 `foldl`과 `foldr`이 array의 fold 함수가 된다.  
      `foldMap :: forall a m. Monoid m => (a -> m) -> Array a -> m`이 된다. 따라서 결과 type으로 `Monoid`의 instance인 어떠한 type이든 선택이 가능하다. array 원소를 받아 monoid를 반환하는 함수를 제공하기만 한다면 array를 monoid 구조를 이용하여 누적한 후 단일 값을 반환할 수 있다.
      ```haskell
      > import Data.Foldable

      > foldMap show [1, 2, 3, 4, 5]
      "12345"
      ```
      이외에도 `Maybe`, `Tuple`과 같은 `foldable-traversable` instance들이 있습니다.

### Functor, and Type Class Laws
* PureScript에서 함수형 프로그래밍으로 부수효과를 다룰 수 있도록 하는 type class들의 집합: `Functor`, `Applicative`, `Monad`
  * `Functor`
    ```haskell
    class Functor f where
      map :: forall a b. (a -> b) -> f a -> f b
    ```
    `map` 함수는 함수를 data 구조 위로 띄워올린다.(lifted over)  
    직관적 관점에서 `map`함수는 주어진 함수를 container의 각각의 element에 적용한다. 그리고 그 결과값을 이용해 기존의 container와 같은 모양(shpae)를 가진 새 container를 만든다.  
    `Functor`의 type class instance는 functor laws를 따른다.
      * Identity Law : `map identity xs = xs`  
        Identity 함수를 구조위로 띄운 후 원래 구조를 그대로 반환한다.
      * Composition Law: `map g (map f xs) = map (g <<< f) xs`
        구조에 대해서 한 함수를 mapping 한 후, 두 번째 함수를 mapping하는 것은 두 함수의 합성함수를 mapping 하는 것과 같다.

### Deriving Instances
직접 boilerplate code를 작성하지 않아도 compiler가 type class의 instance를 유도할 수 있다.
  * Classes with build-in compiler support
    어떤 class들은 특별한 내장 compiler 지원을 가지고 있어 instance들은 모든 타입으로 부터 유도할 수 있다.  
    i.e ADT array로부터 `nub`을 이용하여 중복 원소를 제고하고 싶은 경우 `Eq`와 `Ord` instance가 필요하다. 이를 직접 적지 않아도 compiler가 지원해준다.
    ```haskell
    import Data.Array (nub)

    data MyADT
      = Some
      | Arbitrary Int
      | Contents Number String

    derive instance eqMyADT :: Eq MyADT
    derive instance ordMyADT :: Ord MyADT

    nub [Some, Arbitrary 1, Some, Some] == [Some, Arbitrary 1]
    ```
    * Compiler로부터 지원되는 class들
      * Data.Generic.Rep
      * Data.Eq
      * Data.Ord
      * Data.Functor
      * Data.Newtype
  * Derive from `newtype`
    newtype에서 underlying type에 사용되는 class를 이용하고 싶다면 `derive newtype`을 사용하면 된다.
    i.e
    ```haskell
    newtype Score = Score Int

    derive newtype instance semiringScore :: Semiring Score

    tenPoints :: Score
    tenPoints = (Score 4) + (Score 6)
    
    -- No need to write this
    instance semiringScore :: Semiring Score where
      zero = Score 0
      add (Score a) (Score b) = Score (a + b)
      mul (Score a) (Score b) = Score (a * b)
      one = Score 1

    -- 이 두 표현은 동일하다
    derive instance eqScore :: Eq Score
    derive newtype instance eqScore :: Eq Score
    ```
  * Deriving from `Generic`
    `Generic`을 위한 compiler의 내장 지원을 통해 위에서 언급되지 않은 많은 class들의 유도를 쉽게 할 수 있다.  
    * i.e `MyADT`를 위한 `Show` instance를 구현하는 경우 compiler 내장 지원과 `derive newtype`을 사용할 수 없다. 이 경우 `Generic` instance를 갖고 있는 모든 type에 적용 가능한 `genericShow`를 이용하면 된다. 그리고 compiler는 모든 타입에 대하여 `Generic` instance를 유도하는 내장 지원을 가지고 있다.
    ```haskell
    import Data.Generic.Rep (class Generic)
    import Data.Show.Generic (genericShow)
    import Effect.Console (logShow)

    derive instance genericMyADT :: Generic MyADT _

    instance showMyADT :: Show MyADT where
      show = genericShow
      
    main = logShow [Some, Arbitrary 1, Contents 2.0 "Three"]
    -- Prints:
    -- [Some,(Arbitrary 1),(Contents 2.0 "Three")]
    ```
    `Show` type class는 대부분 debugging용으로 사용되기 때문에 출력물은 원본 데이터를 재건하는데 필요한 PureScript source file을 복사-붙여넣기하여 보여준다.  
    여기에서 `Generic` deriving과 `newtype` deriving의 차이가 발생하는데 `newtype` deriving의 경우 underlying class를 재사용하기 때문에 constructor가 나타나지 않는다.
    ```haskell
    -- Generic derving
    import Effect.Console (logShow)

    newtype Score = Score Int

    -- newtype deriving omits wrapper with show
    derive newtype instance showScore :: Show Score

    main = logShow (Score 5)
    -- Prints:
    -- 5

    -- newtype deriving
    import Data.Generic.Rep (class Generic)
    import Data.Show.Generic (genericShow)
    import Effect.Console (logShow)

    newtype Score = Score Int

    -- generic deriving prints wrapper with show
    derive instance genericScore :: Generic Score _
    instance showScore :: Show Score where
      show = genericShow

    main = logShow (Score 5)
    -- Prints:
    -- (Score 5)
    ```
  * Avoiding stack overflow erros with recursive types
    generic 함수들을 recursive data type들과 사용할 때는 주의해야 한다. 이 경우 point free style로 사용할  수 없다.
    ```haskell
    import Data.Generic.Rep (class Generic)
    import Data.Show.Generic (genericShow)
    import Effect.Console (logShow)

    data Chain a
      = End a
      | Link a (Chain a)

    derive instance genericChain :: Generic (Chain a) _

    instance showChain :: Show a => Show (Chain a) where
      show c = genericShow c -- Note the use of the seemingly-unnecessary variable `c`

    main = logShow $ Link 1 $ Link 2 $ End 3
    -- Prints:
    -- (Link 1 (Link 2 (End 3)))

    instance showChain :: Show a => Show (Chain a) where
      show = genericShow -- This line is problematic. Cause stack overflow error.

    -- Throws this error:
    -- RangeError: Maximum call stack size exceeded
    ```

## Type Class Constraints
* 함수의 타입은 type class를 이용하여 제한 할 수 있다.  
  i.e
  ```haskell
  threeAreEqual :: forall a. Eq a => a -> a -> a -> Boolean
  threeAreEqual a1 a2 a3 = a1 == a2 && a2 == a3
  ```
  `Eq a =>`를 통해서 `a`가 `Eq`의 instance라는 제한을 명시함.
* Type 제한은 하나 이상의 type class instance들을 가질 수 있다. 또한 instance들의 type들은 간단한 type variable이 아니여도 된다.  
  i.e
  ```haskell
  showCompare :: forall a. Ord a => Show a => a -> a -> String
  showCompare a1 a2 | a1 < a2 =
    show a1 <> " is less than " <> show a2
  showCompare a1 a2 | a1 > a2 =
    show a1 <> " is greater than " <> show a2
  showCompare a1 a2 =
    show a1 <> " is equal to " <> show a2
  ```
  `=>` 를 반복 사용하여 중복된 제한 조건을 명시할 수 있다.
    * 주의사항
      * `a -> b`: type `a`를 받아 type `b`를 반환하는 함수의 type
      * `a => b`: 제한 조건 `a`를 type `b`에 적용
  * PureScript compiler는 type 표기가 없는 경우 제한 조건을 추론한다. 이를 이용하면 함수의 가장 일반적인 type을 사용 할 수 있다.  
  i.e
  ```haskell
  > import Prelude

  > :type \x -> x + x
  forall a. Semiring a => a -> a // not Int -> Int or Number -> Number
  ```
## Instance dependencies
* Type class의 instance 구현도 다른 type class의 instance에 의존할 수 있다.  
i.e
  ```haskell
  instance showArray :: Show a => Show (Array a) where
    ...
  ```
* Type class instance가 복수 의존 관계를 가진다면 `=>`의 왼편에서 괄호로 그룹핑되고 ,로 구분하여 표현한다.  
  ```haskell
  instance showEither :: (Show a, Show b) => Show (Either a b) where
    ...
  ```
* Program이 compile된 후 올바른 type calss instance는 인자의 추론 type에 따라 정해진다. Instance들 간에 복잡한 관계를 가질 수 있지만 이러한 복잡도는 개발자에게 숨겨진다.
## Multi Parameter Type Classes
* Type class가 하나의 type을 인자로 받는 것이 가장 보편적이지만 받을 수 있는 인자의 수는 제한이 없다.  
  i.e
  ```haskell
  module Stream where

  import Data.Array as Array
  import Data.Maybe (Maybe)
  import Data.String.CodeUnits as String

  class Stream stream element where
    uncons :: stream -> Maybe { head :: element, tail :: stream }

  instance streamArray :: Stream (Array a) a where
    uncons = Array.uncons

  instance streamString :: Stream String Char where
    uncons = String.uncons
  ```
  `Stream` type class는 stream 자체와 element에 의해서 parameterized 된다. 이를 통해 같은 stream type에 대해 서로 다른 element type을 갖는 instance들을 정의할 수 있다.  
  임의의 stream에서 동작하는 함수를 작성할 수 있다.  
  i.e `Monoid` element에 대해 결과를 누적하는 함수
  ```haskell
  import Prelude
  import Data.Monoid (class Monoid, mempty)

  foldStream :: forall l e m. Stream l e => Monoid m => (e -> m) -> l -> m
  foldStream f list =
    case uncons list of
      Nothing -> mempty
      Just cons -> f cons.head <> foldStream f cons.tail
  ```

## Functional Dependencies
* 다변수 type class는 매우 유용하지만 종종 type을 헷갈리게 하거나 심지어는 type 추론에 문제를 발생시킨다.  
  i.e
  ```haskell
  genericTail xs = map _.tail (uncons xs)

  {-
  The inferred type

    forall stream a. Stream stream a => stream -> Maybe stream

  has type variables which are not mentioned in the body of the type. Consider adding a type annotation.
  -}
  ```
  `genericTail` 함수는 `Stream` type class에서 사용하는 `element` type을 사용하지 않아 추론이 불가능하여 에러가 발생한다.
  ```haskell
  > map _.tail (uncons "testing")
  {-
  The inferred type

    forall a. Stream String a => Maybe String

  has type variables which are not mentioned in the body of the type. Consider adding a type annotation.
  -}
  ```
  이 경우에도 compiler가 `streamString` instance를 선택할 것으로 기대하지만 이러한 추론을 할 수 없다. 다만 type class의 정의에 compiler를 위한 hint를 추가할 수 있다.
  ```haskell
  class Stream stream element | stream -> element where
    uncons :: stream -> Maybe { head :: element, tail :: stream }
  ```
  `stream -> element`를 functional dependency라고 한다. Functional dependency는 타변수 type class의 인자들 간의 함수적 관계를 강제한다. 예시의 functional dependency는 compiler에게 stream type에서 (unique) element type으로 가는 함수가 존재한다고 알려준다. 따라서 compiler가 stream type을 알게된다면 element type을 확정할 수 있게 된다. Functional dependenci는 다변수 type class를 이용하여 API들을 만들 때 유용하게 사용된다.

## Nullary Type Classes
* Type 인자가 없는 type class. Type system에서 우리 code의 global property를 추적할 수 있게 해주는 compile-time assertion과 같다.
* `Partial` class가 대표적 예시이다. `Data.Array.Partial`에 정의된 `head`, `tail` 함수를 보면 array의 head와 tail을 `Maybe`로 감싸지 않고 가져올 수 있다. 따라서 빈 배열인 경우 함수가 실패한다.  
  ```haskell
  head :: forall a. Partial => Array a -> a

  tail :: forall a. Partial => Array a -> Array a
  ```
  `Partial` type class에는 정의된 instance가 없다. 직접 `head` 함수를 사용하면 type error가 발생한다.
  ```haskell
  > head [1, 2, 3]

  No type class instance was found for

    Prim.Partial
  ```
  직접 불러오는 대신 다른 partial 함수를 만들 때 `Partial` 제한 조건을 부여해줄 수 있다.  
  ```haskell
  secondElement :: forall a. Partial => Array a -> a
  secondElement xs = head (tail xs)
  ```
  `unsafePartial` 함수를 이용하면 partial 함수를 unsafe한 방법으로 일반 함수처럼 다룰 수 있다.  
  ```haskell
  unsafePartial :: forall a. (Partial => a) -> a
  -- partial value -> regular value
  ```
## Superclasses
* Superclasses: type class들 간의 관계
* B class의 모든 instance가 A class의 instance인 경우 A를 B의 superclass라고 한다.(`<=`)  
  i.e
  * `Eq`는 `Ord`의 superclass
  * `Semigroup`는 `Monoid`의 superclass
* subclass의 법칙이 superclass를 언급하거나 "is-a" 관계가 성립하는 경우가 일반적이다.  
  i.e every member of the subclass is a member of the superclass as well.
  
## A Type Class for Hashes
* 
## 질문
* `foldl`, `foldr`과 `foldMap`의 차이가 궁금합니다. `infixl`, `infixr`, `infix`의 관계와 비슷한건가요?
* We can even define type classes with zero type arguments! These correspond to compile-time assertions about our functions, allowing us to track global properties of our code in the type system.??? (Nullary Type Classes에서)
  
## 소감
* `functor`와 `map` 함수라는 건 물리에서 좌표축을 설정하는 것과 비슷하다고 느껴져요. 경사면에 놓여진 rigid body의 운동을 설명할 때 경사면과 평행한 x축과 수직한 y축을 설정합니다. 직교하는 축을 설정함으로 인해 각 축의 운동방정식은 서로에게 영향을 주지 않고 우리는 각 축에 대해서만 문제를 풀어낼 수 있게 됩니다. 이러한 접근 방향이 부수효과를 데이터에서 분리해 내는 것과 유사하게 느껴집니다.  
![image1](https://t1.daumcdn.net/cfile/tistory/262D2240524C16520A)  
(출처: https://t1.daumcdn.net/cfile/tistory/262D2240524C16520A)
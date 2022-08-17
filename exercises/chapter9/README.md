# Chapter 9

## Goal
* `Aff` monad - Asynchronous side-effect. `Effect` monad와 유사하다.

## Asynchronous JavaScript
* async & await - JavaScript에서 비동기 code를 다루는 대표적 방식.
* 다른 방식의 단점
  * Callback funciton - Callback hell을 유도함.
  * Synchronous function - 다른 code의 실행을 막음.

## Asynchronous PureScript
* `Aff` monand는 `async` / `await` 문법과 유사하다.  
  i.e 
  ```haskell
  import Prelude
  import Data.Either (Either(..))
  import Effect.Aff (Aff, attempt, message)
  import Effect.Class.Console (log)
  import Node.Encoding (Encoding(..))
  import Node.FS.Aff (readTextFile, writeTextFile)
  import Node.Path (FilePath)

  copyFile :: FilePath -> FilePath -> Aff Unit
  copyFile file1 file2 = do
    my_data <- readTextFile UTF8 file1
    writeTextFile UTF8 file2 my_data

  main :: Aff Unit
  main = do
    result <- attempt $ copyFile "file1.txt" "file2.txt"
    case result of
      Left e -> log $ "There was a problem with copyFile: " <> message e
      _ -> pure unit
  ```
  `Node.FS.Async`, `Node.FS.Sync`를 이용해 callback function 또는 동기 함수를 이용하여 위 코드를 재작성하는 것도 가능하지만 위에서 언급한 단점을 동일하게 가지고 있기 때문에 권장하지 않는다.
* `Aff`는 monad 이기 때문에 do notation을 사용한다. 같은 monad인 `Effect`와 매우 유사하다.  
  i.e 
  ```haskell
  readTextFile :: Encoding -> FilePath -> Aff String
  ```
  return 되는 file 내용이 `Aff`로 감싸진 `String`이다. 이를 do notation의 bind arrow(`<-`)를 이용하여 "unwrap" 할 수 있다.
  ```haskell
  my_data <- readTextFile UTF8 file1
  ```
* `attempt` - `Aff` 고유 기능. `Aff` code를 실행 중 발생한 error 또는 exception을 `Either`에 저장한다.
  ```haskell
  attempt :: forall a. Aff a -> Aff (Either Error a)
  ```

## Additional Aff Resources
* [Official Aff guide](https://pursuit.purescript.org/packages/purescript-aff/7.1.0)
* [Drew's Aff Post](https://blog.drewolson.org/asynchronous-purescript)
* [Additional Aff Explanation and Examples](https://github.com/JordanMartinez/purescript-jordans-reference/tree/latestRelease/21-Hello-World/02-Effect-and-Aff/src/03-Aff)

## A HTTP Client
* `affjax` library - `Aff`를 이용해 비동기 AJAX HTTP 요청을 간편하게 만들어 준다. 환경에 따라 purescript-affjax-web 또는 purescript-affjax-node library를 사용하면 된다. 사용 방법은 [Affjax docs](https://pursuit.purescript.org/packages/purescript-affjax/13.0.0)를 참고할 것.
* i.e URL에 HTTP GET 요청을 하고 response body 혹은 error message를 return 하는 함수
  ```haskell
  import Prelude
  import Affjax.Node as AN
  import Affjax.ResponseFormat as ResponseFormat
  import Data.Either (Either(..))
  import Effect.Aff (Aff)

  getUrl :: String -> Aff String
  getUrl url = do
    result <- AN.get ResponseFormat.string url
    pure case result of
      Left err -> "GET /api response failed to decode: " <> AN.printError err
      Right response -> response.body
  ```

## Parallel Computations
* `Parallel` type class 
  * `parallel` package에 속함.
  * instance - 병렬 실행을 지원하는 monad `m`(i.e `Aff`) 과 applicative functor `f`의 관계를 정의함
* ```haskell
  class (Monad m, Applicative f) <= Parallel f m | m -> f, f -> m where
    sequential :: forall a. f a -> m a
    parallel :: forall a. m a -> f a
  ```
  * `sequentail` - Applicative functor `f`의 계산을 monad `m`의 계산으로 변경
  * `parallel` - Monad `m`의 계산을 applicative functor `f`의 계산으로 변경
* `aff` library는 `Aff` monad의 `Parallel` instance를 제공한다. `Aff` action을 병렬적으로 처리하기 위해서 mutable reference를 이용한다.
* Applicative functor들은 매개변수의 갯수가 임의인 함수들의 "lifting"을 지원하기 때문에 applicative combinator를 이용하여 다수의 병렬 연산을 할 수 있다.
* Applicative functor를 사용할 수 있는 standard library function들도 사용할 수 있다.(i.e `traverse`, `sequence`)
*  Applicative combinator를 do notation에서 사용하거나, `traverse`와 `sequence`를 이용해서 병렬 연산과 순차 연산을 조합하여 사용할 수 있다.
* i.e
  ```haskell
  import Prelude

  import Control.Parallel (parTraverse)
  import Effect (Effect)
  import Effect.Aff (launchAff_)
  import Effect.Class.Console (logShow)
  import Test.HTTP (getUrl)

  fetchPar :: Effect Unit
  fetchPar =
    launchAff_ do
      let
        urls = map (\n -> "https://reqres.in/api/users/" <> show n) [ 1, 2 ]
      res <- parTraverse getUrl urls
      logShow res
  ```
  `parTraverse`는 `traverse`의 병렬 버전이다. `traverse를 사용해도 괜찮지만 느리다.

## 질문
* `result`의 type은 `Aff (Either Error (Response a))`이고, do notation의 binding arrow로 인해 `Either Error (Response a)`로 다루어 진다고 이해하고 있습니다. `pure case result of`에서 `pure`가 필요한 이유가 궁금합니다.
  ```haskell
  import Prelude
  import Affjax.Node as AN
  import Affjax.ResponseFormat as ResponseFormat
  import Data.Either (Either(..))
  import Effect.Aff (Aff)

  getUrl :: String -> Aff String
  getUrl url = do
    result <- AN.get ResponseFormat.string url
    pure case result of
      Left err -> "GET /api response failed to decode: " <> AN.printError err
      Right response -> response.body

  {- 
  In Affjax.Node 
  get :: forall a. ResponseFormat a -> URL -> Aff (Either Error (Response a))
  -}
  ```
  * Answer
    ```haskell
    case result of
      Left err -> "GET /api response failed to decode: " <> AN.printError err
      Right response -> response.body
    ```
    만 생각해보면 error인 경우 string이기 때문에 pure를 사용한다.  
    haskell에서 return을 이용해 pure를 표현한다.


## 소감
* monad를 이용해서 달라보였던 의존적인 optional의 처리와 비동기 연산을 동일한 do notation을 이용해서 처리하는 추상화가 아름답습니다. 추상화를 거치니 두 연산은 본질적으로 유사함이 명시적으로 드러나네요.
  * `flatMap` | `async` & `await` == do notation with `<-`
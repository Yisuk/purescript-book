# Chapter 11

## Goal
* monad transformers - 다른 monad들이 제공하는 side-effect들을 함께 다룰 수 있는 방법을 제공.

## The State Monad
* `transformers` package의 monademf
  *  `State` monad
     *  Mutable state를 modeling하는 방법을 제공. `Effect` monad의 대안.
     *  `State` type constructor는 state의 type `s`를 받아 type `a`를 return 한다.
     *  "`State` monad"라고 말하지만 `Monad` type class의 instance는 임의의 type `s`에 대한 `State s`의 type constructor를 제공한다.
     *  `Control.Monad.State` module의 API
        *  ```haskell
            get     :: forall s.             State s s
            gets    :: forall s. (s -> a) -> State s a
            put     :: forall s. s        -> State s Unit
            modify  :: forall s. (s -> s) -> State s s
            modify_ :: forall s. (s -> s) -> State s Unit
            ```
         * Note - API type signature들이 `State` type constructor를 이용한 간단한 형태로 나타나 있지만 실제 API는 나중에 다룰 "Type Classes"의 `MonadState`와 관련되어 있다.
    * i.e) `State`의 예시 중 하나는 현재 state에 int array의 원소들의 합을 넣는 경우이다. `Int`를 state type `s`로 정하고, `traverse_`를 이용해 각각의 원소에 대해 `modify`를 호출하면서 array를 traverse한다.
      ```haskell
      import Data.Foldable (traverse_)
      import Control.Monad.State
      import Control.Monad.State.Class

      sumArray :: Array Int -> State Int Unit
      sumArray = traverse_ \n -> modify \sum -> sum + n
      ```
    * `Control.Monad.State` moudle은 `State` monad의 계산을 할 수 있는 함수 3개를 제공한다.
      ```haskell
      evalState :: forall s a. State s a -> s -> a
      execState :: forall s a. State s a -> s -> s
      runState  :: forall s a. State s a -> s -> Tuple a s
      ```
      각각의 함수들은 type `s`인 초기 state와 type `State s a`인 연산을 받는다. 
      * `evalState`는 return value만을 return한다. 
      * `execState`는 최종 state만을 return 한다.
      * `runState`는 `Tuple a s` type으로 return value와 최종 state를 모두 return 한다.

## The Reader Monad
* Global configuration을 읽어오는 기능을 제공한다. 
  * `State` monad는 하나의 mutable state를 "읽고" "쓰는" 기능을 제공.
  * `Reader` monad는 하나의 data를 "읽는" 기능만 제공.
* `Reader` type constructor는 2개의 type arugment를 받는다.
  * Type `r` - Configuration type
  * Type `a` - Return type
* `Control.Monad.Reader` module이 제공하는 API
  * ```haskell
    ask   :: forall r. Reader r r
    local :: forall r a. (r -> r) -> Reader r a -> Reader r a
    ```
    * `ask` - 현재 configuration을 읽어온다.
    * `local` - 수정된 configuration에 대한 계산을 실행한다.
  * i.e) 권한에 의해 조작되는 app을 개발할 때 `Reader` monad를 현재 사용자의 권한 객체(permissions object)를 담기 위하여 사용할 수 있다. Configuration type`r`을 어떤 `Permission` type으로 선택하고 다음 API를 만들 수 있다.
    ```haskell
    hasPermission :: String -> Permissions -> Boolean
    addPermission :: String -> Permissions -> Permissions
    ```
    사용자가 특정 권한을 가지고 있는지 확인하기 위하여 `ask`를 이용해 현재 권한 객체를 가져올 수 있다. 예를 들어 관리자만 새로운 사용자를 만들 수 있도록 허락된 경우 다음과 같은 함수를 작성할 수 있다.
    ```haskell
    createUser :: Reader Permissions (Maybe User)
    createUser = do
      permissions <- ask
      if hasPermission "admin" permissions
        then map Just newUser
        else pure Nothing
    ```
    사용자의 권한을 올리기 위해 어떤 계산을 진행하는 중 `local`을 이용하여 권한 객체를 수정할 수도 있다.
    ```haskell
    runAsAdmin :: forall a. Reader Permissions a -> Reader Permissions a
    runAsAdmin = local (addPermission "admin")
    ```
    이를 이용해 사용자가 `admin` 권한이 없는 경우에도 새로운 사용자를 추가할 수 있다.
    ```haskell
    createUserAsAdmin :: Reader Permissions (Maybe User)
    createUserAsAdmin = runAsAdmin createUser
    ```
* `Reader` monad가 제공하는 계산을 실행하기 위해서 `runReader` 함수를 이용해 global configuration을 이용할 수 있다.
  ```haskell
  runReader :: forall r a. Reader r a -> r -> a
  ```

## The Writer Monad
* 계산의 결과를 return하는 기능과 secondary value를 누적하는 기능을 제공한다.
* 보편적인 사용 사례는 `String` / `Array String` type의 log를 누적하는 경우이다. 하지만 `Writer` monad는 이보다 더 일반적(general)으로 임의의 monad 값을 누적할 수 있다.
  * i.e)
    * 정수의 총합을 `Additive Int` monoid를 이용해 추적
    * `Boolean` 값들 중 어떤 값이 true인지 `Disj Boolean` monoid를 이용해 추적
* `Writer` type constructor는 2개의 type argument를 받는다.
  * Type `w` - Instance of the `Monoid` type class
  * Type `a` - Return type
* `Writer` API의 key element는 `tell` 함수이다.
    ```haskell
    tell :: forall w a. Monoid w => w -> Writer w Unit
    ```
    `tell`은 주어진 값을 누적된 결과에 추가한다.
  * i.e) `Array String` monoid를 이용해 최대공약수 함수에 logging 추가  
    Return type을 `Writer (Array String) Int`로 변경한다.
      ```haskell
      import Control.Monad.Writer
      import Control.Monad.Writer.Class

      gcdLog :: Int -> Int -> Writer (Array String) Int
      gcdLog n 0 = pure n
      gcdLog 0 m = pure m
      gcdLog n m = do
        tell ["gcdLog " <> show n <> " " <> show m]
        if n > m
          then gcdLog (n - m) m
          else gcdLog n (m - n)
      ```
* `Writer` monad의 계산은 `execWriter` / `runWriter` 함수를 이용해 실행할 수 있다.
  ```haskell
  execWriter :: forall w a. Writer w a -> w
  runWriter  :: forall w a. Writer w a -> Tuple a w
  ```

## Monad Transfomers
* `State`, `Reader`, `Write` monad는 모두 monad transformer이다. 각각 monad transformer `StateT`, `ReaderT`, `WriterT`와 대응된다.
* Monad transformer
  * Monad - 적절한 handler(`runState`, `runReader`, `runWriter` .etc)를 이용해 PureScript에서 해석될 수 있는 side effect와 함께 PureScrip code를 확장(augment)한다. 단 하나의 side effect만 다룰 수 있다.
  * 




## 질문
* 

## 소감
* 
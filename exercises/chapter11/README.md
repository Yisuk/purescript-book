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
  * Monad transformer - Type 뿐만 아니라다른 type constructor에 의해 parameterized 되는 type constructor. 하나의 monad를 입력 받아 고유의 side-effect를 더한 다른 monad로 변환한다.
    * i.e) `State` monad의 monad transformer - `StateT`
      ```haskell
      > import Control.Monad.State.Trans
      > :kind StateT
      Type -> (Type -> Type) -> Type -> Type
      ```
      `String` state type을 사용하는 경우를 가정하면,
      ```haskell
      > :kind StateT String
      (Type -> Type) -> Type -> Type
      ```
      다음 인자는 kind `Type -> Type`을 갖는 type constructor 이다. 이는 `StateT`를 통해 효과를 더하고자 하는 기저(underlying) monad이다. 예시를 위해 `Either String` monad를 가정하자.
      ```haskell
      :kind StateT String (Either String)
      Type -> Type
      ```
      남은 표현은 type constructor이다. 마지막 인자는 return type을 의미한다. `Number`를 가정하면 표현은 최종적으로 Type으로 나타낼 수 있다.
      ```haskell
      :kind StateT String (Either String) Number
      Type
      ```
      monad `StateT String (Either String)`은 error message를 동반한 실패 가능하며 mutable state를 사용할 수 있는 계산을 의미한다.
* `MonadTrans` type class - `StateT String` monad 외부에서 `get`, `put`과 같은 action을 사용할 수 있지만 monad(`Either String`)으로 감싸진 효과를 사용하기 위해서는 action들을 monad transformer로 "lift" 해야 한다. 이 때 `MonadTrans`를 사용할 수 있다.
  ```haskell
  class MonadTrans t where
    lift :: forall m a. Monad m => m a -> t m a
    <!-- in exmaple, 
      t :: State String
      m :: Either String
    -->
  ```
  `lift`는 underlying monad `m`의 계산을 입력 받아 wrapped monad `t m`으로 "lift" 한다.
* Note) Monad transformer의 power - 다양한 문제에 각각에 맞는 monad를 만들고, 필요한 side-effects를 골라 작은 단위의 함수를 작성 후, do notation과 applicative combinator의 표현력을 이용해 큰 계산을 할 수 있다.

## The ExceptT Monad Transformer
* `ExceptT e` monad transformer - `Either e` monad에 대응되는 transformer.
  ```haskell
  class MonadError e m where
    throwError :: forall a. e -> m a
    catchError :: forall a. m a -> (e -> m a) -> m a

  instance monadErrorExceptT :: Monad m => MonadError e (ExceptT e m)

  runExceptT :: forall e m a. ExceptT e m a -> m (Either e a)
  ```
  * `MonadError` class는 `e` type error를 지원하는 monad를 capture한다. 또한 `ExceptT e` monad transformer를 위한 instance를 제공한다.
  * `throwError` - 실패를 알리기 위해 사용.(= `Left` in the `Either e` monad)
  * `catchError` - `throwError` 이후 연산을 계속하기 위해 사용.
  * `runExceptT` handler - `ExceptT e m a` type의 계산을 실행하기 위해 사용.
* i.e) `Writer` monad를 `ExceptT`를 이용해 wrapping
  ```haskell
  import Control.Monad.Except
  import Control.Monad.Writer

  writerAndExceptT :: ExceptT String (Writer (Array String)) String
  writerAndExceptT = do
    lift $ tell ["Before the error"]
    _ <- throwError "Error!"
    lift $ tell ["After the error"]
    pure "Return value"

  > runWriter $ runExceptT writerAndExceptT
  Tuple (Left "Error!") ["Before the error"]
  ```

## Monad Transformer Stacks
* Monad transformer는 기존 monad 위에 새로운 monad를 만들기 위해 사용된다. Monad transfomer `t1`과 monad `m`이 있을 때, `t1 m` 역시 monad 이다. 마찬가지로 monad `t2 (t1 m)`을 만들 수 있다. 이런 방식으로 구성 요소들이 제공하는 side-effect들을 다루는 monad transformer stack을 만들 수 있다.
* 실무에서의 underlying monad `m`
  * `Effect` monad - native side effect가 요구 조건인 경우
  * `Identity` monad - 새로운 side effect를 더하지 않고 monad transformer의 effect만 제공한다. 실제로 `State`, `Reader`, `Writer` monad는 `StateT`, `ReaderT`, `WriterT`를 `Identity`에 transform하여 구현됨.
* i.e) `StateT`, `WriterT`, `ExceptT` with `Identity` monad - mutable state, log 합산, pure error에 대한 side effect 제공.
  ```haskell
  type Errors = Array String

  type Log = Array String

  type Parser = StateT String (WriterT Log (ExceptT Errors Identity))

  split :: Parser String
  split = do
    s <- get
    lift $ tell ["The state is " <> s]
    case s of
      "" -> lift $ lift $ throwError ["Empty string"]
      _ -> do
        put (drop 1 s)
        pure (take 1 s)
  ```
  * Note) Monad transformer stack 순서대로 side effect를 제거해야 한다.  
    1. `runStateT` - `StateT` 제거
    2. `runWriterT` - `WriterT` 제거
    3. `runExceptT` - `ExceptT` 제거
    4. `unwrap` - `Identity` 제거
    ```haskell
    > runParser p s = unwrap $ runExceptT $ runWriterT $ runStateT p s
    
    > runParser split "test"
    (Right (Tuple (Tuple "t" "est") ["The state is test"]))
      
    > runParser ((<>) <$> split <*> split) "test"
      (Right (Tuple (Tuple "te" "st") ["The state is test", "The state is est"]))
    ```
    `ExpcetT`에 의해 제공된 side-effect들이 `WriterT`에 의해 제공된 side-effect들과 상호작용하는 방식 때무에 empty state로 인한 실패는 log가 출력되지 않는다.  
    이는 monad transformer stack의 합성 순서를 바꿔서 해결 할 수 있다. `ExceptT`를 stack의 최상단으로 옮기면 log는 모든 message들을 포함하게 된다.
* 이러한 방식든 `lift` 함수를 여러번 사용해야 한다는 단점이 있다. 하지만 type class 추론이 제공하는 자동 code 생성이 대부분의 "heavy lifting"을 제공한다.

## Type Classes to the Rescue!
* `Control.Monad.State.Class` module의 `State` monad type은 아래처럼 일반적인 형태이다.
  ```haskell
  get    :: forall m s. MonadState s m =>             m s
  put    :: forall m s. MonadState s m => s        -> m Unit
  modify :: forall m s. MonadState s m => (s -> s) -> m Unit
  ```
* `Control.Monad.State.Class` module에 정의된 `MonadState`(multi-parameter) type class는 pure mutable state를 지원하는 monad를 추상화 할 수 있도록 도와준다.
* `State s` type constructor는 `MonadState s` type class의 instance 중 하나일 뿐이다.
* 특히 `WriterT`, `ReaderT`, `ExpertT` monad transformer들에 대한 `MonadState` instance가 `transformer` package에 존재한다. 또한 `StateT`가 monad transformer stack에 존재하는 이상, stack에서 `StateT`위에 존재하는 것들은 `MonadState`의 instance이다. 따라서 `get`, `put`, `modify`를 `lift`하지 않고 곧바로 사용할 수 있다.
* 이는 `WriterT`, `ReaderT`, `ExpertT` transformer들에 대해서도 적용된다. `transformers`는 주요 transformer들에 대한 type class를 정의하며 이를 통해 monad에 대한 추상화를 할 수 있다.
* 위에서 예시로 제시한 `split` 함수의 경우 monad stack이 `MonadState`, `MonadWriter`, `MonadError` type class의 instance로 되어 있다. 따라서 `lift`를 사용하지 않고 `get`, `put`, `tell`, `throwError`를 사용할 수 있다.
  ```haskell
  split :: Parser String
  split = do
    s <- get
    tell ["The state is " <> show s]
    case s of
      "" -> throwError ["Empty string"]
      _ -> do
        put (drop 1 s)
        pure (take 1 s)
  ```

## Alternatives
* `Alternative` type class - 실패할 수 있는 계산에 대한 추상화 도구
  ```haskell
  class Functor f <= Alt f where
    alt :: forall a. f a -> f a -> f a

  class Alt f <= Plus f where
    empty :: forall a. f a

  class (Applicative f, Plus f) <= Alternative f
  ```
  * `empty` - 실패한 계산에 대한 prototype 제공
  * `alt` (alias: `<|>`) - error인 경우에 대체 연산(alternative computation)으로 fall back 할 수 있는 능력
* `Data.Array` module은 `Alternative` type class의 생성자와 함께 사용하기 유용한 함수를 제공한다.
  ```haskell
  many :: forall f a. Alternative f => Lazy (f (Array a)) => f a -> f (Array a)
  some :: forall f a. Alternative f => Lazy (f (Array a)) => f a -> f (Array a)
  ```
  * `many` - 반복적인 계산을 위하여 `Alternative` type class를 사용한다. (zero-or-more times)
  * `some` - 반복적인 계산을 위하여 `Alternative` type class를 사용하지만 최소 한 번 이상의 성공을 요구한다.
* `Parser` monad transformer stack에는 `ExceptT`에 의한 `Alternative` instance가 존재한다. 이는 `Monoid` instance를 이용해 서로 다른 error들을 합성할 수 있도록 지원한다. 따라서 `many`와 `some`을 사용할 수 있다.
  ```haskell
  > import Data.Array (many)

  > runParser (many split) "test"
  (Right (Tuple (Tuple ["t", "e", "s", "t"] "")
                [ "The state is \"test\""
                , "The state is \"est\""
                , "The state is \"st\""
                , "The state is \"t\""
                ]))
  ```
## Monad Comprehensions
* `MonadPlus`
  * `Control.MonadPlus`에 정의된 `Alternative` type class의 subclass
  * Monad 이면서 `Alternative`의 instance인 type constructor를 표현한다.
  * ```haskell
    class (Monad m, Alternative m) <= MonadPlus m
    ```
* `guard` - Array comprehension에서 다뤘던 `guard` 함수는 더 일반적으로 `MonadPlus`의 instance인 임의의 monad에 대해 사용할 수 있다.
  ```haskell
  guard :: forall m. Alternative m => Boolean -> m Unit
  ```
  
## Backtracking
* `<|>` operator - 계산에서 실패한 경우 backtrack하기 위하여 사용한다.
* i.e) upper, lower -> upperOrLower 함수는 첫 번째 문자의 대/소문자에 따라 최대로 연속된 대/소문자열을 반환한다.
  ```haskell
  upper :: Parser String
  upper = do
    s <- split
    guard $ toUpper s == s
    pure s
    
  lower :: Parser String
  lower = do
    s <- split
    guard $ toLower s == s
    pure s

  > upperOrLower = some upper <|> some lower
  > runParser upperOrLower "abcDEF"
  (Right (Tuple (Tuple ["a","b","c"] ("DEF"))
                [ "The state is \"abcDEF\""
                , "The state is \"bcDEF\""
                , "The state is \"cDEF\""
                ]))
  ```
  `many`도 사용 가능하다.

## The RWS Monad
* `RWS` monad(reader-writer-state monad)
  * `Reader`, `Writer`, `State` monad 조합은 너무나 일반적이기 때문에 하나의 monad transformd으로 구현하여 사용한다.
* ```haskell
    type RWS r w s = RWST r w s Identity
    ```
  * `r` - 전역 설정 type
  * `w` - log를 쌓기 위해 사용할 monoid
  * `s` - Mutable state type
  
## Conclusion
* Monad transformer를 이용해 명령적 "방식"(style)으로 안전한 코드를 작성할 수 있다.
  * Continuation passing style을 direct style로 변환할 수 있다.
* Type class를 이용해 monad가 제공하는 action들을 추상화 하고 코드를 재사용 할 수 있다.
* Monad transformer는 higher-kinded polymorphism이나 multi-parameter type class와 같은 advanced type system의 기능을 이용해 expressive code를 작성할 수 있다는 훌륭한 예시이다.













## 질문
* 

## 소감
* 
# Chapter 7

## Goal
* `Applicative` type class: boiler plate code => simple, declarative desciption
* `Traversable` type class

## Generalizing Function Application
*
  ```haskell
  import Data.AddressBook
  address :: String -> String -> String -> Address
  ```
  `address`는 위와 같은 type을 가지고 있어서 `Maybe String`을 입력으로 받지 못하지만 `Control.Apply`의 함수 `lift3`를 사용하면 `Maybe` type의 값을 받을 수 있도록 `address`를 "lift" 할 수 있다.  
  ```haskell
  > import Control.Apply
  > lift3 address (Just "123 Fake St.") Nothing (Just "CA")

  Nothing
  {-
  lift3 address :: Maybe String -> Maybe String -> Maybe String -> Maybe Address
  -}
  ```

## Lifting Arbitrary Functions
* ```haskell
  class Functor f where
    map :: forall a b. (a -> b) -> f a -> f b

  class Functor f <= Apply f where
    apply :: forall a b. f (a -> b) -> f a -> f b
  ```
  `Apply` type class는 `Functor` type class의 subclass이다.  
  `apply`(alias: `<*>`)를 추가 함수로 정의한다.
  `map` 함수는 함수를 인자로 받지만 `apply` 함수는 type constructor `f`로 감싸진 함수를 첫 번째 인자로 받는 차이가 있다.
* 임의의 개수의 입력들에 대하여 map과 apply를 이용하여 "lift" 하는 방법. 입력이 3개인 경우를 생각해보면,
  ```haskell
  g :: a -> b -> c
  == g :: a -> (b -> c)

  {- map을 g에 apply하면 -}
  map g :: f a -> f (b -> c)
  {-
  If f is an instance of Apply then
  -}
  apply f (b -> c) :: f b -> f c

  {-
  종합하면, 
  x :: f a,
  y :: f b 라고 할 때,
  -}
  (g <$> x) <*> y :: f c
  == apply (map g x) y
  == g <$> x <*> y
  ```
  일반화하면 임의의 개수의 입력에 대해서 첫 번째 입력에선 <$>(map)을 적용하고, 나머지 입력들에 대해서는 <*> (apply)를 적용한다.
* `ado` notation
  do notation과 비슷한 표현 방법
  ```haskell
  lift3 :: forall a b c d f
        . Apply f
        => (a -> b -> c -> d)
        -> f a
        -> f b
        -> f c
        -> f d
  lift3 f x y z = ado
    a <- x
    b <- y
    c <- z
    in f a b c
  ```

## The Applicative Type Class
* `Apply`와 연관된 type class `Applicative`가 있다.
  ```haskell
  class Apply f <= Applicative f where
    pure :: forall a. a -> f a
  ```
  `Applicative`는 `Apply`의 subclass 이며 `pure` 함수를 정의한다.
  i.e `Maybe`
  ```haskell
  instance applicativeMaybe :: Applicative Maybe where
    pure x = Just x
  ```

## Intuition for Applicative
* PureScript의 함수들은 side-effect들을 지원하지 않는 순수 함수이다. Applicative functor로 encoding하여 side-effect들을 다루는 언어들을 다룰 수 있게 해준다. 즉 `Apply`와 `Applicative` instance들을 이용하여 함수와 값들에서 side-effect들을 "lift"하여(분리하여) pure한 부분을 PureScript에서 다룰 수 있도록 한다.
* `pure`는 side-effect로부터 자유로운 값들을 더 큰 언어들로 "lift"하고 `map`과 `apply`는 함수들을 "lift"한다.

## More Effects
* 이전처럼 Nothing이 포함된 경우 전체 Nothing을 반환하지 않고 Either를 이용하여 error message를 반환하는 함수를 구현.
* Note. `Either err` applicative functor에서 `Left` 생성자는 error를 의미하고, `Right` 생성자는 성공을 의미한다.
  ```haskell
  f <$> Left y == Left y
  f <$> Right x == Right (f x)
  ```
* ```haskell
  > import Data.Either
  > :paste
  … withError Nothing  err = Left err
  … withError (Just a) _   = Right a
  … ^D

  > :paste
  … fullNameEither first middle last =
  …   fullName <$> (first  `withError` "First name was missing")
  …            <*> (middle `withError` "Middle name was missing")
  …            <*> (last   `withError` "Last name was missing")
  … ^D

  > fullNameEither (Just "Phillip") (Just "A") (Just "Freeman")
  (Right "Freeman, Phillip A")

  > fullNameEither (Just "Phillip") Nothing (Just "Freeman")
  (Left "Middle name was missing")

  > fullNameEither (Just "Phillip") (Just "A") Nothing
  (Left "Last name was missing")
  ```

## Combining Effects
* Applicative functor로 encoding하여 generic하게 side-effect를 다루는 함수를 구현하는 법. Sequence!  
`List (f a)`를 계산한 결과를 `f (List a)`로 바꾸는 것.  
`Array<option<a>>` => `option<Array<a>>`로 실무에서 자주 사용.
* 길이가 n으로 고정된 list가 있을 때, n개의 입력을 받아 list를 만드는 함수를 정의할 수 있다.  
i.e n = 3
  ```haskell
  a -> a -> a-> List a
  ```
  이 때 Appicative instance를 사용해 "lift"하면
  ```haskell
  f a -> f a -> f a -> f (List a)
  ```
  를 가지는 함수를 만들 수 있다. 즉
  ```haskell
  combineList :: forall f a. Applicative f => List (f a) -> f (List a)
  combineList Nil = pure Nil
  combineList (Cons x xs) = Cons <$> x <*> combineList xs
  ```

## Applicative Validation
* `Either`를 이용하면 첫 번째 error 밖에 반환하지 못하는 문제가 있는데 이를 `validation` library에 있는 applicative functor `V`를 이용하면 해결할 수 있다. `V`는 어떤 semigroup의 error들도 반환할 수 있다.  
  * i.e 1   
  `V (Array String)`을 사용하여 `Array String`의 error들을 반환할 수 있다.
  * i.e 2  
    ```haskell
    type Errors
      = Array String

    nonEmpty :: String -> String -> V Errors String
    nonEmpty field ""     = invalid [ "Field '" <> field <> "' cannot be empty" ]
    nonEmpty _     value  = pure value

    lengthIs :: String -> Int -> String -> V Errors String
    lengthIs field len value | length value /= len =
      invalid [ "Field '" <> field <> "' must have length " <> show len ]
    lengthIs _     _   value = pure value

    validateAddress :: Address -> V Errors Address
    validateAddress a =
      address <$> nonEmpty "Street"  a.street
              <*> nonEmpty "City"    a.city
              <*> lengthIs "State" 2 a.state
    ```
    `Array String` semigroup을 사용하고 있기 때문에 `invalid`는 string array를 입력으로 받는다.

## Regular Expression Validators
* Regex를 사용하여 다음처럼 validator를 만들 수 있다.
  ```haskell
  matches :: String -> Regex -> String -> V Errors String
  matches _     regex value | test regex value
                            = pure value
  matches field _     _     = invalid [ "Field '" <> field <> "' did not match the required format" ]

  validatePhoneNumber :: PhoneNumber -> V Errors PhoneNumber
  validatePhoneNumber pn =
    phoneNumber <$> pure pn."type"
                <*> matches "Number" phoneNumberRegex pn.number
  ```
  * `pure`: validation 성공
  * `invalid`: array of errors

## Traversable Functors
* `traverse` function
  * Defined in the `Datat.Traversable` module, `Traversable` type class
    ```haskell
    class (Functor t, Foldable t) <= Traversable t where
    traverse :: forall a b m. Applicative m => (a -> m b) -> t a -> m (t b)
    sequence :: forall a m. Applicative m => t (m a) -> m (t a)
    ```
    `Traversable`은 traversable functor들의 class를 정의한다. 모든 traversable functor는 `Functor`이며 `Foldable`이다. 또한 그것들의 구조에 의존하는 side-effect들을 모아서 다룰 수 있는 기능을 제공한다.
    * Data 구조를 traverse(Traversing data structure)
    * 계산의 효과를 모음(Collecting a set of effectful computations)
    * Side-effect를 합침(Combining their effects)

## Applicative Functors for Parallelism
* Applicative functor를 이용하여 side-effect를 다루는 것을 묘사하는 단어로 "combine" 혹은 "sequence"를 사용할 수 있다. Side-effect를 다룰 때에 계산 순서와는 상관이 없으며 parallel 하다고 할 수 있다.
* `parallel` package에서 `Parallel` type class를 다루는데 이 type class는 parallel 연산을 제공한다. `Parallel` type class가 제공하는 `parallel` 함수는 비동기 연산의 병렬 연산을 지원한다.
  ```haskell
  f <$> parallel computation1
  <*> parallel computation2
  ```
  `Promise.all`!

## 질문
* This raises a question: if we can use Applicative to embed PureScript functions and values into this new language, then how is the new language any larger? The answer depends on the functor f. If we can find expressions of type f a which cannot be expressed as pure x for some x, then that expression represents a term which only exists in the larger language.의 의미가 잘 이해되지 않습니다.
  * functor룰 이용해서 표시할 수 없는 값이면 language가 확장되었다는 의미이다 
  
## 소감
* Applicative는 map을 currying 함수로 일반화하여 side-effect로부터 함수를 분리하여 적용하는 방식 처럼 느껴짐
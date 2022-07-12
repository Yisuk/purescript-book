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
* ```js
  class Show a where
    show :: a -> String
  ```
  `Show`는 type variable a에 의하여 parameterized 되는 `type class`이다.
* Type class의 instance는 type class에서 정의된 함수의 특정 타입에 대한 구현을 포함한다.
i.e type class instance `showBoolean`
  ```js
  instance showBoolean :: Show Boolean where
    show true = "true"
    show false = "false"
  ```
  `Boolean` type은 `Show` type class에 속해있다.
* ```js
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
```js
class Eq a where
  eq :: a -> a -> Boolean
```
Note. 두 인자가 반드시 같은 type을 가진다.

### Ord
`Ord` type class는 `compare` 함수를 정의한다. 비교 operator `<` , `>`, (non-strict companion) `<=`, `>=`은 `compare`를 이용하여 정의된다.
```js
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
  ```js
  class Semigroup a where
    append :: a -> a -> a
  ```
  `<>` operator는 `append`의 alias 이다.
* `Monoid` type class는 `Semigroup` type class를 `mempty`라고 부르는 empty value의 개념까지 확장시킨다.
  ```js
  class Semigroup m <= Monoid m where
    mempty :: m
  ```
  `Monoid` type class instance를 위한 type들은 "empty" value에서 시작하여 새로운 결과들을 조합해가며 해당 타입에서 어떻게 결과를 누적(accumulate) 시키는지 묘사한다.
  i.e
  ```js
  > foldl append mempty ["Hello", " ", "World"]
  "Hello World"   // "" => "Hello" => "Hello " => "Hello World"
  ```

## 질문

## 소감

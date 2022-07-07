# Chapter5

## Goal
* Algebraic data types
  * 비슷한 레벨의 표현을 타입의 언어로 표현할 수 있도록 함.
  * Pattern matching과 매우 연관되어 있음
* Pattern matching
  * FP의 보편적인 테크닉
  * 잠재적으로 복잡한 아이디어를 여러 경우의 수로 분리해 구현하는 방법을 통해 compact한 함수로 구현할 수 있도록 도움
* 8월 월간 FP의 주제
  * https://adventofcode.com/2021/day/2
* ㄲow polymorphism
  
## Project Setup
* ```js
  import Data.Number as Number
  ```
  module을 qualified nanme으로 import  
  i.e `Number.max`
  length가 overllapping import 되었던 문제 해결 가능(Data.Foldable, Data.Array)

## Simple Pattern Matching
* Pattern matcing의 장점: 코드를 경우에 따라서 정의하고, 간단하고 명시적인 코드를 작성한다. 코드가 수학 함수와 유사한 형태를 가진다.
* ```js
  gcd :: Int -> Int -> Int
  gcd n 0 = n
  gcd 0 m = m
  gcd n m = if n > m
              then gcd (n - m) m
              else gcd n (m - n)
  ```
  * 각각의 line: alternative or case
  * 좌변: patterns
  * 각각의 case는 space로 구분되는 하나 이상의 pattern으로 구성됨
  * 우변의 expression이 evaluate, return 되기 전에 case의 조건이 만족되어야함
  * 순서대로 case를 테스트하며 첫번째로 만족하는 pattern을 return

## Simple Pattern
* Rescript처럼 wildcard pattern `_`이 존재함

## Guards
* Boolean 값을 가지는 표현식
* Pattern에 의한 constraints에 더하여 추가적으로 만족되어야 한다.  
  i.e) 
  ```js
  gcdV2 :: Int -> Int -> Int
  gcdV2 n 0 = n
  gcdV2 0 n = n
  gcdV2 n m | n > m     = gcdV2 (n - m) m
            | otherwise = gcdV2 n (m - n)
  // An alias for true, which can be useful in guard clauses
  ```

## Array Pattern
* Array literal pattern을 통해 고정된 길이의 array를 pattern matching 할 수 있다.  
  i.e)
  ```js
  isEmpty :: forall a. Array a -> Boolean
  isEmpty [] = true
  isEmpty _ = false
  ```
* Purescript는 고정되지 않은 길이를 가지는 array의 matching은 poor performance를 가질 수 있기 때문에 지원하지 않는다. 이러한 기능은 `Data.List`를 이용해서 접근해보는 걸 추천한다. 다른 데이터 구조가 더 좋은 성능을 보여줄 수 있음.

## Record Patterns and Row Polymorphism
* Record pattern은 `:`의 오른편에 각각의 field의 binder가 있다는 점을 제외하면 record literal과 동일하다.  
  i.e
  ```js
  showPerson :: { first :: String, last :: String } -> String
  showPerson { first: x, last: y } = y <> ", " <> x
  ```
* Record pattern은 Purescript type system의 흥미로운 기능인 row polymorphism의 예시를 제공한다. `showPerson`에서 함수 signature가 사라지면 record를 부분집합으로 하는 record이면 showPerson의 arguement가 될 수 있다.
  i.e
  ```js
  > showPerson { first: x, last: y } = y <> ", " <> x

  // equal to
  > showPerson p = p.last <> ", " <> p.first

  > :type showPerson
  forall r. { first :: String, last :: String | r } -> String
  ```

## Record Puns
* Value의 이름은 필요하지 않고 field의 이름만 필요한 경우 사용.
  i.e
  ```js
  showPersonV2 :: { first :: String, last :: String } -> String
  showPersonV2 { first, last } = last <> ", " <> first
  ```
* 역으로 record를 만드는 경우에도 사용할 수 있다.
  i.e
  ```js
  unknownPerson :: { first :: String, last :: String }
  unknownPerson = { first, last }
    where
      first = "Jane"
      last  = "Doe"
  ```
## Nested Patterns
* Pattern은 임의적으로 nested 될 수 있다.
  i.e
  ```js
  sortPair :: Array Int -> Array Int
  sortPair arr@[x, y]
  | x <= y = arr
  | otherwise = [y, x]
  sortPair arr = arr
  ```

## Named Patterns
* `@`를 사용하여 pattern에 이름을 부여할 수 있다.  
  i.e
  ```js
  sortPair :: Array Int -> Array Int
  sortPair arr@[x, y]
    | x <= y = arr
    | otherwise = [y, x]
  sortPair arr = arr
  ```

## Case Expression
* `case`표현식을 이용하여 연산 도중에 pattern matching을 사용할 수 있다.  
  i.e
  ```js
  import Data.Array (tail)
  import Data.Foldable (sum)
  import Data.Maybe (fromMaybe)

  lzs :: Array Int -> Array Int
  lzs [] = []
  lzs xs = case sum xs of
            0 -> xs
            _ -> lzs (fromMaybe [] $ tail xs)
  ```

## Pattern Match Failures and Partial Functions
* pattern match failure: runtime에 pattern match에 실패하는 경우
* Total function: 임의의 조합의 input에 대하여 값을 return 하는 함수
* Partial function: Total function이 아닌 함수
* 일반적으로 total function을 정의하는 것이 좋다. 그렇지 않은 경우 Purescript 컴파일러에서 error를 발생시킨다.(= exhaustiveness check) 이 error는 `unsafePartial`을 통해 무시할 수 있다.
* Partial function의 type signature를 생략하는 경우 `Partial => `이 생긴다.  
  i.e
  ```js
  partialFunction true = true
  > :type partialFunction

  Partial => Boolean -> Boolean
  ```
  `=>`은 Purescript가 type system을 이용하여 partial function을 추적하고 있다는 의미이다. 따라서 반드시 type checker에 partial function이 safe하다고 명시적으로 표시해야 한다.
* Redundancy도 check 된다.

## Algebra
* Algebra is one of the broad areas of mathematics. Roughly speaking, algebra is the study of mathematical symbols and the rules for manipulating these symbols in formulas; it is a unifying thread of almost all of mathematics. (https://en.wikipedia.org/wiki/**Algebra**
)

## Algebraic Data Types
* OOP: 다루고자 하는 대상들의 interface / abstract class를 작성 -> 각각의 대상을 subclass로 구현. 실행하고자 하는 동작을 interface에 작성. 이 과정에서 modularity를 지키며 동작을 추가하기 어려움
* ADT: Type-safe한 해결책 제시. 다루고자 하는 대상들을 먼저 정의 -> 각각의 경우에 해당하는 동작을 정의  
  i.e
  ```js
  data Shape
    = Circle Point Number
    | Rectangle Point Number Number
    | Line Point Point
    | Text Point String

  type Point =
    { x :: Number
    , y :: Number
    }
  ```
  `data` keyword와 `|`를 이용하여 선언  
  i.e
  ```js
  data Maybe a = Nothing | Just a
  ```
  `forall` 문법은 함수에만 사용하고 `data` 혹은 `type` 에는 사용하지 않는다.



## Using ADTS
* ADT의 값을 사용하는 유일한 방법은 ADT의 생성자들을 pattern matching 하는 것  
  i.e
  ```js
  showShape :: Shape -> String
  showShape (Circle c r) =
    "Circle [center: " <> showPoint c <> ", radius: " <> show r <> "]"
  showShape (Rectangle c w h) =
    "Rectangle [center: " <> showPoint c <> ", width: " <> show w <> ", height: " <> show h <> "]"
  showShape (Line start end) =
    "Line [start: " <> showPoint start <> ", end: " <> showPoint end <> "]"
  showShape (Text loc text) =
    "Text [location: " <> showPoint loc <> ", text: " <> show text <> "]"

  showPoint :: Point -> String
  showPoint { x, y } =
    "(" <> show x <> ", " <> show y <> ")"
  ```

## Newtypes
* `newtype` keyword 사용하여 반드시 하나의 arguement만을 갖는 하나의 constructor로 정의됨.
* Runtime에서 기저의 타입과 동일함. 따라서 runtime performance overhead가 없음.
* Type system의 관점에서 차이를 보임 -> type safety를 위한 장치
  i.e
  ```js
  newtype Volt = Volt Number
  newtype Ohm = Ohm Number
  newtype Amp = Amp Number

  calculateCurrent :: Volt -> Ohm -> Amp
  calculateCurrent (Volt v) (Ohm r) = Amp (v / r)

  battery :: Volt
  battery = Volt 1.5

  lightbulb :: Ohm
  lightbulb = Ohm 500.0

  current :: Amp
  current = calculateCurrent battery lightbulb
  ```
* newtype 자신의 이름과 constructor가 같을 필요 없다.
  i.e
  ```js
  newtype Coulomb = MakeCoulomb Number
  ```
  `Coulomb` => type constructor of zero arguments
  `MakeCoulomb` => data constructor

## 질문
* ```js
  data List a = Nil | Cons a (List a)
  => List a = 1 + (a * List a)
  => List a = 1 + a * (1 + a * List a) 
            = 1 + a + a^2 * List a
  => List a = 1 + a + a^2 * (1 + a * List a)
            = 1 + a + a^2 + a^3 * List a
  ...
  => List a = 1 + a + a^2 + a^3 + ...
  => List a = Nil | (a) | (a, a) | (a, a, a) | ...
  ```
 !!

## 소감
Alternative, Foldable, Functor와 같은 FP 용어들이 나와서 공부할 키워드들이 생겼습니다.

가독성이 높은 코드를 작성하기 위한 표현 방법들을 익히고 있습니다.
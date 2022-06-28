# Chapter4

## Introduction
* recursion은 program의 mutable state를 줄이는데 도움을 준다 -> pure FP에서 많이 사용
* Recursion <-> divide and conquer strategy
  
## Recursion on Arrays
* `fromMaybe` $\approx$ `Option.getWithDefault`

## Maps
* Chagne *contents* of the array, but preserve its *shape*
* Functor의 shape-preserving function인 general pattern

## Infix Operators

## Filtering Arrays

## Flattening Arrays
* `concat`: Array of arrays를 single array로 flattening
* `concatMap`: 기존 array의 element를 받아 새로운 array를 만들고 이를 하나의 array로 flattening

## Array Comprehension 
* `map`, `filter`, `concatMap`은 array에 대한 함수들의 기초를 이룸 => array comprehension

## Do Notation
* `map`, `bind` -> monad comprehension
* 가독성을 위한 문법
* `do` 와 코드 블럭으로 구성됨. 코드 블럭 types:
  * `<-`: element를 array에 바인딩하는 expression
  * element를 array에 binding 하지 않는 expression.
    예시) `do` result
  * `let`: expression에 이름을 부여하는 expression 
* `pure`: signleton array. An array with bound 1.

## Guards
* ```js
  > import Control.Alternative
  > :type guard
  forall m. Alternative m => Boolean -> m Unit
  ```
* `guard` pass: returns an array with a single element
* `guard` fail: result empty $\approx$ `filter`

## Folds
* ```
  > :type foldl
  forall a b. (b -> a -> b) -> b -> Array a -> b
  
  > :type foldr
  forall a b. (a -> b -> b) -> b -> Array a -> b
  ```
* a: element of array
* b: accumlator

## Tail Recursion
* stack overflow를 피하기 위한 방법
* *tail position*의 recursive call은 jump로 대체되어 stack frame에 배정되지 않음
* purescript에서는 전체 recursive function을 while loop로 대체함

## Accumulators
* tail recursive한 함수로 만들기 위해 accumulator param을 이용함
* accumulator를 state로 혼동할 수 있지만 accumulator를 직접적으로 변경하지 않음.

## 질문
* ```
  > :type map
  forall a b f. Functor f => (a -> b) -> f a -> f b
  ```
  에서 `f. Functor f`는 functor인 f로 해석하면 되나요?
* foldl과 foldr의 type도 달라야만 하는 건가요? 
* Unit ?

## 소감
Alternative, Foldable, Functor와 같은 FP 용어들이 나와서 공부할 키워드들이 생겼습니다.

가독성이 높은 코드를 작성하기 위한 표현 방법들을 익히고 있습니다.
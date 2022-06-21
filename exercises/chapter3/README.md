# Chapter3

## Simple Types

* Number, String(“”), Boolean <-> js
* other built-in types: Int, Char(‘’), Array, records, and functions.
    ```ruby
    add :: Int -> Int -> Int 
    add x y = x + y
    
    > :paste
        … add :: Int -> Int -> Int
        … add = \x y -> x + y
        … ^D
    ``` 

## Quantified Types

* forall indicates that a universally quantified type
   -> generic과 비슷하게 느껴짐
    ```
    > flip (\n s -> show n <> s) "Ten" 10 = "10Ten"
    ```

## Notes On Indentation
    
* indentation-sensitive
* If a declaration spans multiple lines, then any lines except the first must be indented past the indentation level of the first line.
* Certain PureScript keywords (such as where, of and let) introduce a new block of code, in which declarations must be further-indented:

## Defining Our Types
  
* A good first step = write out type definitions for any values you will be working with
== 부트캠프에서 배우고 실무에서 많이 사용하는 방법!
* 타입에 대한 코드를 아끼지 말자

## Type Constructors and Kinds
  
* type의 type = kind

## Creating Address Books

* Mutation is a side-effect of code, and inhibits our ability to reason effectively about its behavior, so we prefer pure functions and immutable data where possible.

## Curried Functions

* Functions in PureScript take exactly one argument.
* That is, `insertEntry` is a function which returns a function
* The -> operator in function types is a type constructor for functions. It takes two type arguments, the function's argument type and the return type. The left and right operands respectively.
* `conversion`
  * If two functions have the same result for every input, then they are the same function! So we can remove the argument
  * can be used (along with some other techniques) to rewrite functions in point-free form, which means functions defined without reference to their arguments
  * i.e
      ```ruby
      arr -> Array.map(Int.toFloat)
      ```

## Infix Function Application
  
* infix operators are actually defined in the PureScript source as infix aliases for their underlying prefix implementations
    ```ruby
    infix 4 eq as ==
    ```
* wrapping prefix function in backticks(`) -> infix
* warpping infix operator in parantheses -> prefix function
* [precedence](https://github.com/purescript/documentation/blob/master/language/Syntax.md#precedence) : 마치 z-index 같은 느낌!
* [associative](https://github.com/purescript/documentation/blob/master/language/Syntax.md#associativity)

## Function Composition
  * <<< & >>>

## 소감

conversion의 느낌은 오지만 아직 적용하여 사용할만큼은 아닙니다.
조금 더 conversion을 잘 이해한다면 코드를 더 아름답게 작성할 수 있을 것 같은 느낌이 듭니다.

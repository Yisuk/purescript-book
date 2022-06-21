Chapter3

* 요약
    * kind: type의 type

* Simple Types
    * Number, String(“”), Boolean <-> js
    * other built-in types: Int, Char(‘’), Array, records, and functions.
        ```ruby
        add :: Int -> Int -> Intadd x y = x + y
        > :paste… add :: Int -> Int -> Int… add = \x y -> x + y… ^D
        ``` 
* Quantified Types
    * forall indicates that a universally quantified type
    ```
    > flip (\n s -> show n <> s) "Ten" 10 = "10Ten"
    ```

* Notes On Indentation
    * indentation-sensitive
    * If a declaration spans multiple lines, then any lines except the first must be indented past the indentation level of the first line.
        * add x y z = x + y + z
    * Certain PureScript keywords (such as where, of and let) introduce a new block of code, in which declarations must be further-indented:
        * example x y z = foo + bar  where    foo = x * y    bar = y * z

* Defining Our Types
    * A good first step = write out type definitions for any values you will be working with.

* Type Constructors and Kinds
    * Just like values are distinguished by their types, types are distinguished by their kinds, and just like ill-typed values result in type errors, ill-kinded types result in kind errors.

* Creating Addfess Books
  * Mutation is a side-effect of code, and inhibits our ability to reason effectively about its behavior, so we prefer pure functions and immutable data where possible.

* Curried Functions
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

* Infix Function Application
  * infix operators are actually defined in the PureScript source as infix aliases for their underlying prefix implementations
  ```ruby
  infix 4 eq as ==
  ```
  * w rapping prefix function in backticks(`) -> infix
  * warpping infix operator in parantheses -> prefix function
  * [precedence](https://github.com/purescript/documentation/blob/master/language/Syntax.md#precedence)
  * [associative](https://github.com/purescript/documentation/blob/master/language/Syntax.md#associativity)

* Function Composition
  * <<< & >>>
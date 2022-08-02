# Chapter 8

## Goal
* Monads: Side-effect들을 더 표현적으로(expressive) 추상화 하는 방법

## Monads and Do Notation
* Array monad - PureScript 함수들을 비결정론적 결정(non-deterministic choice)를 지원하는 더 확장된 프로그래밍 언어로 삽입(embedding)
* 일반적으로 어떤 type 생성자 `m`을 위한 monad는 do notation을 `m a` type에 사용할 수 있도록 한다.
  * do notation block의 모든 라인들은 `m a`(`m`: monad, `a`: type)의 연산을 포함한다.
  * monad `m`은 모든 라인에서 동일하다.  
	i.e side-effect 고정
  * type `a`는 다를 수 있다.  
	i.e 각각의 계산의 결과는 다른 type을 가질 수 있음.
  * i.e
	```haskell
	child :: XML -> String -> Maybe XML
	
	userCity :: XML -> Maybe XML
	userCity root = do
	prof <- child root "profile"
	addr <- child prof "address"
	city <- child addr "city"
	pure city -- equal to Just city
	```
* Chapter 4 - Do notation 복습
  * Note: `map`과 `concatMap`이 array comprehension을 사용할 수 있도록 해주는 것처럼 더 일반적인 연산자 `map`과 `bind`가 monad comprehension을 사용할 수 있도록 해준다.
  * do notation에서 사용되는 표현 type
	* Array의 원소들을 이름과 binding 하는 표현. `<-` 을 사용하여 표현한다. 왼쪽은 이름, 오른쪽은 array type expression이다.
	* Array의 원소들을 이름과 binding 하지 않는 표현. i.e do result
	* `let`을 사용하여 expression에 이름을 부여하는 표현

## The Monad Type Class
* `Monad` type class 정의
  ```haskell
  class Apply m <= Bind m where
	bind :: forall a b. m a -> (a -> m b) -> m b
  
  class (Applicative m, Bind m) <= Monad m
  ```
* `bind`는 `Bind` type class에 정의되어 있으며 infix 연산자는 `>>=`이다.
  * instances
	```haskell
	instance bindArray :: Bind Array where
		bind xs f = concatMap f xs

	instance bindMaybe :: Bind Maybe where
		bind Nothing  _ = Nothing
		bind (Just a) f = f a
	```
* `Bind` type class와 do notation의 관계
  * PureScript compiler는 아래의 표현을 다음처럼 바꾼다.
	```haskell
	do value <- someComputation
		whatToDoNext

	bind someComputation \value -> whatToDoNext
	-- or written infix
	someComputation >>= \value -> whatToDoNext
	```
	여러 개의 bind가 존재한다면 이 규칙은 위부터 여러 번 적용된다.  
	i.e
	```haskell
	userCity :: XML -> Maybe XML
	userCity root =
	child root "profile" >>= \prof ->
		child prof "address" >>= \addr ->
		child addr "city" >>= \city ->
			pure city
	```
  * do notation이 보통 `>>=` 연산자보다 명확하지만 종종 `>>=`을 사용하면 point-free form으로 코드를 작성할 수 있다.
	* point-free form - 정의에 argument에 대한 reference가 없는 함수.

## Monad Laws
### Identity Laws
* Right-identity law - `pure` 가 do notation block의 마지막 표현인 경우 생략할 수 있다.
	```haskell
	do
		x <- expr
		pure x
	
	-- is equivalent to
	expr
	```
* Left-identity law - `pure` 가 do notation block의 첫 번째 표현인 경우 생략할 수 있다.
	```haskell
	do
		x <- pure y
		next

	-- is equivalent to x has been replaced with the expression y
	next
	```
* Associativity law - nested do notation block을 다루는 방법.
	```haskell
	c1 = do
		y <- do
			x <- m1
			m2
		m3

	-- is equivalent to
	c2 = do
		x <- m1
		y <- m2
		m3

	-- also equivalent to
	c3 = do
		x <- m1
		do
			y <- m2
			m3

	-- is all equivalent to
	m1 >>= x -> m2 >>= y -> m3
	```

## Folding With Monads
* Goal
  * Monadic code가 더 확장적인 언어에서 side-effect를 다루는 것과 대응된다는 직관의 구체화
  * Monad를 이용하여 programming 하여 얻을 수 있는 일반성(Generality)
* `foldM` - Monadic cotext로 일반화된 `foldl` 함수
  ```haskell
  foldM :: forall m a b. Monad m => (a -> b -> m a) -> a ->     List b -> m a
  foldl :: forall   a b.            (a -> b ->   a) -> a -> List b ->   a
  ```  
  `foldM`함수는 side-effect에 대한 context를 지원하며 list에 대해서 fold를 실행한다.
  * i.e) `m` : `Maybe` - fold 과정에서 실패하여 `Nothing`을 반환할 수 있다. 각 단계별 결과는 모두 optional이며 fold의 결과 역시 optional 일 것이다.
  * i.e) `m`: `Array` type constructor - fold의 모든 단계는 0개 이상의 결과 값을 가진다. fold는 각 단계별 결과와는 독립적으로 다음 단계로 진행될 것 이다. 최종적으로 결과들의 집합은 모든 가능한 경로에 대해 수행한 fold들로 이루어져 있다. 이는 graph traversal과 동일하다.  
* `foldM`의 구현
  ```haskell
  -- list = []
  foldM _ a Nil = pure a

  -- list != []
  foldM f a (b : bs) = do
	a' <- f a b
	foldM f a' bs
  ```
  * i.e) 
  ```haskell
  safeDivide :: Int -> Int -> Maybe Int
  safeDivide _ 0 = Nothing
  safeDivide a b = Just (a / b)
  
  > import Test.Examples
  > import Data.List (fromFoldable)
  
  > foldM safeDivide 100 (fromFoldable [5, 2, 2])
  (Just 5)
  
  > foldM safeDivide 100 (fromFoldable [2, 0, 4])
  Nothing
  ```

## Monads and Applicatives
* 모든 `Monad` type class의 instance는 `Apply` type class의 instance이다.
* 모든 `Monad` instance에 대해서 `Apply`-`Monad` superclass 관계에 상관없이 사용할 수 있는  `<*>` implementation이 있다.
	```haskell
	ap :: forall m a b. Monad m => m (a -> b) -> m a -> m b
	ap mf ma = do
		f <- mf
		a <- ma
		pure (f a)
	```
	만약 `m`이 `Monad` type class의 불변의 법칙(law-abiding)을 지킨다면 `m`을 위한 `Apply` instance가 `ap`에 의하여 존재한다.
* Monad는 applicative functor만 사용하는 경우보다 더 깊은 추상화를 제공한다.
	i.e)
	```haskell
	userCity :: XML -> Maybe XML
	userCity root = do
		prof <- child root "profile"
		addr <- child prof "address"
		city <- child addr "city"
		pure city
	```
	Do notation을 통해 각 단계는 이전 단계에 의존하게 되는데 이는 `Applicative` type class만 사용하는 경우에는 불가능하다. Applicative functor는 인자가 서로 독립적인 경우에만 lift 할 수 있다. 하지만 monad는 의존성이 있는 경우에도 추상화를 할 수 있도록 한다.
	* flatMap -> Applicative functor를 이용하면 option<option<'a>> 이 되는 것을 option<'a>로 type 할 수 있다.
* `Applicative` type class가 병렬적으로 표현할 수 있는 것은 모든 함수의 인자가 독립적이기 때문에 가능했다. 하지만 `Monad` type class는 이전 계산 결과와 의존성이 있는 경우도 다루기 때문에 side-effect를 직렬적으로 다룬다.

## Native Effects
* `Effect` monad
  * PureScript에서 중심적인 monad
  * `Effect` module에 정의되어 있다.
  * Haskell의 `IO` monad와 동일하다.
  * native side-effect들을 다룬다.
    * 보통 side-effect들로부터 자유로운 관용적인 PureScript 표현과 구분되어지는 JavaScript 표현
    * i.e)
      * Console IO
      * Random number generation
      * Exceptions
      * Reading/writing mutable state
	* i.e) in the browser
	  * DOM manipulation
      * XMLHttpRequest / AJAX calls
      * Interacting with a websocket
      * Writing/reading to/from local storage
    * Non-native side-effects
      * Optional values(`Maybe` data type)
      * Errors(`Either` data type)
      * Multi-functions(`array` or `list` data type)
    * 구분이 명확하지 않음
      * Error message는 JavaScript 표현에서 exception form을 이용하여 side-effect로 표현 가능하다. 이 경우 exception은 native side-effect이며 `Effect`로 표현할 수 있다.
      * 하지만 `Either`로 나타낸 error message는 JavaScript runtime에 side-effect가 아니다. 이 경우 `Effect`로 나타내는 것이 적절치 않다.

## Side-Effects and Purity
* Side-effect 없이 어떻게 실용적인 real-world code를 작성할 수 있는가?
  * PureScript는 side-effect를 제거하는 것이 목표가 아니다.
  * 목표 - Pure computation과 type system에서 side-effect들의 계산을 분리하는 것
  * 이를 통해 언어는 계속 pure할 수 있다.
    * Suspense에서 대수적 효과를 이용해서 비동기 처리하는 것과 유사한 느낌.
  * Side-effect가 있는 value는 pure value와 다른 type을 가지고 있다. 따라서 side-effecting 인자를 직접 함수에 넘겨줄 수 없다.
  * `Effect` monad에 의해 관리되는 side-effect가 나타나는 유일한 방법은 JavaScript에서 `Effect a` type 연산을 실행하는 것이다.

## The Effect Monad
* `Effect` monad - Side-effect를 동반한 계산을 위한 well-typed API. 효율적인 JavaScript를 생성함. Encapsulate side effects.
* i.e) `log` function
	```haskell
	log :: String -> Effect Unit
	{-
		`Effect` - 함수가 native effect(위 경우는 console IO)를 만드는 것을 나타냄.
		`Unit` - 의미없는 data가 반환되는 것을 나타냄.
	-}
	```
* i.e) `random` function
	```haskell
	random :: Effect Number
	```
* i.e) full example
	```haskell
	module Test.Random where

	import Prelude
	import Effect (Effect)
	import Effect.Random (random)
	import Effect.Console (logShow)

	main :: Effect Unit
	main = do
		n <- random
		logShow n

	-- Also equivalent to
	main :: Effect Unit
	main = random >>= logShow
	```
	`Effect`가 monad이기 때문에 effectful `logShow` 함수에 전달하기 전에 do notation을 이용하여 data를 unwrap하였다.
* `Effect` monad는 PureScript의 `Foreign Function Interface`와 이어주는 대표적인 방법이기 때문에 매우 중요하다. PureScript의 `Foreign Function Interface`는 side-effect들을 program하고 실행하는 방식이다.

## Exceptions
* 2가지 native side-effects(Mutable state, exception)가 있는 `node-fs` package의 `readTextFile`을 살펴보자.
	```haskell
	readTextFile :: Encoding -> String -> Effect String
	```
	* 존재하지 않는 파일을 읽으려고 할 경우 다음과 같은 exception이 발생한다.
		```haskell
		import Node.Encoding (Encoding(..))
		import Node.FS.Sync (readTextFile)

		main :: Effect Unit
		main = do
			lines <- readTextFile UTF8 "iDoNotExist.md"
			log lines

		-- exeption
			throw err;
			^
		Error: ENOENT: no such file or directory, open 'iDoNotExist.md'
		...
			errno: -2,
			syscall: 'open',
			code: 'ENOENT',
			path: 'iDoNotExist.md'
		```
    * `try`를 이용하여 either outcome으로 처리:
		```haskell
		main :: Effect Unit
		main = do
			result <- try $ readTextFile UTF8 "iDoNotExist.md"
			case result of
				Right lines -> log $ "Contents: \n" <> lines
				Left  error -> log $ "Couldn't open file. Error was: " <> message error
		```
		`try`는 `Effect`를 실행시키고 최후의 exception을 `Left`로 반환하고, 계산에 성공하면 결과를 `Right`로 반환한다.
		```haskell
		try :: forall a. Effect a -> Effect (Either Error a)
		```
* Custom exception을 만들 수도 있다.
  * i.e) Data.List.head. Empty list인 경우 `Maybe`의 `Nothing`을 반환하지 않고 exception을 throw. 실용적인 구현은 아님. Error나 값이 없는 경우는 `Either`나 `Maybe`와 같은 non-native effect를 사용하는 것이 좋다.
	```haskell
	exceptionHead :: List Int -> Effect Int
	exceptionHead l = case l of
		x : _ -> pure x
		Nil -> throwException $ error "empty list"
	```

## Mutable State
* `ST` effect
  * Mutable state를 다루기 위하여 사용함.
  * 순수 함수형 programmer로서 공유된 mutable state는 문제를 일으킬 수 있음.
  * `ST` effect는 type system을 사용하여 안전한 local mutation만 가능하도록 공유를 제한함.
  * Type of actions:
  	```haskell
  	new :: forall a r. a -> ST r (STRef r a)

	read :: forall a r. STRef r a -> ST r a

	write :: forall a r. a -> STRef r a -> ST r a

	modify :: forall r a. (a -> a) -> STRef r a -> ST r a
	```
	* new - 새로운 `STRef r a` type을 갖는 mutable reference cell을 만듬
	* read, write, modify - `STRef r a` type의 mutable reference cell을 통해 읽고, 수정함.
	* i.e) 입자들이 중력에 의해 떨어지는 것을 simulation하는 상황. 입자의 위치와 속도에 대한 mutable reference cell을 만들어 해당 값들을 loop를 통해 update.
		```haskell
		import Prelude

		import Control.Monad.ST.Ref (modify, new, read)
		import Control.Monad.ST (ST, for, run)

		simulate :: forall r. Number -> Number -> Int -> ST r Number
		simulate x0 v0 time = do
			ref <- new { x: x0, v: v0 }
			for 0 (time * 1000) \_ ->
				modify
					( \o ->
						{ v: o.v - 9.81 * 0.001
						, x: o.x + o.v * 0.001
						}
					)
					ref
			final <- read ref
			pure final.x
		```
		이 함수는 mutable state를 사용하지만 program의 다른 부분에서 reference cell `ref`가 사용되지 않는한 pure function이다. 이를 `ST` effect에서 제한한다.  
		`ST` effect를 계산하기 위해서 `run` 함수를 반드시 사용해야 한다.
		```haskell
		run :: forall a. (forall r. ST r a) -> a
		```
		region type `r`은 괄호 안에서 명시된다. 따라서 `run`에 전달하는 모든 action은 반드시 어떤 region `r`에 대해서든 동작해야 한다.  
		하지만 `new`에 의해서 reference cell이 만들어지고 나서 reference cell의 region type은 이미 고정되어 있다. 따라서 `run` 외부에서 reference cell을 사용하려고 하면 type error가 발생한다. 이를 통해 `run`은 안전하게 `ST` effect를 제거하고 `simulate`를 순수함수로 바꿀 수 있다.
		```haskell
		simulate' :: Number -> Number -> Int -> Number
		simulate' x0 v0 time = run (simulate x0 v0 time)
		```
		같은 내용을 다음과 같이 나타낼 수도 있다.
		```haskell
		simulate :: Number -> Number -> Int -> Number
		simulate x0 v0 time =
  			run do
    			ref <- new { x: x0, v: v0 }
    			for 0 (time * 1000) \_ ->
      				modify
        				( \o ->
            				{ v: o.v - 9.81 * 0.001
            				, x: o.x + o.v * 0.001
            				}s
        				)
        				ref
    			final <- read ref
    			pure final.x
		```
		이 경우 compiler가 reference cell이 scope를 벗어나는 것이 제한됨을 알게 된다. 그리고 안전하게 `ref`를 `var`로 바꾼다.

## DOM Effects
* DOM, open source DOM library와 관련된 PureScript packages
	* `web-dom` - W3C DOM spec의 type 정의와 low level interface 구현을 제공
	* `web-html` - W3C HTML5 spec의 type 정의와 low level interface 구현을 제공
	* `jquery` - jQuery library binding
* Library를 바탕으로 추상화를 제공하는 Purescript library
	* `thermite` - `react` 기반
	* `react-basic-hooks` - `react-basic` 기반
	* `halogen` - Custom virtual DOM library를 기반으로 type-safe한 추상화를 제공

## 질문
* comprehension의 의미가 궁금합니다. array comprehension, monad comprehension
	* Side-effect를 다루는 함수를 직관적으로 표현하기 위해서 사용

## 소감
* Monad는 왜 사용할까? - Applicative는 서로 독립적인 arg들을 추상화해 병렬적으로 처리하기 위하여 사용했다면 monad는 서로 의존관계가 있는 arg들을 추상화해 직렬적으로 처리하기 위해서 사용.
* https://youtu.be/t1e8gqXLbsU?t=1003 
* A monad is just a monoid in the category of endofunctors, what's the problem?
	* monoid - Describes how to accumulate a result with that type, by starting with an "empty" value, and combining new results. 
		```haskell
		class Semigroup m <= Monoid m where
		mempty :: m
		```
 
	* endofunctor - A mapping of objects and morphisms from one Category back to the same Category
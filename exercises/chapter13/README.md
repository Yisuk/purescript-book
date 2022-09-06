# Chapter 13

## Goal
* Generative testing(or property-based testing) - Compiler에게 어떻게 code를 test 할 지 전달하지 않고 code가 가져야 하는 특징을 가정하여 test를 진행한다.(what O how X) Test case들은 이 특징들로부터 생성된다.
* `quikecheck` package - Haskell의 QuickCheck library를 PureScript에서도 사용할 수 있도록 함.

## Writing Properties
* `Merge` module의 `merge` 함수를 이용해 `quickcheck` library의 기능을 알아보자.
  ```haskell
  merge :: Array Int -> Array Int -> Array Int

  > import Merge
  > merge [1, 3, 5] [2, 4, 5]

  [1, 2, 3, 4, 5, 5]
  ```
* `merge` 함수의 본질은 다음으로 요약할 수 있다. `xs`와 `ys`가 정렬되어 있다면 `merge xs ys`는 두 array가 더해지고 정렬된 결과이다. 
* `quickcheck`를 통해 random test case를 만들어 이 성질을 테스트 할 수 있다.
  ```haskell
  main = do
    quickCheck \xs ys ->
      eq (merge (sort xs) (sort ys)) (sort $ xs <> ys)
  ```
  code를 실행하면 `quickcheck`는 반증을 찾기 위해 random testcase를 실행하고 이 중 하나라도 반증이 등장하면 error를 생성한다.

## Improving Error Messages
* `<?>` - 실패한 경우 error message를 만들기 위하여 사용한다.
  ```haskell
  quickCheck \xs ys ->
    let
      result = merge (sort xs) (sort ys)
      expected = sort $ xs <> ys
    in
      eq result expected <?> "Result:\n" <> show result <> "\nnot equal to expected:\n" <> show expected
  ```

## Testing Polymorphic Code
* `mergePoly` - `merge`의 일반화된 함수. `Ord` type class에 속하는 `Array a`에 대하여 정의된다.
  ```haskell
  mergePoly :: forall a. Ord a => Array a -> Array a -> Array a
  ```
* `mergePoly`를 `merge`와 같이 test하면 random test case를 생성할 수 없어 error가 발생한다. 이 경우 compiler가 특정 type을 추론하도록 강제로 지정해주어야 한다.
  ```haskell
  quickCheck \xs ys ->
    eq (mergePoly (sort xs) (sort ys) :: Array Int) (sort $ xs <> ys)
  ```
  또는 helper function을 이용해 더 간결하게 type을 지정할 수 있다. 예를 들어 `Array Int`의 identity function id를 이용해 type을 `Array Int`로 지정할 수 있다.
  ```haskell
  ints :: Array Int -> Array Int
  ints = id

  quickCheck \xs ys ->
    eq (ints $ mergePoly (sort xs) (sort ys)) (sort $ xs <> ys)
  ```

## Generating Arbitrary Data
* `Arbitrary` type class - Random하게 값을 생성할 수 있는 type들의 type class
  ```haskell
  class Arbitrary t where
    arbitrary :: Gen t
  ```
  * `Gen` type constructor
    * Deterministic random data generation의 side effect를 의미한다. Seed value로부터 deterministic random function의 인자를 생성하기 위해 psuedo-random 숫자 생성기를 사용한다.
  * Monad 그리고 applicative functor이기 때문에 `Arbitrary` type class의 새로운 instance를 만들기 위해 usual collection of combinator를 사용할 수 있다.  
  * i.e) `Int` type에 대한 `Arbitrary` instance. 256 byte 값에 대한 distribution을 생성하기 위해 `Gen`의 `Functor` instance를 사용한다.
    ```haskell
    newtype Byte = Byte Int

    instance arbitraryByte :: Arbitrary Byte where
      arbitrary = map intToByte arbitrary
        where
        intToByte n | n >= 0 = Byte (n `mod` 256)
                    | otherwise = intToByte (-n)
    ```
  * `newtype Sorted a = Sorted (Array a)`를 이용해서 더 명확하게 함수의 의도를 전달할 수 있다.
    ```haskell
    newtype Sorted a = Sorted (Array a)

    sorted :: forall a. Sorted a -> Array a
    sorted (Sorted xs) = xs

    instance arbSorted :: (Arbitrary a, Ord a) => Arbitrary (Sorted a) where
      arbitrary = map (Sorted <<< sort) arbitrary

    quickCheck \xs ys ->
    eq (ints $ mergePoly (sorted xs) (sorted ys)) (sort $ sorted xs <> sorted ys)
    ```
  * i.e) `Tree` module - 정렬된 이진 tree
    ```haskell
    data Tree a
      = Leaf
      | Branch (Tree a) a (Tree a)

    insert    :: forall a. Ord a => a -> Tree a -> Tree a
    member    :: forall a. Ord a => a -> Tree a -> Boolean
    fromArray :: forall a. Ord a => Array a -> Tree a
    toArray   :: forall a. Tree a -> Array a
    ```
    `toArray`와 `fromArray`를 이용해서 sorted tree와 array를 변환할 수 있다. 이를 이용해 tree의 `Arbitrary` instance를 구현할 수 있다.
    ```haskell
    instance arbTree :: (Arbitrary a, Ord a) => Arbitrary (Tree a) where
      arbitrary = map fromArray arbitrary
    ```

## Testing Higher-Order Functions
* `mergeWith` function - Higher-order function. 추가 함수를 인수로 받아 정렬 기준을 설정한다. 
* `Coarbitrary` - 함수를 random generate 하는 type class
  ```haskell
  class Coarbitrary t where
    coarbitrary :: forall r. t -> Gen r -> Gen r
  ```
  type `t`와 함수 결과 type `r`에 대한 random generator를 인수로 받아 random한 값을 생성한다.
* 함수의 domain(정의역)이 `Coarbitrary`이고 codomain(공역)이 `Arbitrary`인 경우 `Arbitrary` 함수에 의한 type class instance가 있다.
  ```haskell
  instance arbFunction :: (Coarbitrary a, Arbitrary b) => Arbitrary (a -> b)
  ```
  함수를 인수로 하는 property를 test 할 수 있다는 의미를 가진다.
  함수는 `Arbitrary`일 뿐만 아니라 `Coarbitrary`이기 때문에 귀납적인 방법으로 test를 더 높은 higher-order function을 대상으로 할 수 있다.
  ```haskell
  instance coarbFunction :: (Arbitrary a, Coarbitrary b) => Coarbitrary (a -> b)
  ```

## Writing Coarbitrary Instances
* `Monad`와 `Applicative`를 이용해서 `Arbitrary` instance를 구현했던 것처럼 `Coarbitrary` instance도 구현할 수 있다. 이를 이용해 randomly-generated 함수의 정의역으로 own data type을 사용할 수 있다.
* i.e) `Coarbitrary` instance for `Tree`
  ```haskell
  instance coarbTree :: Coarbitrary a => Coarbitrary (Tree a) where
    coarbitrary Leaf = id
    coarbitrary (Branch l a r) =
      coarbitrary l <<<
      coarbitrary a <<<
      coarbitrary r
  ```
  위의 instance를 이용해서 `anywhere` 함수를 test 할 수 있다.
  ```haskell
  anywhere :: forall a. (Tree a -> Boolean) -> Tree a -> Boolean
  ```
  ```haskell
  quickCheck \f g t ->
  anywhere (\s -> f s || g s) t ==
    anywhere f (treeOfInt t) || anywhere g t
  ```

## Testing Without Side-Effects
* `quickCheckPure` - Side-effect를 사용하지 않고 random seed를 입력으로 받아 test 결과 array를 반환한다.
  * arguments
    * random seed
    * 총 test case 갯수
    * test하는 property
  * 사용사례
    * 성능 benchmarks를 위한 random input data를 생성
    * web application을 위한 sample form data 생성

## 질문
* In addition, there is a type class instance which gives us Arbitrary functions if the function domain is Coarbitrary and the function codomain is Arbitrary:
  ```haskell
  instance arbFunction :: (Coarbitrary a, Arbitrary b) => Arbitrary (a -> b)
  ```
  뜻을 이해하지 못했습니다.

## 소감
* 
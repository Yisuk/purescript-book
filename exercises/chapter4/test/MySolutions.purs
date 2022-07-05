module Test.MySolutions where

import Test.Examples (factors)
import Prelude
import Data.Array
import Data.Maybe
import Control.Alternative

isEven :: Int -> Boolean
isEven a = 
    if a < 0 then
        isEven(-a)
    else if a == 0 then true
    else not isEven (a-1)

countEven :: Array Int -> Int
countEven arr =
    if null arr then
        0
    else if maybe false isEven (head arr) then
        1 + countEven(fromMaybe [] $ tail arr)
    else countEven(fromMaybe [] $ tail arr)

squared :: Array Number -> Array Number
squared arr = map (\n -> n * n) arr

keepNonNegative :: Array Number -> Array Number
keepNonNegative arr = filter (\n -> n >= 0.0) arr

infix 1 filter as <$?>

keepNonNegativeRewrite :: Array Number -> Array Number
keepNonNegativeRewrite arr = (\n -> n >= 0.0) <$?> arr

isPrime :: Int -> Boolean
isPrime n =
    if n == 1 then false
    else eq 1 $ length $ factors n

cartesianProduct :: forall a. Array a -> Array a -> Array (Array a)
cartesianProduct arr1 arr2 = do
    i <- arr1
    j <- arr2
    pure [ i , j ]

triples :: Int -> Array (Array Int)
triples n = do
    k <- (1 .. n)
    j <- (1 .. k)
    i <- (1 .. j)
    guard $ i * i + j * j == k * k
    pure [i, j, k]

primeFactors :: Int -> Array Int
primeFactors n =
    if n == 1 then []
    else if eq 1 $ length $ factors n then fromMaybe [] $ head $ factors n
    else fromMaybe 1 $ head $ (index (factors n) 2) : primeFactors (fromMaybe 1 $ tail $ (index ( factors n ) 2))

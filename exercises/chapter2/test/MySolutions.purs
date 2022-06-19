module Test.MySolutions where

import Prelude
import Data.Number (sqrt)
import Data.Number (pi)
import Data.Int (rem)

diagonal w h = sqrt (w * w + h * h)

circleArea r = pi * r * r

leftoverCents m = rem m 100
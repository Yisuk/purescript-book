module Test.MySolutions where

import Prelude
import Data.AddressBook
import Data.List
import Data.Maybe

-- 2
{-
findEntryByStreet :: String -> AddressBook -> Maybe Entry
findEntryByStreet street = filter filterEntry >>> head
    where
        filterEntry :: Entry -> Boolean
        filterEntry entry = entry.address.street == street
-}

-- 3
findEntryByStreet :: String -> AddressBook -> Maybe Entry
findEntryByStreet street = filter filterEntry >>> head
    where
        filterEntry :: Entry -> Boolean
        filterEntry = _.address.street >>> eq street

-- 4
isInBook :: String -> String -> AddressBook -> Boolean
isInBook firstName lastName = filter filterEntry >>> null >>> not
    where
        filterEntry :: Entry -> Boolean
        filterEntry entry = entry.firstName == firstName && entry.lastName == lastName

-- 5
removeDuplicates :: AddressBook -> AddressBook
removeDuplicates  = nubByEq filterDuplicate
    where
        filterDuplicate :: Entry -> Entry -> Boolean
        filterDuplicate prev next = prev.firstName == next.firstName && prev.lastName == next.lastName
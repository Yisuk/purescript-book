// output/Control.Apply/foreign.js
var arrayApply = function(fs) {
  return function(xs) {
    var l = fs.length;
    var k = xs.length;
    var result = new Array(l * k);
    var n = 0;
    for (var i = 0; i < l; i++) {
      var f = fs[i];
      for (var j = 0; j < k; j++) {
        result[n++] = f(xs[j]);
      }
    }
    return result;
  };
};

// output/Control.Semigroupoid/index.js
var semigroupoidFn = {
  compose: function(f) {
    return function(g) {
      return function(x) {
        return f(g(x));
      };
    };
  }
};

// output/Control.Category/index.js
var identity = function(dict) {
  return dict.identity;
};
var categoryFn = {
  identity: function(x) {
    return x;
  },
  Semigroupoid0: function() {
    return semigroupoidFn;
  }
};

// output/Data.Boolean/index.js
var otherwise = true;

// output/Data.Function/index.js
var on = function(f) {
  return function(g) {
    return function(x) {
      return function(y) {
        return f(g(x))(g(y));
      };
    };
  };
};
var flip = function(f) {
  return function(b) {
    return function(a) {
      return f(a)(b);
    };
  };
};
var $$const = function(a) {
  return function(v) {
    return a;
  };
};
var applyFlipped = function(x) {
  return function(f) {
    return f(x);
  };
};

// output/Data.Functor/foreign.js
var arrayMap = function(f) {
  return function(arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};

// output/Data.Unit/foreign.js
var unit = void 0;

// output/Type.Proxy/index.js
var $$Proxy = /* @__PURE__ */ function() {
  function $$Proxy2() {
  }
  ;
  $$Proxy2.value = new $$Proxy2();
  return $$Proxy2;
}();

// output/Data.Functor/index.js
var map = function(dict) {
  return dict.map;
};
var mapFlipped = function(dictFunctor) {
  return function(fa) {
    return function(f) {
      return map(dictFunctor)(f)(fa);
    };
  };
};
var $$void = function(dictFunctor) {
  return map(dictFunctor)($$const(unit));
};
var voidRight = function(dictFunctor) {
  return function(x) {
    return map(dictFunctor)($$const(x));
  };
};
var functorArray = {
  map: arrayMap
};

// output/Control.Apply/index.js
var applyArray = {
  apply: arrayApply,
  Functor0: function() {
    return functorArray;
  }
};
var apply = function(dict) {
  return dict.apply;
};
var applyFirst = function(dictApply) {
  return function(a) {
    return function(b) {
      return apply(dictApply)(map(dictApply.Functor0())($$const)(a))(b);
    };
  };
};
var applySecond = function(dictApply) {
  return function(a) {
    return function(b) {
      return apply(dictApply)(map(dictApply.Functor0())($$const(identity(categoryFn)))(a))(b);
    };
  };
};
var lift2 = function(dictApply) {
  return function(f) {
    return function(a) {
      return function(b) {
        return apply(dictApply)(map(dictApply.Functor0())(f)(a))(b);
      };
    };
  };
};

// output/Control.Bind/foreign.js
var arrayBind = function(arr) {
  return function(f) {
    var result = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      Array.prototype.push.apply(result, f(arr[i]));
    }
    return result;
  };
};

// output/Control.Applicative/index.js
var pure = function(dict) {
  return dict.pure;
};
var when = function(dictApplicative) {
  return function(v) {
    return function(v1) {
      if (v) {
        return v1;
      }
      ;
      if (!v) {
        return pure(dictApplicative)(unit);
      }
      ;
      throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};
var liftA1 = function(dictApplicative) {
  return function(f) {
    return function(a) {
      return apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
    };
  };
};
var applicativeArray = {
  pure: function(x) {
    return [x];
  },
  Apply0: function() {
    return applyArray;
  }
};

// output/Control.Bind/index.js
var discard = function(dict) {
  return dict.discard;
};
var bindArray = {
  bind: arrayBind,
  Apply0: function() {
    return applyArray;
  }
};
var bind = function(dict) {
  return dict.bind;
};
var bindFlipped = function(dictBind) {
  return flip(bind(dictBind));
};
var discardUnit = {
  discard: function(dictBind) {
    return bind(dictBind);
  }
};

// output/Data.Semigroup/foreign.js
var concatString = function(s1) {
  return function(s2) {
    return s1 + s2;
  };
};
var concatArray = function(xs) {
  return function(ys) {
    if (xs.length === 0)
      return ys;
    if (ys.length === 0)
      return xs;
    return xs.concat(ys);
  };
};

// output/Data.Symbol/index.js
var reflectSymbol = function(dict) {
  return dict.reflectSymbol;
};

// output/Record.Unsafe/foreign.js
var unsafeGet = function(label) {
  return function(rec) {
    return rec[label];
  };
};
var unsafeSet = function(label) {
  return function(value2) {
    return function(rec) {
      var copy3 = {};
      for (var key in rec) {
        if ({}.hasOwnProperty.call(rec, key)) {
          copy3[key] = rec[key];
        }
      }
      copy3[label] = value2;
      return copy3;
    };
  };
};

// output/Data.Semigroup/index.js
var semigroupUnit = {
  append: function(v) {
    return function(v1) {
      return unit;
    };
  }
};
var semigroupString = {
  append: concatString
};
var semigroupRecordNil = {
  appendRecord: function(v) {
    return function(v1) {
      return function(v2) {
        return {};
      };
    };
  }
};
var semigroupArray = {
  append: concatArray
};
var appendRecord = function(dict) {
  return dict.appendRecord;
};
var semigroupRecord = function() {
  return function(dictSemigroupRecord) {
    return {
      append: appendRecord(dictSemigroupRecord)($$Proxy.value)
    };
  };
};
var append = function(dict) {
  return dict.append;
};
var semigroupFn = function(dictSemigroup) {
  return {
    append: function(f) {
      return function(g) {
        return function(x) {
          return append(dictSemigroup)(f(x))(g(x));
        };
      };
    }
  };
};
var semigroupRecordCons = function(dictIsSymbol) {
  return function() {
    return function(dictSemigroupRecord) {
      return function(dictSemigroup) {
        return {
          appendRecord: function(v) {
            return function(ra) {
              return function(rb) {
                var tail2 = appendRecord(dictSemigroupRecord)($$Proxy.value)(ra)(rb);
                var key = reflectSymbol(dictIsSymbol)($$Proxy.value);
                var insert4 = unsafeSet(key);
                var get2 = unsafeGet(key);
                return insert4(append(dictSemigroup)(get2(ra))(get2(rb)))(tail2);
              };
            };
          }
        };
      };
    };
  };
};

// output/Control.Alt/index.js
var alt = function(dict) {
  return dict.alt;
};

// output/Data.Bounded/foreign.js
var topInt = 2147483647;
var bottomInt = -2147483648;
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// output/Data.Ord/foreign.js
var unsafeCompareImpl = function(lt) {
  return function(eq2) {
    return function(gt) {
      return function(x) {
        return function(y) {
          return x < y ? lt : x === y ? eq2 : gt;
        };
      };
    };
  };
};
var ordIntImpl = unsafeCompareImpl;
var ordStringImpl = unsafeCompareImpl;
var ordCharImpl = unsafeCompareImpl;

// output/Data.Eq/foreign.js
var refEq = function(r1) {
  return function(r2) {
    return r1 === r2;
  };
};
var eqBooleanImpl = refEq;
var eqIntImpl = refEq;
var eqCharImpl = refEq;
var eqStringImpl = refEq;

// output/Data.Eq/index.js
var eqString = {
  eq: eqStringImpl
};
var eqInt = {
  eq: eqIntImpl
};
var eqChar = {
  eq: eqCharImpl
};
var eqBoolean = {
  eq: eqBooleanImpl
};
var eq = function(dict) {
  return dict.eq;
};
var notEq = function(dictEq) {
  return function(x) {
    return function(y) {
      return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
    };
  };
};

// output/Data.Ordering/index.js
var LT = /* @__PURE__ */ function() {
  function LT2() {
  }
  ;
  LT2.value = new LT2();
  return LT2;
}();
var GT = /* @__PURE__ */ function() {
  function GT2() {
  }
  ;
  GT2.value = new GT2();
  return GT2;
}();
var EQ = /* @__PURE__ */ function() {
  function EQ2() {
  }
  ;
  EQ2.value = new EQ2();
  return EQ2;
}();

// output/Data.Ord/index.js
var ordString = /* @__PURE__ */ function() {
  return {
    compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqString;
    }
  };
}();
var ordInt = /* @__PURE__ */ function() {
  return {
    compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqInt;
    }
  };
}();
var ordChar = /* @__PURE__ */ function() {
  return {
    compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqChar;
    }
  };
}();
var compare = function(dict) {
  return dict.compare;
};
var greaterThan = function(dictOrd) {
  return function(a1) {
    return function(a2) {
      var v = compare(dictOrd)(a1)(a2);
      if (v instanceof GT) {
        return true;
      }
      ;
      return false;
    };
  };
};
var max = function(dictOrd) {
  return function(x) {
    return function(y) {
      var v = compare(dictOrd)(x)(y);
      if (v instanceof LT) {
        return y;
      }
      ;
      if (v instanceof EQ) {
        return x;
      }
      ;
      if (v instanceof GT) {
        return x;
      }
      ;
      throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
    };
  };
};
var min = function(dictOrd) {
  return function(x) {
    return function(y) {
      var v = compare(dictOrd)(x)(y);
      if (v instanceof LT) {
        return x;
      }
      ;
      if (v instanceof EQ) {
        return x;
      }
      ;
      if (v instanceof GT) {
        return y;
      }
      ;
      throw new Error("Failed pattern match at Data.Ord (line 172, column 3 - line 175, column 12): " + [v.constructor.name]);
    };
  };
};

// output/Data.Bounded/index.js
var top = function(dict) {
  return dict.top;
};
var boundedInt = {
  top: topInt,
  bottom: bottomInt,
  Ord0: function() {
    return ordInt;
  }
};
var boundedChar = {
  top: topChar,
  bottom: bottomChar,
  Ord0: function() {
    return ordChar;
  }
};
var bottom = function(dict) {
  return dict.bottom;
};

// output/Data.Show/foreign.js
var showIntImpl = function(n) {
  return n.toString();
};
var showStringImpl = function(s) {
  var l = s.length;
  return '"' + s.replace(
    /[\0-\x1F\x7F"\\]/g,
    function(c, i) {
      switch (c) {
        case '"':
        case "\\":
          return "\\" + c;
        case "\x07":
          return "\\a";
        case "\b":
          return "\\b";
        case "\f":
          return "\\f";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "	":
          return "\\t";
        case "\v":
          return "\\v";
      }
      var k = i + 1;
      var empty8 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
      return "\\" + c.charCodeAt(0).toString(10) + empty8;
    }
  ) + '"';
};
var showArrayImpl = function(f) {
  return function(xs) {
    var ss = [];
    for (var i = 0, l = xs.length; i < l; i++) {
      ss[i] = f(xs[i]);
    }
    return "[" + ss.join(",") + "]";
  };
};

// output/Data.Show/index.js
var showString = {
  show: showStringImpl
};
var showInt = {
  show: showIntImpl
};
var show = function(dict) {
  return dict.show;
};
var showArray = function(dictShow) {
  return {
    show: showArrayImpl(show(dictShow))
  };
};

// output/Data.Maybe/index.js
var Nothing = /* @__PURE__ */ function() {
  function Nothing2() {
  }
  ;
  Nothing2.value = new Nothing2();
  return Nothing2;
}();
var Just = /* @__PURE__ */ function() {
  function Just2(value0) {
    this.value0 = value0;
  }
  ;
  Just2.create = function(value0) {
    return new Just2(value0);
  };
  return Just2;
}();
var semigroupMaybe = function(dictSemigroup) {
  return {
    append: function(v) {
      return function(v1) {
        if (v instanceof Nothing) {
          return v1;
        }
        ;
        if (v1 instanceof Nothing) {
          return v;
        }
        ;
        if (v instanceof Just && v1 instanceof Just) {
          return new Just(append(dictSemigroup)(v.value0)(v1.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 182, column 1 - line 185, column 43): " + [v.constructor.name, v1.constructor.name]);
      };
    }
  };
};
var monoidMaybe = function(dictSemigroup) {
  return {
    mempty: Nothing.value,
    Semigroup0: function() {
      return semigroupMaybe(dictSemigroup);
    }
  };
};
var maybe = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v;
      }
      ;
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
var functorMaybe = {
  map: function(v) {
    return function(v1) {
      if (v1 instanceof Just) {
        return new Just(v(v1.value0));
      }
      ;
      return Nothing.value;
    };
  }
};
var fromMaybe = function(a) {
  return maybe(a)(identity(categoryFn));
};
var fromJust = function() {
  return function(v) {
    if (v instanceof Just) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
  };
};
var eqMaybe = function(dictEq) {
  return {
    eq: function(x) {
      return function(y) {
        if (x instanceof Nothing && y instanceof Nothing) {
          return true;
        }
        ;
        if (x instanceof Just && y instanceof Just) {
          return eq(dictEq)(x.value0)(y.value0);
        }
        ;
        return false;
      };
    }
  };
};
var applyMaybe = {
  apply: function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return map(functorMaybe)(v.value0)(v1);
      }
      ;
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Functor0: function() {
    return functorMaybe;
  }
};
var bindMaybe = {
  bind: function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return v1(v.value0);
      }
      ;
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Apply0: function() {
    return applyMaybe;
  }
};
var applicativeMaybe = /* @__PURE__ */ function() {
  return {
    pure: Just.create,
    Apply0: function() {
      return applyMaybe;
    }
  };
}();
var altMaybe = {
  alt: function(v) {
    return function(v1) {
      if (v instanceof Nothing) {
        return v1;
      }
      ;
      return v;
    };
  },
  Functor0: function() {
    return functorMaybe;
  }
};
var plusMaybe = /* @__PURE__ */ function() {
  return {
    empty: Nothing.value,
    Alt0: function() {
      return altMaybe;
    }
  };
}();
var alternativeMaybe = {
  Applicative0: function() {
    return applicativeMaybe;
  },
  Plus1: function() {
    return plusMaybe;
  }
};

// output/Data.Either/index.js
var Left = /* @__PURE__ */ function() {
  function Left2(value0) {
    this.value0 = value0;
  }
  ;
  Left2.create = function(value0) {
    return new Left2(value0);
  };
  return Left2;
}();
var Right = /* @__PURE__ */ function() {
  function Right2(value0) {
    this.value0 = value0;
  }
  ;
  Right2.create = function(value0) {
    return new Right2(value0);
  };
  return Right2;
}();
var functorEither = {
  map: function(f) {
    return function(m) {
      if (m instanceof Left) {
        return new Left(m.value0);
      }
      ;
      if (m instanceof Right) {
        return new Right(f(m.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
    };
  }
};
var either = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Left) {
        return v(v2.value0);
      }
      ;
      if (v2 instanceof Right) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};

// output/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
var bindE = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};

// output/Control.Monad/index.js
var liftM1 = function(dictMonad) {
  return function(f) {
    return function(a) {
      return bind(dictMonad.Bind1())(a)(function(a$prime) {
        return pure(dictMonad.Applicative0())(f(a$prime));
      });
    };
  };
};
var ap = function(dictMonad) {
  return function(f) {
    return function(a) {
      return bind(dictMonad.Bind1())(f)(function(f$prime) {
        return bind(dictMonad.Bind1())(a)(function(a$prime) {
          return pure(dictMonad.Applicative0())(f$prime(a$prime));
        });
      });
    };
  };
};

// output/Data.Monoid/index.js
var monoidUnit = {
  mempty: unit,
  Semigroup0: function() {
    return semigroupUnit;
  }
};
var monoidString = {
  mempty: "",
  Semigroup0: function() {
    return semigroupString;
  }
};
var monoidRecordNil = {
  memptyRecord: function(v) {
    return {};
  },
  SemigroupRecord0: function() {
    return semigroupRecordNil;
  }
};
var monoidArray = {
  mempty: [],
  Semigroup0: function() {
    return semigroupArray;
  }
};
var memptyRecord = function(dict) {
  return dict.memptyRecord;
};
var monoidRecord = function() {
  return function(dictMonoidRecord) {
    return {
      mempty: memptyRecord(dictMonoidRecord)($$Proxy.value),
      Semigroup0: function() {
        return semigroupRecord()(dictMonoidRecord.SemigroupRecord0());
      }
    };
  };
};
var mempty = function(dict) {
  return dict.mempty;
};
var monoidFn = function(dictMonoid) {
  return {
    mempty: function(v) {
      return mempty(dictMonoid);
    },
    Semigroup0: function() {
      return semigroupFn(dictMonoid.Semigroup0());
    }
  };
};
var monoidRecordCons = function(dictIsSymbol) {
  return function(dictMonoid) {
    return function() {
      return function(dictMonoidRecord) {
        return {
          memptyRecord: function(v) {
            var tail2 = memptyRecord(dictMonoidRecord)($$Proxy.value);
            var key = reflectSymbol(dictIsSymbol)($$Proxy.value);
            var insert4 = unsafeSet(key);
            return insert4(mempty(dictMonoid))(tail2);
          },
          SemigroupRecord0: function() {
            return semigroupRecordCons(dictIsSymbol)()(dictMonoidRecord.SemigroupRecord0())(dictMonoid.Semigroup0());
          }
        };
      };
    };
  };
};

// output/Effect/index.js
var $runtime_lazy = function(name3, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var monadEffect = {
  Applicative0: function() {
    return applicativeEffect;
  },
  Bind1: function() {
    return bindEffect;
  }
};
var bindEffect = {
  bind: bindE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var applicativeEffect = {
  pure: pureE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
  return {
    map: liftA1(applicativeEffect)
  };
});
var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
  return {
    apply: ap(monadEffect),
    Functor0: function() {
      return $lazy_functorEffect(0);
    }
  };
});
var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);
var semigroupEffect = function(dictSemigroup) {
  return {
    append: lift2(applyEffect)(append(dictSemigroup))
  };
};
var monoidEffect = function(dictMonoid) {
  return {
    mempty: pureE(mempty(dictMonoid)),
    Semigroup0: function() {
      return semigroupEffect(dictMonoid.Semigroup0());
    }
  };
};

// output/Control.Monad.Error.Class/index.js
var throwError = function(dict) {
  return dict.throwError;
};

// output/Data.Identity/index.js
var Identity = function(x) {
  return x;
};
var functorIdentity = {
  map: function(f) {
    return function(m) {
      return f(m);
    };
  }
};
var applyIdentity = {
  apply: function(v) {
    return function(v1) {
      return v(v1);
    };
  },
  Functor0: function() {
    return functorIdentity;
  }
};
var bindIdentity = {
  bind: function(v) {
    return function(f) {
      return f(v);
    };
  },
  Apply0: function() {
    return applyIdentity;
  }
};
var applicativeIdentity = {
  pure: Identity,
  Apply0: function() {
    return applyIdentity;
  }
};
var monadIdentity = {
  Applicative0: function() {
    return applicativeIdentity;
  },
  Bind1: function() {
    return bindIdentity;
  }
};

// output/Control.Monad.Rec.Class/index.js
var Loop = /* @__PURE__ */ function() {
  function Loop2(value0) {
    this.value0 = value0;
  }
  ;
  Loop2.create = function(value0) {
    return new Loop2(value0);
  };
  return Loop2;
}();
var Done = /* @__PURE__ */ function() {
  function Done2(value0) {
    this.value0 = value0;
  }
  ;
  Done2.create = function(value0) {
    return new Done2(value0);
  };
  return Done2;
}();
var tailRecM = function(dict) {
  return dict.tailRecM;
};
var bifunctorStep = {
  bimap: function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Loop) {
          return new Loop(v(v2.value0));
        }
        ;
        if (v2 instanceof Done) {
          return new Done(v1(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 29, column 1 - line 31, column 34): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  }
};

// output/Control.Monad.Trans.Class/index.js
var lift = function(dict) {
  return dict.lift;
};

// output/Control.Plus/index.js
var empty = function(dict) {
  return dict.empty;
};

// output/Data.HeytingAlgebra/foreign.js
var boolConj = function(b1) {
  return function(b2) {
    return b1 && b2;
  };
};
var boolDisj = function(b1) {
  return function(b2) {
    return b1 || b2;
  };
};
var boolNot = function(b) {
  return !b;
};

// output/Data.HeytingAlgebra/index.js
var not = function(dict) {
  return dict.not;
};
var ff = function(dict) {
  return dict.ff;
};
var disj = function(dict) {
  return dict.disj;
};
var heytingAlgebraBoolean = {
  ff: false,
  tt: true,
  implies: function(a) {
    return function(b) {
      return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
    };
  },
  conj: boolConj,
  disj: boolDisj,
  not: boolNot
};

// output/Data.Tuple/index.js
var Tuple = /* @__PURE__ */ function() {
  function Tuple2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Tuple2.create = function(value0) {
    return function(value1) {
      return new Tuple2(value0, value1);
    };
  };
  return Tuple2;
}();
var uncurry = function(f) {
  return function(v) {
    return f(v.value0)(v.value1);
  };
};
var snd = function(v) {
  return v.value1;
};
var showTuple = function(dictShow) {
  return function(dictShow1) {
    return {
      show: function(v) {
        return "(Tuple " + (show(dictShow)(v.value0) + (" " + (show(dictShow1)(v.value1) + ")")));
      }
    };
  };
};
var semigroupTuple = function(dictSemigroup) {
  return function(dictSemigroup1) {
    return {
      append: function(v) {
        return function(v1) {
          return new Tuple(append(dictSemigroup)(v.value0)(v1.value0), append(dictSemigroup1)(v.value1)(v1.value1));
        };
      }
    };
  };
};
var monoidTuple = function(dictMonoid) {
  return function(dictMonoid1) {
    return {
      mempty: new Tuple(mempty(dictMonoid), mempty(dictMonoid1)),
      Semigroup0: function() {
        return semigroupTuple(dictMonoid.Semigroup0())(dictMonoid1.Semigroup0());
      }
    };
  };
};
var fst = function(v) {
  return v.value0;
};
var curry = function(f) {
  return function(a) {
    return function(b) {
      return f(new Tuple(a, b));
    };
  };
};

// output/Control.Monad.RWS.Trans/index.js
var RWSResult = /* @__PURE__ */ function() {
  function RWSResult2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  RWSResult2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new RWSResult2(value0, value1, value2);
      };
    };
  };
  return RWSResult2;
}();
var functorRWST = function(dictFunctor) {
  return {
    map: function(f) {
      return function(v) {
        return function(r) {
          return function(s) {
            return map(dictFunctor)(function(v1) {
              return new RWSResult(v1.value0, f(v1.value1), v1.value2);
            })(v(r)(s));
          };
        };
      };
    }
  };
};
var applyRWST = function(dictBind) {
  return function(dictMonoid) {
    return {
      apply: function(v) {
        return function(v1) {
          return function(r) {
            return function(s) {
              return bind(dictBind)(v(r)(s))(function(v2) {
                return mapFlipped(dictBind.Apply0().Functor0())(v1(r)(v2.value0))(function(v3) {
                  return new RWSResult(v3.value0, v2.value1(v3.value1), append(dictMonoid.Semigroup0())(v2.value2)(v3.value2));
                });
              });
            };
          };
        };
      },
      Functor0: function() {
        return functorRWST(dictBind.Apply0().Functor0());
      }
    };
  };
};
var bindRWST = function(dictBind) {
  return function(dictMonoid) {
    return {
      bind: function(v) {
        return function(f) {
          return function(r) {
            return function(s) {
              return bind(dictBind)(v(r)(s))(function(v1) {
                var v2 = f(v1.value1);
                return mapFlipped(dictBind.Apply0().Functor0())(v2(r)(v1.value0))(function(v3) {
                  return new RWSResult(v3.value0, v3.value1, append(dictMonoid.Semigroup0())(v1.value2)(v3.value2));
                });
              });
            };
          };
        };
      },
      Apply0: function() {
        return applyRWST(dictBind)(dictMonoid);
      }
    };
  };
};
var applicativeRWST = function(dictMonad) {
  return function(dictMonoid) {
    return {
      pure: function(a) {
        return function(v) {
          return function(s) {
            return pure(dictMonad.Applicative0())(new RWSResult(s, a, mempty(dictMonoid)));
          };
        };
      },
      Apply0: function() {
        return applyRWST(dictMonad.Bind1())(dictMonoid);
      }
    };
  };
};
var monadRWST = function(dictMonad) {
  return function(dictMonoid) {
    return {
      Applicative0: function() {
        return applicativeRWST(dictMonad)(dictMonoid);
      },
      Bind1: function() {
        return bindRWST(dictMonad.Bind1())(dictMonoid);
      }
    };
  };
};
var monadAskRWST = function(dictMonad) {
  return function(dictMonoid) {
    return {
      ask: function(r) {
        return function(s) {
          return pure(dictMonad.Applicative0())(new RWSResult(s, r, mempty(dictMonoid)));
        };
      },
      Monad0: function() {
        return monadRWST(dictMonad)(dictMonoid);
      }
    };
  };
};
var monadStateRWST = function(dictMonad) {
  return function(dictMonoid) {
    return {
      state: function(f) {
        return function(v) {
          return function(s) {
            var v1 = f(s);
            return pure(dictMonad.Applicative0())(new RWSResult(v1.value1, v1.value0, mempty(dictMonoid)));
          };
        };
      },
      Monad0: function() {
        return monadRWST(dictMonad)(dictMonoid);
      }
    };
  };
};
var monadTellRWST = function(dictMonad) {
  return function(dictMonoid) {
    return {
      tell: function(w) {
        return function(v) {
          return function(s) {
            return pure(dictMonad.Applicative0())(new RWSResult(s, unit, w));
          };
        };
      },
      Semigroup0: dictMonoid.Semigroup0,
      Monad1: function() {
        return monadRWST(dictMonad)(dictMonoid);
      }
    };
  };
};

// output/Control.Monad.Reader.Class/index.js
var ask = function(dict) {
  return dict.ask;
};

// output/Control.Monad.State.Class/index.js
var state = function(dict) {
  return dict.state;
};
var put = function(dictMonadState) {
  return function(s) {
    return state(dictMonadState)(function(v) {
      return new Tuple(unit, s);
    });
  };
};
var modify_ = function(dictMonadState) {
  return function(f) {
    return state(dictMonadState)(function(s) {
      return new Tuple(unit, f(s));
    });
  };
};
var get = function(dictMonadState) {
  return state(dictMonadState)(function(s) {
    return new Tuple(s, s);
  });
};

// output/Control.Monad.Writer.Class/index.js
var tell = function(dict) {
  return dict.tell;
};

// output/Unsafe.Coerce/foreign.js
var unsafeCoerce2 = function(x) {
  return x;
};

// output/Safe.Coerce/index.js
var coerce = function() {
  return unsafeCoerce2;
};

// output/Data.Newtype/index.js
var wrap = coerce;
var unwrap = coerce;
var un = function() {
  return function(v) {
    return unwrap();
  };
};
var over = function() {
  return function() {
    return function(v) {
      return coerce();
    };
  };
};
var alaF = function() {
  return function() {
    return function() {
      return function() {
        return function(v) {
          return coerce();
        };
      };
    };
  };
};
var ala = function() {
  return function() {
    return function() {
      return function(v) {
        return function(f) {
          return coerce()(f(wrap()));
        };
      };
    };
  };
};

// output/Control.Monad.RWS/index.js
var runRWS = function(m) {
  return function(r) {
    return function(s) {
      var v = m(r)(s);
      return v;
    };
  };
};

// output/Data.Foldable/foreign.js
var foldrArray = function(f) {
  return function(init3) {
    return function(xs) {
      var acc = init3;
      var len = xs.length;
      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};
var foldlArray = function(f) {
  return function(init3) {
    return function(xs) {
      var acc = init3;
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};

// output/Data.Bifunctor/index.js
var bimap = function(dict) {
  return dict.bimap;
};

// output/Data.Monoid.Disj/index.js
var Disj = function(x) {
  return x;
};
var semigroupDisj = function(dictHeytingAlgebra) {
  return {
    append: function(v) {
      return function(v1) {
        return disj(dictHeytingAlgebra)(v)(v1);
      };
    }
  };
};
var monoidDisj = function(dictHeytingAlgebra) {
  return {
    mempty: ff(dictHeytingAlgebra),
    Semigroup0: function() {
      return semigroupDisj(dictHeytingAlgebra);
    }
  };
};

// output/Data.Foldable/index.js
var foldr = function(dict) {
  return dict.foldr;
};
var oneOf = function(dictFoldable) {
  return function(dictPlus) {
    return foldr(dictFoldable)(alt(dictPlus.Alt0()))(empty(dictPlus));
  };
};
var traverse_ = function(dictApplicative) {
  return function(dictFoldable) {
    return function(f) {
      return foldr(dictFoldable)(function() {
        var $316 = applySecond(dictApplicative.Apply0());
        return function($317) {
          return $316(f($317));
        };
      }())(pure(dictApplicative)(unit));
    };
  };
};
var for_ = function(dictApplicative) {
  return function(dictFoldable) {
    return flip(traverse_(dictApplicative)(dictFoldable));
  };
};
var foldl = function(dict) {
  return dict.foldl;
};
var intercalate2 = function(dictFoldable) {
  return function(dictMonoid) {
    return function(sep) {
      return function(xs) {
        var go = function(v) {
          return function(x) {
            if (v.init) {
              return {
                init: false,
                acc: x
              };
            }
            ;
            return {
              init: false,
              acc: append(dictMonoid.Semigroup0())(v.acc)(append(dictMonoid.Semigroup0())(sep)(x))
            };
          };
        };
        return foldl(dictFoldable)(go)({
          init: true,
          acc: mempty(dictMonoid)
        })(xs).acc;
      };
    };
  };
};
var foldableMaybe = {
  foldr: function(v) {
    return function(z) {
      return function(v1) {
        if (v1 instanceof Nothing) {
          return z;
        }
        ;
        if (v1 instanceof Just) {
          return v(v1.value0)(z);
        }
        ;
        throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
      };
    };
  },
  foldl: function(v) {
    return function(z) {
      return function(v1) {
        if (v1 instanceof Nothing) {
          return z;
        }
        ;
        if (v1 instanceof Just) {
          return v(z)(v1.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
      };
    };
  },
  foldMap: function(dictMonoid) {
    return function(v) {
      return function(v1) {
        if (v1 instanceof Nothing) {
          return mempty(dictMonoid);
        }
        ;
        if (v1 instanceof Just) {
          return v(v1.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  }
};
var foldMapDefaultR = function(dictFoldable) {
  return function(dictMonoid) {
    return function(f) {
      return foldr(dictFoldable)(function(x) {
        return function(acc) {
          return append(dictMonoid.Semigroup0())(f(x))(acc);
        };
      })(mempty(dictMonoid));
    };
  };
};
var foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: function(dictMonoid) {
    return foldMapDefaultR(foldableArray)(dictMonoid);
  }
};
var foldMap = function(dict) {
  return dict.foldMap;
};
var fold = function(dictFoldable) {
  return function(dictMonoid) {
    return foldMap(dictFoldable)(dictMonoid)(identity(categoryFn));
  };
};
var any = function(dictFoldable) {
  return function(dictHeytingAlgebra) {
    return alaF()()()()(Disj)(foldMap(dictFoldable)(monoidDisj(dictHeytingAlgebra)));
  };
};
var elem = function(dictFoldable) {
  return function(dictEq) {
    var $326 = any(dictFoldable)(heytingAlgebraBoolean);
    var $327 = eq(dictEq);
    return function($328) {
      return $326($327($328));
    };
  };
};

// output/Data.GameEnvironment/index.js
var gameEnvironment = function(playerName) {
  return function(debugMode) {
    return {
      playerName,
      debugMode
    };
  };
};

// output/Data.Coords/index.js
var showCoords = {
  show: function(v) {
    return "Coords " + ("{ x: " + (show(showInt)(v.x) + (", y: " + (show(showInt)(v.y) + " }"))));
  }
};
var prettyPrintCoords = function(v) {
  return "(" + (show(showInt)(v.x) + (", " + (show(showInt)(v.y) + ")")));
};
var eqCoords = {
  eq: function(x) {
    return function(y) {
      return x.x === y.x && x.y === y.y;
    };
  }
};
var ordCoords = {
  compare: function(x) {
    return function(y) {
      var v = compare(ordInt)(x.x)(y.x);
      if (v instanceof LT) {
        return LT.value;
      }
      ;
      if (v instanceof GT) {
        return GT.value;
      }
      ;
      return compare(ordInt)(x.y)(y.y);
    };
  },
  Eq0: function() {
    return eqCoords;
  }
};
var coords = function(x) {
  return function(y) {
    return {
      x,
      y
    };
  };
};

// output/Data.GameItem/index.js
var Candle = /* @__PURE__ */ function() {
  function Candle2() {
  }
  ;
  Candle2.value = new Candle2();
  return Candle2;
}();
var Matches = /* @__PURE__ */ function() {
  function Matches2() {
  }
  ;
  Matches2.value = new Matches2();
  return Matches2;
}();
var showGameItem = {
  show: function(v) {
    if (v instanceof Candle) {
      return "Candle";
    }
    ;
    if (v instanceof Matches) {
      return "Matches";
    }
    ;
    throw new Error("Failed pattern match at Data.GameItem (line 11, column 1 - line 13, column 34): " + [v.constructor.name]);
  }
};
var readItem = function(v) {
  if (v === "Candle") {
    return new Just(Candle.value);
  }
  ;
  if (v === "Matches") {
    return new Just(Matches.value);
  }
  ;
  return Nothing.value;
};
var eqGameItem = {
  eq: function(x) {
    return function(y) {
      if (x instanceof Candle && y instanceof Candle) {
        return true;
      }
      ;
      if (x instanceof Matches && y instanceof Matches) {
        return true;
      }
      ;
      return false;
    };
  }
};
var ordGameItem = {
  compare: function(x) {
    return function(y) {
      if (x instanceof Candle && y instanceof Candle) {
        return EQ.value;
      }
      ;
      if (x instanceof Candle) {
        return LT.value;
      }
      ;
      if (y instanceof Candle) {
        return GT.value;
      }
      ;
      if (x instanceof Matches && y instanceof Matches) {
        return EQ.value;
      }
      ;
      throw new Error("Failed pattern match at Data.GameItem (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
    };
  },
  Eq0: function() {
    return eqGameItem;
  }
};

// output/Data.FoldableWithIndex/index.js
var foldrWithIndex = function(dict) {
  return dict.foldrWithIndex;
};
var foldlWithIndex = function(dict) {
  return dict.foldlWithIndex;
};
var foldMapWithIndex = function(dict) {
  return dict.foldMapWithIndex;
};

// output/Data.Ord.Min/index.js
var Min = function(x) {
  return x;
};
var semigroupMin = function(dictOrd) {
  return {
    append: function(v) {
      return function(v1) {
        return min(dictOrd)(v)(v1);
      };
    }
  };
};

// output/Data.Semigroup.Foldable/index.js
var foldMap1 = function(dict) {
  return dict.foldMap1;
};
var minimum = function(dictOrd) {
  return function(dictFoldable1) {
    return ala()()()(Min)(foldMap1(dictFoldable1)(semigroupMin(dictOrd)));
  };
};

// output/Data.Traversable/foreign.js
var traverseArrayImpl = function() {
  function array1(a) {
    return [a];
  }
  function array2(a) {
    return function(b) {
      return [a, b];
    };
  }
  function array3(a) {
    return function(b) {
      return function(c) {
        return [a, b, c];
      };
    };
  }
  function concat22(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }
  return function(apply2) {
    return function(map2) {
      return function(pure2) {
        return function(f) {
          return function(array) {
            function go(bot, top2) {
              switch (top2 - bot) {
                case 0:
                  return pure2([]);
                case 1:
                  return map2(array1)(f(array[bot]));
                case 2:
                  return apply2(map2(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply2(apply2(map2(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                  return apply2(map2(concat22)(go(bot, pivot)))(go(pivot, top2));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();

// output/Data.Traversable/index.js
var traverse = function(dict) {
  return dict.traverse;
};
var sequenceDefault = function(dictTraversable) {
  return function(dictApplicative) {
    return traverse(dictTraversable)(dictApplicative)(identity(categoryFn));
  };
};
var traversableArray = {
  traverse: function(dictApplicative) {
    return traverseArrayImpl(apply(dictApplicative.Apply0()))(map(dictApplicative.Apply0().Functor0()))(pure(dictApplicative));
  },
  sequence: function(dictApplicative) {
    return sequenceDefault(traversableArray)(dictApplicative);
  },
  Functor0: function() {
    return functorArray;
  },
  Foldable1: function() {
    return foldableArray;
  }
};
var sequence = function(dict) {
  return dict.sequence;
};

// output/Data.Unfoldable/foreign.js
var unfoldrArrayImpl = function(isNothing2) {
  return function(fromJust2) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value2 = b;
            while (true) {
              var maybe2 = f(value2);
              if (isNothing2(maybe2))
                return result;
              var tuple = fromJust2(maybe2);
              result.push(fst2(tuple));
              value2 = snd2(tuple);
            }
          };
        };
      };
    };
  };
};

// output/Data.Unfoldable1/foreign.js
var unfoldr1ArrayImpl = function(isNothing2) {
  return function(fromJust2) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value2 = b;
            while (true) {
              var tuple = f(value2);
              result.push(fst2(tuple));
              var maybe2 = snd2(tuple);
              if (isNothing2(maybe2))
                return result;
              value2 = fromJust2(maybe2);
            }
          };
        };
      };
    };
  };
};

// output/Data.Unfoldable1/index.js
var unfoldable1Array = {
  unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(/* @__PURE__ */ fromJust())(fst)(snd)
};

// output/Data.Unfoldable/index.js
var unfoldr = function(dict) {
  return dict.unfoldr;
};
var unfoldableArray = {
  unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(/* @__PURE__ */ fromJust())(fst)(snd),
  Unfoldable10: function() {
    return unfoldable1Array;
  }
};

// output/Data.NonEmpty/index.js
var NonEmpty = /* @__PURE__ */ function() {
  function NonEmpty2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  NonEmpty2.create = function(value0) {
    return function(value1) {
      return new NonEmpty2(value0, value1);
    };
  };
  return NonEmpty2;
}();
var foldableNonEmpty = function(dictFoldable) {
  return {
    foldMap: function(dictMonoid) {
      return function(f) {
        return function(v) {
          return append(dictMonoid.Semigroup0())(f(v.value0))(foldMap(dictFoldable)(dictMonoid)(f)(v.value1));
        };
      };
    },
    foldl: function(f) {
      return function(b) {
        return function(v) {
          return foldl(dictFoldable)(f)(f(b)(v.value0))(v.value1);
        };
      };
    },
    foldr: function(f) {
      return function(b) {
        return function(v) {
          return f(v.value0)(foldr(dictFoldable)(f)(b)(v.value1));
        };
      };
    }
  };
};
var foldable1NonEmpty = function(dictFoldable) {
  return {
    foldMap1: function(dictSemigroup) {
      return function(f) {
        return function(v) {
          return foldl(dictFoldable)(function(s) {
            return function(a1) {
              return append(dictSemigroup)(s)(f(a1));
            };
          })(f(v.value0))(v.value1);
        };
      };
    },
    foldr1: function(f) {
      return function(v) {
        return maybe(v.value0)(f(v.value0))(foldr(dictFoldable)(function(a1) {
          var $164 = maybe(a1)(f(a1));
          return function($165) {
            return Just.create($164($165));
          };
        })(Nothing.value)(v.value1));
      };
    },
    foldl1: function(f) {
      return function(v) {
        return foldl(dictFoldable)(f)(v.value0)(v.value1);
      };
    },
    Foldable0: function() {
      return foldableNonEmpty(dictFoldable);
    }
  };
};

// output/Data.List.Types/index.js
var Nil = /* @__PURE__ */ function() {
  function Nil4() {
  }
  ;
  Nil4.value = new Nil4();
  return Nil4;
}();
var Cons = /* @__PURE__ */ function() {
  function Cons4(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Cons4.create = function(value0) {
    return function(value1) {
      return new Cons4(value0, value1);
    };
  };
  return Cons4;
}();
var listMap = function(f) {
  var chunkedRevMap = function($copy_chunksAcc) {
    return function($copy_v) {
      var $tco_var_chunksAcc = $copy_chunksAcc;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(chunksAcc, v) {
        if (v instanceof Cons && (v.value1 instanceof Cons && v.value1.value1 instanceof Cons)) {
          $tco_var_chunksAcc = new Cons(v, chunksAcc);
          $copy_v = v.value1.value1.value1;
          return;
        }
        ;
        var unrolledMap = function(v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Nil)) {
            return new Cons(f(v1.value0), new Cons(f(v1.value1.value0), Nil.value));
          }
          ;
          if (v1 instanceof Cons && v1.value1 instanceof Nil) {
            return new Cons(f(v1.value0), Nil.value);
          }
          ;
          return Nil.value;
        };
        var reverseUnrolledMap = function($copy_v1) {
          return function($copy_acc) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done1 = false;
            var $tco_result2;
            function $tco_loop2(v1, acc) {
              if (v1 instanceof Cons && (v1.value0 instanceof Cons && (v1.value0.value1 instanceof Cons && v1.value0.value1.value1 instanceof Cons))) {
                $tco_var_v1 = v1.value1;
                $copy_acc = new Cons(f(v1.value0.value0), new Cons(f(v1.value0.value1.value0), new Cons(f(v1.value0.value1.value1.value0), acc)));
                return;
              }
              ;
              $tco_done1 = true;
              return acc;
            }
            ;
            while (!$tco_done1) {
              $tco_result2 = $tco_loop2($tco_var_v1, $copy_acc);
            }
            ;
            return $tco_result2;
          };
        };
        $tco_done = true;
        return reverseUnrolledMap(chunksAcc)(unrolledMap(v));
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_chunksAcc, $copy_v);
      }
      ;
      return $tco_result;
    };
  };
  return chunkedRevMap(Nil.value);
};
var functorList = {
  map: listMap
};
var foldableList = {
  foldr: function(f) {
    return function(b) {
      var rev = function() {
        var go = function($copy_acc) {
          return function($copy_v) {
            var $tco_var_acc = $copy_acc;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(acc, v) {
              if (v instanceof Nil) {
                $tco_done = true;
                return acc;
              }
              ;
              if (v instanceof Cons) {
                $tco_var_acc = new Cons(v.value0, acc);
                $copy_v = v.value1;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [acc.constructor.name, v.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_acc, $copy_v);
            }
            ;
            return $tco_result;
          };
        };
        return go(Nil.value);
      }();
      var $205 = foldl(foldableList)(flip(f))(b);
      return function($206) {
        return $205(rev($206));
      };
    };
  },
  foldl: function(f) {
    var go = function($copy_b) {
      return function($copy_v) {
        var $tco_var_b = $copy_b;
        var $tco_done1 = false;
        var $tco_result;
        function $tco_loop(b, v) {
          if (v instanceof Nil) {
            $tco_done1 = true;
            return b;
          }
          ;
          if (v instanceof Cons) {
            $tco_var_b = f(b)(v.value0);
            $copy_v = v.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done1) {
          $tco_result = $tco_loop($tco_var_b, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go;
  },
  foldMap: function(dictMonoid) {
    return function(f) {
      return foldl(foldableList)(function(acc) {
        var $207 = append(dictMonoid.Semigroup0())(acc);
        return function($208) {
          return $207(f($208));
        };
      })(mempty(dictMonoid));
    };
  }
};
var semigroupList = {
  append: function(xs) {
    return function(ys) {
      return foldr(foldableList)(Cons.create)(ys)(xs);
    };
  }
};
var monoidList = /* @__PURE__ */ function() {
  return {
    mempty: Nil.value,
    Semigroup0: function() {
      return semigroupList;
    }
  };
}();
var unfoldable1List = {
  unfoldr1: function(f) {
    return function(b) {
      var go = function($copy_source) {
        return function($copy_memo) {
          var $tco_var_source = $copy_source;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(source2, memo) {
            var v = f(source2);
            if (v.value1 instanceof Just) {
              $tco_var_source = v.value1.value0;
              $copy_memo = new Cons(v.value0, memo);
              return;
            }
            ;
            if (v.value1 instanceof Nothing) {
              $tco_done = true;
              return foldl(foldableList)(flip(Cons.create))(Nil.value)(new Cons(v.value0, memo));
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 135, column 22 - line 137, column 61): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_source, $copy_memo);
          }
          ;
          return $tco_result;
        };
      };
      return go(b)(Nil.value);
    };
  }
};
var unfoldableList = {
  unfoldr: function(f) {
    return function(b) {
      var go = function($copy_source) {
        return function($copy_memo) {
          var $tco_var_source = $copy_source;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(source2, memo) {
            var v = f(source2);
            if (v instanceof Nothing) {
              $tco_done = true;
              return foldl(foldableList)(flip(Cons.create))(Nil.value)(memo);
            }
            ;
            if (v instanceof Just) {
              $tco_var_source = v.value0.value1;
              $copy_memo = new Cons(v.value0.value0, memo);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 142, column 22 - line 144, column 52): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_source, $copy_memo);
          }
          ;
          return $tco_result;
        };
      };
      return go(b)(Nil.value);
    };
  },
  Unfoldable10: function() {
    return unfoldable1List;
  }
};

// output/Data.List/index.js
var uncons = function(v) {
  if (v instanceof Nil) {
    return Nothing.value;
  }
  ;
  if (v instanceof Cons) {
    return new Just({
      head: v.value0,
      tail: v.value1
    });
  }
  ;
  throw new Error("Failed pattern match at Data.List (line 259, column 1 - line 259, column 66): " + [v.constructor.name]);
};
var toUnfoldable = function(dictUnfoldable) {
  return unfoldr(dictUnfoldable)(function(xs) {
    return map(functorMaybe)(function(rec) {
      return new Tuple(rec.head, rec.tail);
    })(uncons(xs));
  });
};
var span = function(v) {
  return function(v1) {
    if (v1 instanceof Cons && v(v1.value0)) {
      var v2 = span(v)(v1.value1);
      return {
        init: new Cons(v1.value0, v2.init),
        rest: v2.rest
      };
    }
    ;
    return {
      init: Nil.value,
      rest: v1
    };
  };
};
var singleton3 = function(a) {
  return new Cons(a, Nil.value);
};
var reverse = /* @__PURE__ */ function() {
  var go = function($copy_acc) {
    return function($copy_v) {
      var $tco_var_acc = $copy_acc;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(acc, v) {
        if (v instanceof Nil) {
          $tco_done = true;
          return acc;
        }
        ;
        if (v instanceof Cons) {
          $tco_var_acc = new Cons(v.value0, acc);
          $copy_v = v.value1;
          return;
        }
        ;
        throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [acc.constructor.name, v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_acc, $copy_v);
      }
      ;
      return $tco_result;
    };
  };
  return go(Nil.value);
}();
var $$null = function(v) {
  if (v instanceof Nil) {
    return true;
  }
  ;
  return false;
};
var fromFoldable = function(dictFoldable) {
  return foldr(dictFoldable)(Cons.create)(Nil.value);
};

// output/Data.Lazy/foreign.js
var defer2 = function(thunk) {
  var v = null;
  return function() {
    if (thunk === void 0)
      return v;
    v = thunk();
    thunk = void 0;
    return v;
  };
};
var force = function(l) {
  return l();
};

// output/Data.Lazy/index.js
var functorLazy = {
  map: function(f) {
    return function(l) {
      return defer2(function(v) {
        return f(force(l));
      });
    };
  }
};
var applyLazy = {
  apply: function(f) {
    return function(x) {
      return defer2(function(v) {
        return force(f)(force(x));
      });
    };
  },
  Functor0: function() {
    return functorLazy;
  }
};
var bindLazy = {
  bind: function(l) {
    return function(f) {
      return defer2(function(v) {
        return force(f(force(l)));
      });
    };
  },
  Apply0: function() {
    return applyLazy;
  }
};

// output/Partial.Unsafe/foreign.js
var _unsafePartial = function(f) {
  return f();
};

// output/Partial/foreign.js
var _crashWith = function(msg) {
  throw new Error(msg);
};

// output/Partial/index.js
var crashWith = function() {
  return _crashWith;
};

// output/Partial.Unsafe/index.js
var unsafePartial = _unsafePartial;
var unsafeCrashWith = function(msg) {
  return unsafePartial(function() {
    return crashWith()(msg);
  });
};

// output/Data.Map.Internal/index.js
var Leaf = /* @__PURE__ */ function() {
  function Leaf3() {
  }
  ;
  Leaf3.value = new Leaf3();
  return Leaf3;
}();
var Two = /* @__PURE__ */ function() {
  function Two2(value0, value1, value2, value3) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }
  ;
  Two2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return new Two2(value0, value1, value2, value3);
        };
      };
    };
  };
  return Two2;
}();
var Three = /* @__PURE__ */ function() {
  function Three2(value0, value1, value2, value3, value4, value5, value6) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }
  ;
  Three2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return function(value4) {
            return function(value5) {
              return function(value6) {
                return new Three2(value0, value1, value2, value3, value4, value5, value6);
              };
            };
          };
        };
      };
    };
  };
  return Three2;
}();
var TwoLeft = /* @__PURE__ */ function() {
  function TwoLeft2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  TwoLeft2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new TwoLeft2(value0, value1, value2);
      };
    };
  };
  return TwoLeft2;
}();
var TwoRight = /* @__PURE__ */ function() {
  function TwoRight2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  TwoRight2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new TwoRight2(value0, value1, value2);
      };
    };
  };
  return TwoRight2;
}();
var ThreeLeft = /* @__PURE__ */ function() {
  function ThreeLeft2(value0, value1, value2, value3, value4, value5) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }
  ;
  ThreeLeft2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return function(value4) {
            return function(value5) {
              return new ThreeLeft2(value0, value1, value2, value3, value4, value5);
            };
          };
        };
      };
    };
  };
  return ThreeLeft2;
}();
var ThreeMiddle = /* @__PURE__ */ function() {
  function ThreeMiddle2(value0, value1, value2, value3, value4, value5) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }
  ;
  ThreeMiddle2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return function(value4) {
            return function(value5) {
              return new ThreeMiddle2(value0, value1, value2, value3, value4, value5);
            };
          };
        };
      };
    };
  };
  return ThreeMiddle2;
}();
var ThreeRight = /* @__PURE__ */ function() {
  function ThreeRight2(value0, value1, value2, value3, value4, value5) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }
  ;
  ThreeRight2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return function(value4) {
            return function(value5) {
              return new ThreeRight2(value0, value1, value2, value3, value4, value5);
            };
          };
        };
      };
    };
  };
  return ThreeRight2;
}();
var KickUp = /* @__PURE__ */ function() {
  function KickUp2(value0, value1, value2, value3) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }
  ;
  KickUp2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return new KickUp2(value0, value1, value2, value3);
        };
      };
    };
  };
  return KickUp2;
}();
var singleton4 = function(k) {
  return function(v) {
    return new Two(Leaf.value, k, v, Leaf.value);
  };
};
var toUnfoldable2 = function(dictUnfoldable) {
  return function(m) {
    var go = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Nil) {
          $tco_done = true;
          return Nothing.value;
        }
        ;
        if (v instanceof Cons) {
          if (v.value0 instanceof Leaf) {
            $copy_v = v.value1;
            return;
          }
          ;
          if (v.value0 instanceof Two && (v.value0.value0 instanceof Leaf && v.value0.value3 instanceof Leaf)) {
            $tco_done = true;
            return new Just(new Tuple(new Tuple(v.value0.value1, v.value0.value2), v.value1));
          }
          ;
          if (v.value0 instanceof Two && v.value0.value0 instanceof Leaf) {
            $tco_done = true;
            return new Just(new Tuple(new Tuple(v.value0.value1, v.value0.value2), new Cons(v.value0.value3, v.value1)));
          }
          ;
          if (v.value0 instanceof Two) {
            $copy_v = new Cons(v.value0.value0, new Cons(singleton4(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, v.value1)));
            return;
          }
          ;
          if (v.value0 instanceof Three) {
            $copy_v = new Cons(v.value0.value0, new Cons(singleton4(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, new Cons(singleton4(v.value0.value4)(v.value0.value5), new Cons(v.value0.value6, v.value1)))));
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 624, column 18 - line 633, column 71): " + [v.value0.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 623, column 3 - line 623, column 19): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return unfoldr(dictUnfoldable)(go)(new Cons(m, Nil.value));
  };
};
var toAscArray = /* @__PURE__ */ toUnfoldable2(unfoldableArray);
var showMap = function(dictShow) {
  return function(dictShow1) {
    return {
      show: function(m) {
        return "(fromFoldable " + (show(showArray(showTuple(dictShow)(dictShow1)))(toAscArray(m)) + ")");
      }
    };
  };
};
var lookup = function(dictOrd) {
  return function(k) {
    var comp = compare(dictOrd);
    var go = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Leaf) {
          $tco_done = true;
          return Nothing.value;
        }
        ;
        if (v instanceof Two) {
          var v2 = comp(k)(v.value1);
          if (v2 instanceof EQ) {
            $tco_done = true;
            return new Just(v.value2);
          }
          ;
          if (v2 instanceof LT) {
            $copy_v = v.value0;
            return;
          }
          ;
          $copy_v = v.value3;
          return;
        }
        ;
        if (v instanceof Three) {
          var v3 = comp(k)(v.value1);
          if (v3 instanceof EQ) {
            $tco_done = true;
            return new Just(v.value2);
          }
          ;
          var v4 = comp(k)(v.value4);
          if (v4 instanceof EQ) {
            $tco_done = true;
            return new Just(v.value5);
          }
          ;
          if (v3 instanceof LT) {
            $copy_v = v.value0;
            return;
          }
          ;
          if (v4 instanceof GT) {
            $copy_v = v.value6;
            return;
          }
          ;
          $copy_v = v.value3;
          return;
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return go;
  };
};
var member = function(dictOrd) {
  return function(k) {
    return function(m) {
      return isJust(lookup(dictOrd)(k)(m));
    };
  };
};
var fromZipper = function($copy_dictOrd) {
  return function($copy_v) {
    return function($copy_tree) {
      var $tco_var_dictOrd = $copy_dictOrd;
      var $tco_var_v = $copy_v;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(dictOrd, v, tree) {
        if (v instanceof Nil) {
          $tco_done = true;
          return tree;
        }
        ;
        if (v instanceof Cons) {
          if (v.value0 instanceof TwoLeft) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_tree = new Two(tree, v.value0.value0, v.value0.value1, v.value0.value2);
            return;
          }
          ;
          if (v.value0 instanceof TwoRight) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_tree = new Two(v.value0.value0, v.value0.value1, v.value0.value2, tree);
            return;
          }
          ;
          if (v.value0 instanceof ThreeLeft) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_tree = new Three(tree, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
            return;
          }
          ;
          if (v.value0 instanceof ThreeMiddle) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, tree, v.value0.value3, v.value0.value4, v.value0.value5);
            return;
          }
          ;
          if (v.value0 instanceof ThreeRight) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, tree);
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, tree.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_tree);
      }
      ;
      return $tco_result;
    };
  };
};
var insert = function(dictOrd) {
  return function(k) {
    return function(v) {
      var up = function($copy_v1) {
        return function($copy_v2) {
          var $tco_var_v1 = $copy_v1;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v1, v2) {
            if (v1 instanceof Nil) {
              $tco_done = true;
              return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
            }
            ;
            if (v1 instanceof Cons) {
              if (v1.value0 instanceof TwoLeft) {
                $tco_done = true;
                return fromZipper(dictOrd)(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
              }
              ;
              if (v1.value0 instanceof TwoRight) {
                $tco_done = true;
                return fromZipper(dictOrd)(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
              }
              ;
              if (v1.value0 instanceof ThreeLeft) {
                $tco_var_v1 = v1.value1;
                $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                return;
              }
              ;
              if (v1.value0 instanceof ThreeMiddle) {
                $tco_var_v1 = v1.value1;
                $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                return;
              }
              ;
              if (v1.value0 instanceof ThreeRight) {
                $tco_var_v1 = v1.value1;
                $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v2.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_v1, $copy_v2);
          }
          ;
          return $tco_result;
        };
      };
      var comp = compare(dictOrd);
      var down = function($copy_ctx) {
        return function($copy_v1) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(ctx, v1) {
            if (v1 instanceof Leaf) {
              $tco_done1 = true;
              return up(ctx)(new KickUp(Leaf.value, k, v, Leaf.value));
            }
            ;
            if (v1 instanceof Two) {
              var v2 = comp(k)(v1.value1);
              if (v2 instanceof EQ) {
                $tco_done1 = true;
                return fromZipper(dictOrd)(ctx)(new Two(v1.value0, k, v, v1.value3));
              }
              ;
              if (v2 instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(v1.value1, v1.value2, v1.value3), ctx);
                $copy_v1 = v1.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(v1.value0, v1.value1, v1.value2), ctx);
              $copy_v1 = v1.value3;
              return;
            }
            ;
            if (v1 instanceof Three) {
              var v3 = comp(k)(v1.value1);
              if (v3 instanceof EQ) {
                $tco_done1 = true;
                return fromZipper(dictOrd)(ctx)(new Three(v1.value0, k, v, v1.value3, v1.value4, v1.value5, v1.value6));
              }
              ;
              var v4 = comp(k)(v1.value4);
              if (v4 instanceof EQ) {
                $tco_done1 = true;
                return fromZipper(dictOrd)(ctx)(new Three(v1.value0, v1.value1, v1.value2, v1.value3, k, v, v1.value6));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(v1.value1, v1.value2, v1.value3, v1.value4, v1.value5, v1.value6), ctx);
                $copy_v1 = v1.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v4 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(v1.value0, v1.value1, v1.value2, v1.value4, v1.value5, v1.value6), ctx);
                $copy_v1 = v1.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(v1.value0, v1.value1, v1.value2, v1.value3, v1.value4, v1.value5), ctx);
              $copy_v1 = v1.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [ctx.constructor.name, v1.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_v1);
          }
          ;
          return $tco_result;
        };
      };
      return down(Nil.value);
    };
  };
};
var pop = function(dictOrd) {
  return function(k) {
    var up = function($copy_ctxs) {
      return function($copy_tree) {
        var $tco_var_ctxs = $copy_ctxs;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(ctxs, tree) {
          if (ctxs instanceof Nil) {
            $tco_done = true;
            return tree;
          }
          ;
          if (ctxs instanceof Cons) {
            if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
            }
            ;
            if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
            }
            ;
            if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
              $tco_var_ctxs = ctxs.value1;
              $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
              return;
            }
            ;
            if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
              $tco_var_ctxs = ctxs.value1;
              $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
              return;
            }
            ;
            if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
            }
            ;
            if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
            }
            ;
            if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
            }
            ;
            if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
            }
            ;
            if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
            }
            ;
            if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
            }
            ;
            if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
            }
            ;
            if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
            }
            ;
            if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
            }
            ;
            if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
            }
            ;
            if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
            }
            ;
            if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
            }
            ;
            if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
              $tco_done = true;
              return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
            }
            ;
            $tco_done = true;
            return unsafeCrashWith("The impossible happened in partial function `up`.");
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 552, column 5 - line 573, column 86): " + [ctxs.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
        }
        ;
        return $tco_result;
      };
    };
    var removeMaxNode = function($copy_ctx) {
      return function($copy_m) {
        var $tco_var_ctx = $copy_ctx;
        var $tco_done1 = false;
        var $tco_result;
        function $tco_loop(ctx, m) {
          if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
            $tco_done1 = true;
            return up(ctx)(Leaf.value);
          }
          ;
          if (m instanceof Two) {
            $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
            $copy_m = m.value3;
            return;
          }
          ;
          if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
            $tco_done1 = true;
            return up(new Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
          }
          ;
          if (m instanceof Three) {
            $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
            $copy_m = m.value6;
            return;
          }
          ;
          $tco_done1 = true;
          return unsafeCrashWith("The impossible happened in partial function `removeMaxNode`.");
        }
        ;
        while (!$tco_done1) {
          $tco_result = $tco_loop($tco_var_ctx, $copy_m);
        }
        ;
        return $tco_result;
      };
    };
    var maxNode = function($copy_m) {
      var $tco_done2 = false;
      var $tco_result;
      function $tco_loop(m) {
        if (m instanceof Two && m.value3 instanceof Leaf) {
          $tco_done2 = true;
          return {
            key: m.value1,
            value: m.value2
          };
        }
        ;
        if (m instanceof Two) {
          $copy_m = m.value3;
          return;
        }
        ;
        if (m instanceof Three && m.value6 instanceof Leaf) {
          $tco_done2 = true;
          return {
            key: m.value4,
            value: m.value5
          };
        }
        ;
        if (m instanceof Three) {
          $copy_m = m.value6;
          return;
        }
        ;
        $tco_done2 = true;
        return unsafeCrashWith("The impossible happened in partial function `maxNode`.");
      }
      ;
      while (!$tco_done2) {
        $tco_result = $tco_loop($copy_m);
      }
      ;
      return $tco_result;
    };
    var comp = compare(dictOrd);
    var down = function($copy_ctx) {
      return function($copy_m) {
        var $tco_var_ctx = $copy_ctx;
        var $tco_done3 = false;
        var $tco_result;
        function $tco_loop(ctx, m) {
          if (m instanceof Leaf) {
            $tco_done3 = true;
            return Nothing.value;
          }
          ;
          if (m instanceof Two) {
            var v = comp(k)(m.value1);
            if (m.value3 instanceof Leaf && v instanceof EQ) {
              $tco_done3 = true;
              return new Just(new Tuple(m.value2, up(ctx)(Leaf.value)));
            }
            ;
            if (v instanceof EQ) {
              var max3 = maxNode(m.value0);
              $tco_done3 = true;
              return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new TwoLeft(max3.key, max3.value, m.value3), ctx))(m.value0)));
            }
            ;
            if (v instanceof LT) {
              $tco_var_ctx = new Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
              $copy_m = m.value0;
              return;
            }
            ;
            $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
            $copy_m = m.value3;
            return;
          }
          ;
          if (m instanceof Three) {
            var leaves = function() {
              if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                return true;
              }
              ;
              return false;
            }();
            var v = comp(k)(m.value4);
            var v3 = comp(k)(m.value1);
            if (leaves && v3 instanceof EQ) {
              $tco_done3 = true;
              return new Just(new Tuple(m.value2, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
            }
            ;
            if (leaves && v instanceof EQ) {
              $tco_done3 = true;
              return new Just(new Tuple(m.value5, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
            }
            ;
            if (v3 instanceof EQ) {
              var max3 = maxNode(m.value0);
              $tco_done3 = true;
              return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new ThreeLeft(max3.key, max3.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
            }
            ;
            if (v instanceof EQ) {
              var max3 = maxNode(m.value3);
              $tco_done3 = true;
              return new Just(new Tuple(m.value5, removeMaxNode(new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max3.key, max3.value, m.value6), ctx))(m.value3)));
            }
            ;
            if (v3 instanceof LT) {
              $tco_var_ctx = new Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
              $copy_m = m.value0;
              return;
            }
            ;
            if (v3 instanceof GT && v instanceof LT) {
              $tco_var_ctx = new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
            $copy_m = m.value6;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m.constructor.name]);
        }
        ;
        while (!$tco_done3) {
          $tco_result = $tco_loop($tco_var_ctx, $copy_m);
        }
        ;
        return $tco_result;
      };
    };
    return down(Nil.value);
  };
};
var foldableMap = {
  foldr: function(f) {
    return function(z) {
      return function(m) {
        if (m instanceof Leaf) {
          return z;
        }
        ;
        if (m instanceof Two) {
          return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(z)(m.value3)))(m.value0);
        }
        ;
        if (m instanceof Three) {
          return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(f(m.value5)(foldr(foldableMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m.constructor.name]);
      };
    };
  },
  foldl: function(f) {
    return function(z) {
      return function(m) {
        if (m instanceof Leaf) {
          return z;
        }
        ;
        if (m instanceof Two) {
          return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3);
        }
        ;
        if (m instanceof Three) {
          return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m.constructor.name]);
      };
    };
  },
  foldMap: function(dictMonoid) {
    return function(f) {
      return function(m) {
        if (m instanceof Leaf) {
          return mempty(dictMonoid);
        }
        ;
        if (m instanceof Two) {
          return append(dictMonoid.Semigroup0())(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append(dictMonoid.Semigroup0())(f(m.value2))(foldMap(foldableMap)(dictMonoid)(f)(m.value3)));
        }
        ;
        if (m instanceof Three) {
          return append(dictMonoid.Semigroup0())(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append(dictMonoid.Semigroup0())(f(m.value2))(append(dictMonoid.Semigroup0())(foldMap(foldableMap)(dictMonoid)(f)(m.value3))(append(dictMonoid.Semigroup0())(f(m.value5))(foldMap(foldableMap)(dictMonoid)(f)(m.value6)))));
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m.constructor.name]);
      };
    };
  }
};
var foldableWithIndexMap = {
  foldrWithIndex: function(f) {
    return function(z) {
      return function(m) {
        if (m instanceof Leaf) {
          return z;
        }
        ;
        if (m instanceof Two) {
          return foldrWithIndex(foldableWithIndexMap)(f)(f(m.value1)(m.value2)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m.value3)))(m.value0);
        }
        ;
        if (m instanceof Three) {
          return foldrWithIndex(foldableWithIndexMap)(f)(f(m.value1)(m.value2)(foldrWithIndex(foldableWithIndexMap)(f)(f(m.value4)(m.value5)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 147, column 26 - line 150, column 120): " + [m.constructor.name]);
      };
    };
  },
  foldlWithIndex: function(f) {
    return function(z) {
      return function(m) {
        if (m instanceof Leaf) {
          return z;
        }
        ;
        if (m instanceof Two) {
          return foldlWithIndex(foldableWithIndexMap)(f)(f(m.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m.value0))(m.value2))(m.value3);
        }
        ;
        if (m instanceof Three) {
          return foldlWithIndex(foldableWithIndexMap)(f)(f(m.value4)(foldlWithIndex(foldableWithIndexMap)(f)(f(m.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 151, column 26 - line 154, column 120): " + [m.constructor.name]);
      };
    };
  },
  foldMapWithIndex: function(dictMonoid) {
    return function(f) {
      return function(m) {
        if (m instanceof Leaf) {
          return mempty(dictMonoid);
        }
        ;
        if (m instanceof Two) {
          return append(dictMonoid.Semigroup0())(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value0))(append(dictMonoid.Semigroup0())(f(m.value1)(m.value2))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value3)));
        }
        ;
        if (m instanceof Three) {
          return append(dictMonoid.Semigroup0())(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value0))(append(dictMonoid.Semigroup0())(f(m.value1)(m.value2))(append(dictMonoid.Semigroup0())(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value3))(append(dictMonoid.Semigroup0())(f(m.value4)(m.value5))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value6)))));
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 155, column 26 - line 158, column 128): " + [m.constructor.name]);
      };
    };
  },
  Foldable0: function() {
    return foldableMap;
  }
};
var keys = /* @__PURE__ */ function() {
  return foldrWithIndex(foldableWithIndexMap)(function(k) {
    return function(v) {
      return function(acc) {
        return new Cons(k, acc);
      };
    };
  })(Nil.value);
}();
var empty2 = /* @__PURE__ */ function() {
  return Leaf.value;
}();
var fromFoldable2 = function(dictOrd) {
  return function(dictFoldable) {
    return foldl(dictFoldable)(function(m) {
      return function(v) {
        return insert(dictOrd)(v.value0)(v.value1)(m);
      };
    })(empty2);
  };
};
var $$delete = function(dictOrd) {
  return function(k) {
    return function(m) {
      return maybe(m)(snd)(pop(dictOrd)(k)(m));
    };
  };
};
var alter = function(dictOrd) {
  return function(f) {
    return function(k) {
      return function(m) {
        var v = f(lookup(dictOrd)(k)(m));
        if (v instanceof Nothing) {
          return $$delete(dictOrd)(k)(m);
        }
        ;
        if (v instanceof Just) {
          return insert(dictOrd)(k)(v.value0)(m);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v.constructor.name]);
      };
    };
  };
};
var update = function(dictOrd) {
  return function(f) {
    return function(k) {
      return function(m) {
        return alter(dictOrd)(maybe(Nothing.value)(f))(k)(m);
      };
    };
  };
};

// output/Control.Monad.ST.Internal/foreign.js
var map_ = function(f) {
  return function(a) {
    return function() {
      return f(a());
    };
  };
};
var foreach = function(as) {
  return function(f) {
    return function() {
      for (var i = 0, l = as.length; i < l; i++) {
        f(as[i])();
      }
    };
  };
};
function newSTRef(val) {
  return function() {
    return { value: val };
  };
}
var read2 = function(ref) {
  return function() {
    return ref.value;
  };
};
var modifyImpl2 = function(f) {
  return function(ref) {
    return function() {
      var t = f(ref.value);
      ref.value = t.state;
      return t.value;
    };
  };
};
var write2 = function(a) {
  return function(ref) {
    return function() {
      return ref.value = a;
    };
  };
};

// output/Control.Monad.ST.Internal/index.js
var modify$prime = modifyImpl2;
var modify2 = function(f) {
  return modify$prime(function(s) {
    var s$prime = f(s);
    return {
      state: s$prime,
      value: s$prime
    };
  });
};
var functorST = {
  map: map_
};

// output/Data.Array/foreign.js
var range2 = function(start) {
  return function(end) {
    var step2 = start > end ? -1 : 1;
    var result = new Array(step2 * (end - start) + 1);
    var i = start, n = 0;
    while (i !== end) {
      result[n++] = i;
      i += step2;
    }
    result[n] = i;
    return result;
  };
};
var replicateFill = function(count) {
  return function(value2) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value2);
  };
};
var replicatePolyfill = function(count) {
  return function(value2) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value2;
    }
    return result;
  };
};
var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
var fromFoldableImpl = function() {
  function Cons4(head3, tail2) {
    this.head = head3;
    this.tail = tail2;
  }
  var emptyList = {};
  function curryCons(head3) {
    return function(tail2) {
      return new Cons4(head3, tail2);
    };
  }
  function listToArray(list) {
    var result = [];
    var count = 0;
    var xs = list;
    while (xs !== emptyList) {
      result[count++] = xs.head;
      xs = xs.tail;
    }
    return result;
  }
  return function(foldr4) {
    return function(xs) {
      return listToArray(foldr4(curryCons)(emptyList)(xs));
    };
  };
}();
var length2 = function(xs) {
  return xs.length;
};
var unconsImpl = function(empty8) {
  return function(next2) {
    return function(xs) {
      return xs.length === 0 ? empty8({}) : next2(xs[0])(xs.slice(1));
    };
  };
};
var indexImpl = function(just) {
  return function(nothing) {
    return function(xs) {
      return function(i) {
        return i < 0 || i >= xs.length ? nothing : just(xs[i]);
      };
    };
  };
};
var reverse2 = function(l) {
  return l.slice().reverse();
};
var filter2 = function(f) {
  return function(xs) {
    return xs.filter(f);
  };
};
var sortByImpl = function() {
  function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to2) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from3 + (to2 - from3 >> 1);
    if (mid - from3 > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
    if (to2 - mid > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to2);
    i = from3;
    j = mid;
    k = from3;
    while (i < mid && j < to2) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare2(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to2) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare2) {
    return function(fromOrdering) {
      return function(xs) {
        var out;
        if (xs.length < 2)
          return xs;
        out = xs.slice(0);
        mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
        return out;
      };
    };
  };
}();
var slice = function(s) {
  return function(e) {
    return function(l) {
      return l.slice(s, e);
    };
  };
};
var zipWith = function(f) {
  return function(xs) {
    return function(ys) {
      var l = xs.length < ys.length ? xs.length : ys.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(xs[i])(ys[i]);
      }
      return result;
    };
  };
};

// output/Data.Array.ST/foreign.js
function newSTArray() {
  return [];
}
var pushAll = function(as) {
  return function(xs) {
    return function() {
      return xs.push.apply(xs, as);
    };
  };
};
var unsafeFreeze = function(xs) {
  return function() {
    return xs;
  };
};
var sortByImpl2 = function() {
  function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to2) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from3 + (to2 - from3 >> 1);
    if (mid - from3 > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
    if (to2 - mid > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to2);
    i = from3;
    j = mid;
    k = from3;
    while (i < mid && j < to2) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare2(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to2) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare2) {
    return function(fromOrdering) {
      return function(xs) {
        return function() {
          if (xs.length < 2)
            return xs;
          mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
          return xs;
        };
      };
    };
  };
}();

// output/Data.Array.ST/index.js
var push = function(a) {
  return pushAll([a]);
};

// output/Data.Array.ST.Iterator/index.js
var Iterator = /* @__PURE__ */ function() {
  function Iterator2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Iterator2.create = function(value0) {
    return function(value1) {
      return new Iterator2(value0, value1);
    };
  };
  return Iterator2;
}();
var peek = function(v) {
  return function __do() {
    var i = read2(v.value1)();
    return v.value0(i);
  };
};
var next = function(v) {
  return function __do() {
    var i = read2(v.value1)();
    modify2(function(v1) {
      return v1 + 1 | 0;
    })(v.value1)();
    return v.value0(i);
  };
};
var pushWhile = function(p) {
  return function(iter) {
    return function(array) {
      return function __do() {
        var $$break = newSTRef(false)();
        while (map(functorST)(not(heytingAlgebraBoolean))(read2($$break))()) {
          (function __do2() {
            var mx = peek(iter)();
            if (mx instanceof Just && p(mx.value0)) {
              push(mx.value0)(array)();
              return $$void(functorST)(next(iter))();
            }
            ;
            return $$void(functorST)(write2(true)($$break))();
          })();
        }
        ;
        return {};
      };
    };
  };
};
var iterator = function(f) {
  return map(functorST)(Iterator.create(f))(newSTRef(0));
};
var iterate = function(iter) {
  return function(f) {
    return function __do() {
      var $$break = newSTRef(false)();
      while (map(functorST)(not(heytingAlgebraBoolean))(read2($$break))()) {
        (function __do2() {
          var mx = next(iter)();
          if (mx instanceof Just) {
            return f(mx.value0)();
          }
          ;
          if (mx instanceof Nothing) {
            return $$void(functorST)(write2(true)($$break))();
          }
          ;
          throw new Error("Failed pattern match at Data.Array.ST.Iterator (line 42, column 5 - line 44, column 47): " + [mx.constructor.name]);
        })();
      }
      ;
      return {};
    };
  };
};

// output/Data.Array/index.js
var uncons2 = /* @__PURE__ */ function() {
  return unconsImpl($$const(Nothing.value))(function(x) {
    return function(xs) {
      return new Just({
        head: x,
        tail: xs
      });
    };
  });
}();
var sortBy = function(comp) {
  return sortByImpl(comp)(function(v) {
    if (v instanceof GT) {
      return 1;
    }
    ;
    if (v instanceof EQ) {
      return 0;
    }
    ;
    if (v instanceof LT) {
      return -1 | 0;
    }
    ;
    throw new Error("Failed pattern match at Data.Array (line 829, column 31 - line 832, column 11): " + [v.constructor.name]);
  });
};
var sort = function(dictOrd) {
  return function(xs) {
    return sortBy(compare(dictOrd))(xs);
  };
};
var singleton5 = function(a) {
  return [a];
};
var $$null2 = function(xs) {
  return length2(xs) === 0;
};
var mapWithIndex2 = function(f) {
  return function(xs) {
    return zipWith(f)(range2(0)(length2(xs) - 1 | 0))(xs);
  };
};
var init = function(xs) {
  if ($$null2(xs)) {
    return Nothing.value;
  }
  ;
  if (otherwise) {
    return new Just(slice(0)(length2(xs) - 1 | 0)(xs));
  }
  ;
  throw new Error("Failed pattern match at Data.Array (line 338, column 1 - line 338, column 45): " + [xs.constructor.name]);
};
var index = /* @__PURE__ */ function() {
  return indexImpl(Just.create)(Nothing.value);
}();
var last = function(xs) {
  return index(xs)(length2(xs) - 1 | 0);
};
var unsnoc = function(xs) {
  return apply(applyMaybe)(map(functorMaybe)(function(v) {
    return function(v1) {
      return {
        init: v,
        last: v1
      };
    };
  })(init(xs)))(last(xs));
};
var head2 = function(xs) {
  return index(xs)(0);
};
var groupBy = function(op) {
  return function(xs) {
    return function __do() {
      var result = newSTArray();
      var iter = iterator(function(v) {
        return index(xs)(v);
      })();
      iterate(iter)(function(x) {
        return $$void(functorST)(function __do2() {
          var sub2 = newSTArray();
          push(x)(sub2)();
          pushWhile(op(x))(iter)(sub2)();
          var grp = unsafeFreeze(sub2)();
          return push(grp)(result)();
        });
      })();
      return unsafeFreeze(result)();
    }();
  };
};
var fromFoldable3 = function(dictFoldable) {
  return fromFoldableImpl(foldr(dictFoldable));
};
var foldr2 = /* @__PURE__ */ foldr(foldableArray);
var fold2 = function(dictMonoid) {
  return fold(foldableArray)(dictMonoid);
};
var drop = function(n) {
  return function(xs) {
    var $79 = n < 1;
    if ($79) {
      return xs;
    }
    ;
    return slice(n)(length2(xs))(xs);
  };
};
var cons3 = function(x) {
  return function(xs) {
    return append(semigroupArray)([x])(xs);
  };
};
var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));
var mapMaybe = function(f) {
  return concatMap(function() {
    var $99 = maybe([])(singleton5);
    return function($100) {
      return $99(f($100));
    };
  }());
};
var catMaybes = /* @__PURE__ */ mapMaybe(/* @__PURE__ */ identity(categoryFn));

// output/Data.Set/index.js
var toList = function(v) {
  return keys(v);
};
var toUnfoldable3 = function(dictUnfoldable) {
  var $70 = toUnfoldable(dictUnfoldable);
  return function($71) {
    return $70(toList($71));
  };
};
var singleton6 = function(a) {
  return singleton4(a)(unit);
};
var showSet = function(dictShow) {
  return {
    show: function(s) {
      return "(fromFoldable " + (show(showArray(dictShow))(toUnfoldable3(unfoldableArray)(s)) + ")");
    }
  };
};
var member2 = function(dictOrd) {
  return function(a) {
    return function(v) {
      return member(dictOrd)(a)(v);
    };
  };
};
var insert2 = function(dictOrd) {
  return function(a) {
    return function(v) {
      return insert(dictOrd)(a)(unit)(v);
    };
  };
};
var empty3 = empty2;
var $$delete2 = function(dictOrd) {
  return function(a) {
    return function(v) {
      return $$delete(dictOrd)(a)(v);
    };
  };
};

// output/Data.GameState/index.js
var showGameState = {
  show: function(v) {
    return "GameState " + ("{ items: " + (show(showMap(showCoords)(showSet(showGameItem)))(v.items) + (", player: " + (show(showCoords)(v.player) + (", inventory: " + (show(showSet(showGameItem))(v.inventory) + " }"))))));
  }
};
var initialGameState = /* @__PURE__ */ function() {
  return {
    items: fromFoldable2(ordCoords)(foldableArray)([new Tuple(coords(0)(1), singleton6(Candle.value)), new Tuple(coords(0)(0), singleton6(Matches.value))]),
    player: {
      x: 0,
      y: 0
    },
    inventory: empty3
  };
}();

// output/Data.String.Common/foreign.js
var split = function(sep) {
  return function(s) {
    return s.split(sep);
  };
};

// output/Effect.Console/foreign.js
var log = function(s) {
  return function() {
    console.log(s);
  };
};

// output/Game/index.js
var pickUp = function(item) {
  return bind(bindRWST(bindIdentity)(monoidList))(get(monadStateRWST(monadIdentity)(monoidList)))(function(v) {
    var v1 = lookup(ordCoords)(v.player)(v.items);
    if (v1 instanceof Just && member2(ordGameItem)(item)(v1.value0)) {
      var newItems = update(ordCoords)(function() {
        var $54 = $$delete2(ordGameItem)(item);
        return function($55) {
          return Just.create($54($55));
        };
      }())(v.player)(v.items);
      var newInventory = insert2(ordGameItem)(item)(v.inventory);
      return discard(discardUnit)(bindRWST(bindIdentity)(monoidList))(put(monadStateRWST(monadIdentity)(monoidList))({
        items: newItems,
        player: v.player,
        inventory: newInventory
      }))(function() {
        return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("You now have the " + show(showGameItem)(item)));
      });
    }
    ;
    return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("I don't see that item here."));
  });
};
var move = function(dx) {
  return function(dy) {
    var updateCoords = function(v) {
      return coords(v.x + dx | 0)(v.y + dy | 0);
    };
    return modify_(monadStateRWST(monadIdentity)(monoidList))(function(v) {
      return {
        items: v.items,
        player: updateCoords(v.player),
        inventory: v.inventory
      };
    });
  };
};
var has = function(item) {
  return bind(bindRWST(bindIdentity)(monoidList))(get(monadStateRWST(monadIdentity)(monoidList)))(function(v) {
    return pure(applicativeRWST(monadIdentity)(monoidList))(member2(ordGameItem)(item)(v.inventory));
  });
};
var use = function(v) {
  if (v instanceof Candle) {
    return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("I don't know what you want me to do with that."));
  }
  ;
  if (v instanceof Matches) {
    return bind(bindRWST(bindIdentity)(monoidList))(has(Candle.value))(function(hasCandle) {
      if (hasCandle) {
        return bind(bindRWST(bindIdentity)(monoidList))(ask(monadAskRWST(monadIdentity)(monoidList)))(function(v1) {
          return tell(monadTellRWST(monadIdentity)(monoidList))(fromFoldable(foldableArray)(["You light the candle.", "Congratulations, " + (v1.playerName + "!"), "You win!"]));
        });
      }
      ;
      return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("You don't have anything to light."));
    });
  }
  ;
  throw new Error("Failed pattern match at Game (line 69, column 1 - line 69, column 29): " + [v.constructor.name]);
};
var describeRoom = /* @__PURE__ */ bind(/* @__PURE__ */ bindRWST(bindIdentity)(monoidList))(/* @__PURE__ */ get(/* @__PURE__ */ monadStateRWST(monadIdentity)(monoidList)))(function(v) {
  if (v.player.x === 0 && v.player.y === 0) {
    return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("You are in a dark forest. You see a path to the north."));
  }
  ;
  if (v.player.x === 0 && v.player.y === 1) {
    return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("You are in a clearing."));
  }
  ;
  return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("You are deep in the forest."));
});
var game = function(v) {
  if (v.length === 1 && v[0] === "look") {
    return bind(bindRWST(bindIdentity)(monoidList))(get(monadStateRWST(monadIdentity)(monoidList)))(function(v12) {
      return discard(discardUnit)(bindRWST(bindIdentity)(monoidList))(tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("You are at " + prettyPrintCoords(v12.player))))(function() {
        return discard(discardUnit)(bindRWST(bindIdentity)(monoidList))(describeRoom)(function() {
          return for_(applicativeRWST(monadIdentity)(monoidList))(foldableMaybe)(lookup(ordCoords)(v12.player)(v12.items))(function(items) {
            return tell(monadTellRWST(monadIdentity)(monoidList))(map(functorList)(function(item) {
              return "You can see the " + (show(showGameItem)(item) + ".");
            })(toUnfoldable3(unfoldableList)(items)));
          });
        });
      });
    });
  }
  ;
  if (v.length === 1 && v[0] === "inventory") {
    return bind(bindRWST(bindIdentity)(monoidList))(get(monadStateRWST(monadIdentity)(monoidList)))(function(v12) {
      return tell(monadTellRWST(monadIdentity)(monoidList))(map(functorList)(function(item) {
        return "You have the " + (show(showGameItem)(item) + ".");
      })(toUnfoldable3(unfoldableList)(v12.inventory)));
    });
  }
  ;
  if (v.length === 1 && v[0] === "north") {
    return move(0)(1);
  }
  ;
  if (v.length === 1 && v[0] === "south") {
    return move(0)(-1 | 0);
  }
  ;
  if (v.length === 1 && v[0] === "west") {
    return move(-1 | 0)(0);
  }
  ;
  if (v.length === 1 && v[0] === "east") {
    return move(1)(0);
  }
  ;
  if (v.length === 2 && v[0] === "take") {
    var v1 = readItem(v[1]);
    if (v1 instanceof Nothing) {
      return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("I don't know what item you are referring to."));
    }
    ;
    if (v1 instanceof Just) {
      return pickUp(v1.value0);
    }
    ;
    throw new Error("Failed pattern match at Game (line 99, column 3 - line 101, column 37): " + [v1.constructor.name]);
  }
  ;
  if (v.length === 2 && v[0] === "use") {
    var v1 = readItem(v[1]);
    if (v1 instanceof Nothing) {
      return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("I don't know what item you are referring to."));
    }
    ;
    if (v1 instanceof Just) {
      return bind(bindRWST(bindIdentity)(monoidList))(has(v1.value0))(function(hasItem) {
        if (hasItem) {
          return use(v1.value0);
        }
        ;
        return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("You don't have that item."));
      });
    }
    ;
    throw new Error("Failed pattern match at Game (line 103, column 3 - line 109, column 60): " + [v1.constructor.name]);
  }
  ;
  if (v.length === 1 && v[0] === "debug") {
    return bind(bindRWST(bindIdentity)(monoidList))(ask(monadAskRWST(monadIdentity)(monoidList)))(function(v12) {
      if (v12.debugMode) {
        return bind(bindRWST(bindIdentity)(monoidList))(get(monadStateRWST(monadIdentity)(monoidList)))(function(v2) {
          return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3(show(showGameState)(v2)));
        });
      }
      ;
      return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("Not running in debug mode."));
    });
  }
  ;
  if (v.length === 0) {
    return pure(applicativeRWST(monadIdentity)(monoidList))(unit);
  }
  ;
  return tell(monadTellRWST(monadIdentity)(monoidList))(singleton3("I don't understand."));
};

// output/Node.ReadLine/foreign.js
import { createInterface } from "readline";
function createInterfaceImpl(options2) {
  return () => createInterface({
    input: options2.input,
    output: options2.output,
    completer: options2.completer && ((line2) => {
      const res = options2.completer(line2)();
      return [res.completions, res.matched];
    }),
    terminal: options2.terminal,
    historySize: options2.historySize
  });
}
function prompt(readline) {
  return () => {
    readline.prompt();
  };
}
function setPrompt(prompt2) {
  return (readline) => () => {
    readline.setPrompt(prompt2);
  };
}
function setLineHandler(callback) {
  return (readline) => () => {
    readline.removeAllListeners("line");
    readline.on("line", (line2) => {
      callback(line2)();
    });
  };
}

// output/Data.Op/index.js
var Op = function(x) {
  return x;
};

// output/Foreign/foreign.js
var isArray = Array.isArray || function(value2) {
  return Object.prototype.toString.call(value2) === "[object Array]";
};

// output/Control.Monad.Except.Trans/index.js
var ExceptT = function(x) {
  return x;
};
var withExceptT = function(dictFunctor) {
  return function(f) {
    return function(v) {
      var mapLeft = function(v1) {
        return function(v2) {
          if (v2 instanceof Right) {
            return new Right(v2.value0);
          }
          ;
          if (v2 instanceof Left) {
            return new Left(v1(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 42, column 3 - line 42, column 32): " + [v1.constructor.name, v2.constructor.name]);
        };
      };
      return map(dictFunctor)(mapLeft(f))(v);
    };
  };
};
var runExceptT = function(v) {
  return v;
};
var monadTransExceptT = {
  lift: function(dictMonad) {
    return function(m) {
      return bind(dictMonad.Bind1())(m)(function(a) {
        return pure(dictMonad.Applicative0())(new Right(a));
      });
    };
  }
};
var mapExceptT = function(f) {
  return function(v) {
    return f(v);
  };
};
var functorExceptT = function(dictFunctor) {
  return {
    map: function(f) {
      return mapExceptT(map(dictFunctor)(map(functorEither)(f)));
    }
  };
};
var monadExceptT = function(dictMonad) {
  return {
    Applicative0: function() {
      return applicativeExceptT(dictMonad);
    },
    Bind1: function() {
      return bindExceptT(dictMonad);
    }
  };
};
var bindExceptT = function(dictMonad) {
  return {
    bind: function(v) {
      return function(k) {
        return bind(dictMonad.Bind1())(v)(either(function() {
          var $89 = pure(dictMonad.Applicative0());
          return function($90) {
            return $89(Left.create($90));
          };
        }())(function(a) {
          var v1 = k(a);
          return v1;
        }));
      };
    },
    Apply0: function() {
      return applyExceptT(dictMonad);
    }
  };
};
var applyExceptT = function(dictMonad) {
  return {
    apply: ap(monadExceptT(dictMonad)),
    Functor0: function() {
      return functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    }
  };
};
var applicativeExceptT = function(dictMonad) {
  return {
    pure: function() {
      var $91 = pure(dictMonad.Applicative0());
      return function($92) {
        return ExceptT($91(Right.create($92)));
      };
    }(),
    Apply0: function() {
      return applyExceptT(dictMonad);
    }
  };
};
var monadThrowExceptT = function(dictMonad) {
  return {
    throwError: function() {
      var $101 = pure(dictMonad.Applicative0());
      return function($102) {
        return ExceptT($101(Left.create($102)));
      };
    }(),
    Monad0: function() {
      return monadExceptT(dictMonad);
    }
  };
};
var altExceptT = function(dictSemigroup) {
  return function(dictMonad) {
    return {
      alt: function(v) {
        return function(v1) {
          return bind(dictMonad.Bind1())(v)(function(rm) {
            if (rm instanceof Right) {
              return pure(dictMonad.Applicative0())(new Right(rm.value0));
            }
            ;
            if (rm instanceof Left) {
              return bind(dictMonad.Bind1())(v1)(function(rn) {
                if (rn instanceof Right) {
                  return pure(dictMonad.Applicative0())(new Right(rn.value0));
                }
                ;
                if (rn instanceof Left) {
                  return pure(dictMonad.Applicative0())(new Left(append(dictSemigroup)(rm.value0)(rn.value0)));
                }
                ;
                throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [rn.constructor.name]);
              });
            }
            ;
            throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [rm.constructor.name]);
          });
        };
      },
      Functor0: function() {
        return functorExceptT(dictMonad.Bind1().Apply0().Functor0());
      }
    };
  };
};

// output/Data.Int/foreign.js
var fromNumberImpl = function(just) {
  return function(nothing) {
    return function(n) {
      return (n | 0) === n ? just(n) : nothing;
    };
  };
};
var toNumber = function(n) {
  return n;
};
var fromStringAsImpl = function(just) {
  return function(nothing) {
    return function(radix) {
      var digits;
      if (radix < 11) {
        digits = "[0-" + (radix - 1).toString() + "]";
      } else if (radix === 11) {
        digits = "[0-9a]";
      } else {
        digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
      }
      var pattern = new RegExp("^[\\+\\-]?" + digits + "+$", "i");
      return function(s) {
        if (pattern.test(s)) {
          var i = parseInt(s, radix);
          return (i | 0) === i ? just(i) : nothing;
        } else {
          return nothing;
        }
      };
    };
  };
};

// output/Data.Number/foreign.js
var isFiniteImpl = isFinite;
var round = Math.round;

// output/Data.Int/index.js
var fromStringAs = /* @__PURE__ */ function() {
  return fromStringAsImpl(Just.create)(Nothing.value);
}();
var fromString = /* @__PURE__ */ fromStringAs(10);
var fromNumber = /* @__PURE__ */ function() {
  return fromNumberImpl(Just.create)(Nothing.value);
}();
var unsafeClamp = function(x) {
  if (!isFiniteImpl(x)) {
    return 0;
  }
  ;
  if (x >= toNumber(top(boundedInt))) {
    return top(boundedInt);
  }
  ;
  if (x <= toNumber(bottom(boundedInt))) {
    return bottom(boundedInt);
  }
  ;
  if (otherwise) {
    return fromMaybe(0)(fromNumber(x));
  }
  ;
  throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
};
var round2 = function($23) {
  return unsafeClamp(round($23));
};

// output/Data.String.CodeUnits/foreign.js
var fromCharArray = function(a) {
  return a.join("");
};
var toCharArray = function(s) {
  return s.split("");
};
var length3 = function(s) {
  return s.length;
};
var _indexOf = function(just) {
  return function(nothing) {
    return function(x) {
      return function(s) {
        var i = s.indexOf(x);
        return i === -1 ? nothing : just(i);
      };
    };
  };
};
var take2 = function(n) {
  return function(s) {
    return s.substr(0, n);
  };
};
var drop3 = function(n) {
  return function(s) {
    return s.substring(n);
  };
};

// output/Data.String.Unsafe/foreign.js
var charAt = function(i) {
  return function(s) {
    if (i >= 0 && i < s.length)
      return s.charAt(i);
    throw new Error("Data.String.Unsafe.charAt: Invalid index.");
  };
};

// output/Data.String.CodeUnits/index.js
var indexOf = /* @__PURE__ */ function() {
  return _indexOf(Just.create)(Nothing.value);
}();

// output/Foreign/index.js
var unsafeToForeign = unsafeCoerce2;

// output/Foreign.Object/foreign.js
function runST(f) {
  return f();
}
function toArrayWithKey(f) {
  return function(m) {
    var r = [];
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r.push(f(k)(m[k]));
      }
    }
    return r;
  };
}
var keys2 = Object.keys || toArrayWithKey(function(k) {
  return function() {
    return k;
  };
});

// output/Foreign.Object.ST/foreign.js
var newImpl = function() {
  return {};
};
function poke2(k) {
  return function(v) {
    return function(m) {
      return function() {
        m[k] = v;
        return m;
      };
    };
  };
}

// output/Foreign.Object/index.js
var fromFoldable4 = function(dictFoldable) {
  return function(l) {
    return runST(function __do() {
      var s = newImpl();
      foreach(fromFoldable3(dictFoldable)(l))(function(v) {
        return $$void(functorST)(poke2(v.value0)(v.value1)(s));
      })();
      return s;
    });
  };
};

// output/Data.Options/index.js
var semigroupOptions = semigroupArray;
var options = function(v) {
  return unsafeToForeign(fromFoldable4(foldableArray)(v));
};
var defaultToOptions = function(k) {
  return function(v) {
    return [new Tuple(k, unsafeToForeign(v))];
  };
};
var opt = function($4) {
  return Op(defaultToOptions($4));
};
var assoc = /* @__PURE__ */ unwrap();

// output/Node.Process/foreign.js
import process from "process";
function exit(code) {
  return () => {
    process.exit(code);
  };
}
function copyArray(xs) {
  return () => xs.slice();
}

// output/Node.Process/index.js
var stdout = /* @__PURE__ */ function() {
  return process.stdout;
}();
var stdin = /* @__PURE__ */ function() {
  return process.stdin;
}();
var stderr = /* @__PURE__ */ function() {
  return process.stderr;
}();
var argv = /* @__PURE__ */ function() {
  return copyArray(process.argv);
}();

// output/Node.ReadLine/index.js
var output = /* @__PURE__ */ opt("output");
var noCompletion = function(s) {
  return pure(applicativeEffect)({
    completions: [],
    matched: s
  });
};
var createInterface2 = function(input) {
  return function(opts) {
    return createInterfaceImpl(options(append(semigroupOptions)(opts)(assoc(opt("input"))(input))));
  };
};
var completer = /* @__PURE__ */ opt("completer");
var createConsoleInterface = function(compl) {
  return createInterface2(stdin)(append(semigroupOptions)(assoc(output)(stdout))(assoc(completer)(compl)));
};

// output/ExitCodes/index.js
var Success = /* @__PURE__ */ function() {
  function Success3() {
  }
  ;
  Success3.value = new Success3();
  return Success3;
}();
var $$Error = /* @__PURE__ */ function() {
  function $$Error2() {
  }
  ;
  $$Error2.value = new $$Error2();
  return $$Error2;
}();
var MisuseOfShellBuiltins = /* @__PURE__ */ function() {
  function MisuseOfShellBuiltins2() {
  }
  ;
  MisuseOfShellBuiltins2.value = new MisuseOfShellBuiltins2();
  return MisuseOfShellBuiltins2;
}();
var CLIUsageError = /* @__PURE__ */ function() {
  function CLIUsageError2() {
  }
  ;
  CLIUsageError2.value = new CLIUsageError2();
  return CLIUsageError2;
}();
var DataFormatError = /* @__PURE__ */ function() {
  function DataFormatError2() {
  }
  ;
  DataFormatError2.value = new DataFormatError2();
  return DataFormatError2;
}();
var CannotOpenInput = /* @__PURE__ */ function() {
  function CannotOpenInput2() {
  }
  ;
  CannotOpenInput2.value = new CannotOpenInput2();
  return CannotOpenInput2;
}();
var AddresseeUnknown = /* @__PURE__ */ function() {
  function AddresseeUnknown2() {
  }
  ;
  AddresseeUnknown2.value = new AddresseeUnknown2();
  return AddresseeUnknown2;
}();
var HostNameUnknown = /* @__PURE__ */ function() {
  function HostNameUnknown2() {
  }
  ;
  HostNameUnknown2.value = new HostNameUnknown2();
  return HostNameUnknown2;
}();
var ServiceUnavailable = /* @__PURE__ */ function() {
  function ServiceUnavailable2() {
  }
  ;
  ServiceUnavailable2.value = new ServiceUnavailable2();
  return ServiceUnavailable2;
}();
var InternalSoftwareError = /* @__PURE__ */ function() {
  function InternalSoftwareError2() {
  }
  ;
  InternalSoftwareError2.value = new InternalSoftwareError2();
  return InternalSoftwareError2;
}();
var SystemError = /* @__PURE__ */ function() {
  function SystemError2() {
  }
  ;
  SystemError2.value = new SystemError2();
  return SystemError2;
}();
var CriticalOSFileMissing = /* @__PURE__ */ function() {
  function CriticalOSFileMissing2() {
  }
  ;
  CriticalOSFileMissing2.value = new CriticalOSFileMissing2();
  return CriticalOSFileMissing2;
}();
var CannotCreateOutputFile = /* @__PURE__ */ function() {
  function CannotCreateOutputFile2() {
  }
  ;
  CannotCreateOutputFile2.value = new CannotCreateOutputFile2();
  return CannotCreateOutputFile2;
}();
var IOError = /* @__PURE__ */ function() {
  function IOError2() {
  }
  ;
  IOError2.value = new IOError2();
  return IOError2;
}();
var TemporaryFailure = /* @__PURE__ */ function() {
  function TemporaryFailure2() {
  }
  ;
  TemporaryFailure2.value = new TemporaryFailure2();
  return TemporaryFailure2;
}();
var RemoteError = /* @__PURE__ */ function() {
  function RemoteError2() {
  }
  ;
  RemoteError2.value = new RemoteError2();
  return RemoteError2;
}();
var PermissionDenied = /* @__PURE__ */ function() {
  function PermissionDenied2() {
  }
  ;
  PermissionDenied2.value = new PermissionDenied2();
  return PermissionDenied2;
}();
var ConfigurationError = /* @__PURE__ */ function() {
  function ConfigurationError2() {
  }
  ;
  ConfigurationError2.value = new ConfigurationError2();
  return ConfigurationError2;
}();
var CannotExecute = /* @__PURE__ */ function() {
  function CannotExecute2() {
  }
  ;
  CannotExecute2.value = new CannotExecute2();
  return CannotExecute2;
}();
var CommandNotFound = /* @__PURE__ */ function() {
  function CommandNotFound2() {
  }
  ;
  CommandNotFound2.value = new CommandNotFound2();
  return CommandNotFound2;
}();
var InvalidExitArgument = /* @__PURE__ */ function() {
  function InvalidExitArgument2() {
  }
  ;
  InvalidExitArgument2.value = new InvalidExitArgument2();
  return InvalidExitArgument2;
}();
var SIGHUP = /* @__PURE__ */ function() {
  function SIGHUP2() {
  }
  ;
  SIGHUP2.value = new SIGHUP2();
  return SIGHUP2;
}();
var SIGINT = /* @__PURE__ */ function() {
  function SIGINT2() {
  }
  ;
  SIGINT2.value = new SIGINT2();
  return SIGINT2;
}();
var SIGQUIT = /* @__PURE__ */ function() {
  function SIGQUIT2() {
  }
  ;
  SIGQUIT2.value = new SIGQUIT2();
  return SIGQUIT2;
}();
var SIGILL = /* @__PURE__ */ function() {
  function SIGILL2() {
  }
  ;
  SIGILL2.value = new SIGILL2();
  return SIGILL2;
}();
var SIGABRT = /* @__PURE__ */ function() {
  function SIGABRT2() {
  }
  ;
  SIGABRT2.value = new SIGABRT2();
  return SIGABRT2;
}();
var SIGFPE = /* @__PURE__ */ function() {
  function SIGFPE2() {
  }
  ;
  SIGFPE2.value = new SIGFPE2();
  return SIGFPE2;
}();
var SIGKILL = /* @__PURE__ */ function() {
  function SIGKILL2() {
  }
  ;
  SIGKILL2.value = new SIGKILL2();
  return SIGKILL2;
}();
var SIGSEGV = /* @__PURE__ */ function() {
  function SIGSEGV2() {
  }
  ;
  SIGSEGV2.value = new SIGSEGV2();
  return SIGSEGV2;
}();
var SIGPIPE = /* @__PURE__ */ function() {
  function SIGPIPE2() {
  }
  ;
  SIGPIPE2.value = new SIGPIPE2();
  return SIGPIPE2;
}();
var SIGALRM = /* @__PURE__ */ function() {
  function SIGALRM2() {
  }
  ;
  SIGALRM2.value = new SIGALRM2();
  return SIGALRM2;
}();
var SIGTERM = /* @__PURE__ */ function() {
  function SIGTERM2() {
  }
  ;
  SIGTERM2.value = new SIGTERM2();
  return SIGTERM2;
}();
var eqExitCode = {
  eq: function(x) {
    return function(y) {
      if (x instanceof Success && y instanceof Success) {
        return true;
      }
      ;
      if (x instanceof $$Error && y instanceof $$Error) {
        return true;
      }
      ;
      if (x instanceof MisuseOfShellBuiltins && y instanceof MisuseOfShellBuiltins) {
        return true;
      }
      ;
      if (x instanceof CLIUsageError && y instanceof CLIUsageError) {
        return true;
      }
      ;
      if (x instanceof DataFormatError && y instanceof DataFormatError) {
        return true;
      }
      ;
      if (x instanceof CannotOpenInput && y instanceof CannotOpenInput) {
        return true;
      }
      ;
      if (x instanceof AddresseeUnknown && y instanceof AddresseeUnknown) {
        return true;
      }
      ;
      if (x instanceof HostNameUnknown && y instanceof HostNameUnknown) {
        return true;
      }
      ;
      if (x instanceof ServiceUnavailable && y instanceof ServiceUnavailable) {
        return true;
      }
      ;
      if (x instanceof InternalSoftwareError && y instanceof InternalSoftwareError) {
        return true;
      }
      ;
      if (x instanceof SystemError && y instanceof SystemError) {
        return true;
      }
      ;
      if (x instanceof CriticalOSFileMissing && y instanceof CriticalOSFileMissing) {
        return true;
      }
      ;
      if (x instanceof CannotCreateOutputFile && y instanceof CannotCreateOutputFile) {
        return true;
      }
      ;
      if (x instanceof IOError && y instanceof IOError) {
        return true;
      }
      ;
      if (x instanceof TemporaryFailure && y instanceof TemporaryFailure) {
        return true;
      }
      ;
      if (x instanceof RemoteError && y instanceof RemoteError) {
        return true;
      }
      ;
      if (x instanceof PermissionDenied && y instanceof PermissionDenied) {
        return true;
      }
      ;
      if (x instanceof ConfigurationError && y instanceof ConfigurationError) {
        return true;
      }
      ;
      if (x instanceof CannotExecute && y instanceof CannotExecute) {
        return true;
      }
      ;
      if (x instanceof CommandNotFound && y instanceof CommandNotFound) {
        return true;
      }
      ;
      if (x instanceof InvalidExitArgument && y instanceof InvalidExitArgument) {
        return true;
      }
      ;
      if (x instanceof SIGHUP && y instanceof SIGHUP) {
        return true;
      }
      ;
      if (x instanceof SIGINT && y instanceof SIGINT) {
        return true;
      }
      ;
      if (x instanceof SIGQUIT && y instanceof SIGQUIT) {
        return true;
      }
      ;
      if (x instanceof SIGILL && y instanceof SIGILL) {
        return true;
      }
      ;
      if (x instanceof SIGABRT && y instanceof SIGABRT) {
        return true;
      }
      ;
      if (x instanceof SIGFPE && y instanceof SIGFPE) {
        return true;
      }
      ;
      if (x instanceof SIGKILL && y instanceof SIGKILL) {
        return true;
      }
      ;
      if (x instanceof SIGSEGV && y instanceof SIGSEGV) {
        return true;
      }
      ;
      if (x instanceof SIGPIPE && y instanceof SIGPIPE) {
        return true;
      }
      ;
      if (x instanceof SIGALRM && y instanceof SIGALRM) {
        return true;
      }
      ;
      if (x instanceof SIGTERM && y instanceof SIGTERM) {
        return true;
      }
      ;
      return false;
    };
  }
};
var ordExitCode = {
  compare: function(x) {
    return function(y) {
      if (x instanceof Success && y instanceof Success) {
        return EQ.value;
      }
      ;
      if (x instanceof Success) {
        return LT.value;
      }
      ;
      if (y instanceof Success) {
        return GT.value;
      }
      ;
      if (x instanceof $$Error && y instanceof $$Error) {
        return EQ.value;
      }
      ;
      if (x instanceof $$Error) {
        return LT.value;
      }
      ;
      if (y instanceof $$Error) {
        return GT.value;
      }
      ;
      if (x instanceof MisuseOfShellBuiltins && y instanceof MisuseOfShellBuiltins) {
        return EQ.value;
      }
      ;
      if (x instanceof MisuseOfShellBuiltins) {
        return LT.value;
      }
      ;
      if (y instanceof MisuseOfShellBuiltins) {
        return GT.value;
      }
      ;
      if (x instanceof CLIUsageError && y instanceof CLIUsageError) {
        return EQ.value;
      }
      ;
      if (x instanceof CLIUsageError) {
        return LT.value;
      }
      ;
      if (y instanceof CLIUsageError) {
        return GT.value;
      }
      ;
      if (x instanceof DataFormatError && y instanceof DataFormatError) {
        return EQ.value;
      }
      ;
      if (x instanceof DataFormatError) {
        return LT.value;
      }
      ;
      if (y instanceof DataFormatError) {
        return GT.value;
      }
      ;
      if (x instanceof CannotOpenInput && y instanceof CannotOpenInput) {
        return EQ.value;
      }
      ;
      if (x instanceof CannotOpenInput) {
        return LT.value;
      }
      ;
      if (y instanceof CannotOpenInput) {
        return GT.value;
      }
      ;
      if (x instanceof AddresseeUnknown && y instanceof AddresseeUnknown) {
        return EQ.value;
      }
      ;
      if (x instanceof AddresseeUnknown) {
        return LT.value;
      }
      ;
      if (y instanceof AddresseeUnknown) {
        return GT.value;
      }
      ;
      if (x instanceof HostNameUnknown && y instanceof HostNameUnknown) {
        return EQ.value;
      }
      ;
      if (x instanceof HostNameUnknown) {
        return LT.value;
      }
      ;
      if (y instanceof HostNameUnknown) {
        return GT.value;
      }
      ;
      if (x instanceof ServiceUnavailable && y instanceof ServiceUnavailable) {
        return EQ.value;
      }
      ;
      if (x instanceof ServiceUnavailable) {
        return LT.value;
      }
      ;
      if (y instanceof ServiceUnavailable) {
        return GT.value;
      }
      ;
      if (x instanceof InternalSoftwareError && y instanceof InternalSoftwareError) {
        return EQ.value;
      }
      ;
      if (x instanceof InternalSoftwareError) {
        return LT.value;
      }
      ;
      if (y instanceof InternalSoftwareError) {
        return GT.value;
      }
      ;
      if (x instanceof SystemError && y instanceof SystemError) {
        return EQ.value;
      }
      ;
      if (x instanceof SystemError) {
        return LT.value;
      }
      ;
      if (y instanceof SystemError) {
        return GT.value;
      }
      ;
      if (x instanceof CriticalOSFileMissing && y instanceof CriticalOSFileMissing) {
        return EQ.value;
      }
      ;
      if (x instanceof CriticalOSFileMissing) {
        return LT.value;
      }
      ;
      if (y instanceof CriticalOSFileMissing) {
        return GT.value;
      }
      ;
      if (x instanceof CannotCreateOutputFile && y instanceof CannotCreateOutputFile) {
        return EQ.value;
      }
      ;
      if (x instanceof CannotCreateOutputFile) {
        return LT.value;
      }
      ;
      if (y instanceof CannotCreateOutputFile) {
        return GT.value;
      }
      ;
      if (x instanceof IOError && y instanceof IOError) {
        return EQ.value;
      }
      ;
      if (x instanceof IOError) {
        return LT.value;
      }
      ;
      if (y instanceof IOError) {
        return GT.value;
      }
      ;
      if (x instanceof TemporaryFailure && y instanceof TemporaryFailure) {
        return EQ.value;
      }
      ;
      if (x instanceof TemporaryFailure) {
        return LT.value;
      }
      ;
      if (y instanceof TemporaryFailure) {
        return GT.value;
      }
      ;
      if (x instanceof RemoteError && y instanceof RemoteError) {
        return EQ.value;
      }
      ;
      if (x instanceof RemoteError) {
        return LT.value;
      }
      ;
      if (y instanceof RemoteError) {
        return GT.value;
      }
      ;
      if (x instanceof PermissionDenied && y instanceof PermissionDenied) {
        return EQ.value;
      }
      ;
      if (x instanceof PermissionDenied) {
        return LT.value;
      }
      ;
      if (y instanceof PermissionDenied) {
        return GT.value;
      }
      ;
      if (x instanceof ConfigurationError && y instanceof ConfigurationError) {
        return EQ.value;
      }
      ;
      if (x instanceof ConfigurationError) {
        return LT.value;
      }
      ;
      if (y instanceof ConfigurationError) {
        return GT.value;
      }
      ;
      if (x instanceof CannotExecute && y instanceof CannotExecute) {
        return EQ.value;
      }
      ;
      if (x instanceof CannotExecute) {
        return LT.value;
      }
      ;
      if (y instanceof CannotExecute) {
        return GT.value;
      }
      ;
      if (x instanceof CommandNotFound && y instanceof CommandNotFound) {
        return EQ.value;
      }
      ;
      if (x instanceof CommandNotFound) {
        return LT.value;
      }
      ;
      if (y instanceof CommandNotFound) {
        return GT.value;
      }
      ;
      if (x instanceof InvalidExitArgument && y instanceof InvalidExitArgument) {
        return EQ.value;
      }
      ;
      if (x instanceof InvalidExitArgument) {
        return LT.value;
      }
      ;
      if (y instanceof InvalidExitArgument) {
        return GT.value;
      }
      ;
      if (x instanceof SIGHUP && y instanceof SIGHUP) {
        return EQ.value;
      }
      ;
      if (x instanceof SIGHUP) {
        return LT.value;
      }
      ;
      if (y instanceof SIGHUP) {
        return GT.value;
      }
      ;
      if (x instanceof SIGINT && y instanceof SIGINT) {
        return EQ.value;
      }
      ;
      if (x instanceof SIGINT) {
        return LT.value;
      }
      ;
      if (y instanceof SIGINT) {
        return GT.value;
      }
      ;
      if (x instanceof SIGQUIT && y instanceof SIGQUIT) {
        return EQ.value;
      }
      ;
      if (x instanceof SIGQUIT) {
        return LT.value;
      }
      ;
      if (y instanceof SIGQUIT) {
        return GT.value;
      }
      ;
      if (x instanceof SIGILL && y instanceof SIGILL) {
        return EQ.value;
      }
      ;
      if (x instanceof SIGILL) {
        return LT.value;
      }
      ;
      if (y instanceof SIGILL) {
        return GT.value;
      }
      ;
      if (x instanceof SIGABRT && y instanceof SIGABRT) {
        return EQ.value;
      }
      ;
      if (x instanceof SIGABRT) {
        return LT.value;
      }
      ;
      if (y instanceof SIGABRT) {
        return GT.value;
      }
      ;
      if (x instanceof SIGFPE && y instanceof SIGFPE) {
        return EQ.value;
      }
      ;
      if (x instanceof SIGFPE) {
        return LT.value;
      }
      ;
      if (y instanceof SIGFPE) {
        return GT.value;
      }
      ;
      if (x instanceof SIGKILL && y instanceof SIGKILL) {
        return EQ.value;
      }
      ;
      if (x instanceof SIGKILL) {
        return LT.value;
      }
      ;
      if (y instanceof SIGKILL) {
        return GT.value;
      }
      ;
      if (x instanceof SIGSEGV && y instanceof SIGSEGV) {
        return EQ.value;
      }
      ;
      if (x instanceof SIGSEGV) {
        return LT.value;
      }
      ;
      if (y instanceof SIGSEGV) {
        return GT.value;
      }
      ;
      if (x instanceof SIGPIPE && y instanceof SIGPIPE) {
        return EQ.value;
      }
      ;
      if (x instanceof SIGPIPE) {
        return LT.value;
      }
      ;
      if (y instanceof SIGPIPE) {
        return GT.value;
      }
      ;
      if (x instanceof SIGALRM && y instanceof SIGALRM) {
        return EQ.value;
      }
      ;
      if (x instanceof SIGALRM) {
        return LT.value;
      }
      ;
      if (y instanceof SIGALRM) {
        return GT.value;
      }
      ;
      if (x instanceof SIGTERM && y instanceof SIGTERM) {
        return EQ.value;
      }
      ;
      throw new Error("Failed pattern match at ExitCodes (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
    };
  },
  Eq0: function() {
    return eqExitCode;
  }
};
var enumExitCode = {
  succ: function(v) {
    if (v instanceof Success) {
      return new Just($$Error.value);
    }
    ;
    if (v instanceof $$Error) {
      return new Just(MisuseOfShellBuiltins.value);
    }
    ;
    if (v instanceof MisuseOfShellBuiltins) {
      return new Just(CLIUsageError.value);
    }
    ;
    if (v instanceof CLIUsageError) {
      return new Just(DataFormatError.value);
    }
    ;
    if (v instanceof DataFormatError) {
      return new Just(CannotOpenInput.value);
    }
    ;
    if (v instanceof CannotOpenInput) {
      return new Just(AddresseeUnknown.value);
    }
    ;
    if (v instanceof AddresseeUnknown) {
      return new Just(HostNameUnknown.value);
    }
    ;
    if (v instanceof HostNameUnknown) {
      return new Just(ServiceUnavailable.value);
    }
    ;
    if (v instanceof ServiceUnavailable) {
      return new Just(InternalSoftwareError.value);
    }
    ;
    if (v instanceof InternalSoftwareError) {
      return new Just(SystemError.value);
    }
    ;
    if (v instanceof SystemError) {
      return new Just(CriticalOSFileMissing.value);
    }
    ;
    if (v instanceof CriticalOSFileMissing) {
      return new Just(CannotCreateOutputFile.value);
    }
    ;
    if (v instanceof CannotCreateOutputFile) {
      return new Just(IOError.value);
    }
    ;
    if (v instanceof IOError) {
      return new Just(TemporaryFailure.value);
    }
    ;
    if (v instanceof TemporaryFailure) {
      return new Just(RemoteError.value);
    }
    ;
    if (v instanceof RemoteError) {
      return new Just(PermissionDenied.value);
    }
    ;
    if (v instanceof PermissionDenied) {
      return new Just(ConfigurationError.value);
    }
    ;
    if (v instanceof ConfigurationError) {
      return new Just(CannotExecute.value);
    }
    ;
    if (v instanceof CannotExecute) {
      return new Just(CommandNotFound.value);
    }
    ;
    if (v instanceof CommandNotFound) {
      return new Just(InvalidExitArgument.value);
    }
    ;
    if (v instanceof InvalidExitArgument) {
      return new Just(SIGHUP.value);
    }
    ;
    if (v instanceof SIGHUP) {
      return new Just(SIGINT.value);
    }
    ;
    if (v instanceof SIGINT) {
      return new Just(SIGQUIT.value);
    }
    ;
    if (v instanceof SIGQUIT) {
      return new Just(SIGILL.value);
    }
    ;
    if (v instanceof SIGILL) {
      return new Just(SIGABRT.value);
    }
    ;
    if (v instanceof SIGABRT) {
      return new Just(SIGFPE.value);
    }
    ;
    if (v instanceof SIGFPE) {
      return new Just(SIGKILL.value);
    }
    ;
    if (v instanceof SIGKILL) {
      return new Just(SIGSEGV.value);
    }
    ;
    if (v instanceof SIGSEGV) {
      return new Just(SIGPIPE.value);
    }
    ;
    if (v instanceof SIGPIPE) {
      return new Just(SIGALRM.value);
    }
    ;
    if (v instanceof SIGALRM) {
      return new Just(SIGTERM.value);
    }
    ;
    if (v instanceof SIGTERM) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at ExitCodes (line 87, column 1 - line 151, column 30): " + [v.constructor.name]);
  },
  pred: function(v) {
    if (v instanceof Success) {
      return Nothing.value;
    }
    ;
    if (v instanceof $$Error) {
      return new Just(Success.value);
    }
    ;
    if (v instanceof MisuseOfShellBuiltins) {
      return new Just($$Error.value);
    }
    ;
    if (v instanceof CLIUsageError) {
      return new Just(MisuseOfShellBuiltins.value);
    }
    ;
    if (v instanceof DataFormatError) {
      return new Just(CLIUsageError.value);
    }
    ;
    if (v instanceof CannotOpenInput) {
      return new Just(DataFormatError.value);
    }
    ;
    if (v instanceof AddresseeUnknown) {
      return new Just(CannotOpenInput.value);
    }
    ;
    if (v instanceof HostNameUnknown) {
      return new Just(AddresseeUnknown.value);
    }
    ;
    if (v instanceof ServiceUnavailable) {
      return new Just(HostNameUnknown.value);
    }
    ;
    if (v instanceof InternalSoftwareError) {
      return new Just(ServiceUnavailable.value);
    }
    ;
    if (v instanceof SystemError) {
      return new Just(InternalSoftwareError.value);
    }
    ;
    if (v instanceof CriticalOSFileMissing) {
      return new Just(SystemError.value);
    }
    ;
    if (v instanceof CannotCreateOutputFile) {
      return new Just(CriticalOSFileMissing.value);
    }
    ;
    if (v instanceof IOError) {
      return new Just(CannotCreateOutputFile.value);
    }
    ;
    if (v instanceof TemporaryFailure) {
      return new Just(IOError.value);
    }
    ;
    if (v instanceof RemoteError) {
      return new Just(TemporaryFailure.value);
    }
    ;
    if (v instanceof PermissionDenied) {
      return new Just(RemoteError.value);
    }
    ;
    if (v instanceof ConfigurationError) {
      return new Just(PermissionDenied.value);
    }
    ;
    if (v instanceof CannotExecute) {
      return new Just(ConfigurationError.value);
    }
    ;
    if (v instanceof CommandNotFound) {
      return new Just(CannotExecute.value);
    }
    ;
    if (v instanceof InvalidExitArgument) {
      return new Just(CommandNotFound.value);
    }
    ;
    if (v instanceof SIGHUP) {
      return new Just(InvalidExitArgument.value);
    }
    ;
    if (v instanceof SIGINT) {
      return new Just(SIGHUP.value);
    }
    ;
    if (v instanceof SIGQUIT) {
      return new Just(SIGINT.value);
    }
    ;
    if (v instanceof SIGILL) {
      return new Just(SIGQUIT.value);
    }
    ;
    if (v instanceof SIGABRT) {
      return new Just(SIGILL.value);
    }
    ;
    if (v instanceof SIGFPE) {
      return new Just(SIGABRT.value);
    }
    ;
    if (v instanceof SIGKILL) {
      return new Just(SIGFPE.value);
    }
    ;
    if (v instanceof SIGSEGV) {
      return new Just(SIGKILL.value);
    }
    ;
    if (v instanceof SIGPIPE) {
      return new Just(SIGSEGV.value);
    }
    ;
    if (v instanceof SIGALRM) {
      return new Just(SIGPIPE.value);
    }
    ;
    if (v instanceof SIGTERM) {
      return new Just(SIGALRM.value);
    }
    ;
    throw new Error("Failed pattern match at ExitCodes (line 87, column 1 - line 151, column 30): " + [v.constructor.name]);
  },
  Ord0: function() {
    return ordExitCode;
  }
};
var boundedExitCode = /* @__PURE__ */ function() {
  return {
    bottom: Success.value,
    top: SIGTERM.value,
    Ord0: function() {
      return ordExitCode;
    }
  };
}();
var boundedEnumExitCode = {
  cardinality: 32,
  toEnum: function(v) {
    if (v === 0) {
      return new Just(Success.value);
    }
    ;
    if (v === 1) {
      return new Just($$Error.value);
    }
    ;
    if (v === 2) {
      return new Just(MisuseOfShellBuiltins.value);
    }
    ;
    if (v === 64) {
      return new Just(CLIUsageError.value);
    }
    ;
    if (v === 65) {
      return new Just(DataFormatError.value);
    }
    ;
    if (v === 66) {
      return new Just(CannotOpenInput.value);
    }
    ;
    if (v === 67) {
      return new Just(AddresseeUnknown.value);
    }
    ;
    if (v === 68) {
      return new Just(HostNameUnknown.value);
    }
    ;
    if (v === 69) {
      return new Just(ServiceUnavailable.value);
    }
    ;
    if (v === 70) {
      return new Just(InternalSoftwareError.value);
    }
    ;
    if (v === 71) {
      return new Just(SystemError.value);
    }
    ;
    if (v === 72) {
      return new Just(CriticalOSFileMissing.value);
    }
    ;
    if (v === 73) {
      return new Just(CannotCreateOutputFile.value);
    }
    ;
    if (v === 74) {
      return new Just(IOError.value);
    }
    ;
    if (v === 75) {
      return new Just(TemporaryFailure.value);
    }
    ;
    if (v === 76) {
      return new Just(RemoteError.value);
    }
    ;
    if (v === 77) {
      return new Just(PermissionDenied.value);
    }
    ;
    if (v === 78) {
      return new Just(ConfigurationError.value);
    }
    ;
    if (v === 126) {
      return new Just(CannotExecute.value);
    }
    ;
    if (v === 127) {
      return new Just(CommandNotFound.value);
    }
    ;
    if (v === 128) {
      return new Just(InvalidExitArgument.value);
    }
    ;
    if (v === 129) {
      return new Just(SIGHUP.value);
    }
    ;
    if (v === 130) {
      return new Just(SIGINT.value);
    }
    ;
    if (v === 131) {
      return new Just(SIGQUIT.value);
    }
    ;
    if (v === 132) {
      return new Just(SIGILL.value);
    }
    ;
    if (v === 134) {
      return new Just(SIGABRT.value);
    }
    ;
    if (v === 136) {
      return new Just(SIGFPE.value);
    }
    ;
    if (v === 137) {
      return new Just(SIGKILL.value);
    }
    ;
    if (v === 139) {
      return new Just(SIGSEGV.value);
    }
    ;
    if (v === 141) {
      return new Just(SIGPIPE.value);
    }
    ;
    if (v === 142) {
      return new Just(SIGALRM.value);
    }
    ;
    if (v === 143) {
      return new Just(SIGTERM.value);
    }
    ;
    return Nothing.value;
  },
  fromEnum: function(v) {
    if (v instanceof Success) {
      return 0;
    }
    ;
    if (v instanceof $$Error) {
      return 1;
    }
    ;
    if (v instanceof MisuseOfShellBuiltins) {
      return 2;
    }
    ;
    if (v instanceof CLIUsageError) {
      return 64;
    }
    ;
    if (v instanceof DataFormatError) {
      return 65;
    }
    ;
    if (v instanceof CannotOpenInput) {
      return 66;
    }
    ;
    if (v instanceof AddresseeUnknown) {
      return 67;
    }
    ;
    if (v instanceof HostNameUnknown) {
      return 68;
    }
    ;
    if (v instanceof ServiceUnavailable) {
      return 69;
    }
    ;
    if (v instanceof InternalSoftwareError) {
      return 70;
    }
    ;
    if (v instanceof SystemError) {
      return 71;
    }
    ;
    if (v instanceof CriticalOSFileMissing) {
      return 72;
    }
    ;
    if (v instanceof CannotCreateOutputFile) {
      return 73;
    }
    ;
    if (v instanceof IOError) {
      return 74;
    }
    ;
    if (v instanceof TemporaryFailure) {
      return 75;
    }
    ;
    if (v instanceof RemoteError) {
      return 76;
    }
    ;
    if (v instanceof PermissionDenied) {
      return 77;
    }
    ;
    if (v instanceof ConfigurationError) {
      return 78;
    }
    ;
    if (v instanceof CannotExecute) {
      return 126;
    }
    ;
    if (v instanceof CommandNotFound) {
      return 127;
    }
    ;
    if (v instanceof InvalidExitArgument) {
      return 128;
    }
    ;
    if (v instanceof SIGHUP) {
      return 128 + 1 | 0;
    }
    ;
    if (v instanceof SIGINT) {
      return 128 + 2 | 0;
    }
    ;
    if (v instanceof SIGQUIT) {
      return 128 + 3 | 0;
    }
    ;
    if (v instanceof SIGILL) {
      return 128 + 4 | 0;
    }
    ;
    if (v instanceof SIGABRT) {
      return 128 + 6 | 0;
    }
    ;
    if (v instanceof SIGFPE) {
      return 128 + 8 | 0;
    }
    ;
    if (v instanceof SIGKILL) {
      return 128 + 9 | 0;
    }
    ;
    if (v instanceof SIGSEGV) {
      return 128 + 11 | 0;
    }
    ;
    if (v instanceof SIGPIPE) {
      return 128 + 13 | 0;
    }
    ;
    if (v instanceof SIGALRM) {
      return 128 + 14 | 0;
    }
    ;
    if (v instanceof SIGTERM) {
      return 128 + 15 | 0;
    }
    ;
    throw new Error("Failed pattern match at ExitCodes (line 153, column 1 - line 219, column 30): " + [v.constructor.name]);
  },
  Bounded0: function() {
    return boundedExitCode;
  },
  Enum1: function() {
    return enumExitCode;
  }
};

// output/Data.String.CodePoints/foreign.js
var hasArrayFrom = typeof Array.from === "function";
var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
var hasCodePointAt = typeof String.prototype.codePointAt === "function";
var _unsafeCodePointAt0 = function(fallback) {
  return hasCodePointAt ? function(str2) {
    return str2.codePointAt(0);
  } : fallback;
};
var _toCodePointArray = function(fallback) {
  return function(unsafeCodePointAt02) {
    if (hasArrayFrom) {
      return function(str2) {
        return Array.from(str2, unsafeCodePointAt02);
      };
    }
    return fallback;
  };
};

// output/Data.Enum/foreign.js
function toCharCode(c) {
  return c.charCodeAt(0);
}
function fromCharCode(c) {
  return String.fromCharCode(c);
}

// output/Control.Alternative/index.js
var guard = function(dictAlternative) {
  return function(v) {
    if (v) {
      return pure(dictAlternative.Applicative0())(unit);
    }
    ;
    if (!v) {
      return empty(dictAlternative.Plus1());
    }
    ;
    throw new Error("Failed pattern match at Control.Alternative (line 48, column 1 - line 48, column 54): " + [v.constructor.name]);
  };
};

// output/Data.Enum/index.js
var fromEnum = function(dict) {
  return dict.fromEnum;
};
var defaultSucc = function(toEnum$prime) {
  return function(fromEnum$prime) {
    return function(a) {
      return toEnum$prime(fromEnum$prime(a) + 1 | 0);
    };
  };
};
var defaultPred = function(toEnum$prime) {
  return function(fromEnum$prime) {
    return function(a) {
      return toEnum$prime(fromEnum$prime(a) - 1 | 0);
    };
  };
};
var charToEnum = function(v) {
  if (v >= bottom(boundedInt) && v <= top(boundedInt)) {
    return new Just(fromCharCode(v));
  }
  ;
  return Nothing.value;
};
var enumChar = {
  succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
  pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
  Ord0: function() {
    return ordChar;
  }
};
var boundedEnumChar = /* @__PURE__ */ function() {
  return {
    cardinality: toCharCode(top(boundedChar)) - toCharCode(bottom(boundedChar)) | 0,
    toEnum: charToEnum,
    fromEnum: toCharCode,
    Bounded0: function() {
      return boundedChar;
    },
    Enum1: function() {
      return enumChar;
    }
  };
}();

// output/Data.String.CodePoints/index.js
var unsurrogate = function(lead) {
  return function(trail) {
    return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
  };
};
var isTrail = function(cu) {
  return 56320 <= cu && cu <= 57343;
};
var isLead = function(cu) {
  return 55296 <= cu && cu <= 56319;
};
var uncons3 = function(s) {
  var v = length3(s);
  if (v === 0) {
    return Nothing.value;
  }
  ;
  if (v === 1) {
    return new Just({
      head: fromEnum(boundedEnumChar)(charAt(0)(s)),
      tail: ""
    });
  }
  ;
  var cu1 = fromEnum(boundedEnumChar)(charAt(1)(s));
  var cu0 = fromEnum(boundedEnumChar)(charAt(0)(s));
  var $21 = isLead(cu0) && isTrail(cu1);
  if ($21) {
    return new Just({
      head: unsurrogate(cu0)(cu1),
      tail: drop3(2)(s)
    });
  }
  ;
  return new Just({
    head: cu0,
    tail: drop3(1)(s)
  });
};
var unconsButWithTuple = function(s) {
  return map(functorMaybe)(function(v) {
    return new Tuple(v.head, v.tail);
  })(uncons3(s));
};
var toCodePointArrayFallback = function(s) {
  return unfoldr(unfoldableArray)(unconsButWithTuple)(s);
};
var unsafeCodePointAt0Fallback = function(s) {
  var cu0 = fromEnum(boundedEnumChar)(charAt(0)(s));
  var $25 = isLead(cu0) && length3(s) > 1;
  if ($25) {
    var cu1 = fromEnum(boundedEnumChar)(charAt(1)(s));
    var $26 = isTrail(cu1);
    if ($26) {
      return unsurrogate(cu0)(cu1);
    }
    ;
    return cu0;
  }
  ;
  return cu0;
};
var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
var length4 = function($52) {
  return length2(toCodePointArray($52));
};
var indexOf2 = function(p) {
  return function(s) {
    return map(functorMaybe)(function(i) {
      return length4(take2(i)(s));
    })(indexOf(p)(s));
  };
};

// output/Data.String.Regex/foreign.js
var regexImpl = function(left) {
  return function(right) {
    return function(s1) {
      return function(s2) {
        try {
          return right(new RegExp(s1, s2));
        } catch (e) {
          return left(e.message);
        }
      };
    };
  };
};
var split2 = function(r) {
  return function(s) {
    return s.split(r);
  };
};

// output/Data.String.Regex.Flags/index.js
var noFlags = {
  global: false,
  ignoreCase: false,
  multiline: false,
  dotAll: false,
  sticky: false,
  unicode: false
};

// output/Data.String.Regex/index.js
var renderFlags = function(v) {
  return function() {
    if (v.global) {
      return "g";
    }
    ;
    return "";
  }() + (function() {
    if (v.ignoreCase) {
      return "i";
    }
    ;
    return "";
  }() + (function() {
    if (v.multiline) {
      return "m";
    }
    ;
    return "";
  }() + (function() {
    if (v.dotAll) {
      return "s";
    }
    ;
    return "";
  }() + (function() {
    if (v.sticky) {
      return "y";
    }
    ;
    return "";
  }() + function() {
    if (v.unicode) {
      return "u";
    }
    ;
    return "";
  }()))));
};
var regex = function(s) {
  return function(f) {
    return regexImpl(Left.create)(Right.create)(s)(renderFlags(f));
  };
};

// output/Options.Applicative.Internal.Utils/index.js
var whitespaceRegex = /* @__PURE__ */ function() {
  var v = regex("\\s+")(noFlags);
  if (v instanceof Left) {
    return unsafeCrashWith("whitespaceRegex: `\\s+` seems to be invlaid, err: " + v.value0);
  }
  ;
  if (v instanceof Right) {
    return v.value0;
  }
  ;
  throw new Error("Failed pattern match at Options.Applicative.Internal.Utils (line 39, column 19 - line 41, column 15): " + [v.constructor.name]);
}();
var words = function(v) {
  if (v === "") {
    return [];
  }
  ;
  return split2(whitespaceRegex)(v);
};
var unWords = function(dictFoldable) {
  return intercalate2(dictFoldable)(monoidString)(" ");
};
var unLines = function(dictFoldable) {
  return intercalate2(dictFoldable)(monoidString)("\n");
};
var startsWith = function(p) {
  return function(s) {
    return eq(eqMaybe(eqInt))(indexOf2(p)(s))(new Just(0));
  };
};
var lines = function(v) {
  if (v === "") {
    return [];
  }
  ;
  return split("\n")(v);
};
var apApplyFlipped = function(dictApply) {
  return lift2(dictApply)(applyFlipped);
};

// output/Data.CatQueue/index.js
var CatQueue = /* @__PURE__ */ function() {
  function CatQueue2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  CatQueue2.create = function(value0) {
    return function(value1) {
      return new CatQueue2(value0, value1);
    };
  };
  return CatQueue2;
}();
var uncons4 = function($copy_v) {
  var $tco_done = false;
  var $tco_result;
  function $tco_loop(v) {
    if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
      $tco_done = true;
      return Nothing.value;
    }
    ;
    if (v.value0 instanceof Nil) {
      $copy_v = new CatQueue(reverse(v.value1), Nil.value);
      return;
    }
    ;
    if (v.value0 instanceof Cons) {
      $tco_done = true;
      return new Just(new Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
    }
    ;
    throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v.constructor.name]);
  }
  ;
  while (!$tco_done) {
    $tco_result = $tco_loop($copy_v);
  }
  ;
  return $tco_result;
};
var snoc2 = function(v) {
  return function(a) {
    return new CatQueue(v.value0, new Cons(a, v.value1));
  };
};
var $$null3 = function(v) {
  if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
    return true;
  }
  ;
  return false;
};
var empty5 = /* @__PURE__ */ function() {
  return new CatQueue(Nil.value, Nil.value);
}();

// output/Data.CatList/index.js
var CatNil = /* @__PURE__ */ function() {
  function CatNil2() {
  }
  ;
  CatNil2.value = new CatNil2();
  return CatNil2;
}();
var CatCons = /* @__PURE__ */ function() {
  function CatCons2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  CatCons2.create = function(value0) {
    return function(value1) {
      return new CatCons2(value0, value1);
    };
  };
  return CatCons2;
}();
var link = function(v) {
  return function(v1) {
    if (v instanceof CatNil) {
      return v1;
    }
    ;
    if (v1 instanceof CatNil) {
      return v;
    }
    ;
    if (v instanceof CatCons) {
      return new CatCons(v.value0, snoc2(v.value1)(v1));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
  };
};
var foldr3 = function(k) {
  return function(b) {
    return function(q) {
      var foldl2 = function($copy_v) {
        return function($copy_c) {
          return function($copy_v1) {
            var $tco_var_v = $copy_v;
            var $tco_var_c = $copy_c;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v, c, v1) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return c;
              }
              ;
              if (v1 instanceof Cons) {
                $tco_var_v = v;
                $tco_var_c = v(c)(v1.value0);
                $copy_v1 = v1.value1;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, c.constructor.name, v1.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v, $tco_var_c, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
      };
      var go = function($copy_xs) {
        return function($copy_ys) {
          var $tco_var_xs = $copy_xs;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(xs, ys) {
            var v = uncons4(xs);
            if (v instanceof Nothing) {
              $tco_done1 = true;
              return foldl2(function(x) {
                return function(i) {
                  return i(x);
                };
              })(b)(ys);
            }
            ;
            if (v instanceof Just) {
              $tco_var_xs = v.value0.value1;
              $copy_ys = new Cons(k(v.value0.value0), ys);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_xs, $copy_ys);
          }
          ;
          return $tco_result;
        };
      };
      return go(q)(Nil.value);
    };
  };
};
var uncons5 = function(v) {
  if (v instanceof CatNil) {
    return Nothing.value;
  }
  ;
  if (v instanceof CatCons) {
    return new Just(new Tuple(v.value0, function() {
      var $45 = $$null3(v.value1);
      if ($45) {
        return CatNil.value;
      }
      ;
      return foldr3(link)(CatNil.value)(v.value1);
    }()));
  }
  ;
  throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
};
var empty6 = /* @__PURE__ */ function() {
  return CatNil.value;
}();
var append2 = link;
var semigroupCatList = {
  append: append2
};
var snoc3 = function(cat) {
  return function(a) {
    return append2(cat)(new CatCons(a, empty5));
  };
};

// output/Control.Monad.Free/index.js
var $runtime_lazy2 = function(name3, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var Free = /* @__PURE__ */ function() {
  function Free2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Free2.create = function(value0) {
    return function(value1) {
      return new Free2(value0, value1);
    };
  };
  return Free2;
}();
var Return = /* @__PURE__ */ function() {
  function Return2(value0) {
    this.value0 = value0;
  }
  ;
  Return2.create = function(value0) {
    return new Return2(value0);
  };
  return Return2;
}();
var Bind = /* @__PURE__ */ function() {
  function Bind2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Bind2.create = function(value0) {
    return function(value1) {
      return new Bind2(value0, value1);
    };
  };
  return Bind2;
}();
var toView = function($copy_v) {
  var $tco_done = false;
  var $tco_result;
  function $tco_loop(v) {
    var runExpF = function(v22) {
      return v22;
    };
    var concatF = function(v22) {
      return function(r) {
        return new Free(v22.value0, append(semigroupCatList)(v22.value1)(r));
      };
    };
    if (v.value0 instanceof Return) {
      var v2 = uncons5(v.value1);
      if (v2 instanceof Nothing) {
        $tco_done = true;
        return new Return(v.value0.value0);
      }
      ;
      if (v2 instanceof Just) {
        $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
        return;
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
    }
    ;
    if (v.value0 instanceof Bind) {
      $tco_done = true;
      return new Bind(v.value0.value0, function(a) {
        return concatF(v.value0.value1(a))(v.value1);
      });
    }
    ;
    throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
  }
  ;
  while (!$tco_done) {
    $tco_result = $tco_loop($copy_v);
  }
  ;
  return $tco_result;
};
var resume$prime = function(k) {
  return function(j) {
    return function(f) {
      var v = toView(f);
      if (v instanceof Return) {
        return j(v.value0);
      }
      ;
      if (v instanceof Bind) {
        return k(v.value0)(v.value1);
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 213, column 17 - line 215, column 20): " + [v.constructor.name]);
    };
  };
};
var fromView = function(f) {
  return new Free(f, empty6);
};
var freeMonad = {
  Applicative0: function() {
    return freeApplicative;
  },
  Bind1: function() {
    return freeBind;
  }
};
var freeFunctor = {
  map: function(k) {
    return function(f) {
      return bindFlipped(freeBind)(function() {
        var $119 = pure(freeApplicative);
        return function($120) {
          return $119(k($120));
        };
      }())(f);
    };
  }
};
var freeBind = {
  bind: function(v) {
    return function(k) {
      return new Free(v.value0, snoc3(v.value1)(k));
    };
  },
  Apply0: function() {
    return $lazy_freeApply(0);
  }
};
var freeApplicative = {
  pure: function($121) {
    return fromView(Return.create($121));
  },
  Apply0: function() {
    return $lazy_freeApply(0);
  }
};
var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy2("freeApply", "Control.Monad.Free", function() {
  return {
    apply: ap(freeMonad),
    Functor0: function() {
      return freeFunctor;
    }
  };
});
var freeMonadRec = {
  tailRecM: function(k) {
    return function(a) {
      return bind(freeBind)(k(a))(function(v) {
        if (v instanceof Loop) {
          return tailRecM(freeMonadRec)(k)(v.value0);
        }
        ;
        if (v instanceof Done) {
          return pure(freeApplicative)(v.value0);
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 86, column 26 - line 88, column 21): " + [v.constructor.name]);
      });
    };
  },
  Monad0: function() {
    return freeMonad;
  }
};
var liftF = function(f) {
  return fromView(new Bind(f, function() {
    var $122 = pure(freeApplicative);
    return function($123) {
      return $122($123);
    };
  }()));
};

// output/Control.Monad.Reader.Trans/index.js
var ReaderT = function(x) {
  return x;
};
var runReaderT = function(v) {
  return v;
};
var monadTransReaderT = {
  lift: function(dictMonad) {
    return function($63) {
      return ReaderT($$const($63));
    };
  }
};
var mapReaderT = function(f) {
  return function(v) {
    return function($64) {
      return f(v($64));
    };
  };
};
var functorReaderT = function(dictFunctor) {
  return {
    map: function() {
      var $65 = map(dictFunctor);
      return function($66) {
        return mapReaderT($65($66));
      };
    }()
  };
};
var applyReaderT = function(dictApply) {
  return {
    apply: function(v) {
      return function(v1) {
        return function(r) {
          return apply(dictApply)(v(r))(v1(r));
        };
      };
    },
    Functor0: function() {
      return functorReaderT(dictApply.Functor0());
    }
  };
};
var bindReaderT = function(dictBind) {
  return {
    bind: function(v) {
      return function(k) {
        return function(r) {
          return bind(dictBind)(v(r))(function(a) {
            var v1 = k(a);
            return v1(r);
          });
        };
      };
    },
    Apply0: function() {
      return applyReaderT(dictBind.Apply0());
    }
  };
};
var applicativeReaderT = function(dictApplicative) {
  return {
    pure: function() {
      var $70 = pure(dictApplicative);
      return function($71) {
        return ReaderT($$const($70($71)));
      };
    }(),
    Apply0: function() {
      return applyReaderT(dictApplicative.Apply0());
    }
  };
};
var monadReaderT = function(dictMonad) {
  return {
    Applicative0: function() {
      return applicativeReaderT(dictMonad.Applicative0());
    },
    Bind1: function() {
      return bindReaderT(dictMonad.Bind1());
    }
  };
};
var monadAskReaderT = function(dictMonad) {
  return {
    ask: pure(dictMonad.Applicative0()),
    Monad0: function() {
      return monadReaderT(dictMonad);
    }
  };
};

// output/Data.Exists/index.js
var runExists = unsafeCoerce2;
var mkExists = unsafeCoerce2;

// output/Text.PrettyPrint.Leijen/index.js
var SFail = /* @__PURE__ */ function() {
  function SFail2() {
  }
  ;
  SFail2.value = new SFail2();
  return SFail2;
}();
var SEmpty = /* @__PURE__ */ function() {
  function SEmpty2() {
  }
  ;
  SEmpty2.value = new SEmpty2();
  return SEmpty2;
}();
var SChar = /* @__PURE__ */ function() {
  function SChar2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  SChar2.create = function(value0) {
    return function(value1) {
      return new SChar2(value0, value1);
    };
  };
  return SChar2;
}();
var SText = /* @__PURE__ */ function() {
  function SText2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  SText2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new SText2(value0, value1, value2);
      };
    };
  };
  return SText2;
}();
var SLine = /* @__PURE__ */ function() {
  function SLine2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  SLine2.create = function(value0) {
    return function(value1) {
      return new SLine2(value0, value1);
    };
  };
  return SLine2;
}();
var SFail$prime = /* @__PURE__ */ function() {
  function SFail$prime2() {
  }
  ;
  SFail$prime2.value = new SFail$prime2();
  return SFail$prime2;
}();
var SEmpty$prime = /* @__PURE__ */ function() {
  function SEmpty$prime2() {
  }
  ;
  SEmpty$prime2.value = new SEmpty$prime2();
  return SEmpty$prime2;
}();
var SChar$prime = /* @__PURE__ */ function() {
  function SChar$prime2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  SChar$prime2.create = function(value0) {
    return function(value1) {
      return new SChar$prime2(value0, value1);
    };
  };
  return SChar$prime2;
}();
var SText$prime = /* @__PURE__ */ function() {
  function SText$prime2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  SText$prime2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new SText$prime2(value0, value1, value2);
      };
    };
  };
  return SText$prime2;
}();
var SLine$prime = /* @__PURE__ */ function() {
  function SLine$prime2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  SLine$prime2.create = function(value0) {
    return function(value1) {
      return new SLine$prime2(value0, value1);
    };
  };
  return SLine$prime2;
}();
var Fail = /* @__PURE__ */ function() {
  function Fail2() {
  }
  ;
  Fail2.value = new Fail2();
  return Fail2;
}();
var Empty = /* @__PURE__ */ function() {
  function Empty2() {
  }
  ;
  Empty2.value = new Empty2();
  return Empty2;
}();
var Char = /* @__PURE__ */ function() {
  function Char2(value0) {
    this.value0 = value0;
  }
  ;
  Char2.create = function(value0) {
    return new Char2(value0);
  };
  return Char2;
}();
var Text = /* @__PURE__ */ function() {
  function Text2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Text2.create = function(value0) {
    return function(value1) {
      return new Text2(value0, value1);
    };
  };
  return Text2;
}();
var Line = /* @__PURE__ */ function() {
  function Line2() {
  }
  ;
  Line2.value = new Line2();
  return Line2;
}();
var FlatAlt = /* @__PURE__ */ function() {
  function FlatAlt2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  FlatAlt2.create = function(value0) {
    return function(value1) {
      return new FlatAlt2(value0, value1);
    };
  };
  return FlatAlt2;
}();
var Cat = /* @__PURE__ */ function() {
  function Cat2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Cat2.create = function(value0) {
    return function(value1) {
      return new Cat2(value0, value1);
    };
  };
  return Cat2;
}();
var Nest = /* @__PURE__ */ function() {
  function Nest2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Nest2.create = function(value0) {
    return function(value1) {
      return new Nest2(value0, value1);
    };
  };
  return Nest2;
}();
var Union = /* @__PURE__ */ function() {
  function Union2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Union2.create = function(value0) {
    return function(value1) {
      return new Union2(value0, value1);
    };
  };
  return Union2;
}();
var Column = /* @__PURE__ */ function() {
  function Column2(value0) {
    this.value0 = value0;
  }
  ;
  Column2.create = function(value0) {
    return new Column2(value0);
  };
  return Column2;
}();
var Columns = /* @__PURE__ */ function() {
  function Columns2(value0) {
    this.value0 = value0;
  }
  ;
  Columns2.create = function(value0) {
    return new Columns2(value0);
  };
  return Columns2;
}();
var Nesting = /* @__PURE__ */ function() {
  function Nesting2(value0) {
    this.value0 = value0;
  }
  ;
  Nesting2.create = function(value0) {
    return new Nesting2(value0);
  };
  return Nesting2;
}();
var Nil3 = /* @__PURE__ */ function() {
  function Nil4() {
  }
  ;
  Nil4.value = new Nil4();
  return Nil4;
}();
var Cons3 = /* @__PURE__ */ function() {
  function Cons4(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  Cons4.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new Cons4(value0, value1, value2);
      };
    };
  };
  return Cons4;
}();
var text = function(v) {
  if (v === "") {
    return Empty.value;
  }
  ;
  return new Text(length4(v), v);
};
var spaces = function(n) {
  if (n <= 0) {
    return "";
  }
  ;
  if (otherwise) {
    return fromCharArray(replicate(n)(" "));
  }
  ;
  throw new Error("Failed pattern match at Text.PrettyPrint.Leijen (line 908, column 1 - line 908, column 24): " + [n.constructor.name]);
};
var space = /* @__PURE__ */ function() {
  return new Char(" ");
}();
var rparen = /* @__PURE__ */ function() {
  return new Char(")");
}();
var rbracket = /* @__PURE__ */ function() {
  return new Char("]");
}();
var nesting = function(f) {
  return new Nesting(f);
};
var nest = function(i) {
  return function(x) {
    return new Nest(i, x);
  };
};
var lparen = /* @__PURE__ */ function() {
  return new Char("(");
}();
var line = /* @__PURE__ */ function() {
  return new FlatAlt(Line.value, space);
}();
var lbracket = /* @__PURE__ */ function() {
  return new Char("[");
}();
var indentation = function(n) {
  return spaces(n);
};
var forceSimpleDoc = function(v) {
  if (v instanceof SFail$prime) {
    return SFail.value;
  }
  ;
  if (v instanceof SEmpty$prime) {
    return SEmpty.value;
  }
  ;
  if (v instanceof SChar$prime) {
    return new SChar(v.value0, forceSimpleDoc(force(v.value1)));
  }
  ;
  if (v instanceof SText$prime) {
    return new SText(v.value0, v.value1, forceSimpleDoc(force(v.value2)));
  }
  ;
  if (v instanceof SLine$prime) {
    return new SLine(v.value0, forceSimpleDoc(force(v.value1)));
  }
  ;
  throw new Error("Failed pattern match at Text.PrettyPrint.Leijen (line 600, column 18 - line 605, column 51): " + [v.constructor.name]);
};
var renderFits = function(fits) {
  return function(rfrac) {
    return function(w) {
      return function(headNode) {
        var r = max(ordInt)(0)(min(ordInt)(w)(round2(toNumber(w) * rfrac)));
        var nicest$prime = function(n) {
          return function(k) {
            return function(i) {
              return function(ds) {
                return function(x) {
                  return function(y) {
                    var x$prime = best(n)(k)(new Cons3(i, x, ds));
                    var width$prime = min(ordInt)(w - k | 0)((r - k | 0) + n | 0);
                    var $166 = fits(w)(min(ordInt)(n)(k))(width$prime)(x$prime);
                    if ($166) {
                      return x$prime;
                    }
                    ;
                    var y$prime = best(n)(k)(new Cons3(i, y, ds));
                    return y$prime;
                  };
                };
              };
            };
          };
        };
        var best = function(n) {
          return function(k) {
            return function(v) {
              if (v instanceof Nil3) {
                return SEmpty$prime.value;
              }
              ;
              if (v instanceof Cons3) {
                if (v.value1 instanceof Fail) {
                  return SFail$prime.value;
                }
                ;
                if (v.value1 instanceof Empty) {
                  return best(n)(k)(v.value2);
                }
                ;
                if (v.value1 instanceof Char) {
                  var k$prime = k + 1 | 0;
                  return new SChar$prime(v.value1.value0, defer2(function(v1) {
                    return best(n)(k$prime)(v.value2);
                  }));
                }
                ;
                if (v.value1 instanceof Text) {
                  var k$prime = k + v.value1.value0 | 0;
                  return new SText$prime(v.value1.value0, v.value1.value1, defer2(function(v1) {
                    return best(n)(k$prime)(v.value2);
                  }));
                }
                ;
                if (v.value1 instanceof Line) {
                  return new SLine$prime(v.value0, defer2(function(v1) {
                    return best(v.value0)(v.value0)(v.value2);
                  }));
                }
                ;
                if (v.value1 instanceof FlatAlt) {
                  return best(n)(k)(new Cons3(v.value0, v.value1.value0, v.value2));
                }
                ;
                if (v.value1 instanceof Cat) {
                  return best(n)(k)(new Cons3(v.value0, v.value1.value0, new Cons3(v.value0, v.value1.value1, v.value2)));
                }
                ;
                if (v.value1 instanceof Nest) {
                  var i$prime = v.value0 + v.value1.value0 | 0;
                  return best(n)(k)(new Cons3(i$prime, v.value1.value1, v.value2));
                }
                ;
                if (v.value1 instanceof Union) {
                  return nicest$prime(n)(k)(v.value0)(v.value2)(v.value1.value0)(v.value1.value1);
                }
                ;
                if (v.value1 instanceof Column) {
                  return best(n)(k)(new Cons3(v.value0, v.value1.value0(k), v.value2));
                }
                ;
                if (v.value1 instanceof Columns) {
                  return best(n)(k)(new Cons3(v.value0, v.value1.value0(new Just(w)), v.value2));
                }
                ;
                if (v.value1 instanceof Nesting) {
                  return best(n)(k)(new Cons3(v.value0, v.value1.value0(v.value0), v.value2));
                }
                ;
                throw new Error("Failed pattern match at Text.PrettyPrint.Leijen (line 788, column 11 - line 802, column 56): " + [v.value1.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Text.PrettyPrint.Leijen (line 785, column 7 - line 785, column 50): " + [n.constructor.name, k.constructor.name, v.constructor.name]);
            };
          };
        };
        return forceSimpleDoc(best(0)(0)(new Cons3(0, headNode, Nil3.value)));
      };
    };
  };
};
var foldr1 = function(dictMonoid) {
  return function(f) {
    return function($242) {
      return function(v) {
        if (v instanceof Nothing) {
          return mempty(dictMonoid);
        }
        ;
        if (v instanceof Just) {
          return foldr(foldableArray)(f)(v.value0.last)(v.value0.init);
        }
        ;
        throw new Error("Failed pattern match at Text.PrettyPrint.Leijen (line 122, column 29 - line 124, column 43): " + [v.constructor.name]);
      }(unsnoc($242));
    };
  };
};
var flatten = function(v) {
  if (v instanceof FlatAlt) {
    return v.value1;
  }
  ;
  if (v instanceof Cat) {
    return new Cat(flatten(v.value0), flatten(v.value1));
  }
  ;
  if (v instanceof Nest) {
    return new Nest(v.value0, flatten(v.value1));
  }
  ;
  if (v instanceof Line) {
    return Fail.value;
  }
  ;
  if (v instanceof Union) {
    return flatten(v.value0);
  }
  ;
  if (v instanceof Column) {
    return new Column(function($243) {
      return flatten(v.value0($243));
    });
  }
  ;
  if (v instanceof Columns) {
    return new Columns(function($244) {
      return flatten(v.value0($244));
    });
  }
  ;
  if (v instanceof Nesting) {
    return new Nesting(function($245) {
      return flatten(v.value0($245));
    });
  }
  ;
  return v;
};
var group2 = function(x) {
  return new Union(flatten(x), x);
};
var softline = /* @__PURE__ */ group2(line);
var fits1 = function($copy_v) {
  return function($copy_v1) {
    return function($copy_w) {
      return function($copy_v2) {
        var $tco_var_v = $copy_v;
        var $tco_var_v1 = $copy_v1;
        var $tco_var_w = $copy_w;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1, w, v2) {
          if (w < 0) {
            $tco_done = true;
            return false;
          }
          ;
          if (v2 instanceof SFail$prime) {
            $tco_done = true;
            return false;
          }
          ;
          if (v2 instanceof SEmpty$prime) {
            $tco_done = true;
            return true;
          }
          ;
          if (v2 instanceof SChar$prime) {
            $tco_var_v = v;
            $tco_var_v1 = v1;
            $tco_var_w = w - 1 | 0;
            $copy_v2 = force(v2.value1);
            return;
          }
          ;
          if (v2 instanceof SText$prime) {
            $tco_var_v = v;
            $tco_var_v1 = v1;
            $tco_var_w = w - v2.value0 | 0;
            $copy_v2 = force(v2.value2);
            return;
          }
          ;
          if (v2 instanceof SLine$prime) {
            $tco_done = true;
            return true;
          }
          ;
          throw new Error("Failed pattern match at Text.PrettyPrint.Leijen (line 819, column 1 - line 819, column 55): " + [v.constructor.name, v1.constructor.name, w.constructor.name, v2.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $tco_var_w, $copy_v2);
        }
        ;
        return $tco_result;
      };
    };
  };
};
var renderPretty = /* @__PURE__ */ renderFits(fits1);
var empty7 = /* @__PURE__ */ function() {
  return Empty.value;
}();
var linebreak = /* @__PURE__ */ function() {
  return new FlatAlt(Line.value, empty7);
}();
var displayS = function(v) {
  if (v instanceof SFail) {
    return unsafeCrashWith("@SFail@ can not appear uncaught in a rendered @SimpleDoc@");
  }
  ;
  if (v instanceof SEmpty) {
    return "";
  }
  ;
  if (v instanceof SChar) {
    return fromCharArray([v.value0]) + displayS(v.value1);
  }
  ;
  if (v instanceof SText) {
    return v.value1 + displayS(v.value2);
  }
  ;
  if (v instanceof SLine) {
    return "\n" + (indentation(v.value0) + displayS(v.value1));
  }
  ;
  throw new Error("Failed pattern match at Text.PrettyPrint.Leijen (line 893, column 1 - line 893, column 32): " + [v.constructor.name]);
};
var column = function(f) {
  return new Column(f);
};
var $$char = function(v) {
  if (v === "\n") {
    return line;
  }
  ;
  return new Char(v);
};
var beside = function(x) {
  return function(y) {
    return new Cat(x, y);
  };
};
var docSemigroup = {
  append: beside
};
var docMonoid = {
  mempty: empty7,
  Semigroup0: function() {
    return docSemigroup;
  }
};
var string = /* @__PURE__ */ function() {
  var $248 = intercalate2(foldableArray)(docMonoid)(line);
  var $249 = map(functorArray)(text);
  var $250 = split("\n");
  return function($251) {
    return $248($249($250($251)));
  };
}();
var enclose = function(l) {
  return function(r) {
    return function(x) {
      return append(docSemigroup)(l)(append(docSemigroup)(x)(r));
    };
  };
};
var brackets = /* @__PURE__ */ enclose(lbracket)(rbracket);
var parens = /* @__PURE__ */ enclose(lparen)(rparen);
var width = function(d) {
  return function(f) {
    return column(function(k1) {
      return append(docSemigroup)(d)(column(function(k2) {
        return f(k2 - k1 | 0);
      }));
    });
  };
};
var fillBreak = function(f) {
  return function(x) {
    return width(x)(function(w) {
      var $237 = w > f;
      if ($237) {
        return nest(f)(linebreak);
      }
      ;
      return text(spaces(f - w | 0));
    });
  };
};
var appendWithSpace = function(x) {
  return function(y) {
    return append(docSemigroup)(x)(append(docSemigroup)(space)(y));
  };
};
var hsep = /* @__PURE__ */ foldr1(docMonoid)(appendWithSpace);
var appendWithSoftline = function(x) {
  return function(y) {
    return append(docSemigroup)(x)(append(docSemigroup)(softline)(y));
  };
};
var appendWithLinebreak = function(x) {
  return function(y) {
    return append(docSemigroup)(x)(append(docSemigroup)(linebreak)(y));
  };
};
var vcat = /* @__PURE__ */ foldr1(docMonoid)(appendWithLinebreak);
var appendWithLine = function(x) {
  return function(y) {
    return append(docSemigroup)(x)(append(docSemigroup)(line)(y));
  };
};
var align = function(d) {
  return column(function(k) {
    return nesting(function(i) {
      return nest(k - i | 0)(d);
    });
  });
};
var hang = function(i) {
  return function(d) {
    return align(nest(i)(d));
  };
};
var indent = function(i) {
  return function(d) {
    return hang(i)(append(docSemigroup)(text(spaces(i)))(d));
  };
};

// output/Options.Applicative.Help.Chunk/index.js
var Chunk = function(x) {
  return x;
};
var chunked = function(v) {
  return function(v1) {
    return function(v2) {
      if (v1 instanceof Nothing) {
        return v2;
      }
      ;
      if (v2 instanceof Nothing) {
        return v1;
      }
      ;
      if (v1 instanceof Just && v2 instanceof Just) {
        return new Just(v(v1.value0)(v2.value0));
      }
      ;
      throw new Error("Failed pattern match at Options.Applicative.Help.Chunk (line 57, column 1 - line 58, column 41): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var chunkSemigroup = function(dictSemigroup) {
  return {
    append: chunked(append(dictSemigroup))
  };
};
var extractChunk = function(dictMonoid) {
  var $31 = fromMaybe(mempty(dictMonoid));
  var $32 = un()(Chunk);
  return function($33) {
    return $31($32($33));
  };
};
var isEmpty2 = /* @__PURE__ */ function() {
  var $34 = un()(Chunk);
  return function($35) {
    return isNothing($34($35));
  };
}();
var chunkMonoid = function(dictSemigroup) {
  return {
    mempty: Nothing.value,
    Semigroup0: function() {
      return chunkSemigroup(dictSemigroup);
    }
  };
};
var vcatChunks = /* @__PURE__ */ foldr(foldableArray)(/* @__PURE__ */ chunked(appendWithLine))(/* @__PURE__ */ mempty(/* @__PURE__ */ chunkMonoid(docSemigroup)));
var vsepChunks = /* @__PURE__ */ foldr(foldableArray)(/* @__PURE__ */ chunked(function(x) {
  return function(y) {
    return appendWithLine(x)(appendWithLine(mempty(docMonoid))(y));
  };
}))(/* @__PURE__ */ mempty(/* @__PURE__ */ chunkMonoid(docSemigroup)));
var chunkFunctor = functorMaybe;
var chunkBesideOrBelow = /* @__PURE__ */ chunked(appendWithSoftline);
var chunkBeside = /* @__PURE__ */ chunked(appendWithSpace);
var chunkApply = applyMaybe;
var chunkApplicative = applicativeMaybe;
var listToChunk = function(dictMonoid) {
  return function(v) {
    if (v.length === 0) {
      return mempty(chunkMonoid(dictMonoid.Semigroup0()));
    }
    ;
    return pure(chunkApplicative)(fold(foldableArray)(dictMonoid)(v));
  };
};
var stringChunk = function(v) {
  if (v === "") {
    return mempty(chunkMonoid(docSemigroup));
  }
  ;
  return pure(chunkApplicative)(text(v));
};
var paragraph = /* @__PURE__ */ function() {
  var $36 = foldr(foldableArray)(function() {
    var $38 = chunked(appendWithSoftline);
    return function($39) {
      return $38(stringChunk($39));
    };
  }())(mempty(chunkMonoid(docSemigroup)));
  return function($37) {
    return $36(words($37));
  };
}();
var tabulate$prime = function(v) {
  return function(v1) {
    if (v1.length === 0) {
      return mempty(chunkMonoid(docSemigroup));
    }
    ;
    return pure(chunkApplicative)(vcat(mapFlipped(functorArray)(v1)(function(v2) {
      return indent(2)(appendWithSpace(fillBreak(v)(v2.value0))(v2.value1));
    })));
  };
};
var tabulate = /* @__PURE__ */ tabulate$prime(24);

// output/Options.Applicative.Help.Types/index.js
var ParserHelp = function(x) {
  return x;
};
var parserHelpMonoid = /* @__PURE__ */ monoidRecord()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "helpBody";
  }
})(/* @__PURE__ */ chunkMonoid(docSemigroup))()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "helpError";
  }
})(/* @__PURE__ */ chunkMonoid(docSemigroup))()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "helpFooter";
  }
})(/* @__PURE__ */ chunkMonoid(docSemigroup))()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "helpHeader";
  }
})(/* @__PURE__ */ chunkMonoid(docSemigroup))()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "helpSuggestions";
  }
})(/* @__PURE__ */ chunkMonoid(docSemigroup))()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "helpUsage";
  }
})(/* @__PURE__ */ chunkMonoid(docSemigroup))()(monoidRecordNil)))))));
var helpText = function(v) {
  return extractChunk(docMonoid)(vsepChunks([v.helpError, v.helpSuggestions, v.helpHeader, v.helpUsage, v.helpBody, v.helpFooter]));
};
var renderHelp = function(cols) {
  var $2 = renderPretty(1)(cols);
  return function($3) {
    return displayS($2(helpText($3)));
  };
};

// output/Options.Applicative.Types/index.js
var ParserFailure = function(x) {
  return x;
};
var Internal = /* @__PURE__ */ function() {
  function Internal2() {
  }
  ;
  Internal2.value = new Internal2();
  return Internal2;
}();
var Hidden = /* @__PURE__ */ function() {
  function Hidden2() {
  }
  ;
  Hidden2.value = new Hidden2();
  return Hidden2;
}();
var Visible = /* @__PURE__ */ function() {
  function Visible2() {
  }
  ;
  Visible2.value = new Visible2();
  return Visible2;
}();
var Leaf2 = /* @__PURE__ */ function() {
  function Leaf3(value0) {
    this.value0 = value0;
  }
  ;
  Leaf3.create = function(value0) {
    return new Leaf3(value0);
  };
  return Leaf3;
}();
var MultNode = /* @__PURE__ */ function() {
  function MultNode2(value0) {
    this.value0 = value0;
  }
  ;
  MultNode2.create = function(value0) {
    return new MultNode2(value0);
  };
  return MultNode2;
}();
var AltNode = /* @__PURE__ */ function() {
  function AltNode2(value0) {
    this.value0 = value0;
  }
  ;
  AltNode2.create = function(value0) {
    return new AltNode2(value0);
  };
  return AltNode2;
}();
var OptProperties = function(x) {
  return x;
};
var OptShort = /* @__PURE__ */ function() {
  function OptShort2(value0) {
    this.value0 = value0;
  }
  ;
  OptShort2.create = function(value0) {
    return new OptShort2(value0);
  };
  return OptShort2;
}();
var OptLong = /* @__PURE__ */ function() {
  function OptLong2(value0) {
    this.value0 = value0;
  }
  ;
  OptLong2.create = function(value0) {
    return new OptLong2(value0);
  };
  return OptLong2;
}();
var OptHelpInfo = function(x) {
  return x;
};
var CmdStart = /* @__PURE__ */ function() {
  function CmdStart2() {
  }
  ;
  CmdStart2.value = new CmdStart2();
  return CmdStart2;
}();
var CmdCont = /* @__PURE__ */ function() {
  function CmdCont2() {
  }
  ;
  CmdCont2.value = new CmdCont2();
  return CmdCont2;
}();
var CompletionResult = function(x) {
  return x;
};
var Success2 = /* @__PURE__ */ function() {
  function Success3(value0) {
    this.value0 = value0;
  }
  ;
  Success3.create = function(value0) {
    return new Success3(value0);
  };
  return Success3;
}();
var Failure = /* @__PURE__ */ function() {
  function Failure2(value0) {
    this.value0 = value0;
  }
  ;
  Failure2.create = function(value0) {
    return new Failure2(value0);
  };
  return Failure2;
}();
var CompletionInvoked = /* @__PURE__ */ function() {
  function CompletionInvoked2(value0) {
    this.value0 = value0;
  }
  ;
  CompletionInvoked2.create = function(value0) {
    return new CompletionInvoked2(value0);
  };
  return CompletionInvoked2;
}();
var Completer = function(x) {
  return x;
};
var Backtrack = /* @__PURE__ */ function() {
  function Backtrack2() {
  }
  ;
  Backtrack2.value = new Backtrack2();
  return Backtrack2;
}();
var NoBacktrack = /* @__PURE__ */ function() {
  function NoBacktrack2() {
  }
  ;
  NoBacktrack2.value = new NoBacktrack2();
  return NoBacktrack2;
}();
var SubparserInline = /* @__PURE__ */ function() {
  function SubparserInline2() {
  }
  ;
  SubparserInline2.value = new SubparserInline2();
  return SubparserInline2;
}();
var ParserPrefs = function(x) {
  return x;
};
var Intersperse = /* @__PURE__ */ function() {
  function Intersperse2() {
  }
  ;
  Intersperse2.value = new Intersperse2();
  return Intersperse2;
}();
var NoIntersperse = /* @__PURE__ */ function() {
  function NoIntersperse2() {
  }
  ;
  NoIntersperse2.value = new NoIntersperse2();
  return NoIntersperse2;
}();
var AllPositionals = /* @__PURE__ */ function() {
  function AllPositionals2() {
  }
  ;
  AllPositionals2.value = new AllPositionals2();
  return AllPositionals2;
}();
var ForwardOptions = /* @__PURE__ */ function() {
  function ForwardOptions2() {
  }
  ;
  ForwardOptions2.value = new ForwardOptions2();
  return ForwardOptions2;
}();
var ParserInfo = function(x) {
  return x;
};
var NilP = /* @__PURE__ */ function() {
  function NilP2(value0) {
    this.value0 = value0;
  }
  ;
  NilP2.create = function(value0) {
    return new NilP2(value0);
  };
  return NilP2;
}();
var OptP = /* @__PURE__ */ function() {
  function OptP2(value0) {
    this.value0 = value0;
  }
  ;
  OptP2.create = function(value0) {
    return new OptP2(value0);
  };
  return OptP2;
}();
var MultP = /* @__PURE__ */ function() {
  function MultP2(value0) {
    this.value0 = value0;
  }
  ;
  MultP2.create = function(value0) {
    return new MultP2(value0);
  };
  return MultP2;
}();
var AltP = /* @__PURE__ */ function() {
  function AltP2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  AltP2.create = function(value0) {
    return function(value1) {
      return new AltP2(value0, value1);
    };
  };
  return AltP2;
}();
var BindP = /* @__PURE__ */ function() {
  function BindP2(value0) {
    this.value0 = value0;
  }
  ;
  BindP2.create = function(value0) {
    return new BindP2(value0);
  };
  return BindP2;
}();
var Option = function(x) {
  return x;
};
var OptReader = /* @__PURE__ */ function() {
  function OptReader2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  OptReader2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new OptReader2(value0, value1, value2);
      };
    };
  };
  return OptReader2;
}();
var FlagReader = /* @__PURE__ */ function() {
  function FlagReader2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  FlagReader2.create = function(value0) {
    return function(value1) {
      return new FlagReader2(value0, value1);
    };
  };
  return FlagReader2;
}();
var ArgReader = /* @__PURE__ */ function() {
  function ArgReader2(value0) {
    this.value0 = value0;
  }
  ;
  ArgReader2.create = function(value0) {
    return new ArgReader2(value0);
  };
  return ArgReader2;
}();
var CmdReader = /* @__PURE__ */ function() {
  function CmdReader2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  CmdReader2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new CmdReader2(value0, value1, value2);
      };
    };
  };
  return CmdReader2;
}();
var CReader = function(x) {
  return x;
};
var ReadM = function(x) {
  return x;
};
var ErrorMsg = /* @__PURE__ */ function() {
  function ErrorMsg2(value0) {
    this.value0 = value0;
  }
  ;
  ErrorMsg2.create = function(value0) {
    return new ErrorMsg2(value0);
  };
  return ErrorMsg2;
}();
var InfoMsg = /* @__PURE__ */ function() {
  function InfoMsg2(value0) {
    this.value0 = value0;
  }
  ;
  InfoMsg2.create = function(value0) {
    return new InfoMsg2(value0);
  };
  return InfoMsg2;
}();
var ShowHelpText = /* @__PURE__ */ function() {
  function ShowHelpText2() {
  }
  ;
  ShowHelpText2.value = new ShowHelpText2();
  return ShowHelpText2;
}();
var MissingError = /* @__PURE__ */ function() {
  function MissingError2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  MissingError2.create = function(value0) {
    return function(value1) {
      return new MissingError2(value0, value1);
    };
  };
  return MissingError2;
}();
var ExpectsArgError = /* @__PURE__ */ function() {
  function ExpectsArgError2(value0) {
    this.value0 = value0;
  }
  ;
  ExpectsArgError2.create = function(value0) {
    return new ExpectsArgError2(value0);
  };
  return ExpectsArgError2;
}();
var UnexpectedError = /* @__PURE__ */ function() {
  function UnexpectedError2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  UnexpectedError2.create = function(value0) {
    return function(value1) {
      return new UnexpectedError2(value0, value1);
    };
  };
  return UnexpectedError2;
}();
var SomeParser = /* @__PURE__ */ function() {
  function SomeParser2(value0) {
    this.value0 = value0;
  }
  ;
  SomeParser2.create = function(value0) {
    return new SomeParser2(value0);
  };
  return SomeParser2;
}();
var MultPE = /* @__PURE__ */ function() {
  function MultPE2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  MultPE2.create = function(value0) {
    return function(value1) {
      return new MultPE2(value0, value1);
    };
  };
  return MultPE2;
}();
var Context = /* @__PURE__ */ function() {
  function Context2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Context2.create = function(value0) {
    return function(value1) {
      return new Context2(value0, value1);
    };
  };
  return Context2;
}();
var ParserM = function(x) {
  return x;
};
var readerAsk = /* @__PURE__ */ ask(/* @__PURE__ */ monadAskReaderT(/* @__PURE__ */ monadExceptT(monadIdentity)));
var readerAbort = /* @__PURE__ */ function() {
  var $247 = lift(monadTransReaderT)(monadExceptT(monadIdentity));
  var $248 = throwError(monadThrowExceptT(monadIdentity));
  return function($249) {
    return ReadM($247($248($249)));
  };
}();
var readerError = function($250) {
  return readerAbort(ErrorMsg.create($250));
};
var readMFunctor = {
  map: function(f) {
    return function(v) {
      return map(functorReaderT(functorExceptT(functorIdentity)))(f)(v);
    };
  }
};
var readMApply = {
  apply: function(v) {
    return function(v1) {
      return apply(applyReaderT(applyExceptT(monadIdentity)))(v)(v1);
    };
  },
  Functor0: function() {
    return readMFunctor;
  }
};
var readMBind = {
  bind: function(v) {
    return function(f) {
      return bind(bindReaderT(bindExceptT(monadIdentity)))(v)(function() {
        var $251 = un()(ReadM);
        return function($252) {
          return $251(f($252));
        };
      }());
    };
  },
  Apply0: function() {
    return readMApply;
  }
};
var readMApplicative = {
  pure: /* @__PURE__ */ function() {
    var $253 = pure(applicativeReaderT(applicativeExceptT(monadIdentity)));
    return function($254) {
      return ReadM($253($254));
    };
  }(),
  Apply0: function() {
    return readMApply;
  }
};
var parserMMonadRec = freeMonadRec;
var parserMBind = freeBind;
var parserMApplicative = freeApplicative;
var parseErrorSemigroup = {
  append: function(v) {
    return function(m) {
      return m;
    };
  }
};
var optVisibilityEq = {
  eq: function(x) {
    return function(y) {
      if (x instanceof Internal && y instanceof Internal) {
        return true;
      }
      ;
      if (x instanceof Hidden && y instanceof Hidden) {
        return true;
      }
      ;
      if (x instanceof Visible && y instanceof Visible) {
        return true;
      }
      ;
      return false;
    };
  }
};
var optVisibilityOrd = {
  compare: function(x) {
    return function(y) {
      if (x instanceof Internal && y instanceof Internal) {
        return EQ.value;
      }
      ;
      if (x instanceof Internal) {
        return LT.value;
      }
      ;
      if (y instanceof Internal) {
        return GT.value;
      }
      ;
      if (x instanceof Hidden && y instanceof Hidden) {
        return EQ.value;
      }
      ;
      if (x instanceof Hidden) {
        return LT.value;
      }
      ;
      if (y instanceof Hidden) {
        return GT.value;
      }
      ;
      if (x instanceof Visible && y instanceof Visible) {
        return EQ.value;
      }
      ;
      throw new Error("Failed pattern match at Options.Applicative.Types (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
    };
  },
  Eq0: function() {
    return optVisibilityEq;
  }
};
var optShowDefault = /* @__PURE__ */ function() {
  var $255 = un()(OptProperties);
  var $256 = un()(Option);
  return function($257) {
    return function(v) {
      return v.propShowDefault;
    }($255(function(v) {
      return v.optProps;
    }($256($257))));
  };
}();
var optVisibility = /* @__PURE__ */ function() {
  var $258 = un()(OptProperties);
  var $259 = un()(Option);
  return function($260) {
    return function(v) {
      return v.propVisibility;
    }($258(function(v) {
      return v.optProps;
    }($259($260))));
  };
}();
var optNameEq = {
  eq: function(x) {
    return function(y) {
      if (x instanceof OptShort && y instanceof OptShort) {
        return x.value0 === y.value0;
      }
      ;
      if (x instanceof OptLong && y instanceof OptLong) {
        return x.value0 === y.value0;
      }
      ;
      return false;
    };
  }
};
var optNameOrd = {
  compare: function(x) {
    return function(y) {
      if (x instanceof OptShort && y instanceof OptShort) {
        return compare(ordChar)(x.value0)(y.value0);
      }
      ;
      if (x instanceof OptShort) {
        return LT.value;
      }
      ;
      if (y instanceof OptShort) {
        return GT.value;
      }
      ;
      if (x instanceof OptLong && y instanceof OptLong) {
        return compare(ordString)(x.value0)(y.value0);
      }
      ;
      throw new Error("Failed pattern match at Options.Applicative.Types (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
    };
  },
  Eq0: function() {
    return optNameEq;
  }
};
var optMetaVar = /* @__PURE__ */ function() {
  var $261 = un()(OptProperties);
  var $262 = un()(Option);
  return function($263) {
    return function(v) {
      return v.propMetaVar;
    }($261(function(v) {
      return v.optProps;
    }($262($263))));
  };
}();
var optHelp = /* @__PURE__ */ function() {
  var $264 = un()(OptProperties);
  var $265 = un()(Option);
  return function($266) {
    return function(v) {
      return v.propHelp;
    }($264(function(v) {
      return v.optProps;
    }($265($266))));
  };
}();
var optDescMod = /* @__PURE__ */ function() {
  var $267 = un()(OptProperties);
  var $268 = un()(Option);
  return function($269) {
    return function(v) {
      return v.propDescMod;
    }($267(function(v) {
      return v.optProps;
    }($268($269))));
  };
}();
var oneM = function($270) {
  return ParserM(liftF($270));
};
var fromM = function(v) {
  return new BindP(v);
};
var completerSemigroup = {
  append: function(v) {
    return function(v1) {
      return function(s) {
        return apply(applyEffect)(map(functorEffect)(append(semigroupArray))(v(s)))(v1(s));
      };
    };
  }
};
var completerMonoid = {
  mempty: function(v) {
    return pure(applicativeEffect)([]);
  },
  Semigroup0: function() {
    return completerSemigroup;
  }
};
var cReaderFunctor = {
  map: function(f) {
    return over()()(CReader)(function(r) {
      return {
        crReader: map(readMFunctor)(f)(r.crReader),
        crCompleter: r.crCompleter
      };
    });
  }
};
var parserInfoFunctor = {
  map: function(f) {
    return over()()(ParserInfo)(function(i) {
      return {
        infoParser: map(parserFunctor)(f)(i.infoParser),
        infoFailureCode: i.infoFailureCode,
        infoFooter: i.infoFooter,
        infoFullDesc: i.infoFullDesc,
        infoHeader: i.infoHeader,
        infoPolicy: i.infoPolicy,
        infoProgDesc: i.infoProgDesc
      };
    });
  }
};
var parserFunctor = {
  map: function(f) {
    return function(v) {
      if (v instanceof NilP) {
        return new NilP(f(v.value0));
      }
      ;
      if (v instanceof OptP) {
        return new OptP(map(optionFunctor)(f)(v.value0));
      }
      ;
      if (v instanceof MultP) {
        return runExists(function(v1) {
          return new MultP(mkExists(new MultPE(map(parserFunctor)(function(v2) {
            return function($271) {
              return f(v2($271));
            };
          })(v1.value0), v1.value1)));
        })(v.value0);
      }
      ;
      if (v instanceof AltP) {
        return new AltP(map(parserFunctor)(f)(v.value0), map(parserFunctor)(f)(v.value1));
      }
      ;
      if (v instanceof BindP) {
        return new BindP(map(freeFunctor)(f)(v.value0));
      }
      ;
      throw new Error("Failed pattern match at Options.Applicative.Types (line 317, column 1 - line 322, column 36): " + [f.constructor.name, v.constructor.name]);
    };
  }
};
var optionFunctor = {
  map: function(f) {
    return over()()(Option)(function(o) {
      return {
        optMain: map(optReaderFunctor)(f)(o.optMain),
        optProps: o.optProps
      };
    });
  }
};
var optReaderFunctor = {
  map: function(f) {
    return function(v) {
      if (v instanceof OptReader) {
        return new OptReader(v.value0, map(cReaderFunctor)(f)(v.value1), v.value2);
      }
      ;
      if (v instanceof FlagReader) {
        return new FlagReader(v.value0, f(v.value1));
      }
      ;
      if (v instanceof ArgReader) {
        return new ArgReader(map(cReaderFunctor)(f)(v.value0));
      }
      ;
      if (v instanceof CmdReader) {
        return new CmdReader(v.value0, v.value1, function() {
          var $272 = map(functorMaybe)(map(parserInfoFunctor)(f));
          return function($273) {
            return $272(v.value2($273));
          };
        }());
      }
      ;
      throw new Error("Failed pattern match at Options.Applicative.Types (line 264, column 1 - line 268, column 68): " + [f.constructor.name, v.constructor.name]);
    };
  }
};
var parserAlt = /* @__PURE__ */ function() {
  return {
    alt: AltP.create,
    Functor0: function() {
      return parserFunctor;
    }
  };
}();
var parserApply = {
  apply: function(a) {
    return function(b) {
      return new MultP(mkExists(new MultPE(a, b)));
    };
  },
  Functor0: function() {
    return parserFunctor;
  }
};
var parserApplicative = /* @__PURE__ */ function() {
  return {
    pure: NilP.create,
    Apply0: function() {
      return parserApply;
    }
  };
}();
var manyM = function(p) {
  var go = function(acc) {
    return bind(parserMBind)(oneM(alt(parserAlt)(map(parserFunctor)(Loop.create)(p))(pure(parserApplicative)(new Done(unit)))))(function(aa) {
      return pure(parserMApplicative)(bimap(bifunctorStep)(function(v) {
        return new Cons(v, acc);
      })(function(v) {
        return reverse(acc);
      })(aa));
    });
  };
  return tailRecM(parserMMonadRec)(go)(Nil.value);
};
var many = function($274) {
  return fromM(manyM($274));
};
var argPolicyEq = {
  eq: function(x) {
    return function(y) {
      if (x instanceof Intersperse && y instanceof Intersperse) {
        return true;
      }
      ;
      if (x instanceof NoIntersperse && y instanceof NoIntersperse) {
        return true;
      }
      ;
      if (x instanceof AllPositionals && y instanceof AllPositionals) {
        return true;
      }
      ;
      if (x instanceof ForwardOptions && y instanceof ForwardOptions) {
        return true;
      }
      ;
      return false;
    };
  }
};

// output/Control.Monad.State.Trans/index.js
var StateT = function(x) {
  return x;
};
var runStateT = function(v) {
  return v;
};
var monadTransStateT = {
  lift: function(dictMonad) {
    return function(m) {
      return function(s) {
        return bind(dictMonad.Bind1())(m)(function(x) {
          return pure(dictMonad.Applicative0())(new Tuple(x, s));
        });
      };
    };
  }
};
var functorStateT = function(dictFunctor) {
  return {
    map: function(f) {
      return function(v) {
        return function(s) {
          return map(dictFunctor)(function(v1) {
            return new Tuple(f(v1.value0), v1.value1);
          })(v(s));
        };
      };
    }
  };
};
var evalStateT = function(dictFunctor) {
  return function(v) {
    return function(s) {
      return map(dictFunctor)(fst)(v(s));
    };
  };
};
var monadStateT = function(dictMonad) {
  return {
    Applicative0: function() {
      return applicativeStateT(dictMonad);
    },
    Bind1: function() {
      return bindStateT(dictMonad);
    }
  };
};
var bindStateT = function(dictMonad) {
  return {
    bind: function(v) {
      return function(f) {
        return function(s) {
          return bind(dictMonad.Bind1())(v(s))(function(v1) {
            var v3 = f(v1.value0);
            return v3(v1.value1);
          });
        };
      };
    },
    Apply0: function() {
      return applyStateT(dictMonad);
    }
  };
};
var applyStateT = function(dictMonad) {
  return {
    apply: ap(monadStateT(dictMonad)),
    Functor0: function() {
      return functorStateT(dictMonad.Bind1().Apply0().Functor0());
    }
  };
};
var applicativeStateT = function(dictMonad) {
  return {
    pure: function(a) {
      return function(s) {
        return pure(dictMonad.Applicative0())(new Tuple(a, s));
      };
    },
    Apply0: function() {
      return applyStateT(dictMonad);
    }
  };
};
var monadStateStateT = function(dictMonad) {
  return {
    state: function(f) {
      var $112 = pure(dictMonad.Applicative0());
      return function($113) {
        return $112(f($113));
      };
    },
    Monad0: function() {
      return monadStateT(dictMonad);
    }
  };
};

// output/Control.Monad.Except/index.js
var withExcept = /* @__PURE__ */ withExceptT(functorIdentity);
var runExcept = /* @__PURE__ */ function() {
  var $0 = unwrap();
  return function($1) {
    return $0(runExceptT($1));
  };
}();

// output/Control.Monad.Reader/index.js
var runReader = function(v) {
  var $2 = unwrap();
  return function($3) {
    return $2(v($3));
  };
};

// output/Options.Applicative.Internal/index.js
var $runtime_lazy3 = function(name3, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var TNil = /* @__PURE__ */ function() {
  function TNil2() {
  }
  ;
  TNil2.value = new TNil2();
  return TNil2;
}();
var TCons = /* @__PURE__ */ function() {
  function TCons2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  TCons2.create = function(value0) {
    return function(value1) {
      return new TCons2(value0, value1);
    };
  };
  return TCons2;
}();
var P = function(x) {
  return x;
};
var ListT = function(x) {
  return x;
};
var NondetT = function(x) {
  return x;
};
var ComplParser = /* @__PURE__ */ function() {
  function ComplParser2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  ComplParser2.create = function(value0) {
    return function(value1) {
      return new ComplParser2(value0, value1);
    };
  };
  return ComplParser2;
}();
var ComplOption = /* @__PURE__ */ function() {
  function ComplOption2(value0) {
    this.value0 = value0;
  }
  ;
  ComplOption2.create = function(value0) {
    return new ComplOption2(value0);
  };
  return ComplOption2;
}();
var ComplResult = /* @__PURE__ */ function() {
  function ComplResult2(value0) {
    this.value0 = value0;
  }
  ;
  ComplResult2.create = function(value0) {
    return new ComplResult2(value0);
  };
  return ComplResult2;
}();
var Completion = function(x) {
  return x;
};
var withReadM = function(f) {
  var f$prime = function(v) {
    if (v instanceof ErrorMsg) {
      return new ErrorMsg(f(v.value0));
    }
    ;
    return v;
  };
  var $142 = mapReaderT(withExcept(f$prime));
  var $143 = un()(ReadM);
  return function($144) {
    return ReadM($142($143($144)));
  };
};
var stepListT = function(v) {
  return v;
};
var runP = function(v) {
  return runReader(flip(runStateT)([])(runExceptT(v)));
};
var runNondetT = function(v) {
  return v;
};
var runListT = function(dictMonad) {
  return function(xs) {
    return bind(dictMonad.Bind1())(stepListT(xs))(function(s) {
      if (s instanceof TNil) {
        return pure(dictMonad.Applicative0())(Nil.value);
      }
      ;
      if (s instanceof TCons) {
        return liftM1(dictMonad)(Cons.create(s.value0))(runListT(dictMonad)(s.value1));
      }
      ;
      throw new Error("Failed pattern match at Options.Applicative.Internal (line 200, column 3 - line 202, column 53): " + [s.constructor.name]);
    });
  };
};
var runCompletion = function(v) {
  return function(prefs2) {
    var v1 = runReaderT(runExceptT(v))(prefs2);
    if (v1 instanceof ComplResult) {
      return Nothing.value;
    }
    ;
    if (v1 instanceof ComplParser) {
      return new Just(new Left(new Tuple(v1.value0, v1.value1)));
    }
    ;
    if (v1 instanceof ComplOption) {
      return new Just(new Right(v1.value0));
    }
    ;
    throw new Error("Failed pattern match at Options.Applicative.Internal (line 170, column 38 - line 173, column 42): " + [v1.constructor.name]);
  };
};
var pFunctor = {
  map: function(f) {
    return function(v) {
      return map(functorExceptT(functorStateT(functorReaderT(functorIdentity))))(f)(v);
    };
  }
};
var pApply = {
  apply: function(v) {
    return function(v1) {
      return apply(applyExceptT(monadStateT(monadReaderT(monadIdentity))))(v)(v1);
    };
  },
  Functor0: function() {
    return pFunctor;
  }
};
var pBind = {
  bind: function(v) {
    return function(k) {
      return bind(bindExceptT(monadStateT(monadReaderT(monadIdentity))))(v)(function(a) {
        var v1 = k(a);
        return v1;
      });
    };
  },
  Apply0: function() {
    return pApply;
  }
};
var pApplicative = {
  pure: function(a) {
    return pure(applicativeExceptT(monadStateT(monadReaderT(monadIdentity))))(a);
  },
  Apply0: function() {
    return pApply;
  }
};
var pMonad = {
  Applicative0: function() {
    return pApplicative;
  },
  Bind1: function() {
    return pBind;
  }
};
var pAlt = {
  alt: function(v) {
    return function(v1) {
      return alt(altExceptT(parseErrorSemigroup)(monadStateT(monadReaderT(monadIdentity))))(v)(v1);
    };
  },
  Functor0: function() {
    return pFunctor;
  }
};
var missingArgP = function(dict) {
  return dict.missingArgP;
};
var getPrefs = function(dict) {
  return dict.getPrefs;
};
var exitP = function(dict) {
  return dict.exitP;
};
var exitContext = function(dict) {
  return dict.exitContext;
};
var errorP = function(dict) {
  return dict.errorP;
};
var hoistEither = function(dictMonadP) {
  return either(errorP(dictMonadP))(pure(dictMonadP.Monad0().Applicative0()));
};
var runReadM = function(dictMonadP) {
  return function(v) {
    return function(s) {
      return hoistEither(dictMonadP)(runExcept(runReaderT(v)(s)));
    };
  };
};
var hoistMaybe = function(dictMonadP) {
  return function(err) {
    return maybe(errorP(dictMonadP)(err))(pure(dictMonadP.Monad0().Applicative0()));
  };
};
var pMonadP = {
  enterContext: function(name3) {
    return function(pinfo) {
      return lift(monadTransExceptT)(monadStateT(monadReaderT(monadIdentity)))(modify_(monadStateStateT(monadReaderT(monadIdentity)))(cons3(new Context(name3, mkExists(pinfo)))));
    };
  },
  exitContext: /* @__PURE__ */ lift(monadTransExceptT)(/* @__PURE__ */ monadStateT(/* @__PURE__ */ monadReaderT(monadIdentity)))(/* @__PURE__ */ modify_(/* @__PURE__ */ monadStateStateT(/* @__PURE__ */ monadReaderT(monadIdentity)))(/* @__PURE__ */ drop(1))),
  getPrefs: /* @__PURE__ */ P(/* @__PURE__ */ lift(monadTransExceptT)(/* @__PURE__ */ monadStateT(/* @__PURE__ */ monadReaderT(monadIdentity)))(/* @__PURE__ */ lift(monadTransStateT)(/* @__PURE__ */ monadReaderT(monadIdentity))(/* @__PURE__ */ ask(/* @__PURE__ */ monadAskReaderT(monadIdentity))))),
  missingArgP: function(e) {
    return function(v) {
      return errorP(pMonadP)(e);
    };
  },
  exitP: function(i) {
    return function(v) {
      return function(p) {
        var $145 = maybe(throwError(monadThrowExceptT(monadStateT(monadReaderT(monadIdentity))))(MissingError.create(i)(SomeParser.create(mkExists(p)))))(pure(applicativeExceptT(monadStateT(monadReaderT(monadIdentity)))));
        return function($146) {
          return P($145($146));
        };
      };
    };
  },
  errorP: /* @__PURE__ */ function() {
    var $147 = throwError(monadThrowExceptT(monadStateT(monadReaderT(monadIdentity))));
    return function($148) {
      return P($147($148));
    };
  }(),
  Monad0: function() {
    return pMonad;
  },
  Alt1: function() {
    return pAlt;
  }
};
var enterContext = function(dict) {
  return dict.enterContext;
};
var contextNames = function(ns) {
  var go = function(v) {
    return v.value0;
  };
  return reverse2(map(functorArray)(go)(ns));
};
var complResultMonad = {
  Applicative0: function() {
    return complResultApplicative;
  },
  Bind1: function() {
    return complResultBind;
  }
};
var complResultBind = {
  bind: function(m) {
    return function(f) {
      if (m instanceof ComplResult) {
        return f(m.value0);
      }
      ;
      if (m instanceof ComplParser) {
        return new ComplParser(m.value0, m.value1);
      }
      ;
      if (m instanceof ComplOption) {
        return new ComplOption(m.value0);
      }
      ;
      throw new Error("Failed pattern match at Options.Applicative.Internal (line 134, column 14 - line 137, column 35): " + [m.constructor.name]);
    };
  },
  Apply0: function() {
    return $lazy_complResultApply(0);
  }
};
var complResultApplicative = /* @__PURE__ */ function() {
  return {
    pure: ComplResult.create,
    Apply0: function() {
      return $lazy_complResultApply(0);
    }
  };
}();
var $lazy_complResultFunctor = /* @__PURE__ */ $runtime_lazy3("complResultFunctor", "Options.Applicative.Internal", function() {
  return {
    map: liftM1(complResultMonad)
  };
});
var $lazy_complResultApply = /* @__PURE__ */ $runtime_lazy3("complResultApply", "Options.Applicative.Internal", function() {
  return {
    apply: ap(complResultMonad),
    Functor0: function() {
      return $lazy_complResultFunctor(0);
    }
  };
});
var complResultFunctor = /* @__PURE__ */ $lazy_complResultFunctor(124);
var completionFunctor = {
  map: function(f) {
    return function(v) {
      return map(functorExceptT(functorReaderT(complResultFunctor)))(f)(v);
    };
  }
};
var completionAlt = {
  alt: function(v) {
    return function(v1) {
      return alt(altExceptT(parseErrorSemigroup)(monadReaderT(complResultMonad)))(v)(v1);
    };
  },
  Functor0: function() {
    return completionFunctor;
  }
};
var completionApply = {
  apply: function(v) {
    return function(v1) {
      return apply(applyExceptT(monadReaderT(complResultMonad)))(v)(v1);
    };
  },
  Functor0: function() {
    return completionFunctor;
  }
};
var completionApplicative = {
  pure: function(a) {
    return pure(applicativeExceptT(monadReaderT(complResultMonad)))(a);
  },
  Apply0: function() {
    return completionApply;
  }
};
var completionBind = {
  bind: function(v) {
    return function(k) {
      return bind(bindExceptT(monadReaderT(complResultMonad)))(v)(function(a) {
        var v1 = k(a);
        return v1;
      });
    };
  },
  Apply0: function() {
    return completionApply;
  }
};
var completionMonad = {
  Applicative0: function() {
    return completionApplicative;
  },
  Bind1: function() {
    return completionBind;
  }
};
var completionMonadP = {
  enterContext: function(v) {
    return function(v1) {
      return pure(completionApplicative)(unit);
    };
  },
  exitContext: /* @__PURE__ */ pure(completionApplicative)(unit),
  getPrefs: /* @__PURE__ */ lift(monadTransExceptT)(/* @__PURE__ */ monadReaderT(complResultMonad))(/* @__PURE__ */ ask(/* @__PURE__ */ monadAskReaderT(complResultMonad))),
  missingArgP: function(v) {
    var $149 = lift(monadTransExceptT)(monadReaderT(complResultMonad));
    var $150 = lift(monadTransReaderT)(complResultMonad);
    return function($151) {
      return Completion($149($150(ComplOption.create($151))));
    };
  },
  exitP: function(v) {
    return function(a) {
      return function(p) {
        return function(v1) {
          return Completion(lift(monadTransExceptT)(monadReaderT(complResultMonad))(lift(monadTransReaderT)(complResultMonad)(new ComplParser(new SomeParser(mkExists(p)), a))));
        };
      };
    };
  },
  errorP: /* @__PURE__ */ function() {
    var $152 = throwError(monadThrowExceptT(monadReaderT(complResultMonad)));
    return function($153) {
      return Completion($152($153));
    };
  }(),
  Monad0: function() {
    return completionMonad;
  },
  Alt1: function() {
    return completionAlt;
  }
};
var bimapTStep = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof TNil) {
        return TNil.value;
      }
      ;
      if (v2 instanceof TCons) {
        return new TCons(v(v2.value0), v1(v2.value1));
      }
      ;
      throw new Error("Failed pattern match at Options.Applicative.Internal (line 186, column 1 - line 186, column 77): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var listTFunctor = function(dictMonad) {
  return {
    map: function(f) {
      return function(v) {
        return liftM1(dictMonad)(bimapTStep(f)(map(listTFunctor(dictMonad))(f)))(stepListT(v));
      };
    }
  };
};
var listTAlt = function(dictMonad) {
  return {
    alt: function(xs) {
      return function(ys) {
        return bind(dictMonad.Bind1())(stepListT(xs))(function(s) {
          if (s instanceof TNil) {
            return stepListT(ys);
          }
          ;
          if (s instanceof TCons) {
            return pure(dictMonad.Applicative0())(new TCons(s.value0, alt(listTAlt(dictMonad))(s.value1)(ys)));
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Internal (line 227, column 5 - line 229, column 49): " + [s.constructor.name]);
        });
      };
    },
    Functor0: function() {
      return listTFunctor(dictMonad);
    }
  };
};
var listTPlus = function(dictMonad) {
  return {
    empty: pure(dictMonad.Applicative0())(TNil.value),
    Alt0: function() {
      return listTAlt(dictMonad);
    }
  };
};
var hoistList = function(dictMonad) {
  return foldr2(function(x) {
    return function(xt) {
      return pure(dictMonad.Applicative0())(new TCons(x, xt));
    };
  })(empty(listTPlus(dictMonad)));
};
var listTMonadTrans = {
  lift: function(dictMonad) {
    var $154 = liftM1(dictMonad)(function(v) {
      return new TCons(v, empty(listTPlus(dictMonad)));
    });
    return function($155) {
      return ListT($154($155));
    };
  }
};
var cut = function(dictMonad) {
  return lift(listTMonadTrans)(monadStateT(dictMonad))(put(monadStateStateT(dictMonad))(true));
};
var nondetTMonadTrans = {
  lift: function(dictMonad) {
    var $156 = lift(listTMonadTrans)(monadStateT(dictMonad));
    var $157 = lift(monadTransStateT)(dictMonad);
    return function($158) {
      return NondetT($156($157($158)));
    };
  }
};
var listTMonad = function(dictMonad) {
  return {
    Applicative0: function() {
      return listTApplicative(dictMonad);
    },
    Bind1: function() {
      return listTBind(dictMonad);
    }
  };
};
var listTBind = function(dictMonad) {
  return {
    bind: function(xs) {
      return function(f) {
        return bind(dictMonad.Bind1())(stepListT(xs))(function(s) {
          if (s instanceof TNil) {
            return pure(dictMonad.Applicative0())(TNil.value);
          }
          ;
          if (s instanceof TCons) {
            return stepListT(alt(listTAlt(dictMonad))(f(s.value0))(bind(listTBind(dictMonad))(s.value1)(f)));
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Internal (line 218, column 5 - line 220, column 53): " + [s.constructor.name]);
        });
      };
    },
    Apply0: function() {
      return listTApply(dictMonad);
    }
  };
};
var listTApply = function(dictMonad) {
  return {
    apply: ap(listTMonad(dictMonad)),
    Functor0: function() {
      return listTFunctor(dictMonad);
    }
  };
};
var listTApplicative = function(dictMonad) {
  return {
    pure: function() {
      var $159 = hoistList(dictMonad);
      var $160 = pure(applicativeArray);
      return function($161) {
        return $159($160($161));
      };
    }(),
    Apply0: function() {
      return listTApply(dictMonad);
    }
  };
};
var listTAlternative = function(dictMonad) {
  return {
    Applicative0: function() {
      return listTApplicative(dictMonad);
    },
    Plus1: function() {
      return listTPlus(dictMonad);
    }
  };
};
var nondetTAltOp = function(dictMonad) {
  return function(m1) {
    return function(m2) {
      return NondetT(alt(listTAlt(monadStateT(dictMonad)))(runNondetT(m1))(bind(listTBind(monadStateT(dictMonad)))(lift(listTMonadTrans)(monadStateT(dictMonad))(get(monadStateStateT(dictMonad))))(function(s) {
        return discard(discardUnit)(listTBind(monadStateT(dictMonad)))(guard(listTAlternative(monadStateT(dictMonad)))(!s))(function() {
          return runNondetT(m2);
        });
      })));
    };
  };
};
var nondetTFunctor = function(dictMonad) {
  return {
    map: function(f) {
      var $162 = map(listTFunctor(monadStateT(dictMonad)))(f);
      return function($163) {
        return NondetT($162(runNondetT($163)));
      };
    }
  };
};
var nondetTAlt = function(dictMonad) {
  return {
    alt: function(v) {
      return function(v1) {
        return alt(listTAlt(monadStateT(dictMonad)))(v)(v1);
      };
    },
    Functor0: function() {
      return nondetTFunctor(dictMonad);
    }
  };
};
var nondetTPlus = function(dictMonad) {
  return {
    empty: empty(listTPlus(monadStateT(dictMonad))),
    Alt0: function() {
      return nondetTAlt(dictMonad);
    }
  };
};
var nondetTApply = function(dictMonad) {
  return {
    apply: function(v) {
      return function(v1) {
        return apply(listTApply(monadStateT(dictMonad)))(v)(v1);
      };
    },
    Functor0: function() {
      return nondetTFunctor(dictMonad);
    }
  };
};
var nondetTApplicative = function(dictMonad) {
  return {
    pure: function() {
      var $164 = pure(listTApplicative(monadStateT(dictMonad)));
      return function($165) {
        return NondetT($164($165));
      };
    }(),
    Apply0: function() {
      return nondetTApply(dictMonad);
    }
  };
};
var nondetTBind = function(dictMonad) {
  return {
    bind: function(v) {
      return function(f) {
        return bind(listTBind(monadStateT(dictMonad)))(v)(function($166) {
          return runNondetT(f($166));
        });
      };
    },
    Apply0: function() {
      return nondetTApply(dictMonad);
    }
  };
};
var takeListT = function(dictMonad) {
  return function(v) {
    if (v === 0) {
      return $$const(empty(listTPlus(dictMonad)));
    }
    ;
    var $167 = liftM1(dictMonad)(bimapTStep(identity(categoryFn))(takeListT(dictMonad)(v - 1 | 0)));
    return function($168) {
      return ListT($167(stepListT($168)));
    };
  };
};
var disamb = function(dictMonad) {
  return function(allow_amb) {
    return function(xs) {
      return bind(dictMonad.Bind1())(function(v) {
        return evalStateT(dictMonad.Bind1().Apply0().Functor0())(v)(false);
      }(runListT(monadStateT(dictMonad))(takeListT(monadStateT(dictMonad))(function() {
        if (allow_amb) {
          return 1;
        }
        ;
        return 2;
      }())(runNondetT(xs)))))(function(xs$prime) {
        return pure(dictMonad.Applicative0())(function() {
          if (xs$prime instanceof Cons && xs$prime.value1 instanceof Nil) {
            return new Just(xs$prime.value0);
          }
          ;
          return Nothing.value;
        }());
      });
    };
  };
};

// output/Options.Applicative.Common/index.js
var OptWord = /* @__PURE__ */ function() {
  function OptWord2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  OptWord2.create = function(value0) {
    return function(value1) {
      return new OptWord2(value0, value1);
    };
  };
  return OptWord2;
}();
var unexpectedError = function(arg) {
  return function(p) {
    return new UnexpectedError(arg, new SomeParser(mkExists(p)));
  };
};
var simplify = function(v) {
  if (v instanceof Leaf2) {
    return new Leaf2(v.value0);
  }
  ;
  if (v instanceof MultNode) {
    var remove_mult = function(v12) {
      if (v12 instanceof MultNode) {
        return v12.value0;
      }
      ;
      return [v12];
    };
    var v1 = bind(bindArray)(v.value0)(function($221) {
      return remove_mult(simplify($221));
    });
    if (v1.length === 1) {
      return v1[0];
    }
    ;
    return new MultNode(v1);
  }
  ;
  if (v instanceof AltNode) {
    var remove_alt = function(v12) {
      if (v12 instanceof AltNode) {
        return v12.value0;
      }
      ;
      if (v12 instanceof MultNode && v12.value0.length === 0) {
        return [];
      }
      ;
      return [v12];
    };
    var v1 = bind(bindArray)(v.value0)(function($222) {
      return remove_alt(simplify($222));
    });
    if (v1.length === 0) {
      return new MultNode([]);
    }
    ;
    if (v1.length === 1) {
      return v1[0];
    }
    ;
    return new AltNode(v1);
  }
  ;
  throw new Error("Failed pattern match at Options.Applicative.Common (line 280, column 1 - line 280, column 45): " + [v.constructor.name]);
};
var showOption = function(v) {
  if (v instanceof OptLong) {
    return "--" + v.value0;
  }
  ;
  if (v instanceof OptShort) {
    return fromCharArray(["-", v.value0]);
  }
  ;
  throw new Error("Failed pattern match at Options.Applicative.Common (line 43, column 1 - line 43, column 32): " + [v.constructor.name]);
};
var parseWord = /* @__PURE__ */ function() {
  var go = function(v) {
    if (v instanceof Cons && (v.value0 === "-" && (v.value1 instanceof Cons && v.value1.value0 === "-"))) {
      return new Just(function() {
        var v1 = function() {
          var v2 = span(function(v3) {
            return v3 !== "=";
          })(v.value1.value1);
          if (v2.rest instanceof Nil) {
            return new Tuple(v.value1.value1, Nothing.value);
          }
          ;
          if (v2.rest instanceof Cons) {
            return new Tuple(v2.init, new Just(v2.rest.value1));
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Common (line 107, column 23 - line 109, column 70): " + [v2.constructor.name]);
        }();
        return new OptWord(new OptLong(fromCharArray(fromFoldable3(foldableList)(v1.value0))), map(functorMaybe)(function() {
          var $223 = fromFoldable3(foldableList);
          return function($224) {
            return fromCharArray($223($224));
          };
        }())(v1.value1));
      }());
    }
    ;
    if (v instanceof Cons && v.value0 === "-") {
      if (v.value1 instanceof Nil) {
        return Nothing.value;
      }
      ;
      if (v.value1 instanceof Cons) {
        return new Just(function() {
          var arg = voidRight(functorMaybe)(v.value1.value1)(guard(alternativeMaybe)(!$$null(v.value1.value1)));
          return new OptWord(new OptShort(v.value1.value0), map(functorMaybe)(function() {
            var $225 = fromFoldable3(foldableList);
            return function($226) {
              return fromCharArray($225($226));
            };
          }())(arg));
        }());
      }
      ;
      throw new Error("Failed pattern match at Options.Applicative.Common (line 111, column 25 - line 115, column 79): " + [v.value1.constructor.name]);
    }
    ;
    return Nothing.value;
  };
  var $227 = fromFoldable(foldableArray);
  return function($228) {
    return go($227(toCharArray($228)));
  };
}();
var optionNames = function(v) {
  if (v instanceof OptReader) {
    return v.value0;
  }
  ;
  if (v instanceof FlagReader) {
    return v.value0;
  }
  ;
  return [];
};
var liftOpt = /* @__PURE__ */ function() {
  return OptP.create;
}();
var isOptionPrefix = function(v) {
  return function(v1) {
    if (v instanceof OptShort && v1 instanceof OptShort) {
      return v.value0 === v1.value0;
    }
    ;
    if (v instanceof OptLong && v1 instanceof OptLong) {
      return startsWith(v.value0)(v1.value0);
    }
    ;
    return false;
  };
};
var optMatches = function(dictMonadP) {
  return function(disambiguate) {
    return function(opt2) {
      return function(v) {
        var is_short = function(v1) {
          if (v1 instanceof OptShort) {
            return true;
          }
          ;
          if (v1 instanceof OptLong) {
            return false;
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Common (line 90, column 5 - line 90, column 33): " + [v1.constructor.name]);
        };
        var has_name = function(a) {
          if (disambiguate) {
            return any(foldableArray)(heytingAlgebraBoolean)(isOptionPrefix(a));
          }
          ;
          if (otherwise) {
            return elem(foldableArray)(optNameEq)(a);
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Common (line 93, column 5 - line 95, column 27): " + [a.constructor.name]);
        };
        var errorFor = function(name3) {
          return function(msg) {
            return "option " + (showOption(name3) + (": " + msg));
          };
        };
        if (opt2 instanceof OptReader) {
          return discard(discardUnit)(bindMaybe)(guard(alternativeMaybe)(has_name(v.value0)(opt2.value0)))(function() {
            return new Just(bind(bindStateT(dictMonadP.Monad0()))(get(monadStateStateT(dictMonadP.Monad0())))(function(args) {
              var missing_arg = missingArgP(dictMonadP)(opt2.value2(showOption(v.value0)))(un()(CReader)(opt2.value1).crCompleter);
              return bind(bindStateT(dictMonadP.Monad0()))(function() {
                var v1 = maybe(args)(function(v2) {
                  return new Cons(v2, args);
                })(v.value1);
                if (v1 instanceof Nil) {
                  return lift(monadTransStateT)(dictMonadP.Monad0())(missing_arg);
                }
                ;
                if (v1 instanceof Cons) {
                  return pure(applicativeStateT(dictMonadP.Monad0()))(new Tuple(v1.value0, v1.value1));
                }
                ;
                throw new Error("Failed pattern match at Options.Applicative.Common (line 68, column 27 - line 70, column 56): " + [v1.constructor.name]);
              }())(function(v1) {
                return discard(discardUnit)(bindStateT(dictMonadP.Monad0()))(put(monadStateStateT(dictMonadP.Monad0()))(v1.value1))(function() {
                  return lift(monadTransStateT)(dictMonadP.Monad0())(runReadM(dictMonadP)(withReadM(errorFor(v.value0))(un()(CReader)(opt2.value1).crReader))(v1.value0));
                });
              });
            }));
          });
        }
        ;
        if (opt2 instanceof FlagReader) {
          return discard(discardUnit)(bindMaybe)(guard(alternativeMaybe)(has_name(v.value0)(opt2.value0)))(function() {
            return discard(discardUnit)(bindMaybe)(guard(alternativeMaybe)(is_short(v.value0) || isNothing(v.value1)))(function() {
              return new Just(bind(bindStateT(dictMonadP.Monad0()))(get(monadStateStateT(dictMonadP.Monad0())))(function(args) {
                var val$prime = map(functorMaybe)(function($229) {
                  return function(s) {
                    return cons3("-")(s);
                  }(toCharArray($229));
                })(v.value1);
                return discard(discardUnit)(bindStateT(dictMonadP.Monad0()))(put(monadStateStateT(dictMonadP.Monad0()))(maybe(args)(function() {
                  var $230 = flip(Cons.create)(args);
                  return function($231) {
                    return $230(fromCharArray($231));
                  };
                }())(val$prime)))(function() {
                  return pure(applicativeStateT(dictMonadP.Monad0()))(opt2.value1);
                });
              }));
            });
          });
        }
        ;
        return Nothing.value;
      };
    };
  };
};
var isArg = function(v) {
  if (v instanceof ArgReader) {
    return true;
  }
  ;
  return false;
};
var evalParser = function(v) {
  if (v instanceof NilP) {
    return new Just(v.value0);
  }
  ;
  if (v instanceof OptP) {
    return Nothing.value;
  }
  ;
  if (v instanceof MultP) {
    return runExists(function(v1) {
      return apply(applyMaybe)(evalParser(v1.value0))(evalParser(v1.value1));
    })(v.value0);
  }
  ;
  if (v instanceof AltP) {
    return alt(altMaybe)(evalParser(v.value0))(evalParser(v.value1));
  }
  ;
  if (v instanceof BindP) {
    return resume$prime(function(p) {
      return function(k) {
        return bind(bindMaybe)(evalParser(p))(function($232) {
          return evalParser(BindP.create(k($232)));
        });
      };
    })(Just.create)(v.value0);
  }
  ;
  throw new Error("Failed pattern match at Options.Applicative.Common (line 220, column 1 - line 220, column 44): " + [v.constructor.name]);
};
var searchParser = function(dictMonad) {
  return function(v) {
    return function(v1) {
      if (v1 instanceof NilP) {
        return empty(nondetTPlus(dictMonad));
      }
      ;
      if (v1 instanceof OptP) {
        return v(v1.value0);
      }
      ;
      if (v1 instanceof MultP) {
        return runExists(function(v2) {
          var b = mapFlipped(nondetTFunctor(dictMonad))(searchParser(dictMonad)(v)(v2.value1))(function(p2$prime) {
            return apply(parserApply)(v2.value0)(p2$prime);
          });
          var a = mapFlipped(nondetTFunctor(dictMonad))(searchParser(dictMonad)(v)(v2.value0))(function(p1$prime) {
            return apply(parserApply)(p1$prime)(v2.value1);
          });
          return nondetTAltOp(dictMonad)(a)(b);
        })(v1.value0);
      }
      ;
      if (v1 instanceof AltP) {
        return oneOf(foldableArray)(nondetTPlus(dictMonad))([searchParser(dictMonad)(v)(v1.value0), searchParser(dictMonad)(v)(v1.value1)]);
      }
      ;
      if (v1 instanceof BindP) {
        return resume$prime(function(p) {
          return function(k) {
            return oneOf(foldableArray)(nondetTPlus(dictMonad))([mapFlipped(nondetTFunctor(dictMonad))(searchParser(dictMonad)(v)(p))(function(p$prime) {
              return new BindP(bind(freeBind)(liftF(p$prime))(k));
            }), function() {
              var v2 = evalParser(p);
              if (v2 instanceof Nothing) {
                return empty(nondetTPlus(dictMonad));
              }
              ;
              if (v2 instanceof Just) {
                return searchParser(dictMonad)(v)(new BindP(k(v2.value0)));
              }
              ;
              throw new Error("Failed pattern match at Options.Applicative.Common (line 135, column 7 - line 137, column 49): " + [v2.constructor.name]);
            }()]);
          };
        })($$const(empty(nondetTPlus(dictMonad))))(v1.value0);
      }
      ;
      throw new Error("Failed pattern match at Options.Applicative.Common (line 118, column 1 - line 120, column 49): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};
var searchOpt = function(dictMonadP) {
  return function(pprefs) {
    return function(w) {
      return searchParser(monadStateT(dictMonadP.Monad0()))(function(opt2) {
        var disambiguate = un()(ParserPrefs)(pprefs).prefDisambiguate && greaterThan(optVisibilityOrd)(optVisibility(opt2))(Internal.value);
        var v = optMatches(dictMonadP)(disambiguate)(un()(Option)(opt2).optMain)(w);
        if (v instanceof Just) {
          return lift(nondetTMonadTrans)(monadStateT(dictMonadP.Monad0()))(map(functorStateT(dictMonadP.Alt1().Functor0()))(pure(parserApplicative))(v.value0));
        }
        ;
        if (v instanceof Nothing) {
          return empty(nondetTPlus(monadStateT(dictMonadP.Monad0())));
        }
        ;
        throw new Error("Failed pattern match at Options.Applicative.Common (line 144, column 3 - line 146, column 21): " + [v.constructor.name]);
      });
    };
  };
};
var stepParser = function(dictMonadP) {
  return function(pprefs) {
    return function(v) {
      return function(arg) {
        return function(p) {
          if (v instanceof AllPositionals) {
            return searchArg(dictMonadP)(pprefs)(arg)(p);
          }
          ;
          if (v instanceof ForwardOptions) {
            var v1 = parseWord(arg);
            if (v1 instanceof Just) {
              return alt(nondetTAlt(monadStateT(dictMonadP.Monad0())))(searchOpt(dictMonadP)(pprefs)(v1.value0)(p))(searchArg(dictMonadP)(pprefs)(arg)(p));
            }
            ;
            if (v1 instanceof Nothing) {
              return searchArg(dictMonadP)(pprefs)(arg)(p);
            }
            ;
            throw new Error("Failed pattern match at Options.Applicative.Common (line 174, column 42 - line 176, column 36): " + [v1.constructor.name]);
          }
          ;
          var v1 = parseWord(arg);
          if (v1 instanceof Just) {
            return searchOpt(dictMonadP)(pprefs)(v1.value0)(p);
          }
          ;
          if (v1 instanceof Nothing) {
            return searchArg(dictMonadP)(pprefs)(arg)(p);
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Common (line 177, column 29 - line 179, column 36): " + [v1.constructor.name]);
        };
      };
    };
  };
};
var searchArg = function(dictMonadP) {
  return function(prefs2) {
    return function(arg) {
      return searchParser(monadStateT(dictMonadP.Monad0()))(function(opt2) {
        return discard(discardUnit)(nondetTBind(monadStateT(dictMonadP.Monad0())))(when(nondetTApplicative(monadStateT(dictMonadP.Monad0())))(isArg(un()(Option)(opt2).optMain))(cut(monadStateT(dictMonadP.Monad0()))))(function() {
          var v = un()(Option)(opt2).optMain;
          if (v instanceof CmdReader) {
            var v1 = new Tuple(v.value2(arg), un()(ParserPrefs)(prefs2).prefBacktrack);
            if (v1.value0 instanceof Just && v1.value1 instanceof NoBacktrack) {
              return lift(nondetTMonadTrans)(monadStateT(dictMonadP.Monad0()))(bind(bindStateT(dictMonadP.Monad0()))(applyFirst(applyStateT(dictMonadP.Monad0()))(get(monadStateStateT(dictMonadP.Monad0())))(put(monadStateStateT(dictMonadP.Monad0()))(Nil.value)))(function(args) {
                return map(functorStateT(dictMonadP.Alt1().Functor0()))(pure(parserApplicative))(lift(monadTransStateT)(dictMonadP.Monad0())(applyFirst(dictMonadP.Monad0().Bind1().Apply0())(applySecond(dictMonadP.Monad0().Bind1().Apply0())(enterContext(dictMonadP)(arg)(v1.value0.value0))(runParserInfo(dictMonadP)(v1.value0.value0)(args)))(exitContext(dictMonadP))));
              }));
            }
            ;
            if (v1.value0 instanceof Just && v1.value1 instanceof Backtrack) {
              return map(nondetTFunctor(monadStateT(dictMonadP.Monad0())))(pure(parserApplicative))(lift(nondetTMonadTrans)(monadStateT(dictMonadP.Monad0()))(StateT(function(args) {
                return applyFirst(dictMonadP.Monad0().Bind1().Apply0())(applySecond(dictMonadP.Monad0().Bind1().Apply0())(enterContext(dictMonadP)(arg)(v1.value0.value0))(runParser(dictMonadP)(un()(ParserInfo)(v1.value0.value0).infoPolicy)(CmdStart.value)(un()(ParserInfo)(v1.value0.value0).infoParser)(args)))(exitContext(dictMonadP));
              })));
            }
            ;
            if (v1.value0 instanceof Just && v1.value1 instanceof SubparserInline) {
              return lift(nondetTMonadTrans)(monadStateT(dictMonadP.Monad0()))(discard(discardUnit)(bindStateT(dictMonadP.Monad0()))(lift(monadTransStateT)(dictMonadP.Monad0())(enterContext(dictMonadP)(arg)(v1.value0.value0)))(function() {
                return pure(applicativeStateT(dictMonadP.Monad0()))(un()(ParserInfo)(v1.value0.value0).infoParser);
              }));
            }
            ;
            if (v1.value0 instanceof Nothing) {
              return empty(nondetTPlus(monadStateT(dictMonadP.Monad0())));
            }
            ;
            throw new Error("Failed pattern match at Options.Applicative.Common (line 154, column 7 - line 166, column 38): " + [v1.constructor.name]);
          }
          ;
          if (v instanceof ArgReader) {
            return map(nondetTFunctor(monadStateT(dictMonadP.Monad0())))(pure(parserApplicative))(lift(nondetTMonadTrans)(monadStateT(dictMonadP.Monad0()))(lift(monadTransStateT)(dictMonadP.Monad0())(runReadM(dictMonadP)(un()(CReader)(v.value0).crReader)(arg))));
          }
          ;
          return empty(nondetTPlus(monadStateT(dictMonadP.Monad0())));
        });
      });
    };
  };
};
var runParserInfo = function(dictMonadP) {
  return function(i) {
    return runParserFully(dictMonadP)(un()(ParserInfo)(i).infoPolicy)(un()(ParserInfo)(i).infoParser);
  };
};
var runParserFully = function(dictMonadP) {
  return function(policy) {
    return function(p) {
      return function(args) {
        return bind(dictMonadP.Monad0().Bind1())(runParser(dictMonadP)(policy)(CmdStart.value)(p)(args))(function(v) {
          if (v.value1 instanceof Nil) {
            return pure(dictMonadP.Monad0().Applicative0())(v.value0);
          }
          ;
          if (v.value1 instanceof Cons) {
            return errorP(dictMonadP)(unexpectedError(v.value1.value0)(pure(parserApplicative)(unit)));
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Common (line 214, column 3 - line 216, column 66): " + [v.value1.constructor.name]);
        });
      };
    };
  };
};
var runParser = function(dictMonadP) {
  return function(policy) {
    return function(isCmdStart) {
      return function(p) {
        return function(args) {
          var result = apply(applyMaybe)(map(functorMaybe)(Tuple.create)(evalParser(p)))(pure(applicativeMaybe)(args));
          var newPolicy = function(a) {
            if (policy instanceof NoIntersperse) {
              var $180 = isJust(parseWord(a));
              if ($180) {
                return NoIntersperse.value;
              }
              ;
              return AllPositionals.value;
            }
            ;
            return policy;
          };
          var do_step = function(prefs2) {
            return function(arg) {
              return function(argt) {
                return function(v) {
                  return runStateT(v)(argt);
                }(disamb(monadStateT(dictMonadP.Monad0()))(!un()(ParserPrefs)(prefs2).prefDisambiguate)(stepParser(dictMonadP)(prefs2)(policy)(arg)(p)));
              };
            };
          };
          if (args instanceof Nil) {
            return exitP(dictMonadP)(isCmdStart)(policy)(p)(result);
          }
          ;
          if (args instanceof Cons && (args.value0 === "--" && notEq(argPolicyEq)(policy)(AllPositionals.value))) {
            return runParser(dictMonadP)(AllPositionals.value)(CmdCont.value)(p)(args.value1);
          }
          ;
          if (args instanceof Cons) {
            return bind(dictMonadP.Monad0().Bind1())(getPrefs(dictMonadP))(function(prefs2) {
              return bind(dictMonadP.Monad0().Bind1())(do_step(prefs2)(args.value0)(args.value1))(function(v) {
                if (v.value0 instanceof Nothing) {
                  return hoistMaybe(dictMonadP)(unexpectedError(args.value0)(p))(result);
                }
                ;
                if (v.value0 instanceof Just) {
                  return runParser(dictMonadP)(newPolicy(args.value0))(CmdCont.value)(v.value0.value0)(v.value1);
                }
                ;
                throw new Error("Failed pattern match at Options.Applicative.Common (line 192, column 5 - line 194, column 60): " + [v.value0.constructor.name]);
              });
            });
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Common (line 186, column 38 - line 194, column 60): " + [args.constructor.name]);
        };
      };
    };
  };
};
var treeMapParser = function(g) {
  var has_default = function(p) {
    return isJust(evalParser(p));
  };
  var hasArg = function(v) {
    if (v instanceof NilP) {
      return false;
    }
    ;
    if (v instanceof OptP) {
      return isArg(un()(Option)(v.value0).optMain);
    }
    ;
    if (v instanceof MultP) {
      return runExists(function(v1) {
        return hasArg(v1.value0) || hasArg(v1.value1);
      })(v.value0);
    }
    ;
    if (v instanceof AltP) {
      return hasArg(v.value0) || hasArg(v.value1);
    }
    ;
    if (v instanceof BindP) {
      return resume$prime(function(p) {
        return function(v1) {
          return hasArg(p);
        };
      })($$const(false))(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Options.Applicative.Common (line 272, column 5 - line 272, column 44): " + [v.constructor.name]);
  };
  var go = function(v) {
    return function(v1) {
      return function(v2) {
        return function(v3) {
          return function(v4) {
            if (v4 instanceof NilP) {
              return new MultNode([]);
            }
            ;
            if (v4 instanceof OptP) {
              if (greaterThan(optVisibilityOrd)(optVisibility(v4.value0))(Internal.value)) {
                return new Leaf2(v3({
                  hinfoMulti: v,
                  hinfoDefault: v1,
                  hinfoUnreachableArgs: v2
                })(v4.value0));
              }
              ;
              if (otherwise) {
                return new MultNode([]);
              }
              ;
            }
            ;
            if (v4 instanceof MultP) {
              return runExists(function(v5) {
                var r$prime = v2 || hasArg(v5.value0);
                return new MultNode([go(v)(v1)(v2)(v3)(v5.value0), go(v)(v1)(r$prime)(v3)(v5.value1)]);
              })(v4.value0);
            }
            ;
            if (v4 instanceof AltP) {
              var d$prime = v1 || (has_default(v4.value0) || has_default(v4.value1));
              return new AltNode([go(v)(d$prime)(v2)(v3)(v4.value0), go(v)(d$prime)(v2)(v3)(v4.value1)]);
            }
            ;
            if (v4 instanceof BindP) {
              return resume$prime(function(p) {
                return function(k) {
                  var go$prime = go(true)(v1)(v2)(v3)(p);
                  var v5 = evalParser(p);
                  if (v5 instanceof Nothing) {
                    return go$prime;
                  }
                  ;
                  if (v5 instanceof Just) {
                    return new MultNode([go$prime, go(true)(v1)(v2)(v3)(new BindP(k(v5.value0)))]);
                  }
                  ;
                  throw new Error("Failed pattern match at Options.Applicative.Common (line 267, column 12 - line 269, column 68): " + [v5.constructor.name]);
                };
              })($$const(new MultNode([])))(v4.value0);
            }
            ;
            throw new Error("Failed pattern match at Options.Applicative.Common (line 248, column 5 - line 251, column 21): " + [v.constructor.name, v1.constructor.name, v2.constructor.name, v3.constructor.name, v4.constructor.name]);
          };
        };
      };
    };
  };
  var $233 = go(false)(false)(false)(g);
  return function($234) {
    return simplify($233($234));
  };
};
var mapParser = function(f) {
  var flatten2 = function(v) {
    if (v instanceof Leaf2) {
      return [v.value0];
    }
    ;
    if (v instanceof MultNode) {
      return bind(bindArray)(v.value0)(flatten2);
    }
    ;
    if (v instanceof AltNode) {
      return bind(bindArray)(v.value0)(flatten2);
    }
    ;
    throw new Error("Failed pattern match at Options.Applicative.Common (line 235, column 5 - line 235, column 27): " + [v.constructor.name]);
  };
  var $235 = treeMapParser(f);
  return function($236) {
    return flatten2($235($236));
  };
};

// output/Options.Applicative.Builder.Internal/index.js
var OptionFields = function(x) {
  return x;
};
var FlagFields = function(x) {
  return x;
};
var DefaultProp = /* @__PURE__ */ function() {
  function DefaultProp2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  DefaultProp2.create = function(value0) {
    return function(value1) {
      return new DefaultProp2(value0, value1);
    };
  };
  return DefaultProp2;
}();
var Mod = /* @__PURE__ */ function() {
  function Mod2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  Mod2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new Mod2(value0, value1, value2);
      };
    };
  };
  return Mod2;
}();
var optionFieldsHasValue = {
  hasValueDummy: function(v) {
    return unit;
  }
};
var optionFieldsHasMetavar = {
  hasMetavarDummy: function(v) {
    return unit;
  }
};
var optionFieldsHasName = {
  name: function(n) {
    return over()()(OptionFields)(function(fields) {
      return {
        optNames: append(semigroupArray)([n])(fields.optNames),
        optCompleter: fields.optCompleter,
        optNoArgError: fields.optNoArgError
      };
    });
  }
};
var name2 = function(dict) {
  return dict.name;
};
var flagFieldsHasName = {
  name: function(n) {
    return over()()(FlagFields)(function(fields) {
      return {
        flagNames: append(semigroupArray)([n])(fields.flagNames),
        flagActive: fields.flagActive
      };
    });
  }
};
var defaultPropSemigroup = {
  append: function(v) {
    return function(v1) {
      return new DefaultProp(alt(altMaybe)(v.value0)(v1.value0), alt(altMaybe)(v.value1)(v1.value1));
    };
  }
};
var modSemigroup = {
  append: function(v) {
    return function(v1) {
      return new Mod(function($53) {
        return v1.value0(v.value0($53));
      }, append(defaultPropSemigroup)(v1.value1)(v.value1), function($54) {
        return v1.value2(v.value2($54));
      });
    };
  }
};
var defaultPropMonoid = /* @__PURE__ */ function() {
  return {
    mempty: new DefaultProp(Nothing.value, Nothing.value),
    Semigroup0: function() {
      return defaultPropSemigroup;
    }
  };
}();
var fieldMod = function(f) {
  return new Mod(f, mempty(defaultPropMonoid), identity(categoryFn));
};
var modMonoid = /* @__PURE__ */ function() {
  return {
    mempty: new Mod(identity(categoryFn), mempty(defaultPropMonoid), identity(categoryFn)),
    Semigroup0: function() {
      return modSemigroup;
    }
  };
}();
var optionMod = /* @__PURE__ */ function() {
  return Mod.create(identity(categoryFn))(mempty(defaultPropMonoid));
}();
var internal = /* @__PURE__ */ optionMod(/* @__PURE__ */ over()()(OptProperties)(function(p) {
  return {
    propVisibility: Internal.value,
    propDescMod: p.propDescMod,
    propHelp: p.propHelp,
    propMetaVar: p.propMetaVar,
    propShowDefault: p.propShowDefault
  };
}));
var baseProps = /* @__PURE__ */ function() {
  return {
    propMetaVar: "",
    propVisibility: Visible.value,
    propHelp: mempty(chunkMonoid(docSemigroup)),
    propShowDefault: Nothing.value,
    propDescMod: Nothing.value
  };
}();
var mkProps = function(v) {
  return function(g) {
    var props = over()()(OptProperties)(function(r) {
      return {
        propShowDefault: apply(applyMaybe)(v.value1)(v.value0),
        propDescMod: r.propDescMod,
        propHelp: r.propHelp,
        propMetaVar: r.propMetaVar,
        propVisibility: r.propVisibility
      };
    })(g(baseProps));
    return props;
  };
};
var mkOption = function(d) {
  return function(g) {
    return function(rdr) {
      return {
        optMain: rdr,
        optProps: mkProps(d)(g)
      };
    };
  };
};
var mkParser = function(v) {
  return function(g) {
    return function(rdr) {
      var o = liftOpt(mkOption(v)(g)(rdr));
      return maybe(o)(function(a) {
        return alt(parserAlt)(o)(pure(parserApplicative)(a));
      })(v.value0);
    };
  };
};

// output/Options.Applicative.Builder/index.js
var PrefsMod = function(x) {
  return x;
};
var InfoMod = function(x) {
  return x;
};
var value = function(dictHasValue) {
  return function(x) {
    return new Mod(identity(categoryFn), new DefaultProp(new Just(x), Nothing.value), identity(categoryFn));
  };
};
var str = readerAsk;
var showHelpOnEmpty = /* @__PURE__ */ over()()(ParserPrefs)(function(p) {
  return {
    prefShowHelpOnEmpty: true,
    prefBacktrack: p.prefBacktrack,
    prefColumns: p.prefColumns,
    prefDisambiguate: p.prefDisambiguate,
    prefMultiSuffix: p.prefMultiSuffix,
    prefShowHelpOnError: p.prefShowHelpOnError
  };
});
var $$short = function(dictHasName) {
  var $81 = name2(dictHasName);
  return function($82) {
    return fieldMod($81(OptShort.create($82)));
  };
};
var progDesc = function(s) {
  return over()()(ParserInfo)(function(i) {
    return {
      infoProgDesc: paragraph(s),
      infoFailureCode: i.infoFailureCode,
      infoFooter: i.infoFooter,
      infoFullDesc: i.infoFullDesc,
      infoHeader: i.infoHeader,
      infoParser: i.infoParser,
      infoPolicy: i.infoPolicy
    };
  });
};
var noArgError = function(e) {
  return fieldMod(over()()(OptionFields)(function(p) {
    return {
      optNoArgError: $$const(e),
      optCompleter: p.optCompleter,
      optNames: p.optNames
    };
  }));
};
var prefs = function(m) {
  var base = {
    prefMultiSuffix: "",
    prefDisambiguate: false,
    prefShowHelpOnError: false,
    prefShowHelpOnEmpty: false,
    prefBacktrack: Backtrack.value,
    prefColumns: 80
  };
  return un()(PrefsMod)(m)(base);
};
var metavar = function(dictHasMetavar) {
  return function($$var) {
    return optionMod(over()()(OptProperties)(function(p) {
      return {
        propMetaVar: $$var,
        propDescMod: p.propDescMod,
        propHelp: p.propHelp,
        propShowDefault: p.propShowDefault,
        propVisibility: p.propVisibility
      };
    }));
  };
};
var option = function(r) {
  return function(m) {
    var v = append(modSemigroup)(metavar(optionFieldsHasMetavar)("ARG"))(m);
    var v1 = v.value0({
      optNames: [],
      optCompleter: mempty(completerMonoid),
      optNoArgError: ExpectsArgError.create
    });
    var crdr = {
      crCompleter: v1.optCompleter,
      crReader: r
    };
    var rdr = new OptReader(v1.optNames, crdr, v1.optNoArgError);
    return mkParser(v.value1)(v.value2)(rdr);
  };
};
var strOption = /* @__PURE__ */ option(str);
var $$long = function(dictHasName) {
  var $86 = name2(dictHasName);
  return function($87) {
    return fieldMod($86(OptLong.create($87)));
  };
};
var infoModSemigroup = {
  append: function(m1) {
    return function(m2) {
      var $88 = un()(InfoMod)(m2);
      var $89 = un()(InfoMod)(m1);
      return function($90) {
        return $88($89($90));
      };
    };
  }
};
var infoModMonoid = {
  mempty: /* @__PURE__ */ identity(categoryFn),
  Semigroup0: function() {
    return infoModSemigroup;
  }
};
var info2 = function(parser) {
  return function(m) {
    var base = {
      infoParser: parser,
      infoFullDesc: true,
      infoProgDesc: mempty(chunkMonoid(docSemigroup)),
      infoHeader: mempty(chunkMonoid(docSemigroup)),
      infoFooter: mempty(chunkMonoid(docSemigroup)),
      infoFailureCode: $$Error.value,
      infoPolicy: Intersperse.value
    };
    return un()(InfoMod)(m)(base);
  };
};
var hidden = /* @__PURE__ */ optionMod(/* @__PURE__ */ over()()(OptProperties)(function(p) {
  return {
    propVisibility: min(optVisibilityOrd)(Hidden.value)(p.propVisibility),
    propDescMod: p.propDescMod,
    propHelp: p.propHelp,
    propMetaVar: p.propMetaVar,
    propShowDefault: p.propShowDefault
  };
}));
var help = function(s) {
  return optionMod(over()()(OptProperties)(function(p) {
    return {
      propHelp: paragraph(s),
      propDescMod: p.propDescMod,
      propMetaVar: p.propMetaVar,
      propShowDefault: p.propShowDefault,
      propVisibility: p.propVisibility
    };
  }));
};
var header = function(s) {
  return over()()(ParserInfo)(function(i) {
    return {
      infoHeader: paragraph(s),
      infoFailureCode: i.infoFailureCode,
      infoFooter: i.infoFooter,
      infoFullDesc: i.infoFullDesc,
      infoParser: i.infoParser,
      infoPolicy: i.infoPolicy,
      infoProgDesc: i.infoProgDesc
    };
  });
};
var fullDesc = /* @__PURE__ */ over()()(ParserInfo)(function(i) {
  return {
    infoFullDesc: true,
    infoFailureCode: i.infoFailureCode,
    infoFooter: i.infoFooter,
    infoHeader: i.infoHeader,
    infoParser: i.infoParser,
    infoPolicy: i.infoPolicy,
    infoProgDesc: i.infoProgDesc
  };
});
var flag$prime = function(actv) {
  return function(v) {
    var rdr = function() {
      var v1 = v.value0({
        flagNames: [],
        flagActive: actv
      });
      return new FlagReader(v1.flagNames, v1.flagActive);
    }();
    return mkParser(v.value1)(v.value2)(rdr);
  };
};
var flag = function(defv) {
  return function(actv) {
    return function(m) {
      return alt(parserAlt)(flag$prime(actv)(m))(pure(parserApplicative)(defv));
    };
  };
};
var $$switch = /* @__PURE__ */ flag(false)(true);
var eitherReader = function(f) {
  return bind(readMBind)(readerAsk)(function() {
    var $91 = either(readerError)(pure(readMApplicative));
    return function($92) {
      return $91(f($92));
    };
  }());
};
var $$int = /* @__PURE__ */ eitherReader(function(s) {
  var v = fromString(s);
  if (v instanceof Nothing) {
    return new Left("Can't parse as Int: `" + (show(showString)(s) + "`"));
  }
  ;
  if (v instanceof Just) {
    return new Right(v.value0);
  }
  ;
  throw new Error("Failed pattern match at Options.Applicative.Builder (line 124, column 28 - line 126, column 20): " + [v.constructor.name]);
});
var abortOption = function(err) {
  return function(m) {
    return option(readerAbort(err))(function(v) {
      return append(modSemigroup)(v)(m);
    }(fold(foldableArray)(modMonoid)([noArgError(err), value(optionFieldsHasValue)(identity(categoryFn)), metavar(optionFieldsHasMetavar)("")])));
  };
};

// output/Node.Encoding/index.js
var ASCII = /* @__PURE__ */ function() {
  function ASCII2() {
  }
  ;
  ASCII2.value = new ASCII2();
  return ASCII2;
}();
var UTF8 = /* @__PURE__ */ function() {
  function UTF82() {
  }
  ;
  UTF82.value = new UTF82();
  return UTF82;
}();
var UTF16LE = /* @__PURE__ */ function() {
  function UTF16LE2() {
  }
  ;
  UTF16LE2.value = new UTF16LE2();
  return UTF16LE2;
}();
var UCS2 = /* @__PURE__ */ function() {
  function UCS22() {
  }
  ;
  UCS22.value = new UCS22();
  return UCS22;
}();
var Base64 = /* @__PURE__ */ function() {
  function Base642() {
  }
  ;
  Base642.value = new Base642();
  return Base642;
}();
var Latin1 = /* @__PURE__ */ function() {
  function Latin12() {
  }
  ;
  Latin12.value = new Latin12();
  return Latin12;
}();
var Binary = /* @__PURE__ */ function() {
  function Binary2() {
  }
  ;
  Binary2.value = new Binary2();
  return Binary2;
}();
var Hex = /* @__PURE__ */ function() {
  function Hex2() {
  }
  ;
  Hex2.value = new Hex2();
  return Hex2;
}();
var showEncoding = {
  show: function(v) {
    if (v instanceof ASCII) {
      return "ASCII";
    }
    ;
    if (v instanceof UTF8) {
      return "UTF8";
    }
    ;
    if (v instanceof UTF16LE) {
      return "UTF16LE";
    }
    ;
    if (v instanceof UCS2) {
      return "UCS2";
    }
    ;
    if (v instanceof Base64) {
      return "Base64";
    }
    ;
    if (v instanceof Latin1) {
      return "Latin1";
    }
    ;
    if (v instanceof Binary) {
      return "Binary";
    }
    ;
    if (v instanceof Hex) {
      return "Hex";
    }
    ;
    throw new Error("Failed pattern match at Node.Encoding (line 19, column 1 - line 27, column 23): " + [v.constructor.name]);
  }
};

// output/Node.Stream/foreign.js
function writeStringImpl(w) {
  return (enc) => (s) => (done) => () => w.write(s, enc, done);
}

// output/Data.Nullable/foreign.js
function nullable(a, r, f) {
  return a == null ? r : f(a);
}

// output/Data.Nullable/index.js
var toMaybe = function(n) {
  return nullable(n, Nothing.value, Just.create);
};

// output/Node.Stream/index.js
var writeString3 = function(w) {
  return function(enc) {
    return function(s) {
      return function(cb) {
        return writeStringImpl(w)(show(showEncoding)(enc))(s)(function($13) {
          return cb(toMaybe($13))();
        });
      };
    };
  };
};

// output/Data.Array.NonEmpty.Internal/foreign.js
var traverse1Impl = function() {
  function Cont(fn) {
    this.fn = fn;
  }
  var emptyList = {};
  var ConsCell = function(head3, tail2) {
    this.head = head3;
    this.tail = tail2;
  };
  function finalCell(head3) {
    return new ConsCell(head3, emptyList);
  }
  function consList(x) {
    return function(xs) {
      return new ConsCell(x, xs);
    };
  }
  function listToArray(list) {
    var arr = [];
    var xs = list;
    while (xs !== emptyList) {
      arr.push(xs.head);
      xs = xs.tail;
    }
    return arr;
  }
  return function(apply2) {
    return function(map2) {
      return function(f) {
        var buildFrom = function(x, ys) {
          return apply2(map2(consList)(f(x)))(ys);
        };
        var go = function(acc, currentLen, xs) {
          if (currentLen === 0) {
            return acc;
          } else {
            var last3 = xs[currentLen - 1];
            return new Cont(function() {
              var built = go(buildFrom(last3, acc), currentLen - 1, xs);
              return built;
            });
          }
        };
        return function(array) {
          var acc = map2(finalCell)(f(array[array.length - 1]));
          var result = go(acc, array.length - 1, array);
          while (result instanceof Cont) {
            result = result.fn();
          }
          return map2(listToArray)(result);
        };
      };
    };
  };
}();

// output/Data.Array.NonEmpty.Internal/index.js
var NonEmptyArray = function(x) {
  return x;
};

// output/Data.Array.NonEmpty/index.js
var unsafeFromArray = NonEmptyArray;
var toArray4 = function(v) {
  return v;
};
var fromArray4 = function(xs) {
  if (length2(xs) > 0) {
    return new Just(unsafeFromArray(xs));
  }
  ;
  if (otherwise) {
    return Nothing.value;
  }
  ;
  throw new Error("Failed pattern match at Data.Array.NonEmpty (line 157, column 1 - line 157, column 58): " + [xs.constructor.name]);
};
var adaptMaybe = function(f) {
  var $70 = fromJust();
  return function($71) {
    return $70(f(toArray4($71)));
  };
};
var uncons6 = /* @__PURE__ */ adaptMaybe(uncons2);

// output/Options.Applicative.BashCompletion/index.js
var Standard = /* @__PURE__ */ function() {
  function Standard2() {
  }
  ;
  Standard2.value = new Standard2();
  return Standard2;
}();
var Enriched = /* @__PURE__ */ function() {
  function Enriched2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Enriched2.create = function(value0) {
    return function(value1) {
      return new Enriched2(value0, value1);
    };
  };
  return Enriched2;
}();
var zshCompletionScript = function(prog) {
  return function(progn) {
    return pure(applicativeEffect)(["#compdef " + progn, "", "local request", "local completions", "local word", "local index=$((CURRENT - 1))", "", "request=(--bash-completion-enriched --bash-completion-index $index)", "for arg in ${words[@]}; do", "  request=(${request[@]} --bash-completion-word $arg)", "done", "", "IFS=$'\\n' completions=($( " + (prog + ' "${request[@]}" ))'), "", "for word in $completions; do", "  local -a parts", "", "  # Split the line at a tab if there is one.", "  IFS=$'\\t' parts=($( echo $word ))", "", "  if [[ -n $parts[2] ]]; then", '     if [[ $word[1] == "-" ]]; then', '       local desc=("$parts[1] ($parts[2])")', "       compadd -d desc -- $parts[1]", "     else", '       local desc=($(print -f  "%-019s -- %s" $parts[1] $parts[2]))', "       compadd -l -d desc -- $parts[1]", "     fi", "  else", "    compadd -f -- $word", "  fi", "done"]);
  };
};
var fishCompletionScript = function(prog) {
  return function(progn) {
    return pure(applicativeEffect)([" function _" + progn, "    set -l cl (commandline --tokenize --current-process)", "    # Hack around fish issue #3934", "    set -l cn (commandline --tokenize --cut-at-cursor --current-process)", "    set -l cn (count $cn)", "    set -l tmpline --bash-completion-enriched --bash-completion-index $cn", "    for arg in $cl", "      set tmpline $tmpline --bash-completion-word $arg", "    end", "    for opt in (" + (prog + " $tmpline)"), "      if test -d $opt", '        echo -E "$opt/"', "      else", '        echo -E "$opt"', "      end", "    end", "end", "", "complete --no-files --command " + (progn + (" --arguments '(_" + (progn + ")'")))]);
  };
};
var bashCompletionScript = function(prog) {
  return function(progn) {
    return pure(applicativeEffect)(["_" + (progn + "()"), "{", "    local CMDLINE", "    local IFS=$'\\n'", "    CMDLINE=(--bash-completion-index $COMP_CWORD)", "", "    for arg in ${COMP_WORDS[@]}; do", "        CMDLINE=(${CMDLINE[@]} --bash-completion-word $arg)", "    done", "", "    COMPREPLY=( $(" + (prog + ' "${CMDLINE[@]}") )'), "}", "", "complete -o filenames -F _" + (progn + (" " + progn))]);
  };
};
var arraySplitAt = function(idx) {
  return function(arr) {
    if (idx === 0) {
      return {
        init: [],
        rest: arr
      };
    }
    ;
    return {
      init: slice(0)(idx)(arr),
      rest: slice(idx)(length2(arr))(arr)
    };
  };
};
var bashCompletionQuery = function(pinfo) {
  return function(pprefs) {
    return function(richness) {
      return function(ws) {
        return function(i) {
          return function(v) {
            var v1 = arraySplitAt(i)(ws);
            var run_completer = function(c) {
              return un()(Completer)(c)(fromMaybe("")(head2(v1.rest)));
            };
            var render_line = function(len) {
              return function(doc) {
                var v22 = map(functorMaybe)(uncons6)(fromArray4(lines(displayS(renderPretty(1)(len)(doc)))));
                if (v22 instanceof Nothing) {
                  return "";
                }
                ;
                if (v22 instanceof Just && v22.value0.tail.length === 0) {
                  return v22.value0.head;
                }
                ;
                if (v22 instanceof Just) {
                  return v22.value0.head + "...";
                }
                ;
                throw new Error("Failed pattern match at Options.Applicative.BashCompletion (line 162, column 27 - line 165, column 43): " + [v22.constructor.name]);
              };
            };
            var is_completion = function() {
              var v22 = head2(v1.rest);
              if (v22 instanceof Just) {
                return startsWith(v22.value0);
              }
              ;
              if (v22 instanceof Nothing) {
                return $$const(true);
              }
              ;
              throw new Error("Failed pattern match at Options.Applicative.BashCompletion (line 175, column 7 - line 177, column 30): " + [v22.constructor.name]);
            }();
            var filter_names = filter2(is_completion);
            var show_names = function() {
              var $83 = map(functorArray)(showOption);
              return function($84) {
                return filter_names($83($84));
              };
            }();
            var compl = runParserInfo(completionMonadP)(pinfo)(fromFoldable(foldableArray)(drop(1)(v1.init)));
            var add_opt_help = function(dictFunctor) {
              return function(opt2) {
                if (richness instanceof Standard) {
                  return identity(categoryFn);
                }
                ;
                if (richness instanceof Enriched) {
                  return map(dictFunctor)(function(o) {
                    var h = un()(Chunk)(optHelp(opt2));
                    return maybe(o)(function(h$prime) {
                      return o + ("	" + render_line(richness.value0)(h$prime));
                    })(h);
                  });
                }
                ;
                throw new Error("Failed pattern match at Options.Applicative.BashCompletion (line 138, column 24 - line 143, column 79): " + [richness.constructor.name]);
              };
            };
            var add_cmd_help = function(dictFunctor) {
              return function(p) {
                if (richness instanceof Standard) {
                  return identity(categoryFn);
                }
                ;
                if (richness instanceof Enriched) {
                  return map(dictFunctor)(function(cmd) {
                    var h = bind(bindMaybe)(p(cmd))(function() {
                      var $85 = un()(Chunk);
                      var $86 = un()(ParserInfo);
                      return function($87) {
                        return $85(function(v22) {
                          return v22.infoProgDesc;
                        }($86($87)));
                      };
                    }());
                    return maybe(cmd)(function(h$prime) {
                      return cmd + ("	" + render_line(richness.value1)(h$prime));
                    })(h);
                  });
                }
                ;
                throw new Error("Failed pattern match at Options.Applicative.BashCompletion (line 148, column 22 - line 153, column 85): " + [richness.constructor.name]);
              };
            };
            var opt_completions = function(argPolicy) {
              return function(hinfo) {
                return function(opt2) {
                  var v22 = un()(Option)(opt2).optMain;
                  if (v22 instanceof OptReader) {
                    if (notEq(argPolicyEq)(argPolicy)(AllPositionals.value)) {
                      return pure(applicativeEffect)(add_opt_help(functorArray)(opt2)(show_names(v22.value0)));
                    }
                    ;
                    if (otherwise) {
                      return pure(applicativeEffect)([]);
                    }
                    ;
                  }
                  ;
                  if (v22 instanceof FlagReader) {
                    if (notEq(argPolicyEq)(argPolicy)(AllPositionals.value)) {
                      return pure(applicativeEffect)(add_opt_help(functorArray)(opt2)(show_names(v22.value0)));
                    }
                    ;
                    if (otherwise) {
                      return pure(applicativeEffect)([]);
                    }
                    ;
                  }
                  ;
                  if (v22 instanceof ArgReader) {
                    if (un()(OptHelpInfo)(hinfo).hinfoUnreachableArgs) {
                      return pure(applicativeEffect)([]);
                    }
                    ;
                    if (otherwise) {
                      return run_completer(un()(CReader)(v22.value0).crCompleter);
                    }
                    ;
                  }
                  ;
                  if (v22 instanceof CmdReader) {
                    if (un()(OptHelpInfo)(hinfo).hinfoUnreachableArgs) {
                      return pure(applicativeEffect)([]);
                    }
                    ;
                    if (otherwise) {
                      return pure(applicativeEffect)(add_cmd_help(functorArray)(v22.value2)(filter_names(v22.value1)));
                    }
                    ;
                  }
                  ;
                  throw new Error("Failed pattern match at Options.Applicative.BashCompletion (line 113, column 43 - line 133, column 53): " + [v22.constructor.name]);
                };
              };
            };
            var list_options = function(a) {
              var $88 = map(functorEffect)(fold(foldableArray)(monoidArray));
              var $89 = sequence(traversableArray)(applicativeEffect);
              var $90 = mapParser(opt_completions(a));
              return function($91) {
                return $88($89($90($91)));
              };
            };
            var v2 = runCompletion(compl)(pprefs);
            if (v2 instanceof Just && v2.value0 instanceof Left) {
              return runExists(function(p) {
                return list_options(v2.value0.value0.value1)(p);
              })(v2.value0.value0.value0.value0);
            }
            ;
            if (v2 instanceof Just && v2.value0 instanceof Right) {
              return run_completer(v2.value0.value0);
            }
            ;
            if (v2 instanceof Nothing) {
              return pure(applicativeEffect)([]);
            }
            ;
            throw new Error("Failed pattern match at Options.Applicative.BashCompletion (line 83, column 52 - line 89, column 15): " + [v2.constructor.name]);
          };
        };
      };
    };
  };
};
var bashCompletionParser = function(pinfo) {
  return function(pprefs) {
    var failure = function(opts) {
      return {
        execCompletion: function(progn) {
          return map(functorEffect)(unLines(foldableArray))(opts(progn));
        }
      };
    };
    var complParser = alt(parserAlt)(map(parserFunctor)(failure)(apply(parserApply)(apply(parserApply)(map(parserFunctor)(bashCompletionQuery(pinfo)(pprefs))(alt(parserAlt)(apply(parserApply)(apply(parserApply)(flag$prime(Enriched.create)(append(modSemigroup)($$long(flagFieldsHasName)("bash-completion-enriched"))(internal)))(option($$int)(append(modSemigroup)(append(modSemigroup)($$long(optionFieldsHasName)("bash-completion-option-desc-length"))(internal))(value(optionFieldsHasValue)(40)))))(option($$int)(append(modSemigroup)(append(modSemigroup)($$long(optionFieldsHasName)("bash-completion-command-desc-length"))(internal))(value(optionFieldsHasValue)(40)))))(pure(parserApplicative)(Standard.value))))(map(parserFunctor)(fromFoldable3(foldableList))(many(strOption(append(modSemigroup)($$long(optionFieldsHasName)("bash-completion-word"))(internal))))))(option($$int)(append(modSemigroup)($$long(optionFieldsHasName)("bash-completion-index"))(internal)))))(alt(parserAlt)(map(parserFunctor)(failure)(map(parserFunctor)(bashCompletionScript)(strOption(append(modSemigroup)($$long(optionFieldsHasName)("bash-completion-script"))(internal)))))(alt(parserAlt)(map(parserFunctor)(failure)(map(parserFunctor)(fishCompletionScript)(strOption(append(modSemigroup)($$long(optionFieldsHasName)("fish-completion-script"))(internal)))))(map(parserFunctor)(failure)(map(parserFunctor)(zshCompletionScript)(strOption(append(modSemigroup)($$long(optionFieldsHasName)("zsh-completion-script"))(internal)))))));
    return complParser;
  };
};

// output/Options.Applicative.Help.Core/index.js
var OptDescStyle = function(x) {
  return x;
};
var usageHelp = function(chunk) {
  return over()()(ParserHelp)(function(v) {
    return {
      helpUsage: chunk,
      helpBody: v.helpBody,
      helpError: v.helpError,
      helpFooter: v.helpFooter,
      helpHeader: v.helpHeader,
      helpSuggestions: v.helpSuggestions
    };
  })(mempty(parserHelpMonoid));
};
var suggestionsHelp = function(chunk) {
  return over()()(ParserHelp)(function(v) {
    return {
      helpSuggestions: chunk,
      helpBody: v.helpBody,
      helpError: v.helpError,
      helpFooter: v.helpFooter,
      helpHeader: v.helpHeader,
      helpUsage: v.helpUsage
    };
  })(mempty(parserHelpMonoid));
};
var intersperse2 = function(sep) {
  var $28 = fold2(monoidArray);
  var $29 = mapWithIndex2(function(idx) {
    return function(e) {
      var $13 = idx === 0;
      if ($13) {
        return [e];
      }
      ;
      return [sep, e];
    };
  });
  return function($30) {
    return $28($29($30));
  };
};
var optDesc = function(pprefs) {
  return function(style) {
    return function(info3) {
      return function(opt2) {
        var suffix = function() {
          if (un()(OptHelpInfo)(info3).hinfoMulti) {
            return stringChunk(un()(ParserPrefs)(pprefs).prefMultiSuffix);
          }
          ;
          if (otherwise) {
            return mempty(chunkMonoid(docSemigroup));
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Help.Core (line 58, column 7 - line 62, column 17): " + []);
        }();
        var show_opt = function() {
          if (un()(OptHelpInfo)(info3).hinfoDefault && !un()(OptDescStyle)(style).descOptional) {
            return false;
          }
          ;
          if (eq(optVisibilityEq)(optVisibility(opt2))(Hidden.value)) {
            return un()(OptDescStyle)(style).descHidden;
          }
          ;
          if (otherwise) {
            return eq(optVisibilityEq)(optVisibility(opt2))(Visible.value);
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Help.Core (line 51, column 7 - line 57, column 39): " + []);
        }();
        var ns = optionNames(un()(Option)(opt2).optMain);
        var mv = stringChunk(optMetaVar(opt2));
        var descs = map(functorArray)(function($31) {
          return string(showOption($31));
        })(sort(optNameOrd)(ns));
        var render = function(chunk) {
          if (!show_opt) {
            return mempty(chunkMonoid(docSemigroup));
          }
          ;
          if (isEmpty2(chunk) || !un()(OptDescStyle)(style).descSurround) {
            return append(chunkSemigroup(docSemigroup))(chunk)(suffix);
          }
          ;
          if (un()(OptHelpInfo)(info3).hinfoDefault) {
            return append(chunkSemigroup(docSemigroup))(map(chunkFunctor)(brackets)(chunk))(suffix);
          }
          ;
          if ($$null2(drop(1)(descs))) {
            return append(chunkSemigroup(docSemigroup))(chunk)(suffix);
          }
          ;
          if (otherwise) {
            return append(chunkSemigroup(docSemigroup))(map(chunkFunctor)(parens)(chunk))(suffix);
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Help.Core (line 63, column 7 - line 73, column 43): " + [chunk.constructor.name]);
        };
        var desc$prime = chunkBeside(listToChunk(docMonoid)(intersperse2(un()(OptDescStyle)(style).descSep)(descs)))(mv);
        return maybe(identity(categoryFn))(map(chunkFunctor))(optDescMod(opt2))(render(desc$prime));
      };
    };
  };
};
var headerHelp = function(chunk) {
  return over()()(ParserHelp)(function(v) {
    return {
      helpHeader: chunk,
      helpBody: v.helpBody,
      helpError: v.helpError,
      helpFooter: v.helpFooter,
      helpSuggestions: v.helpSuggestions,
      helpUsage: v.helpUsage
    };
  })(mempty(parserHelpMonoid));
};
var fullDesc2 = function(pprefs) {
  var style = {
    descSep: string(","),
    descHidden: true,
    descOptional: true,
    descSurround: false
  };
  var doc = function(info3) {
    return function(opt2) {
      var show_def = function(s) {
        return parens(appendWithSpace(string("default:"))(string(s)));
      };
      var n = optDesc(pprefs)(style)(info3)(opt2);
      var hdef = map(functorMaybe)(show_def)(optShowDefault(opt2));
      var h = optHelp(opt2);
      return discard(discardUnit)(bindMaybe)(guard(alternativeMaybe)(!isEmpty2(n)))(function() {
        return discard(discardUnit)(bindMaybe)(guard(alternativeMaybe)(!isEmpty2(h)))(function() {
          return pure(applicativeMaybe)(new Tuple(extractChunk(docMonoid)(n), align(extractChunk(docMonoid)(chunkBeside(h)(hdef)))));
        });
      });
    };
  };
  var $32 = mapParser(doc);
  return function($33) {
    return tabulate(catMaybes($32($33)));
  };
};
var footerHelp = function(chunk) {
  return over()()(ParserHelp)(function(v) {
    return {
      helpFooter: chunk,
      helpBody: v.helpBody,
      helpError: v.helpError,
      helpHeader: v.helpHeader,
      helpSuggestions: v.helpSuggestions,
      helpUsage: v.helpUsage
    };
  })(mempty(parserHelpMonoid));
};
var fold_tree = function(v) {
  if (v instanceof Leaf2) {
    return v.value0;
  }
  ;
  if (v instanceof MultNode) {
    return foldr2(function($34) {
      return chunkBesideOrBelow(fold_tree($34));
    })(mempty(chunkMonoid(docSemigroup)))(v.value0);
  }
  ;
  if (v instanceof AltNode) {
    var alt_node = function(v1) {
      if (v1.length === 1) {
        return v1[0];
      }
      ;
      return map(chunkFunctor)(parens)(foldr2(chunked(function(x) {
        return function(y) {
          return appendWithSoftline(x)(appendWithSoftline($$char("|"))(y));
        };
      }))(mempty(chunkMonoid(docSemigroup)))(v1));
    };
    return alt_node(filter2(function() {
      var $35 = not(heytingAlgebraBoolean);
      return function($36) {
        return $35(isEmpty2($36));
      };
    }())(map(functorArray)(fold_tree)(v.value0)));
  }
  ;
  throw new Error("Failed pattern match at Options.Applicative.Help.Core (line 116, column 1 - line 116, column 46): " + [v.constructor.name]);
};
var errorHelp = function(chunk) {
  return over()()(ParserHelp)(function(v) {
    return {
      helpError: chunk,
      helpBody: v.helpBody,
      helpFooter: v.helpFooter,
      helpHeader: v.helpHeader,
      helpSuggestions: v.helpSuggestions,
      helpUsage: v.helpUsage
    };
  })(mempty(parserHelpMonoid));
};
var cmdDesc = /* @__PURE__ */ function() {
  var desc = function(v) {
    return function(opt2) {
      var v1 = un()(Option)(opt2).optMain;
      if (v1 instanceof CmdReader) {
        return new Tuple(v1.value0, tabulate(bind(bindArray)(reverse2(v1.value1))(function(cmd) {
          return bind(bindArray)(maybe([])(pure(applicativeArray))(map(functorMaybe)(function() {
            var $37 = un()(ParserInfo);
            return function($38) {
              return function(v2) {
                return v2.infoProgDesc;
              }($37($38));
            };
          }())(v1.value2(cmd))))(function(d) {
            return pure(applicativeArray)(new Tuple(string(cmd), align(extractChunk(docMonoid)(d))));
          });
        })));
      }
      ;
      return mempty(monoidTuple(monoidMaybe(semigroupString))(chunkMonoid(docSemigroup)));
    };
  };
  return mapParser(desc);
}();
var briefDesc$prime = function(showOptional) {
  return function(pprefs) {
    var style = {
      descSep: string("|"),
      descHidden: false,
      descOptional: showOptional,
      descSurround: true
    };
    var $39 = treeMapParser(optDesc(pprefs)(style));
    return function($40) {
      return fold_tree($39($40));
    };
  };
};
var missingDesc = /* @__PURE__ */ briefDesc$prime(false);
var briefDesc = /* @__PURE__ */ briefDesc$prime(true);
var parserUsage = function(pprefs) {
  return function(p) {
    return function(progn) {
      return hsep([string("Usage:"), string(progn), align(extractChunk(docMonoid)(briefDesc(pprefs)(p)))]);
    };
  };
};
var bodyHelp = function(chunk) {
  return over()()(ParserHelp)(function(v) {
    return {
      helpBody: chunk,
      helpError: v.helpError,
      helpFooter: v.helpFooter,
      helpHeader: v.helpHeader,
      helpSuggestions: v.helpSuggestions,
      helpUsage: v.helpUsage
    };
  })(mempty(parserHelpMonoid));
};
var parserHelp = function(pprefs) {
  return function(p) {
    var with_title = function(title) {
      return map(chunkFunctor)(function(v) {
        return appendWithLine(string(title))(v);
      });
    };
    var group_title = function(arr) {
      var v = uncons6(arr);
      return with_title(fromMaybe("Available commands:")(fst(v.head)))(vcatChunks(append(semigroupArray)([snd(v.head)])(map(functorArray)(snd)(v.tail))));
    };
    var cs = groupBy(on(eq(eqMaybe(eqString)))(fst))(cmdDesc(p));
    return bodyHelp(vsepChunks(append(semigroupArray)([with_title("Available options:")(fullDesc2(pprefs)(p))])(map(functorArray)(group_title)(cs))));
  };
};

// output/Data.Function.Memoize/index.js
var NatTrie = /* @__PURE__ */ function() {
  function NatTrie2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  ;
  NatTrie2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new NatTrie2(value0, value1, value2);
      };
    };
  };
  return NatTrie2;
}();
var tabulateNat = {
  tabulate: /* @__PURE__ */ function() {
    var tabulateImpl = function(f) {
      var walk = function(v) {
        return function(v1) {
          if (v instanceof Nil) {
            return v1.value0;
          }
          ;
          if (v instanceof Cons && !v.value0) {
            return bind(bindLazy)(v1.value1)(walk(v.value1));
          }
          ;
          if (v instanceof Cons && v.value0) {
            return bind(bindLazy)(v1.value2)(walk(v.value1));
          }
          ;
          throw new Error("Failed pattern match at Data.Function.Memoize (line 137, column 11 - line 137, column 64): " + [v.constructor.name, v1.constructor.name]);
        };
      };
      var build = function(n) {
        return new NatTrie(defer2(function(v) {
          return f(n);
        }), defer2(function(v) {
          return build(n * 2 | 0);
        }), defer2(function(v) {
          return build((n * 2 | 0) + 1 | 0);
        }));
      };
      var trie = build(0);
      var bits = function() {
        var bits$prime = function($copy_acc) {
          return function($copy_v) {
            var $tco_var_acc = $copy_acc;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(acc, v) {
              if (v === 0) {
                $tco_done = true;
                return acc;
              }
              ;
              $tco_var_acc = new Cons((v & 1) !== 0, acc);
              $copy_v = v >>> 1;
              return;
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_acc, $copy_v);
            }
            ;
            return $tco_result;
          };
        };
        return bits$prime(Nil.value);
      }();
      var go = function(n) {
        return walk(bits(n))(trie);
      };
      return go;
    };
    return tabulateImpl;
  }()
};
var tabulate2 = function(dict) {
  return dict.tabulate;
};
var tabulateTuple = function(dictTabulate) {
  return function(dictTabulate1) {
    return {
      tabulate: function(f) {
        var f$prime = tabulate2(dictTabulate)(function(a) {
          return tabulate2(dictTabulate1)(function(b) {
            return f(new Tuple(a, b));
          });
        });
        return function(v) {
          return bind(bindLazy)(f$prime(v.value0))(function(g) {
            return g(v.value1);
          });
        };
      }
    };
  };
};
var memoize = function(dictTabulate) {
  return function(f) {
    var f1 = tabulate2(dictTabulate)(f);
    return function($105) {
      return force(f1($105));
    };
  };
};
var memoize2 = function(dictTabulate) {
  return function(dictTabulate1) {
    return function(f) {
      var f1 = memoize(tabulateTuple(dictTabulate)(dictTabulate1))(uncurry(f));
      return curry(f1);
    };
  };
};

// output/Options.Applicative.Help.Levenshtein/index.js
var $runtime_lazy4 = function(name3, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var editDistance = function(dictEq) {
  return function(xs) {
    return function(ys) {
      var dist = function(v) {
        return function(v1) {
          if (v === 0) {
            return v1;
          }
          ;
          if (v1 === 0) {
            return v;
          }
          ;
          return minimum(ordInt)(foldable1NonEmpty(foldableArray))(new NonEmpty($lazy_dist$prime(37)(v - 1 | 0)(v1) + 1 | 0, [$lazy_dist$prime(38)(v)(v1 - 1 | 0) + 1 | 0, function() {
            var $5 = eq(dictEq)(xs[v - 1 | 0])(ys[v1 - 1 | 0]);
            if ($5) {
              return $lazy_dist$prime(40)(v - 1 | 0)(v1 - 1 | 0);
            }
            ;
            return 1 + $lazy_dist$prime(41)(v - 1 | 0)(v1 - 1 | 0) | 0;
          }()]));
        };
      };
      var $lazy_dist$prime = $runtime_lazy4("dist'", "Options.Applicative.Help.Levenshtein", function() {
        return memoize2(tabulateNat)(tabulateNat)(function(a) {
          return function(b) {
            return dist(a)(b);
          };
        });
      });
      var dist$prime = $lazy_dist$prime(31);
      return dist$prime(length2(xs))(length2(ys));
    };
  };
};

// output/Options.Applicative.Extra/index.js
var renderFailure = function(failure) {
  return function(progn) {
    var v = un()(ParserFailure)(failure)(progn);
    return new Tuple(renderHelp(v.value1.value1.value0)(v.value0), v.value1.value0);
  };
};
var parserFailure = function(pprefs) {
  return function(pinfo) {
    return function(msg) {
      return function(ctx) {
        var with_context = function(arr) {
          return function(i) {
            return function(f) {
              var v = head2(arr);
              if (v instanceof Nothing) {
                return f([])(i);
              }
              ;
              if (v instanceof Just) {
                return runExists(function(i$prime) {
                  return f(contextNames(arr))(i$prime);
                })(v.value0.value1);
              }
              ;
              throw new Error("Failed pattern match at Options.Applicative.Extra (line 183, column 28 - line 185, column 73): " + [v.constructor.name]);
            };
          };
        };
        var usage_help = function(progn) {
          return function(names) {
            return function(v) {
              if (msg instanceof InfoMsg) {
                return mempty(parserHelpMonoid);
              }
              ;
              return usageHelp(vcatChunks([pure(chunkApplicative)(parserUsage(pprefs)(v.infoParser)(unWords(foldableArray)(append(semigroupArray)([progn])(names)))), map(chunkFunctor)(indent(2))(v.infoProgDesc)]));
            };
          };
        };
        var suggestion_help = suggestionsHelp(function() {
          if (msg instanceof UnexpectedError) {
            var opt_completions = function(v) {
              return function(v1) {
                if (v1.optMain instanceof OptReader) {
                  return map(functorArray)(showOption)(v1.optMain.value0);
                }
                ;
                if (v1.optMain instanceof FlagReader) {
                  return map(functorArray)(showOption)(v1.optMain.value0);
                }
                ;
                if (v1.optMain instanceof ArgReader) {
                  return [];
                }
                ;
                if (v1.optMain instanceof CmdReader) {
                  if (v.hinfoUnreachableArgs) {
                    return [];
                  }
                  ;
                  if (otherwise) {
                    return v1.optMain.value1;
                  }
                  ;
                }
                ;
                throw new Error("Failed pattern match at Options.Applicative.Extra (line 273, column 64 - line 280, column 37): " + [v1.optMain.constructor.name]);
              };
            };
            var possibles = fold2(monoidArray)(runExists(function(zz) {
              return mapParser(opt_completions)(zz);
            })(msg.value1.value0));
            var isClose = function(a) {
              return on(editDistance(eqChar))(toCharArray)(a)(msg.value0) < 3;
            };
            var good = filter2(isClose)(possibles);
            var prose = function() {
              var $43 = length2(good) < 2;
              if ($43) {
                return stringChunk("Did you mean this?");
              }
              ;
              return stringChunk("Did you mean one of these?");
            }();
            var suggestions = apply(chunkApply)(map(chunkFunctor)(appendWithLine)(prose))(map(chunkFunctor)(indent(4))(vcatChunks(map(functorArray)(stringChunk)(good))));
            return suggestions;
          }
          ;
          return mempty(chunkMonoid(docSemigroup));
        }());
        var show_full_help = function() {
          if (msg instanceof ShowHelpText) {
            return true;
          }
          ;
          if (msg instanceof MissingError && (msg.value0 instanceof CmdStart && un()(ParserPrefs)(pprefs).prefShowHelpOnEmpty)) {
            return true;
          }
          ;
          return un()(ParserPrefs)(pprefs).prefShowHelpOnError;
        }();
        var exit_code = function() {
          if (msg instanceof ErrorMsg) {
            return un()(ParserInfo)(pinfo).infoFailureCode;
          }
          ;
          if (msg instanceof MissingError) {
            return un()(ParserInfo)(pinfo).infoFailureCode;
          }
          ;
          if (msg instanceof ExpectsArgError) {
            return un()(ParserInfo)(pinfo).infoFailureCode;
          }
          ;
          if (msg instanceof UnexpectedError) {
            return un()(ParserInfo)(pinfo).infoFailureCode;
          }
          ;
          if (msg instanceof ShowHelpText) {
            return Success.value;
          }
          ;
          if (msg instanceof InfoMsg) {
            return Success.value;
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Extra (line 171, column 17 - line 177, column 44): " + [msg.constructor.name]);
        }();
        var error_help = errorHelp(function() {
          if (msg instanceof ShowHelpText) {
            return mempty(chunkMonoid(docSemigroup));
          }
          ;
          if (msg instanceof ErrorMsg) {
            return stringChunk(msg.value0);
          }
          ;
          if (msg instanceof InfoMsg) {
            return stringChunk(msg.value0);
          }
          ;
          if (msg instanceof MissingError && (msg.value0 instanceof CmdStart && un()(ParserPrefs)(pprefs).prefShowHelpOnEmpty)) {
            return mempty(chunkMonoid(docSemigroup));
          }
          ;
          if (msg instanceof MissingError) {
            return runExists(function(x) {
              return chunkBeside(stringChunk("Missing:"))(missingDesc(pprefs)(x));
            })(msg.value1.value0);
          }
          ;
          if (msg instanceof ExpectsArgError) {
            return stringChunk("The option `" + (msg.value0 + "` expects an argument."));
          }
          ;
          if (msg instanceof UnexpectedError) {
            var msg$prime = function() {
              var $67 = startsWith("-")(msg.value0);
              if ($67) {
                return "Invalid option `" + (msg.value0 + "'");
              }
              ;
              return "Invalid argument `" + (msg.value0 + "'");
            }();
            return stringChunk(msg$prime);
          }
          ;
          throw new Error("Failed pattern match at Options.Applicative.Extra (line 196, column 30 - line 225, column 30): " + [msg.constructor.name]);
        }());
        var base_help = function(v) {
          var h = headerHelp(v.infoHeader);
          var f = footerHelp(v.infoFooter);
          if (show_full_help) {
            return fold2(parserHelpMonoid)([h, f, parserHelp(pprefs)(v.infoParser)]);
          }
          ;
          return mempty(parserHelpMonoid);
        };
        return function(progn) {
          var h = with_context(ctx)(pinfo)(function(names) {
            return function(pinfo$prime) {
              return fold2(parserHelpMonoid)([base_help(pinfo$prime), usage_help(progn)(names)(pinfo$prime), suggestion_help, error_help]);
            };
          });
          return new Tuple(h, new Tuple(exit_code, new Tuple(un()(ParserPrefs)(pprefs).prefColumns, unit)));
        };
      };
    };
  };
};
var helper = /* @__PURE__ */ function() {
  return abortOption(ShowHelpText.value)(fold2(modMonoid)([$$long(optionFieldsHasName)("help"), $$short(optionFieldsHasName)("h"), help("Show this help text"), hidden]));
}();
var getProgName = /* @__PURE__ */ mapFlipped(functorEffect)(argv)(function(args) {
  return fromMaybe("")(bind(bindMaybe)(index(args)(1))(function(executablePath) {
    return last(split("/")(executablePath));
  }));
});
var getArgs = /* @__PURE__ */ mapFlipped(functorEffect)(argv)(/* @__PURE__ */ drop(2));
var exitWith = function(c) {
  return exit(fromEnum(boundedEnumExitCode)(c));
};
var exitSuccess = /* @__PURE__ */ function() {
  return exit(fromEnum(boundedEnumExitCode)(Success.value));
}();
var handleParseResult = function(v) {
  if (v instanceof Success2) {
    return pure(applicativeEffect)(v.value0);
  }
  ;
  if (v instanceof Failure) {
    return function __do() {
      var progn = getProgName();
      var v1 = renderFailure(v.value0)(progn);
      var stream = function() {
        if (v1.value1 instanceof Success) {
          return stdout;
        }
        ;
        return stderr;
      }();
      $$void(functorEffect)(writeString3(stream)(UTF8.value)(v1.value0 + "\n")(mempty(monoidFn(monoidEffect(monoidUnit)))))();
      return exitWith(v1.value1)();
    };
  }
  ;
  if (v instanceof CompletionInvoked) {
    return function __do() {
      var progn = getProgName();
      var msg = un()(CompletionResult)(v.value0).execCompletion(progn)();
      $$void(functorEffect)(writeString3(stdout)(UTF8.value)(msg)(mempty(monoidFn(monoidEffect(monoidUnit)))))();
      return exitSuccess();
    };
  }
  ;
  throw new Error("Failed pattern match at Options.Applicative.Extra (line 110, column 1 - line 110, column 58): " + [v.constructor.name]);
};
var execParserPure = function(pprefs) {
  return function(pinfo) {
    return function(args) {
      var pinfo$prime = over()()(ParserInfo)(function(i) {
        return {
          infoParser: alt(parserAlt)(map(parserFunctor)(Left.create)(bashCompletionParser(pinfo)(pprefs)))(map(parserFunctor)(Right.create)(i.infoParser)),
          infoFailureCode: i.infoFailureCode,
          infoFooter: i.infoFooter,
          infoFullDesc: i.infoFullDesc,
          infoHeader: i.infoHeader,
          infoPolicy: i.infoPolicy,
          infoProgDesc: i.infoProgDesc
        };
      })(pinfo);
      var p = runParserInfo(pMonadP)(pinfo$prime)(fromFoldable(foldableArray)(args));
      var v = runP(p)(pprefs);
      if (v.value0 instanceof Right && v.value0.value0 instanceof Right) {
        return new Success2(v.value0.value0.value0);
      }
      ;
      if (v.value0 instanceof Right && v.value0.value0 instanceof Left) {
        return new CompletionInvoked(v.value0.value0.value0);
      }
      ;
      if (v.value0 instanceof Left) {
        return new Failure(parserFailure(pprefs)(pinfo)(v.value0.value0)(v.value1));
      }
      ;
      throw new Error("Failed pattern match at Options.Applicative.Extra (line 144, column 3 - line 147, column 73): " + [v.constructor.name]);
    };
  };
};
var customExecParser = function(pprefs) {
  return function(pinfo) {
    return bind(bindEffect)(map(functorEffect)(execParserPure(pprefs)(pinfo))(getArgs))(handleParseResult);
  };
};

// output/Main/index.js
var runGame = function(env) {
  return function __do() {
    var $$interface = createConsoleInterface(noCompletion)();
    setPrompt("> ")($$interface)();
    var lineHandler = function(currentState) {
      return function(input) {
        return function __do2() {
          (function() {
            var v = runRWS(game(split(wrap()(" "))(input)))(env)(currentState);
            for_(applicativeEffect)(foldableList)(v.value2)(log)();
            return setLineHandler(lineHandler(v.value0))($$interface)();
          })();
          prompt($$interface)();
          return unit;
        };
      };
    };
    setLineHandler(lineHandler(initialGameState))($$interface)();
    prompt($$interface)();
    return unit;
  };
};
var main = /* @__PURE__ */ function() {
  var prefs2 = prefs(showHelpOnEmpty);
  var player = strOption(fold(foldableArray)(modMonoid)([$$long(optionFieldsHasName)("player"), $$short(optionFieldsHasName)("p"), metavar(optionFieldsHasMetavar)("<player name>"), help("The player's name <String>")]));
  var parserOptions = fold(foldableArray)(infoModMonoid)([fullDesc, progDesc("Play the game as <player name>"), header("Monadic Adventures! A game to learn monad transformers")]);
  var debug2 = $$switch(fold(foldableArray)(modMonoid)([$$long(flagFieldsHasName)("debug"), $$short(flagFieldsHasName)("d"), help("Use debug mode")]));
  var env = apply(parserApply)(map(parserFunctor)(gameEnvironment)(player))(debug2);
  var argParser = info2(apApplyFlipped(parserApply)(env)(helper))(parserOptions);
  return bind(bindEffect)(customExecParser(prefs2)(argParser))(runGame);
}();

// <stdin>
main();

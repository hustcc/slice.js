/**
  Copyright (c) 2016 hustcc http://www.atool.org/
  License: MIT 
  https://github.com/hustcc/pys
**/
/* jshint expr: true */ 
!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory();
  else
    root.pys = factory();
}(typeof window !== 'undefined' ? window : this, function () {
  /**
   *  pys( p )(selector) -> String
   *  - p: the origin string / array to be substring / slice.
   *  - selector: python style substring style
   * [:]
   * [:4]
   * [3:]
   *
   * [1:5]
   * [1:-1]
   * [-2:5]
   * [-1, -5]
   *
   * [1:7:2]
   * [:7:2]
   * [1::2]
   * [::2]
   *
   *  this is a enganced String.substring / Array.slice function, with python style paramter.
  **/
  var PYS = function(p) {
    /**
     * get type of the var.
    **/
    function what(v) {
      if (v === null) return 'null';
      if (v !== Object(v)) return typeof v;
      return ({}).toString.call(v).slice(8, -1).toLowerCase();
    }
    function toInt(v, d) {
      v = parseInt(v);
      return isNaN(v) ? d : v;
    }
    function parseSelector(selector) {
      selector = (selector + '').split(':');
      var start, end, step, len = selector.length;

      if (len >= 1) start = toInt(selector[0], 0);
      if (len >= 2) end = toInt(selector[1], p.length);
      if (len >= 3) step = toInt(selector[2], 1);

      if (start === undefined) throw new Error('slice start cannot be empty.');
      if (end === undefined) end = start + 1;
      if (step === undefined) step = 1;
      return [start, end, step];
    }
    function sub(obj, selector) {
      var rst = [], len = p.length;
          start = (selector[0] < 0 ? len + selector[0] : selector[0]), 
          end = (selector[1] < 0 ? len + selector[1] : selector[1]), 
          step = selector[2];

      if (step === 0) throw new Error('slice step cannot be zero.');

      if (end === start || (end - start) * step < 0) {
        return rst;
      }
      // direct
      if (step > 0) {
        for (; start < end; start += step) {
          rst.push(obj[start]);
        }
      }
      else {
        for (; end < start; start += step) {
          rst.push(obj[start]);
        }
      }
      return rst;
    }
    /**
     * Python style Substring
    **/
    function pyStyleSubstring(selector) {
      return pyStyleSlice(selector).join('');
    }
    /**
     * Python style Slice
    **/
    function pyStyleSlice(selector) {
      return sub(p, parseSelector(selector));
    }

    function pyStyle(p) {
      p = what(p);
      if (p === 'string') return pyStyleSubstring;
      if (p === 'array') return pyStyleSlice;
      throw new Error('Argument can only be array / string.');
    }
    
    return pyStyle(p);
  };
  return PYS;
});
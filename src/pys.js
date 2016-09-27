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
}(typeof window !== 'undefined' ? window : this, 
function () {
  /**
   *  pys(p)(selector) -> String / Array
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
   *  this is an enganced String.substring / Array.slice function, with python slice style.
  **/
  function PYS(p) {
    var undefinedVar; // undefined, for js code minify.

    // throw the exception/
    function except(m) {
      throw new Error(m);
    }
    /**
     * convent var to INT, if empty, then get the default value.
    **/
    function toInt(v, d) {
      v = v.replace(/(^\s*)|(\s*$)/g, '');
      if ('' === v) return d;
      return parseInt(v);
    }
    /**
     * var is not undefined, but is NaN.
    **/
    function justNaN(v) {
      return v !== undefinedVar && isNaN(v);
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
      // parse selector
      // get start, end, step
      selector = (selector + '').split(':');
      var start, end, step, 
          slen = selector.length,
          rst = [],
          len = p.length;

      if (slen > 0) start = toInt(selector[0], 0);
      if (slen > 1) end = toInt(selector[1], len);
      if (slen > 2) step = toInt(selector[2], 1);

      if (start === undefinedVar || justNaN(start) || justNaN(end) || justNaN(step)) 
        except('slice indices must be integer / blank.');
      if (end === undefinedVar) 
        end = start + 1;
      if (step === undefinedVar) 
        step = 1;

      // sub input var
      start = start < 0 ? len + start : start, 
      end = end < 0 ? len + end: end;

      if (step === 0) except('slice step cannot be zero.');

      if (end === start || (end - start) * step < 0) return rst;

      // direction
      if (step > 0) {
        for (; start < end; start += step)
          rst.push(p[start]);
      }
      else {
        for (; end < start; start += step)
          rst.push(p[start]);
      }
      return rst;
    }

    function pyStyle(p) {
      // get type of the var. from repo: https://github.com/hustcc/what.js
      p = ({}).toString.call(p).slice(8, -1).toLowerCase();
      if (p === 'string') return pyStyleSubstring;
      if (p === 'array') return pyStyleSlice;
      // other typeof var is not supported.
      except('object must be string / array.');
    }
    
    return pyStyle(p);
  }
  return PYS;
});
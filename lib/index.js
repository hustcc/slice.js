'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 抛出一个异常
 * @param condition
 * @param s
 */
var invariant = function invariant(condition, s) {
  if (!condition) throw new Error(s);
};

/**
 * 模仿 Python 的分片操作
 * @param v
 * @param start
 * @param end
 * @param step
 * @returns {Array}
 */
var slice = function slice(v, start, end, step) {
  var r = [];
  var i = void 0;
  if (step > 0) {
    for (i = start; i < end; i += step) {
      r.push(v[i]);
    }
  } else {
    for (i = start; i > end; i += step) {
      r.push(v[i]);
    }
  }
  return r;
};

/**
 * parse a string / number to number.
 *
 * parseInt('') === NaN
 * Number('') === 0
 * @param n
 */
var parseNumber = function parseNumber(n) {
  return isNaN(parseInt(n)) ? NaN : Number(n);
};

/**
 * parse slice string
 * start:end:stepß
 * @param path
 * @param l
 * @returns {*[]}
 */
var parseSliceString = function parseSliceString(path, l) {
  var _path$split$map = path.split(':').map(function (s) {
    return parseNumber(s);
  }),
      _path$split$map2 = _slicedToArray(_path$split$map, 3),
      start = _path$split$map2[0],
      end = _path$split$map2[1],
      step = _path$split$map2[2];
  // 异常的时候默认值


  start = isNaN(start) ? 0 : start < 0 ? l + start : start;

  end = isNaN(end) ? l : end < 0 ? l + end : // 小于 0 转成正数
  end > l ? l : end; // 最大为长度

  step = isNaN(step) ? 1 : step;

  invariant(step !== 0, 'Step can not be zero!');

  return [start, end, step];
};

/**
 * slice entry 方法
 * @param v
 * @returns {Proxy}
 */

exports.default = function (v) {
  // 校验输入必须为字符串或者数组
  invariant(typeof v === 'string' || Array.isArray(v), 'Only string and array can be sliced!');

  return new Proxy({}, {
    get: function get(_, path) {
      var l = v.length;
      var n = Number(path);
      if (isNaN(n)) {
        var r = slice.apply(undefined, [v].concat(_toConsumableArray(parseSliceString(path, l))));
        return Array.isArray(v) ? r : r.join('');
      }
      // integer / integer string
      return v[n < 0 ? n + l : n];
    }
  });
};
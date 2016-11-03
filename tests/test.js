'use strict';
var test = require('tape');
var slice = require('..');

test('slice show be tested', function (t) {
  console.log('--------------------------------start test array input');
  var arr = [1, '2', 3, '4', 5, '6', 7, '8', 9, '0'];
  t.deepEqual(slice(arr)('2'), [3]);
  t.deepEqual(slice(arr)(2), [3]);

  t.deepEqual(slice(arr)('0:3'), [1, '2', 3]);
  t.deepEqual(slice(arr)('2:5'), [3, '4', 5]);

  t.deepEqual(slice(arr)(':2'), [1, '2']);
  t.deepEqual(slice(arr)(':-2'), [1, '2', 3, '4', 5, '6', 7, '8']);

  t.deepEqual(slice(arr)('2:'), [3, '4', 5, '6', 7, '8', 9, '0']);
  t.deepEqual(slice(arr)('-2:'), [9, '0']);

  t.deepEqual(slice(arr)(':'), [1, '2', 3, '4', 5, '6', 7, '8', 9, '0']);

  t.deepEqual(slice(arr)('::3'), [1, '4', 7, '0']);
  t.deepEqual(slice(arr)('1:5:2'), ['2', '4']);

  t.deepEqual(slice(arr)('-5:-1'), ['6', 7, '8', 9]);
  t.deepEqual(slice(arr)('-5:-1:2'), ['6', '8']);
  t.deepEqual(slice(arr)('5:1:-2'), ['6', '4']); 
  t.deepEqual(slice(arr)('-1:0:-1'), ['0', 9, '8', 7, '6', 5, '4', 3, '2']); 

  t.deepEqual(slice(arr)('-1:-5'), []);
  t.deepEqual(slice(arr)('-5:-1:-1'), []);

  console.log('--------------------------------start test string input');
  var str = '1234567890';
  t.equal(slice(str)('2'), '3');
  t.equal(slice(str)(2), '3');

  t.equal(slice(str)('0:3'), '123');
  t.equal(slice(str)('2:5'), '345');

  t.equal(slice(str)(':2'), '12');
  t.equal(slice(str)(':-2'), '12345678');

  t.equal(slice(str)('2:'), '34567890');
  t.equal(slice(str)('-2:'), '90');

  t.equal(slice(str)(':'), '1234567890');

  t.equal(slice(str)('::3'), '1470');
  t.equal(slice(str)('1:5:2'), '24');

  t.equal(slice(str)('-5:-1'), '6789');
  t.equal(slice(str)('-5:-1:2'), '68');
  t.equal(slice(str)('5:1:-2'), '64'); 
  t.equal(slice(str)('-1:0:-1'), '098765432'); 

  t.equal(slice(str)('-1:-5'), '');
  t.equal(slice(str)('-5:-1:-1'), '');

  console.log('--------------------------------start test except input');
  t.equal(slice(str)(' : 2 '), '12');
  t.equal(slice(str)(' -1 : 0 : -1 '), '098765432');

  function slice_object() {
    slice({})(':2:0');
  }
  
  t.throws(slice_object, /^Error: object must be string \/ array.$/);

  function slice_zero() {
    slice(str)(':2:0');
  }
  
  t.throws(slice_zero, /^Error: slice step cannot be zero.$/);

  function not_number_empty() {
    slice(str)('a:1');
  }
  t.throws(not_number_empty, /^Error: slice indices must be integer \/ blank.$/);

  function not_number_empty_1() {
    slice(str)('a:str');
  }
  t.throws(not_number_empty_1, /^Error: slice indices must be integer \/ blank.$/);
  t.end();
});
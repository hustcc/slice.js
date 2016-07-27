'use strict';
var test = require('tape');
var pys = require('..');

test('pys show be tested', function (t) {
  console.log('--------------------------------start test array input');
  var arr = [1, '2', 3, '4', 5, '6', 7, '8', 9, '0'];
  t.deepEqual(pys(arr)('2'), [3]);
  t.deepEqual(pys(arr)(2), [3]);

  t.deepEqual(pys(arr)('0:3'), [1, '2', 3]);
  t.deepEqual(pys(arr)('2:5'), [3, '4', 5]);

  t.deepEqual(pys(arr)(':2'), [1, '2']);
  t.deepEqual(pys(arr)(':-2'), [1, '2', 3, '4', 5, '6', 7, '8']);

  t.deepEqual(pys(arr)('2:'), [3, '4', 5, '6', 7, '8', 9, '0']);
  t.deepEqual(pys(arr)('-2:'), [9, '0']);

  t.deepEqual(pys(arr)(':'), [1, '2', 3, '4', 5, '6', 7, '8', 9, '0']);

  t.deepEqual(pys(arr)('::3'), [1, '4', 7, '0']);
  t.deepEqual(pys(arr)('1:5:2'), ['2', '4']);

  t.deepEqual(pys(arr)('-5:-1'), ['6', 7, '8', 9]);
  t.deepEqual(pys(arr)('-5:-1:2'), ['6', '8']);
  t.deepEqual(pys(arr)('5:1:-2'), ['6', '4']); 
  t.deepEqual(pys(arr)('-1:0:-1'), ['0', 9, '8', 7, '6', 5, '4', 3, '2']); 

  t.deepEqual(pys(arr)('-1:-5'), []);
  t.deepEqual(pys(arr)('-5:-1:-1'), []);

  console.log('--------------------------------start test string input');
  var str = '1234567890';
  t.equal(pys(str)('2'), '3');
  t.equal(pys(str)(2), '3');

  t.equal(pys(str)('0:3'), '123');
  t.equal(pys(str)('2:5'), '345');

  t.equal(pys(str)(':2'), '12');
  t.equal(pys(str)(':-2'), '12345678');

  t.equal(pys(str)('2:'), '34567890');
  t.equal(pys(str)('-2:'), '90');

  t.equal(pys(str)(':'), '1234567890');

  t.equal(pys(str)('::3'), '1470');
  t.equal(pys(str)('1:5:2'), '24');

  t.equal(pys(str)('-5:-1'), '6789');
  t.equal(pys(str)('-5:-1:2'), '68');
  t.equal(pys(str)('5:1:-2'), '64'); 
  t.equal(pys(str)('-1:0:-1'), '098765432'); 

  t.equal(pys(str)('-1:-5'), '');
  t.equal(pys(str)('-5:-1:-1'), '');

  console.log('--------------------------------start test except input');
  t.equal(pys(str)(' : 2 '), '12');
  t.equal(pys(str)(' -1 : 0 : -1 '), '098765432');

  function slice_object() {
    pys({})(':2:0');
  }
  
  t.throws(slice_object, /^Error: object must be string \/ array.$/);

  function slice_zero() {
    pys(str)(':2:0');
  }
  
  t.throws(slice_zero, /^Error: slice step cannot be zero.$/);

  function not_number_empty() {
    pys(str)('a:1');
  }
  t.throws(not_number_empty, /^Error: slice indices must be integer \/ blank.$/);

  function not_number_empty_1() {
    pys(str)('a:str');
  }
  t.throws(not_number_empty_1, /^Error: slice indices must be integer \/ blank.$/);
  t.end();
});
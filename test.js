import slice from './src/index';

describe('nano-slice', () => {
  test('array', () => {
    const arr = [1, '2', 3, '4', 5, '6', 7, '8', 9, '0'];
    expect(slice(arr)[200]).toEqual(undefined);

    expect(slice(arr)['2']).toEqual(3);
    expect(slice(arr)[2]).toEqual(3);

    expect(slice(arr)['-2']).toEqual(9);
    expect(slice(arr)[-2]).toEqual(9);

    expect(slice(arr)['0:3']).toEqual([1, '2', 3]);
    expect(slice(arr)['2:5']).toEqual([3, '4', 5]);

    expect(slice(arr)[':2']).toEqual([1, '2']);
    expect(slice(arr)[':-2']).toEqual([1, '2', 3, '4', 5, '6', 7, '8']);

    expect(slice(arr)['2:']).toEqual([3, '4', 5, '6', 7, '8', 9, '0']);
    expect(slice(arr)['-2:']).toEqual([9, '0']);

    expect(slice(arr)[':']).toEqual([1, '2', 3, '4', 5, '6', 7, '8', 9, '0']);

    expect(slice(arr)['::3']).toEqual([1, '4', 7, '0']);
    expect(slice(arr)['1:5:2']).toEqual(['2', '4']);

    expect(slice(arr)['-5:-1']).toEqual(['6', 7, '8', 9]);
    expect(slice(arr)['-5:-1:2']).toEqual(['6', '8']);
    expect(slice(arr)['5:1:-2']).toEqual(['6', '4']);
    expect(slice(arr)['-1:0:-1']).toEqual(['0', 9, '8', 7, '6', 5, '4', 3, '2']);

    expect(slice(arr)['-1:-5']).toEqual([]);
    expect(slice(arr)['-5:-1:-1']).toEqual([]);

    expect(slice(arr)[':20']).toEqual([1, '2', 3, '4', 5, '6', 7, '8', 9, '0']);
  });
  test('string', () => {
    const str = '1234567890';
    expect(slice(str)[200]).toEqual(undefined);

    expect(slice(str)['2']).toEqual('3');
    expect(slice(str)[2]).toEqual('3');

    expect(slice(str)['-2']).toEqual('9');
    expect(slice(str)[-2]).toEqual('9');

    expect(slice(str)['0:3']).toEqual('123');
    expect(slice(str)['2:5']).toEqual('345');

    expect(slice(str)[':2']).toEqual('12');
    expect(slice(str)[':-2']).toEqual('12345678');

    expect(slice(str)['2:']).toEqual('34567890');
    expect(slice(str)['-2:']).toEqual('90');

    expect(slice(str)[':']).toEqual('1234567890');

    expect(slice(str)['::3']).toEqual('1470');
    expect(slice(str)['1:5:2']).toEqual('24');

    expect(slice(str)['-5:-1']).toEqual('6789');
    expect(slice(str)['-5:-1:2']).toEqual('68');
    expect(slice(str)['5:1:-2']).toEqual('64');
    expect(slice(str)['-1:0:-1']).toEqual('098765432');

    expect(slice(str)['-1:-5']).toEqual('');
    expect(slice(str)['-5:-1:-1']).toEqual('');

    expect(slice(str)[':20']).toEqual('1234567890');
  });

  test('exception', () => {
    expect(() => {
      const r = slice('1234567890')['-1:9:0'];
    }).toThrow('Step can not be zero!');
    expect(() => {
      const r = slice(123)['-1:9:0'];
    }).toThrow('Only string and array can be sliced!');
  });

  test('monkey', () => {
    // TODO
    // random path to run.
  });
});

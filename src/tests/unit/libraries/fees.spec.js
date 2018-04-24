import test from 'ava';
import fees from './../../../app/libraries/fees';

test('should apply 5% fee to 999 USD', t => {
  t.is(fees.get(999), 1.05);
});

test('should apply 3% fee to 9999 USD', t => {
  t.is(fees.get(9999), 1.03);
});

test('should apply 2% fee to 10000 USD', t => {
  t.is(fees.get(10000), 1.02);
});

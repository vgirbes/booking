import test from 'ava';
import getters from './../../../app/store/getters';
import data from './../../data/data.json';
import QualityCheck from './../../../app/constants/qualitycheck';

const state = {
  bookings: data
};

const AMOUNT_THRESHOLD = QualityCheck.store.getters.IS_AMOUNT_THRESHOLD;

test('return true if the payment reference is duplicated', t => {
  t.is(getters.isDuplicated(state)('FS89SJ'), true);
});

test('return false if the payment reference is not duplicated', t => {
  t.is(getters.isDuplicated(state)('XXXXXX'), false);
});

test('return true if the payment email is valid', t => {
  t.is(getters.isValidEmail()('test@test.es'), true);
});

test('return false if the payment email is not valid', t => {
  t.is(getters.isValidEmail()('testtest.es'), false);
});

test('return true if the amount received is higher than ' + AMOUNT_THRESHOLD, t => {
  t.is(getters.isAmountThreshold()(5000000), true);
});

test('return false if the amount received is lower than ' + AMOUNT_THRESHOLD, t => {
  t.is(getters.isAmountThreshold()(500), false);
});

test('#isOver return true if amount received is higher than the amount with fees', t => {
  t.is(getters.isOver()(5000, 3025), true);
});

test('#isOver return false if the amount received is lower than amount with fees', t => {
  t.is(getters.isOver()(3000, 5004), false);
});

test('#isUnder return true if the amount received is lower than amount with fees', t => {
  t.is(getters.isUnder()(3000, 5000), true);
});

test('#isUnder return false if the amount received is higher than amount with fees', t => {
  t.is(getters.isAmountThreshold()(4000, 1298), false);
});

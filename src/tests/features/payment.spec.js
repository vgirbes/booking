import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex/dist/vuex.js';
import test from 'ava';
import actions from './../../app/store/actions';
import getters from './../../app/store/getters';
import mutations from './../../app/store/mutations';
import Payment from './../../app/components/Payment.js';
import data from './../data/data.json';
import QualityCheck from './../../app/constants/qualitycheck';
import fees from './../../app/libraries/fees';

const paymentComponent = Vue.extend(Payment);
const AMOUNT_THRESHOLD = QualityCheck.messages.AMOUNT_THRESHOLD;
const DUPLICATED_PAYMENT = QualityCheck.messages.DUPLICATED_PAYMENT;
const INVALID_EMAIL = QualityCheck.messages.INVALID_EMAIL;
const YES = QualityCheck.messages.YES;
const NO = QualityCheck.messages.NO;

const cells = {
  amount_with_fees: 3,
  over_payment: 6,
  under_payment: 7
};

let mockStore;
let vm;

test.beforeEach(t => {
  const options = {
      state: {
        bookings: data
      },
      actions,
      getters,
      mutations
    };

  Vue.use(Vuex);
  mockStore = new Vuex.Store(options);

  vm = new paymentComponent({
    store: mockStore,
    propsData: {
      payment: {
        "reference":"FS89SJ",
        "amount":10500,
        "amount_received":12000,
        "country_from":"ES",
        "sender_full_name":"Name",
        "sender_address":"Address",
        "school":"School",
        "currency_from":"USD",
        "student_id":544333,
        "email":"some2@example.com"
      },
    }
  }).$mount();
});

test.serial('component should show a message if the payment is duplicated', async(t) => {
  t.is(vm.$el.querySelector('#duplicated').textContent, DUPLICATED_PAYMENT);
  t.is(vm.isDuplicated, true);
});

test.serial('component should not show any message if the payment is not duplicated', async(t) => {
  vm.$set(vm.payment, 'reference', 'IOKDF4');
  await vm.$forceUpdate();

  t.is(vm.$el.querySelector('#duplicated').textContent, '');
  t.is(vm.isDuplicated, false);
});

test.serial('component should show a message if the payment has an invalid email', async(t) => {
  vm.$set(vm.payment, 'email', 'invalid.com');
  await vm.$forceUpdate();
  
  t.is(vm.$el.querySelector('#invalid-email').textContent, INVALID_EMAIL);
  t.is(vm.isValidEmail, false);
});

test.serial('component should not show any message if the payment has a valid email', async(t) => {
  vm.$set(vm.payment, 'email', 'pepe@invalid.com');
  await vm.$forceUpdate();
  
  t.is(vm.$el.querySelector('#invalid-email').textContent, '');
  t.is(vm.isValidEmail, true);
});

test.serial('component should show a message if the amount received is higher than the amount threshold (1000000 USD)', async(t) => {
  vm.$set(vm.payment, 'amount_received', 10200000);
  await vm.$forceUpdate();

  t.is(vm.$el.querySelector('#threshold').textContent, AMOUNT_THRESHOLD);
  t.is(vm.isAmountThreshold, true);
});

test.serial('component should not show any message if the amount received is lower than the amount threshold (1000000 USD)', async(t) => {
  vm.$set(vm.payment, 'amount_received', 10);
  await vm.$forceUpdate();

  t.is(vm.$el.querySelector('#threshold').textContent, '');
  t.is(vm.isAmountThreshold, false);
});

test.serial('component should apply fees to the amount (10000 -> 2%)', async(t) => {
  const amountWithFee = fees.get(10000) * 10000;
  vm.$set(vm.payment, 'amount', 10000);
  await vm.$forceUpdate();

  t.is(vm.$el.querySelector(`td:nth-child(${cells['amount_with_fees']})`).textContent, amountWithFee.toString());
  t.is(vm.applyFees, amountWithFee);
});

test.serial('component should apply fees to the amount (1200 -> 3%)', async(t) => {
  const amountWithFee = fees.get(1200) * 1200;
  vm.$set(vm.payment, 'amount', 1200);
  await vm.$forceUpdate();


  t.is(vm.$el.querySelector(`td:nth-child(${cells['amount_with_fees']})`).textContent, amountWithFee.toString());
  t.is(vm.applyFees, amountWithFee);
});

test.serial('component should apply fees to the amount (300 -> 5%)', async(t) => {
  const amountWithFee = fees.get(300) * 300;
  vm.$set(vm.payment, 'amount', 300);
  await vm.$forceUpdate();

  t.is(vm.$el.querySelector(`td:nth-child(${cells['amount_with_fees']})`).textContent, amountWithFee.toString());
  t.is(vm.applyFees, amountWithFee);
});

test.serial('component should show a message if the amount received is higher than the expected amount with fees', async(t) => {
  t.is(vm.$el.querySelector(`td:nth-child(${cells['over_payment']})`).textContent, YES);
  t.is(vm.$el.querySelector(`td:nth-child(${cells['under_payment']})`).textContent, NO);
  t.is(vm.isOver, true);
  t.is(vm.isUnder, false);
});

test.serial('component should show a message if the amount received is lower than the expected amount with fees', async(t) => {
  vm.$set(vm.payment, 'amount', 12000);
  await vm.$forceUpdate();

  t.is(vm.$el.querySelector(`td:nth-child(${cells['over_payment']})`).textContent, NO);
  t.is(vm.$el.querySelector(`td:nth-child(${cells['under_payment']})`).textContent, YES);
  t.is(vm.isOver, false);
  t.is(vm.isUnder, true);
});

test.serial('component should show if the amount received is equal to the expected amount with fees', async(t) => {
  vm.$set(vm.payment, 'amount_received', fees.get(12000) * 12000);
  vm.$set(vm.payment, 'amount', 12000);
  await vm.$forceUpdate();

  t.is(vm.$el.querySelector(`td:nth-child(${cells['over_payment']})`).textContent, NO);
  t.is(vm.$el.querySelector(`td:nth-child(${cells['under_payment']})`).textContent, NO);
  t.is(vm.isOver, false);
  t.is(vm.isUnder, false);
});

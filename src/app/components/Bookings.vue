<template>
  <table class="table table-responsive">
    <thead>
      <tr>
        <th>Reference</th>
        <th>Amount</th>
        <th>Amount with fees</th>
        <th>Amount received</th>
        <th>Quality check</th>
        <th>Over payment</th>
        <th>Under payment</th>
      </tr>
    </thead>
    <tbody>
      <payment v-for="payment in bookings" :payment="payment"></payment>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import VueResource from 'vue-resource';
import payment from './Payment.js';
import QualityCheck from './../constants/qualitycheck';

Vue.use(VueResource);

export default {
  name: 'Bookings',
  computed: mapState([
    'bookings'
  ]),
  created () {
    const LOAD_BOOKINGS_LIST = QualityCheck.store.actions.LOAD_BOOKINGS_LIST;
    this.$store.dispatch(LOAD_BOOKINGS_LIST);
  },
  components: {
    payment
  }
};
</script>

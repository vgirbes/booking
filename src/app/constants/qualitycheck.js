export default {
  messages: {
    DUPLICATED_PAYMENT: 'DuplicatedPayment',
    INVALID_EMAIL: 'InvalidEmail',
    AMOUNT_THRESHOLD: 'AmountThreshold',
    YES: 'X',
    NO: '-'
  },
  store: {
    actions: {
      LOAD_BOOKINGS_LIST: 'LOAD_BOOKINGS_LIST'
    },
    mutations: {
      SET_BOOKING_LIST: 'SET_BOOKING_LIST'
    },
    getters: {
      IS_AMOUNT_THRESHOLD: 1000000
    }
  }
};

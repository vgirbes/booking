import QualityCheck from './../constants/qualitycheck';
import fees from './../libraries/fees';

export default {
  isDuplicated: state => reference => {
    const duplicated = state.bookings.filter((currentValue) => {
      return currentValue.reference === reference;
    });

    return duplicated.length > 1;
  },
  isAmountThreshold: state => amountReceived => {
    const AMOUNT_THRESHOLD = QualityCheck.store.getters.IS_AMOUNT_THRESHOLD;
    return amountReceived > AMOUNT_THRESHOLD;
  },
  isValidEmail: state => email => {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(email);
  },
  isOver: state => (amountReceived, amountWithFees) => {
    return amountReceived > amountWithFees;
  },
  isUnder: state => (amountReceived, amountWithFees) => {
    return amountReceived < amountWithFees;
  },
  applyFees: state => (amount) => {
    const fee = fees.get(amount);

    return amount * fee;
  }
};

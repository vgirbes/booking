import QualityCheck from './../constants/qualitycheck';

export default {
  render(create) {
    return create('tr', [
        create('td',  this.payment.reference ),
        create('td',  this.payment.amount ),
        create('td',  this.applyFees ),
        create('td',  this.payment.amount_received ),
        create('td',  [
            create('p', {
              attrs: {
                id: 'duplicated'
              }
            }, this.isDuplicated ? this.messages.DUPLICATED_PAYMENT : ''),
            create('p', {
              attrs: {
                id: 'threshold'
              }
            }, this.isAmountThreshold ? this.messages.AMOUNT_THRESHOLD : ''),
            create('p', {
              attrs: {
                id: 'invalid-email'
              }
            }, !this.isValidEmail ? this.messages.INVALID_EMAIL : ''),
          ]),
        create('td',  this.isOver ? this.messages.YES : this.messages.NO),
        create('td',  this.isUnder ? this.messages.YES : this.messages.NO)
      ]);
    },
  name: 'Payment',
  props: ['payment'],
  data() {
    return {
      amount_with_fees: null,
      messages: QualityCheck.messages
   };
  },
  computed: {
    isDuplicated() {
      return this.$store.getters.isDuplicated(this.payment.reference);
    },
    isAmountThreshold() {
      return this.$store.getters.isAmountThreshold(this.payment.amount_received);
    },
    isValidEmail() {
      return this.$store.getters.isValidEmail(this.payment.email);
    },
    isOver() {
      return this.$store.getters.isOver(this.payment.amount_received, this.amount_with_fees);
    },
    isUnder() {
      return this.$store.getters.isUnder(this.payment.amount_received, this.amount_with_fees);
    },
    applyFees() {
      this.amount_with_fees = this.$store.getters.applyFees(this.payment.amount);
      return this.amount_with_fees;
    }
  },
};

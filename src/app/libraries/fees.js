const Fees = {
  LESS_THAN_1000: 0,
  BETWEEN_1000_AND_10000: 1,
  MAJOR_THAN_10000: 2,
  feeList: [
    {
      id: 0,
      value: 5,
      description: 'if the amount < 1000 USD: 5% fees'
    },
    {
      id: 1,
      value: 3,
      description: 'if the amount > 1000 USD AND < 10000 USD: 3% fees'
    },
    {
      id: 2,
      value: 2,
      description: 'if the amount > 10000 USD: 2% fees'
    }
  ],
  get(amount) {
    const indexFee = Math.max(0, amount.toString().length - 3);
    const index = indexFee > this.MAJOR_THAN_10000 ? this.MAJOR_THAN_10000 : indexFee;

    return (this.feeList[index].value / 100) + 1;
  }
};

module.exports = Fees;

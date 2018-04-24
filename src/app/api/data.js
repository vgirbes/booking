export default {
  getAllPayments(callback) { 
    return this.$http
    .get('app/tests/data/data.json')
    .then(response => response.json())
    .then(response => {
      return callback(response);
    });
  }
};

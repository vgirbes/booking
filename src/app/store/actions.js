import Data from './../api/data';

export default {
  LOAD_BOOKINGS_LIST: ({commit}) => {
    Data.getAllPayments((data) => {
      commit('SET_BOOKING_LIST', { list: data });
    });
  }
};

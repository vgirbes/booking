<template>
  <div id="root">
    <header-component></header-component>
    <main>
      <title-component></title-component>
      <bookings-list></bookings-list>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './Header.vue';
import Title from './Title.vue';
import Bookings from './Bookings.vue';
import Footer from './Footer.vue';

export default {
  name: 'Main',
  components: {
    'header-component': Header,
    'title-component': Title,
    'bookings-list': Bookings,
    'footer-component': Footer
  }
};
</script>

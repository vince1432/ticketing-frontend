<template>
  <div>
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import Navbar from './Navbar.vue';

const router = useRouter();
const route = useRoute();
// console.log(router);
// console.log(route, route.name);
</script>

<style scoped></style>

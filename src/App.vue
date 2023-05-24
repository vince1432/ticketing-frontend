<script setup>
import { inject } from 'vue'
import Navbar from './components/Navbar.vue'

const $http = inject('$http')
const $store = inject('$store')
</script>

<template>
  <div class="container">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

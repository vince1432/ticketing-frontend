<template>
  <div>
    <Navbar />
		<q-layout>
			<q-page-container >
				<q-page padding class="window-height full-width column items-center">
					<router-view></router-view>
				</q-page>
			</q-page-container>
		</q-layout>
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

<template>
  <div>
		<q-layout>
			<Navbar @toggle:drawer="(val) => (DrawerOpen = val)"/>
			<Sidebar v-if="route.name !== 'login'" :drawer="DrawerOpen"/>
			<q-page-container >
				<!-- <q-page padding class="window-height full-width"> -->
					<router-view></router-view>
				<!-- </q-page> -->
			</q-page-container>
		</q-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';

const route = useRoute();
const DrawerOpen = ref(true)

</script>

<style scoped></style>

<template>
  <div>
		<q-layout>
			<Navbar @toggle:drawer="(val) => (DrawerOpen = val)"/>
			<Sidebar v-if="token" :drawer="DrawerOpen"/>
			<q-page-container >
				<q-page padding class="window-height full-width column items-center">
					<router-view></router-view>
				</q-page>
			</q-page-container>
		</q-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';

const token = ref(localStorage.getItem("token"));
const DrawerOpen = ref(true)

</script>

<style scoped></style>

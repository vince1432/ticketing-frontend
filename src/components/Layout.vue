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
import Navbar from './Navbar.vue';
</script>

<style scoped></style>

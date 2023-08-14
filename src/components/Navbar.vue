<template>
  <q-header elevated class="bg-primary text-white">
		<q-toolbar>
			<q-btn dense flat round icon="menu" @click="toggleDrawer" />

			<q-toolbar-title>
				<q-avatar>
					<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
				</q-avatar>
				Ticketing
			</q-toolbar-title>
			<div>
				<q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey-8" v-model="tab">
					<q-route-tab class="text-white" name="home" label="Home" :to="{ name: 'dashboard' }"/>
					<q-route-tab class="text-white" name="about" label="About" :to="{ name: 'about' }"/>
					<q-route-tab v-if="!token" class="text-white" name="login" label="Login" :to="{ name: 'login' }"/>
					<q-route-tab v-else class="text-white" name="logout" label="Logout" :to="{ name: 'login' }"/>
				</q-tabs>
			</div>
		</q-toolbar>
	</q-header>
</template>

<script setup>
import { ref } from 'vue';

const token = ref(localStorage.getItem("token"));
let drawer = ref(true);

const emit = defineEmits(['toggle:drawer'])

const toggleDrawer = () => {
	drawer.value = !drawer.value
  emit('toggle:drawer', drawer.value)
}

</script>

<style lang="scss" scoped>

</style>

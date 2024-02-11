<template>
  <q-drawer
		:modelValue="drawer"
		@update:modelValue="drawer = $event"
		show-if-above
		:width="250"
		:breakpoint="400"
	>
		<q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
			<q-list padding>
				<q-item clickable v-ripple :to="{ name: 'ticket' }">
					<q-item-section avatar>
						<q-icon name="fa-solid fa-ticket fa-lg"/>
					</q-item-section>
					<q-item-section>
						Tickets
					</q-item-section>
				</q-item>
				<q-separator spaced />
				<q-item clickable v-ripple :to="{ name: 'priority' }">
					<q-item-section avatar>
						<q-icon name="fa-solid fa-triangle-exclamation fa-lg"/>
					</q-item-section>
					<q-item-section>
						Priority
					</q-item-section>
				</q-item>
				<q-item clickable v-ripple :to="{ name: 'status' }">
					<q-item-section avatar>
						<q-icon name="fa-solid fa-list-check fa-lg"/>
					</q-item-section>
					<q-item-section>
						Status
					</q-item-section>
				</q-item>
				<q-item clickable v-ripple :to="{ name: 'module' }">
					<q-item-section avatar>
						<q-icon name="fa-solid fa-boxes-packing fa-lg"/>
					</q-item-section>
					<q-item-section>
						Module
					</q-item-section>
				</q-item>
				<q-item clickable v-ripple :to="{ name: 'user' }">
					<q-item-section avatar>
						<q-icon name="fa-solid fa-users-line fa-lg"/>
					</q-item-section>
					<q-item-section>
						Users
					</q-item-section>
				</q-item>
				<div class="absolute-bottom">
					<q-item clickable v-ripple :to="{ name: 'user' }">
						<q-item-section avatar>
							<q-icon name="fa-solid fa-gear fa-lg"/>
						</q-item-section>
						<q-item-section>
							Settings
						</q-item-section>
					</q-item>
					<q-item clickable v-ripple @click="logout">
						<q-item-section avatar>
							<q-icon name="fa-solid fa-right-from-bracket fa-lg"/>
						</q-item-section>
						<q-item-section>
							Logout
						</q-item-section>
					</q-item>
				</div>
			</q-list>
		</q-scroll-area>
		<q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
			<div class="absolute-bottom bg-transparent">
				<q-avatar size="56px" class="q-mb-sm">
					<img src="https://cdn.quasar.dev/img/boy-avatar.png">
				</q-avatar>
				<div class="text-weight-bold">{{ activeUser.name }}</div>
				<div>{{ activeUser.email }}</div>
			</div>
		</q-img>
	</q-drawer>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const $store = inject('$store')
const router = useRouter();

const activeUser = $store.getters.activeUser;

const props = defineProps({
  drawer: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const logout = () => {
	$store.dispatch('logout');
	router.push({ name: 'login' });
	localStorage.removeItem("token");
	localStorage.removeItem("refresh_token");
}

</script>

<style lang="scss" scoped>

</style>

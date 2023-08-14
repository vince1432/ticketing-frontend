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

const $store = inject('$store')
const activeUser = $store.getters.activeUser;

const props = defineProps({
  drawer: {
    type: Boolean,
    required: true,
    default: true,
  },
});
</script>

<style lang="scss" scoped>

</style>

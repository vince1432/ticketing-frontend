<template>
	<div class="q-pa-md" style="max-width: 400px">
		<q-form
			@submit.prevent=""
			class="q-gutter-md center column items-center"
		>
			<div class="q-pa-md" style="width: 500px">
				<q-input
					filled
					v-model="ticket.title"
					label="Title *"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Please add title']"
				/>
			</div>
			<div class="q-pa-md" style="width: 500px">
				<q-select
					filled
					v-model="ticket.priority_id"
					:options="ticketPriorities"
					label="Priority"
					option-label="name"
					option-value="id"
					emit-value
					map-options
				/>
			</div>
			<div class="q-pa-md" style="width: 500px">
				<q-select
					filled
					v-model="ticket.assigned_to"
					:options="users"
					label="Assigned to"
					option-label="name"
					option-value="id"
					emit-value
					map-options
				/>
			</div>
			<div class="q-pa-md" style="width: 500px">
				<q-input
					label="Summary"
					v-model="ticket.summary"
					filled
					type="textarea"
				/>
			</div>
			<div class="q-gutter-md">
				<q-btn :label="btnText" type="button" color="primary" :loading="btnLoading" @click="onSubmit()"/>
				<!-- <q-btn v-if="btnText === 'Update'" label="Close" type="button" color="red" :loading="btnLoading" @click="TicketClose()"/> -->
				<q-btn label="Cancel" type="button" color="negative" flat class="q-ml-sm" @click="router.push({ name: 'ticket' })"/>
			</div>
		</q-form>

	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiError from '../../composables/apiErrorComposable';
import userComposable from '../../composables/userComposable';
import { createTicket, getTicket, getTicketPriorities, updateTicket } from '../../utils/api';
import { successToast } from '../../utils/quasarNotif';

const route = useRoute();
const router = useRouter();
const { handle } = apiError();
const { users, updateUserList } = userComposable();

const ticketID = route.params.ticket;
let isCreate =  ref(route.path === '/ticket/create');
let ticket = ref({});
let ticketPriorities = ref([]);
let btnLoading = ref(false);
let btnText = ref("Create");

// set button text
btnText.value = (isCreate.value) ? 'Create' : 'Update';

onMounted(() => {
	// dont call if the page is for creating ticket
	console.log('test');
	if(!isCreate.value)
		TicketDetails()
	TicketPriorities()
	updateUserList()
})

// send request
const onSubmit = () => {
	btnLoading.value = true;

	if(isCreate.value)
		TicketAdd(ticket.value)
	else
		TicketUpdate(ticketID, ticket.value)
}

// ----------- tickets api call -----------//

// ticket create
const TicketAdd = (data) => {
	createTicket(data)
			.then(function ({ data }) {
				router.push({ name: 'ticket-details', params: { ticket: data.data.id}})
				isCreate.value = false
				btnText.value = "Update"
				successToast(`Ticket created successfuly`, `Ticket #${data.data.id}`)
			})
			.catch(function ({ response }) {
				handle(response)
			})
			.finally(() => {
				btnLoading.value = false;
			});
}

// ticket update
const TicketUpdate = (id, data) => {
	updateTicket(id, data)
			.then(function ({ data }) {
				successToast("Ticket updated successfuly")
			})
			.catch(function (response) {
				handle(response)
			})
			.finally(() => {
				btnLoading.value = false;
			});
}

// // ticket close
// const TicketClose = (id) => {
// 	closeTicket(id)
// 			.then(function ({ data }) {
// 				successToast("Ticket closed successfuly")
// 			})
// 			.catch(function (response) {
// 				handle(response)
// 			})
// 			.finally(() => {
// 				btnLoading.value = false;
// 			});
// }

// ticket details
const TicketDetails = () => {
	getTicket(ticketID)
			.then(function ({ data }) {
				ticket.value = data.data
				ticket.value.priority_id = data.data.priority.id ?? ''
				ticket.value.assigned_to = data.data.assigned_to.id ?? ''
			})
			.catch(function ({ response }) {
				handle(response)
			})
}

// priority list
const TicketPriorities = () => {
	getTicketPriorities()
			.then(function ({ data }) {
				ticketPriorities.value = data.data
			})
			.catch(function ({ response }) {
				handle(response)
			})
}
</script>

<style lang="scss" scoped>

</style>
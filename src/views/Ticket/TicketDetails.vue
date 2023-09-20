<template>
	<q-toolbar class="shadow-up-7 text-primary w-full">
		<q-btn flat round dense icon="fa-solid fa-arrow-left" @click="router.push({ name: 'ticket' })"/>
		<q-toolbar-title>
			<div v-if="ticketID">Ticket #{{ ticketID }}</div>
			<div v-else>New Ticket</div>
		</q-toolbar-title>
	</q-toolbar>
	<div class="q-pa-md">
		<q-form
			@submit.prevent=""
			class="row"
		>
			<div class="q-pa-md col-12">
				<q-input
					filled dense
					v-model="ticket.title"
					label="Title *"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Please add title']"
				/>
			</div>
			<div class="q-pa-md col-6">
				<q-select
					filled dense
					v-model="ticket.module_id"
					:options="modules"
					label="Module"
					option-label="name"
					option-value="id"
					emit-value
					map-options
				/>
			</div>
			<div class="q-pa-md col-6">
				<q-select
					filled dense
					v-model="ticket.priority_id"
					:options="ticketPriorities"
					label="Priority"
					option-label="name"
					option-value="id"
					emit-value
					map-options
					:setOptionIndex="-1"
				/>
			</div>
			<div class="q-pa-md col-6">
				<q-select
					filled dense
					v-model="ticket.status_id"
					:options="statuses"
					label="Status"
					option-label="name"
					option-value="id"
					emit-value
					map-options
				/>
			</div>
			<div class="q-pa-md col-6">
				<q-select
					filled dense
					v-model="ticket.assigned_to"
					:options="users"
					label="Assigned to"
					option-label="name"
					option-value="id"
					emit-value
					map-options
				/>
			</div>
			<div class="q-pa-md col-12">
				<q-input
					label="Summary"
					v-model="ticket.summary"
					filled dense
					type="textarea"
				/>
			</div>
			<!-- COMMENT SECTION -->
			<div class="q-pa-md col-6" v-if="!isCreate">
				<q-card class="my-card " flat bordered>
					<q-card-section>
						<!-- <div class="text-h6 q-mt-sm q-mb-xs">Comment:</div> -->
						<div class="col-12">
							<q-input
								label="Comment"
								v-model="comment"
								filled dense
								type="textarea"
								rows="2"
							/>
							<div class="row reverse">
								<q-btn
									label="Save"
									type="button"
									color="primary"
									:loading="btnLoading"
									size="sm"
									class="q-my-sm"
									@click="CommentAdd()"/>
							</div>
						</div>
						<div class="text-caption">
							<q-scroll-area style="height: 200px;">
								<hr>
								<!-- COMMENTS -->
								<div class="comment">
									<div v-for="(comment, index) in comments" :key="index" class="q-pt-md">
										<div class="comment__head">
											<text class="bold">{{ comment.commenter.name }}</text>
											<text class="comment_subhead q-pl-sm">{{ comment.id }}</text>
											<text class="comment_subhead q-pl-sm">{{ comment.created_at }}</text>
										</div>
										<p>{{ comment.comment }}</p>
									</div>
									<div>
									</div>
								</div>

								<!-- LOAD COMMENTS -->
								<q-btn
									v-if="canLoadComment"
									color="grey"
									text-color="black"
									label="Load more comments..."
									class="full-width q-mt-md"
									size="sm"
									dense
									@click="Comments()"
								/>
							</q-scroll-area>
						</div>
					</q-card-section>
				</q-card>
			</div>
			<div class="q-gutter-md col-12 row justify-center">
				<q-btn :label="btnText" type="button" color="primary" :loading="btnLoading" @click="onSubmit()"/>
				<!-- <q-btn v-if="btnText === 'Update'" label="Close" type="button" color="red" :loading="btnLoading" @click="TicketClose()"/> -->
				<q-btn label="Cancel" type="button" color="negative" flat class="q-ml-sm" @click="router.push({ name: 'ticket' })"/>
			</div>
		</q-form>

	</div>



</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiError from '../../composables/apiErrorComposable';
import loadingComposable from '../../composables/loadingComposable';
import userComposable from '../../composables/userComposable';
import {
addComment,
createTicket,
getComments,
getModules,
getStatuses,
getTicket,
getTicketPriorities,
updateComment,
updateTicket
} from '../../utils/api';
import { successToast } from '../../utils/quasarNotif';

const route = useRoute();
const router = useRouter();
const { handle } = apiError();
const { showLoading } = loadingComposable();
const { users, updateUserList } = userComposable();

const $store = inject('$store')
const activeUser = $store.getters.activeUser;

const ticketID = ref(route.params.ticket);
const commentPage = ref(1);
const isCreate =  ref(route.path === '/ticket/create');
const ticket = ref({});
const ticketPriorities = ref([]);
const statuses = ref([]);
const modules = ref([]);
const comments = ref([]);
const btnLoading = ref(false);
const btnText = ref("Create");
const comment = ref("");
const canLoadComment = ref(true);

// set button text
btnText.value = (isCreate.value) ? 'Create' : 'Update';

onMounted(() => {
	// dont call if the page is for creating ticket
	showLoading(true)
	TicketPriorities()
	updateUserList()
	Statuses()
	Modules()
	if(!isCreate.value) {
		TicketDetails()
		Comments()
	}
})

// send request
const onSubmit = () => {
	btnLoading.value = true;

	if(isCreate.value)
		TicketAdd(ticket.value)
	else
		TicketUpdate(ticketID.value, ticket.value)
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
				ticketID.value = data.data.id;
				canLoadComment.value = false;
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

// ticket details
const TicketDetails = () => {
	getTicket(ticketID.value)
			.then(function ({ data }) {
				ticket.value = data.data
				ticket.value.priority_id = data.data.priority.id ?? ''
				ticket.value.assigned_to = data.data.assigned_to.id ?? ''
			})
			.catch(function ({ response }) {
				handle(response)
			})
			.finally(function () {
				showLoading(false)
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

const Statuses = () => {
	getStatuses()
			.then(function ({ data }) {
				statuses.value = data.data
			})
			.catch(function ({ response }) {
				handle(response)
			})
}

const Modules = () => {
	getModules()
			.then(function ({ data }) {
				modules.value = data.data
			})
			.catch(function ({ response }) {
				handle(response)
			})
			.finally(function () {
				if(isCreate.value)
					showLoading(false)
			})
}

const Comments = () => {
	getComments(ticketID.value, commentPage.value, 5, 'created_at', 'desc')
			.then(function ({ data }) {
				comments.value.push(...data.data)
				commentPage.value++;
				// console.log(data);
				if(!data.next_page_url)
					canLoadComment.value = false
			})
			.catch(function ({ response }) {
				handle(response)
			})
}

const CommentAdd = () => {
	addComment(ticketID.value, comment.value)
			.then(function ({ data }) {
				// add commenter
				data.data.commenter = {
					id: data.data.commenter_id,
					name: activeUser.name
				}

				comments.value.unshift(data.data)
			})
			.catch(function ({ response }) {
				handle(response)
			})
}

const CommentUpdate = (id) => {
	updateComment(id, commentPage.value)
			.then(function ({ data }) {

			})
			.catch(function ({ response }) {
				handle(response)
			})
}
</script>

<style lang="scss" scoped>
.comment_subhead {
	font-weight:lighter;
	font-size: 10px;
}
</style>
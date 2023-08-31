<template>
	<!-- SEARCH -->
	<q-card class="q-pa-md q-mx-md">
		<div class="row">
			<div class="col-md-6 col-xs-12">
				<!-- SEARCH FILTER -->
				<q-input
					dense filled
					placeholder="Search"
					v-model="search.search"
					class="q-ma-xs"
				/>
			</div>
			<div class="col-md-3 col-xs-12">
				<!-- MODULE FILTER -->
				<q-select
					filled dense
					v-model="search.module"
					:options="dropdown.modules"
					label="Module"
					option-label="name"
					option-value="id"
					emit-value
					map-options
					class="q-ma-xs"
				>
					<template v-slot:append>
						<q-icon
							v-if="search.module !== ''"
							class="cursor-pointer"
							name="clear"
							@click.stop.prevent="search.module = ''"
						/>
					</template>
				</q-select>
			</div>
			<div class="col-md-3 col-xs-12">
				<!-- PRIORITY FILTER -->
				<q-select
					filled dense
					v-model="search.priority"
					:options="dropdown.priorities"
					label="Priority"
					option-label="name"
					option-value="id"
					emit-value
					map-options
					class="q-ma-xs"
				>
					<template v-slot:append>
						<q-icon
							v-if="search.priority !== ''"
							class="cursor-pointer"
							name="clear"
							@click.stop.prevent="search.priority = ''"
						/>
					</template>
				</q-select>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3 col-xs-12">
				<!-- STATUS FILTER -->
				<q-select
					filled dense
					v-model="search.status"
					:options="dropdown.statuses"
					label="Status"
					option-label="name"
					option-value="id"
					emit-value
					map-options
					class="q-ma-xs"
				>
					<template v-slot:append>
						<q-icon
							v-if="search.status !== ''"
							class="cursor-pointer"
							name="clear"
							@click.stop.prevent="search.status = ''"
						/>
					</template>
				</q-select>
			</div>
			<div class="col-md-3 col-xs-12">
				<!-- ASSIGNED TO FILTER -->
				<q-select
					filled dense
					v-model="search.assigned"
					:options="dropdown.users"
					label="Assign"
					option-label="name"
					option-value="id"
					emit-value
					map-options
					class="q-ma-xs"
				>
					<template v-slot:append>
						<q-icon
							v-if="search.assigned !== ''"
							class="cursor-pointer"
							name="clear"
							@click.stop.prevent="search.assigned = ''"
						/>
					</template>
				</q-select>
			</div>
			<div class="col-md-3 col-xs-12">
				<!-- START DATE -->
				<q-input filled dense v-model="search.start_date" mask="date" class="q-ma-xs" placeholder="Start Date">
					<template v-slot:append>
						<q-icon name="event" class="cursor-pointer">
							<q-popup-proxy cover transition-show="scale" transition-hide="scale" ref="startDateRef">
								<q-date v-model="search.start_date"
									v-close-popup="startDatePopUp"
									@navigation="startDatePopUp=false"
									@update:model-value="startDatePopUp=true"
								>
									<div class="row items-center justify-end">
										<q-btn v-close-popup label="Close" color="primary" flat />
									</div>
								</q-date>
							</q-popup-proxy>
						</q-icon>
					</template>
				</q-input>
			</div>
			<div class="col-md-3 col-xs-12">
				<!-- END DATE -->
				<q-input filled dense v-model="search.end_date" mask="date" class="q-ma-xs" placeholder="End Date">
					<template v-slot:append>
						<q-icon name="event" class="cursor-pointer">
							<q-popup-proxy cover transition-show="scale" transition-hide="scale"  ref="endDateRef">
								<q-date v-model="search.end_date"
									:options="endDateOptions"
									v-close-popup="endDatePopUp"
									@navigation="endDatePopUp=false"
									@update:model-value="endDatePopUp=true"
								>
									<div class="row items-center justify-end">
										<q-btn v-close-popup label="Close" color="primary" flat />
									</div>
								</q-date>
							</q-popup-proxy>
						</q-icon>
					</template>
				</q-input>
			</div>
		</div>
		<div class="row justify-end q-mt-md">
			<!-- SEARCH BUTTON -->
			<div>
				<q-btn rounded color="primary" label="Search" @click="Search" />
			</div>
		</div>
	</q-card>
	<!-- TABLE -->
	<Table
		title="Tickets"
		:columns="columns"
		:data="tickets"
		:isLoading="isLoading"
		:pagination="pagination"
		:tableRequest="tableRequest"
		addRouteName='ticket-create'
		>
			<!-- COLUMNS -->
			<template v-slot:columns="props">
				<q-tr :props="props">
					<q-td key="id" :props="props">
						{{ props.row.id }}
					</q-td>
					<q-td key="title" :props="props">
						{{ props.row.title }}
					</q-td>
					<q-td key="assigned_to" :props="props">
						<span v-if="props.row.assigned_to.name">
							{{ props.row.assigned_to.name}}
						</span>
					</q-td>
					<q-td key="created_at" :props="props">
						{{ props.row.created_at }}
					</q-td>
					<q-td key="closed_at" :props="props">
						{{ props.row.closed_at }}
					</q-td>
					<q-td key="actions" :props="props" class="action-col">
						<q-icon
							name="fa-solid fa-pen fa-lg"
							class="action-col__btn-icon"
							color="primary"
							@click="router.push({ name: 'ticket-details', params: { ticket: props.row.id}})"
						/>
					</q-td>
				</q-tr>
			</template>
	</Table>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Table from '../../components/Table.vue';
import apiError from '../../composables/apiErrorComposable';
import { getModules, getStatuses, getTicketPriorities, getTickets, getUsers } from '../../utils/api';

const router = useRouter();
const { handle } = apiError();
const tickets = ref([]);
const isLoading = ref(false);
const endDatePopUp = ref(false);
const startDatePopUp = ref(false);
const pagination = ref({
	descending: true,
	page: 1,
	rowPerPage: 0,
	rowsNumber: 10
});
const search = ref({
	search: '',
	module: '',
	priority: '',
	status: '',
	assigned: '',
	start_date: '',
	end_date: '',
});
const dropdown = ref({
	modules: [],
	priorities: [],
	statuses: [],
	users: [],
});


const columns = [
  { name: 'id', label: 'ID', align: 'center', field: row => row.id, sortable: true },
  { name: 'title', label: 'title', align: 'left', field: row => row.title, sortable: true },
  { name: 'assigned_to', label: 'Assignee', align: 'left', field: row => row.assigned_to.name, sortable: true },
  { name: 'created_at', label: 'Opened At', align: 'left', field: row => row.created_at, style: 'width: 150px', sortable: true },
  { name: 'closed_at', label: 'Closed At', align: 'left', field: row => row.closed_at, style: 'width: 150px', sortable: true },
	{ name: 'actions', align: 'center', label: 'Actions', field: row => row.id, style: 'width: 100px', sortable: false }
];

onMounted(() => {
	if(tickets.value.length === 0)
		TicketList();
	// dropdowns
	Priorities();
	Statuses();
	Modules();
	Users();
})

// dates
// end date filter active dates
const endDateOptions = date =>  date > search.value.start_date

// watch changes for search parameters
watch(search, () => {
	// reassign start date if end date is  in the past
	if(search.value.end_date < search.value.start_date && search.value.start_date && search.value.end_date)
		search.value.start_date = search.value.end_date;
}, { deep: true });

// search function
const Search = () => {
	const page = 1;
	const rowsPerPage = pagination.value.rowsPerPage;
	const sortBy = pagination.value.sortBy;
	const descending = pagination.value.descending;
	const props = {
		pagination: { page, rowsPerPage, sortBy, descending }
	}

	// set query parameters for search
	let query = "";
	if(search.value.search)
		query += "&search=" + search.value.search;
	if(search.value.module)
		query += "&module=" + search.value.module;
	if(search.value.priority)
		query += "&priority=" + search.value.priority;
	if(search.value.status)
		query += "&status=" + search.value.status;
	if(search.value.assigned)
		query += "&assigned=" + search.value.assigned;
	if(search.value.start_date)
		query += "&start_date=" + search.value.start_date;
	if(search.value.end_date)
		query += "&end_date=" + search.value.end_date;

	tableRequest(props, query)
}

// dropdowns
// priority list
const Priorities = () => {
	getTicketPriorities()
			.then(function ({ data }) {
				dropdown.value.priorities = data.data
			})
			.catch(function ({ response }) {
				handle(response)
			})
}

// status list
const Statuses = () => {
	getStatuses()
			.then(function ({ data }) {
				dropdown.value.statuses = data.data
			})
			.catch(function ({ response }) {
				handle(response)
			})
}

// modules list
const Modules = () => {
	getModules()
			.then(function ({ data }) {
				dropdown.value.modules = data.data
			})
			.catch(function ({ response }) {
				handle(response)
			})
			.finally(function () {

			})
}

// user list
const Users = () => {
	getUsers()
			.then(function ({ data }) {
				dropdown.value.users = data.data
			})
			.catch(function ({ response }) {
				handle(response)
			})
}

// called on pagination updates
const tableRequest = (props, query = '') => {
		const { page, rowsPerPage, sortBy, descending } = props.pagination

		TicketList(rowsPerPage, page, query);
		// update local pagination object
		pagination.value.page = page
		pagination.value.rowsPerPage = rowsPerPage
		pagination.value.sortBy = sortBy
		pagination.value.descending = descending
}

// call api and assign ticket data to tickets
const TicketList = (itemCount = 15, page = 1, query = '') => {
	isLoading.value = true;

	if(!itemCount)
		itemCount = pagination.value.rowsNumber;
	if(!page)
		page = pagination.value.page;

	// axios ticket list call
	getTickets(itemCount, page, query)
		.then(function ({ data }) {
				tickets.value = data.data
				pagination.value.rowsNumber = data.total
			})
			.catch(function ({ response }) {
					handle(response)
			})
			.finally(function () {
				isLoading.value = false;
			})
}

</script>

<style lang="scss" scoped>

</style>
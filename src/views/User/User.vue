<template>
	<!-- SEARCH -->
	<q-card class="q-pa-md q-ma-md">
		<div class="row">
			<div class="col-md-12 col-sm-12 col-xs-12">
				<!-- SEARCH FILTER -->
				<q-input
					dense filled
					placeholder="Search"
					v-model="search"
					class="q-ma-xs"
				/>
			</div>
		</div>
		<div class="row reverse q-mt-md">
			<!-- SEARCH BUTTON -->
			<div class="col-lg-1 col-md-2 col-xs-12 ">
				<q-btn rounded
					color="primary"
					label="Search"
					@click="Search"
					class="full-width"/>
			</div>
		</div>
	</q-card>
	<!-- TABLE -->
	<Table
		title="Users"
		:columns="columns"
		:data="users"
		:isLoading="isLoading"
		:pagination="pagination"
		:tableRequest="tableRequest"
		addRouteName='user-create'
		>
			<!-- COLUMNS -->
			<template v-slot:columns="props">
				<q-tr :props="props">
					<q-td key="id" :props="props">
						{{ props.row.id }}
					</q-td>
					<q-td key="name" :props="props">
						{{ props.row.name }}
					</q-td>
					<q-td key="email" :props="props">
						{{ props.row.email }}
					</q-td>
					<q-td key="actions" :props="props" class="action-col">
						<q-icon
							name="fa-solid fa-pen fa-lg"
							class="action-col__btn-icon"
							color="primary"
							@click="router.push({ name: 'user-details', params: { user: props.row.id}})"
						/>
					</q-td>
				</q-tr>
			</template>
	</Table>
</template>
<script setup>
import Table from '@components/Table.vue';
import apiError from '@composables/apiErrorComposable';
import { getUsers } from '@utils/api';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { handle } = apiError();
const users = ref([]);
const isLoading = ref(false);
const pagination = ref({
	page: 1,
	rowPerPage: 0,
	rowsNumber: 10,
	sortBy: 'id',
	descending: true,
});
const search = ref('');

const columns = [
  { name: 'id', label: 'ID', align: 'center', sortable: true },
  { name: 'name', label: 'TITTLE', align: 'left', sortable: true },
  { name: 'email', label: 'ASSIGNEE', align: 'left', sortable: true },
	{ name: 'actions', align: 'center', label: 'ACTIONS', field: row => row.id, style: 'width: 100px', sortable: false }
];

onMounted(() => {
	if(users.value.length === 0)
		UserList();
})

// search function
const Search = () => {
	const page = 1;
	const rowsPerPage = pagination.value.rowsPerPage;
	const sortBy = pagination.value.sortBy;
	const descending = pagination.value.descending;
	const props = {
		pagination: { page, rowsPerPage, sortBy, descending }
	}

	tableRequest(props)
}

// dropdowns

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
const tableRequest = (props) => {
		const { page, rowsPerPage, sortBy, descending } = props.pagination

	// set query parameters for search
	let query = "";
	// set sort
	const sort_dir = (descending) ? 'desc' : 'asc';

	if(search.value)
		query += "&search=" + search.value;
	if(sortBy)
		query += `&sort_by=${sortBy}&sort_dir=${sort_dir}`;

		UserList(rowsPerPage, page, query);
		// update local pagination object
		pagination.value.page = page
		pagination.value.rowsPerPage = rowsPerPage
		pagination.value.sortBy = sortBy
		pagination.value.descending = descending
}

// call api and assign ticket data to users
const UserList = (itemCount = 15, page = 1, query = '') => {
	isLoading.value = true;

	if(!itemCount)
		itemCount = pagination.value.rowsNumber;
	if(!page)
		page = pagination.value.page;

	// axios ticket list call
	getUsers(itemCount, page, query)
		.then(function ({ data }) {
			users.value = data.data
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

<template>
	<Table
		title="Tickets"
		:columns="columns"
		:tickets="tickets"
		:isLoading="isLoading"
		:pagination="pagination"
		:tableRequest="tableRequest"
		addRouteName='ticket-create'
		>
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Table from '../../components/Table.vue';
import apiError from '../../composables/apiErrorComposable';
import { getTickets } from '../../utils/api';

const router = useRouter();
const { handle } = apiError();

let tickets = ref([]);
let isLoading = ref(false);
let pagination = ref({
	descending: true,
	page: 1,
	rowPerPage: 0,
	rowsNumber: 10
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
})

const tableRequest = (props) => {
		const { page, rowsPerPage, sortBy, descending } = props.pagination

		TicketList(rowsPerPage, page);
		// update local pagination object
		pagination.value.page = page
		pagination.value.rowsPerPage = rowsPerPage
		pagination.value.sortBy = sortBy
		pagination.value.descending = descending
}

const TicketList = (itemCount = 0, page = 1) => {
	isLoading.value = true;

	if(!itemCount)
		itemCount = pagination.value.rowsNumber;
	if(!page)
		page = pagination.value.page;

	getTickets(itemCount, page)
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
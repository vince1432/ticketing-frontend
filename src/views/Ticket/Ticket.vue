<template>
	<div class="q-pa-md full-width">
		<q-table
			bordered
			:columns="columns"
			separator="cell"
			:rows="tickets"
			row-key="id"
		>
			<template v-slot:top>
				<div class="table-top">
					<caption class="table-top__title">Tickets</caption>
					<q-icon
							name="fa-solid fa-plus fa-xl"
							class="table-top__button"
							color="positive"
							@click="router.push({ name: 'ticket-create'})"
						/>
				</div>
			</template>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td key="id" :props="props">
						{{ props.row.id }}
					</q-td>
					<q-td key="title" :props="props">
						{{ props.row.title }} .
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
						<q-icon
							name="fa-sharp fa-solid fa-trash fa-lg"
							class="action-col__btn-icon"
							color="negative"
							@click="router.push({ name: 'ticket-details', params: { ticket: props.row.id}})"
						/>
					</q-td>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import apiError from '../../composables/apiErrorComposable';
import { getTickets } from '../../utils/api';

let tickets = ref([]);
const router = useRouter();
const { handle } = apiError();

const columns = [
  { name: 'id', label: 'ID', align: 'center', field: row => row.id, sortable: true },
  { name: 'title', label: 'title', align: 'left', field: row => row.title, sortable: true },
  { name: 'assigned_to', label: 'Assignee', align: 'left', field: row => row.assigned_to.name, sortable: true },
  { name: 'created_at', label: 'Opened At', align: 'left', field: row => row.created_at, style: 'width: 150px', sortable: true },
  { name: 'closed_at', label: 'Closed At', align: 'left', field: row => row.closed_at, style: 'width: 150px', sortable: true },
	{ name: 'actions', align: 'center', label: 'Actions', field: row => row.id, style: 'width: 100px', sortable: false }
];

onMounted(() => {
	TicketList();
})

const  TicketList = () => {
	getTickets()
		.then(function ({ data }) {
				tickets.value = data.data
			})
			.catch(function ({ response }) {
					handle(response)
			})
}
</script>

<style lang="scss" scoped>

</style>
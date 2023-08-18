<template>
	<Table
		title="Priority"
		:columns="columns"
		:data="priorities"
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
					<q-td key="name" :props="props">
						{{ props.row.name }}
					</q-td>
					<q-td key="level" :props="props">
						{{ props.row.level }}
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
import { getPriorities } from '../../utils/api';

const router = useRouter();
const { handle } = apiError();

let priorities = ref([]);
let isLoading = ref(false);
let pagination = ref({
	descending: true,
	page: 1,
	rowPerPage: 0,
	rowsNumber: 10
});

const columns = [
  { name: 'id', label: 'ID', align: 'center', field: row => row.id, sortable: true, style: 'width: 150px' },
  { name: 'name', label: 'Name', align: 'left', field: row => row.name, sortable: true },
  { name: 'level', label: 'Level', align: 'left', field: row => row.level, sortable: true },
	{ name: 'actions', align: 'center', label: 'Actions', field: row => row.id, style: 'width: 100px', sortable: false }
];

onMounted(() => {
	if(priorities.value.length === 0)
		PriorityList();
})

const tableRequest = (props) => {
		const { page, rowsPerPage, sortBy, descending } = props.pagination

		PriorityList(rowsPerPage, page);
		// update local pagination object
		pagination.value.page = page
		pagination.value.rowsPerPage = rowsPerPage
		pagination.value.sortBy = sortBy
		pagination.value.descending = descending
}

const PriorityList = (itemCount = 15, page = 1) => {
	isLoading.value = true;

	if(!itemCount)
		itemCount = pagination.value.rowsNumber;
	if(!page)
		page = pagination.value.page;

	getPriorities(itemCount, page)
		.then(function ({ data }) {
				priorities.value = data.data
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
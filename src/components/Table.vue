<template>
 <div class="q-pa-md full-width">
		<q-table
			bordered
			:columns="columns"
			separator="cell"
			:rows="tickets"
			row-key="id"
			dense
			:loading="isLoading"
			:pagination="pagination"
			:rows-per-page-options="rowsPerPageOption"
			:onRequest="tableRequest"
			@update:pagination="paginationUpdate"
		>
			<template v-slot:top>
				<div class="table-top">
					<caption class="table-top__title">{{ title }}</caption>
					<q-icon
							name="fa-solid fa-plus fa-xl"
							class="table-top__button"
							color="positive"
							@click="router.push({ name: addRouteName})"
						/>
				</div>
			</template>
			<template v-slot:body="props">
				<slot v-bind="props" name="columns"></slot>
			</template>
			<!-- <template v-slot:body="props">
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
			</template> -->

		</q-table>
 </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const childProps = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  tickets: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  pagination: {
    type: Object,
    required: false,
    default: {
			descending: true,
			page: 1,
			rowPerPage: 0,
			rowsNumber: 10
		},
  },
  rowsPerPageOption: {
    type: Array,
    required: false,
    default: ['10',	'20',	'50','100',],
  },
  tableRequest: {
    type: Function,
    required: false,
    default: () => {},
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  addRouteName: {
    type: String,
    required: true,
  },
})

console.log(childProps.addRouteName);
const paginationUpdate = props => {
	const { sortBy, descending, page, rowsPerPage, rowPerPage, rowsNumber } = props

	childProps.pagination.page = page
	childProps.pagination.rowsPerPage = rowsPerPage
	childProps.pagination.sortBy = sortBy
	childProps.pagination.descending = descending
	childProps.pagination.rowsNumber = rowsNumber
	childProps.pagination.rowPerPage = rowPerPage
}

const emit = defineEmits(['update:text'])

const update = (e) => {
  emit('update:text', e.target.value)
}
</script>

<style lang="scss" scoped>
</style>

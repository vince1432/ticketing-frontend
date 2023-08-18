<template>
 <div class="q-pa-md full-width">
		<q-table
			bordered
			:columns="columns"
			separator="cell"
			:rows="data"
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
  data: {
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
			rowPerPage: 15,
			rowsNumber: 15
		},
  },
  rowsPerPageOption: {
    type: Array,
    required: false,
    default: ['15',	'20',	'30',	'50','100',],
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

const paginationUpdate = props => {
	const { sortBy, descending, page, rowsPerPage, rowPerPage, rowsNumber } = props

	childProps.pagination.page = page
	childProps.pagination.rowsPerPage = rowsPerPage
	childProps.pagination.sortBy = sortBy
	childProps.pagination.descending = descending
	childProps.pagination.rowsNumber = rowsNumber
	childProps.pagination.rowPerPage = rowPerPage
}
</script>

<style lang="scss" scoped>
</style>

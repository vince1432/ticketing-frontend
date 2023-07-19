<template>
	<div>

	</div>
</template>

<script setup>
const props = defineProps({
  click: {
    type: Function,
    required: true,
    default: 'text',
  },
  label: {
    type: String,
    required: true,
    default: '',
  },
  class: {
    type: String,
    required: false,
    default: '',
  },
  id: {
    type: String,
    required: false,
    default: '',
  },
  error: {
    type: String,
    required: false,
    default: '',
  },
})
</script>

<style lang="scss" scoped>

</style>
<template>
  <div class="textbox-container">
    <label :for="id" :class="{ 'field--not-empty': !isEmpty }">{{
      label
    }}</label>
    <input
      :type="type"
      class="login-form__input"
      :id="id"
      v-model="text"
      @change="update"
			@input="error=''"
    />
		<p class="error-msg">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const text = ref('')
// console.log(text.value.length)

const props = defineProps({
  type: {
    type: String,
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

const isEmpty = computed(() => text.value.length === 0)

const emit = defineEmits(['update:text'])

const update = (e) => {
  emit('update:text', e.target.value)
}
</script>

<style lang="scss" scoped>
.textbox-container {
  position: relative;

  .login-form__input {
    height: 40px;
    border: none;
    font-size: 20px;
    border-bottom: 1px solid #ccc;
    font-weight: 400;
    height: calc(1.5em + 0.75rem + 2px);
    font-size: 20px;
    width: 100%;
  }

  .login-form__input:focus {
    outline: none;
  }

  label {
    font-size: 12px;
    color: #b3b3b3;
    position: absolute;
    transform: translateY(-50%);
    transition: 0.3s all ease;
    top: 50%;
  }

  .field--not-empty {
    margin-top: -25px;
  }
}
</style>

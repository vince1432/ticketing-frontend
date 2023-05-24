import { ref } from 'vue'

// add incrementBy param with default value
export default function composable() {
  const message = ref('')

  function updateMessage(message) {
    message.value = message
  }

  return { message, updateMessage }
}

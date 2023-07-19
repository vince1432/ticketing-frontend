import { ref } from 'vue';
import { getUsers } from '../utils/api';

// add incrementBy param with default value
export default function userComposable() {
  const users = ref([])

  function updateUserList(count = 0, page = 0) {
    getUsers(count, page)
			.then(function ({ data }) {
				users.value = data.data
			})
			.catch(function ({ response }) {
				users.value = []
				handle(response)
			})
  }

  return { users, updateUserList }
}

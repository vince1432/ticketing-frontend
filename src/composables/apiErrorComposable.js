import { useRouter } from "vue-router";
import { userLogout } from "../utils/common";
import { serverError } from "../utils/sweetAlert";

export default function apiErrorComposable() {
	const router = useRouter();

  function handle(response) {
		console.log(response);
		if(response.status === 401) {
			userLogout()
			router.push({ name: 'login'})
		}
		else
			serverError()
  }
  return { handle }
}

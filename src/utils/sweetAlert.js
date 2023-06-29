import Swal from "sweetalert2";

export const serverError = () => {
  Swal.fire({
		icon: 'error',
		title: 'Internal server error',
		text: 'Please check with the administrator.'
	});
}
export default {
	loggedIn: (state, isLogged) => {
		return state.accessToken != null
	},

	activeUser: (state) => {
		const id = state.loggedUser.id ?? 0;
		const name = state.loggedUser.name ?? 'N/A';
		const email = state.loggedUser.email ?? 'N/A';
		return {
			id: id,
			name: name,
			email: email,
		}
	}
}

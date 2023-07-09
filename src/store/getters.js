export default {
	loggedIn: (state, isLogged) => {
		return state.accessToken != null
	}
}

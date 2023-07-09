export default {
	setLoggedInUser: (state, user) => {
		state.loggedUser = user
	},

	setIsLoggedIn: (state, isLogged) => {
		state.isLoggedIn = isLogged
	}
}

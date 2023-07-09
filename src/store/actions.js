export default {
	login: ({ commit }, user) => {
		if(user) {
			commit('setLoggedInUser', user)
			commit('setIsLoggedIn', 1)
		}
		else {
			commit('setLoggedInUser', {})
			commit('setIsLoggedIn', 0)
		}
	},
	logout: ({ commit }) => {
		commit('setLoggedInUser', {})
		commit('setIsLoggedIn', 0)
	}
}

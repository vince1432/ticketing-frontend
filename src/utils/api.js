import http from './axios'

// ---------- auth ------------//
export const login = data => {
  return http.post('/login', data)
}

export const logout = () => {
  return http.post('/logout')
}

// ---------- tickets ------------//
/**
 * Ticket list axios request
 *
 * @param {number} [count=10] item count to be returned. For pagination
 * @param {number} [page=1] offset of the result. For pagination
 * @param {string} [$query=""] search parameters. Format: &key=value
 * @return {Promise} axios request
 */
export const getTickets = (count = 10, page = 1, $query = "") => {
  return http.get(`/ticket?page=${page}&item_count=${count}${$query}`)
}

export const getTicket = id => {
  return http.get(`/ticket/${id}`)
}

export const createTicket = (data) => {
  return http.post(`/ticket`, data)
}

// export const closeTicket = (id) => {
//   return http.patch(`/ticket/close/${id}`)
// }

export const updateTicket = (id, data) => {
  return http.patch(`/ticket/${id}`, data)
}

export const getTicketPriorities = () => {
  return http.get(`/ticket-priority`)
}

// ---------- users ------------//
export const getUsers = (count = 0, page = 0) => {
	let url = '/user';
	if(count && page)
		url = url + `?page=${page}&item_count=${count}`;

  return http.get(url)
}

// ---------- priority ------------//
/**
 * API call for priority list
 *
 * @param {number} [count=0] items to return
 * @param {number} [page=0] page to start
 * @return {Promise}
 */
export const getPriorities = (count = 0, page = 0) => {
	let url = '/ticket-priority';
	if(count && page)
		url = url + `?page=${page}&item_count=${count}`;

  return http.get(url)
}


// ---------- status ------------//
/**
 * API call for status list
 *
 * @param {number} [count=0] items to return
 * @param {number} [page=0] page to start
 * @return {Promise}
 */
export const getStatuses = (count = 0, page = 0) => {
	let url = '/ticket-status';
	if(count && page)
		url = url + `?page=${page}&item_count=${count}`;

  return http.get(url)
}


// ---------- module ------------//
/**
 * API call for module list
 *
 * @param {number} [count=0] items to return
 * @param {number} [page=0] page to start
 * @return {Promise}
 */
export const getModules = (count = 0, page = 0) => {
	let url = '/module';
	if(count && page)
		url = url + `?page=${page}&item_count=${count}`;

  return http.get(url)
}
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
/**
 * Get Ticket details
 *
 * @param {number} id ticket id
 * @return {Promise} axios request
 */
export const getTicket = id => {
  return http.get(`/ticket/${id}`)
}
/**
 * Create a new Ticket
 *
 * @param {Object} data ticket information
 * @return {Promise} axios request
 */
export const createTicket = (data) => {
  return http.post(`/ticket`, data)
}

/**
 * Update a Ticket data
 *
 * @param {number} id ticket id
 * @param {Object} data ticket information
 * @return {Promise} axios request
 */
export const updateTicket = (id, data) => {
  return http.patch(`/ticket/${id}`, data)
}

// ---------- comments ------------//
/**
 * Ticket comment list axios request
 *
 * @param {number} [count=10] item count to be returned. For pagination
 * @param {number} [page=1] offset of the result. For pagination
 * @param {string} [$query=""] search parameters. Format: &key=value
 * @return {Promise} axios request
 */
export const getComments = (ticket_id, page = 1, count = 5, sort_by = 'id', sort_dir = 'asc') => {
  return http.get(`/ticket/comment?ticket_id=${ticket_id}&page=${page}&item_count=${count}&sort_by=${sort_by}&sort_dir=${sort_dir}`)
}

/**
 * add a new ticket comment
 *
 * @param {number} ticket ticket id
 * @param {string} comment comment
 * @return {Promise} axios request
 */
export const addComment = (ticket, comment) => {
  return http.post('/ticket/comment', { ticket_id: ticket, comment: comment })
}

/**
 * update ticket comment H6Q3qveGRU6qNvHRVx4N9w
 *
 * @param {number} ticket ticket id
 * @param {string} comment comment
 * @return {Promise} axios request
 */
export const updateComment = (id, comment) => {
  return http.patch(`/ticket/comment/${id}`, { comment: comment })
}

/**
 * Get Ticket priorities
 *
 * @return {Promise} axios request
 */
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
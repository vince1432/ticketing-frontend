import http from './axios'

// ---------- auth ------------//
export const login = data => {
  return http.post('/login', data)
}

export const logout = () => {
  return http.post('/logout')
}

// ---------- tickets ------------//
export const getTickets = (count = 10, page = 1) => {
  return http.get(`/ticket?page=${page}&item_count=${count}`)
}

export const getTicket = id => {
  return http.get(`/ticket/${id}`)
}

export const createTicket = (data) => {
  return http.post(`/ticket`, data)
}

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
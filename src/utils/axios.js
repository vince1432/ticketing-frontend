import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
		timeout: 1000
  },
})

// console.log(token);

http.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token");
    if (token)
      config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  error => Promise.reject(error)
);

// const onRequest = (config) => {
//   const methods = ['post', 'put', 'delete']
//   const token = localStorage.getItem("BearerToken");

//   if(!token) {
// 		const refresh = localStorage.getItem("RefreshToken");
// 		if(refresh)
// 			newToken()

// 	}
//     return setCSRFToken().then((response) => config)

//   return config
// }

// const newToken = () => {
//   return http.get('/csrf-cookie')
// }

// http.interceptors.request.use(onRequest, null)
// axios.defaults.withCredentials = true;

export default http

import axios from 'axios'

//uncomment this and build your app when deploying
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:5000/';
}
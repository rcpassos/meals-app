import axios from 'axios';

axios.defaults.baseURL = 'https://mealsapp-d705d.firebaseio.com/';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;

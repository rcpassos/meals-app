import axios from 'axios';

export default axios.create({
  baseURL: 'https://mealsapp-d705d.firebaseio.com/',
  headers: { 'Content-Type': 'application/json' },
});

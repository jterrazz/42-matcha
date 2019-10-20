import Home from './components/pages/Home'
import Login from './components/pages/Login'

// TODO Add redirection if not logged to page
const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
];

export default routes
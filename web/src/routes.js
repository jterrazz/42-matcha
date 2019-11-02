import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Discover from './components/pages/Discover'
import Find from './components/pages/Find'
import Profile from './components/pages/Profile'
import Messages from './components/pages/Messages'

// TODO Add redirection if not logged to page
const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/discover', component: Discover, name: 'discover' },
    { path: '/find', component: Find, name: 'find' },
    { path: '/user/:username', component: Profile, name: 'profile' },
    { path: '/messages/:username', component: Messages, name: 'messages' },
];

export default routes

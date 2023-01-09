import {
    createRouter,
    createWebHistory
} from "vue-router";
import Home from "../views/admin/Home.vue"
import Login from "../views/auth/Login.vue"
import Register from "../views/auth/Register.vue"
import Order from "../views/admin/Order.vue"
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta:{
            animateName: "float"
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: Home,
        meta:{
            animateName: "fade",
        }
    },
    {
        path: '/order',
        name: 'order',
        component: Order
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta:{
            animateName: "float"
        }
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta:{
            animateName: "float"
        }
    },
    {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: ResetPassword,
        meta:{
            animateName: "float"
        },
        beforeEnter: (to, from, next) => {
            if(to.query.email){
                next()
            }
            next('/login')
        }
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/forgot-password', '/reset-password', `/reset-password/${to.params.token}`];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user') ? true : false;
    if (authRequired && !loggedIn) {
        return next('/login');
    }

    if(publicPages[0].includes(to.path) && loggedIn){
        return next('/admin');
    }

    next()
})
export default router
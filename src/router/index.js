import {
    createRouter,
    createWebHistory
} from "vue-router";
import Home from "../views/admin/Home.vue"
import Login from "../views/auth/Login.vue"
import Register from "../views/auth/Register.vue"
import Order from "../views/admin/Order.vue"
import Customer from "../views/admin/Customer.vue"
import Provider from "../views/admin/Provider.vue"
import Finance from "../views/admin/Finance.vue"
import Task from "../views/admin/Task.vue"
import Ingredient from "../views/admin/Ingredient.vue"
import Product from "../views/admin/Product.vue"
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'
import BaseLayout from '../components/layouts/BaseLayout.vue'

const routes = [
    {
        path: '/',
        component: BaseLayout,
        children:[
            {
                path: '/dashboard',
                component: Home,
                name: 'home'
            },
            {
                path: '/order',
                component: Order,
                name: 'order'
            },
            {
                path: '/customer',
                component: Customer,
                name: 'customer'
            },
            {
                path: '/provider',
                component: Provider,
                name: 'provider'
            },
            {
                path: '/task',
                component: Task,
                name: 'task'
            },
            {
                path: '/finance',
                component: Finance,
                name: 'finance'
            },
            {
                path: '/ingredient',
                component: Ingredient,
                name: 'ingredient'
            },
            {
                path: '/product',
                component: Product,
                name: 'product'
            }
        ],
        meta:{
            animateName: "float-up",
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta:{
            animateName: "float"
        }
    },
    // {
    //     path: '/dashboard',
    //     name: 'dashboard',
    //     component: Home,
    //     meta:{
    //         animateName: "fade",
    //     }
    // },
    // {
    //     path: '/order',
    //     name: 'order',
    //     component: Order
    // },
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
        return next('/dashboard');
    }

    next()
})
export default router
import {
    createRouter,
    createWebHistory
} from "vue-router";
import Home from "../views/admin/Home.vue"
import Login from "../views/auth/Login.vue"
import Register from "../views/auth/Register.vue"
import Order from "../views/admin/Order.vue"
import User from "../views/admin/User.vue"
import Customer from "../views/admin/Customer.vue"
import Provider from "../views/admin/Provider.vue"
import Finance from "../views/admin/Finance.vue"
import Task from "../views/admin/Task.vue"
import Ingredient from "../views/admin/Ingredient.vue"
import Product from "../views/admin/Product.vue"
import ProductionRequest from "../views/admin/ProductionRequest.vue"
import Production from "../views/admin/Production.vue"
import PurchaseRemind from "../views/admin/PurchaseRemind.vue"
import WarehouseImport from "../views/admin/WarehouseImport.vue"
import WarehouseExport from "../views/admin/WarehouseExport.vue"
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'
import BaseLayout from '../components/layouts/BaseLayout.vue'
import NotFound from '../views/error/404.vue'

const routes = [{
        path: '/',
        component: BaseLayout,
        children: [{
                path: '/dashboard',
                component: Home,
                name: 'home',
                meta: {
                    title: "Bảng điều khiển"
                }
            },
            {
                path: '/order',
                component: Order,
                name: 'order',
                meta: {
                    title: "Đơn hàng"
                }
            },
            {
                path: '/customer',
                component: Customer,
                name: 'customer',
                meta: {
                    title: "Khách hàng"
                }
            },
            {
                path: '/provider',
                component: Provider,
                name: 'provider',
                meta: {
                    title: "Nhà cung cấp"
                }
            },
            {
                path: '/task',
                component: Task,
                name: 'task',
                meta: {
                    title: "Công việc"
                }
            },
            {
                path: '/finance',
                component: Finance,
                name: 'finance',
                meta: {
                    title: "Tài chính"
                }
            },
            {
                path: '/ingredient',
                component: Ingredient,
                name: 'ingredient',
                meta: {
                    title: "Nguyên phụ liệu"
                }
            },
            {
                path: '/product',
                component: Product,
                name: 'product',
                meta: {
                    title: "Thành phẩm"
                }
            },
            {
                path: '/warehouse-import',
                component: WarehouseImport,
                name: 'warehouse-import',
                meta: {
                    title: "Nhập kho"
                }
            },
            {
                path: '/warehouse-export',
                component: WarehouseExport,
                name: 'warehouse-export',
                meta: {
                    title: "Xuất kho"
                }
            },
            {
                path: '/user',
                component: User,
                name: 'user',
                meta: {
                    title: "Nhân sự"
                }
            },
            {
                path: '/production-suggest',
                component: ProductionRequest,
                name: 'production-suggest',
                meta: {
                    title: "Đề nghị sản xuất"
                }
            },
            {
                path: '/productions',
                component: Production,
                name: 'productions',
                meta: {
                    title: "Lệnh sản xuất"
                }
            },
            {
                path: '/purchase-remind',
                component: PurchaseRemind,
                name: 'purchase-remind',
                meta: {
                    title: "Đề xuất mua hàng"
                }
            }
        ],
        meta: {
            animateName: "float-up",
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            animateName: "float",
            title: "Đăng nhập"
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
        meta: {
            animateName: "float",
            title: "Đăng ký"
        }
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            animateName: "float",
            title: "Quên mật khẩu"
        }
    },
    {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: ResetPassword,
        meta: {
            animateName: "float",
            title: "Khôi phục mật khẩu"
        },
        beforeEnter: (to, from, next) => {
            if (to.query.email) {
                next()
            }
            next('/login')
        }
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: NotFound,
        meta: {
            title: "404 - Not found"
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

    if (publicPages[0].includes(to.path) && loggedIn) {
        return next('/dashboard');
    }
    document.title = to.meta.title
    meta: {
        title: ""
    }
    next()
})
export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Landing from '@/views/Landing.vue'


const Login                     = () => import('@/components/profile/Login')
const Register                  = () => import('@/components/profile/Register')
const Listnews               = () => import('@/components/admin/Listnews')
const Addnews                   = () => import('@/components/admin/Addnews')
const editnews               = () => import('@/components/admin/editnews')
const Listdoctrine           = () => import('@/components/admin/Listdoctrine')
const Adddoctrine               = () => import('@/components/admin/Adddoctrine')
const Admin                     = () => import('@/components/admin/Admin')
const loginAdmin                = () => import('@/components/admin/loginAdmin')
const ListCampaign           = () => import('@/components/admin/ListCampaign')
const AddCampaign           = () => import('@/components/admin/AddCampaign')
const editCampaign               = () => import('@/components/admin/EditCampaign')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin/Listnews',
    name: 'Listnews',
    component: Listnews
  },
  {
    path: '/admin/addnews',
    name: 'Addnews',
    component: Addnews
  },
  {
    path: '/admin/editnews',
    name: 'editnews',
    component: editnews
  },
  {
    path: '/admin/Listdoctrine',
    name: 'Listdoctrine',
    component: Listdoctrine
  },
  {
    path: '/admin/Adddoctrine',
    name: 'Adddoctrine',
    component: Adddoctrine
  },
  {
    path: '/admin/ListCampaign',
    name: 'ListCampaign',
    component: ListCampaign
  },
  {
    path: '/admin/addCampaign',
    name: 'addCampaign',
    component: AddCampaign
  },
  {
    path: '/admin/editCampaign',
    name: 'editCampaign',
    component: editCampaign
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/login',
    name: 'loginAdmin',
    component: loginAdmin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
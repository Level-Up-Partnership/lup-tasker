import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/Login.vue";
import Register from "../views/register/Register.vue";
import NotFound from "../views/notfound/NotFound.vue";
import About from "../views/about/About.vue";
import HomePage from "../views/homepage/HomePage.vue";
import Forum from "../views/forum/mainForum.vue";
import UserProfile from "../views/userProfile/UserProfile.vue"
import CategorySug from "../views/forum/ForumCategories/categorySuggestion.vue"

const routes = [
  {
    path: "/",
    redirect: "/homepage",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/homepage",
    component: HomePage,
  },
  {
    path: "/forum",
    component: Forum,
    children: [
      {
        path: 'CategorySuggestion', component: CategorySug
      }
    ]
  },
  {
    path: "/profile",
    component: UserProfile
  },
  {
    path: "/:notFound(.*)",
    component: NotFound, //Keep this route last
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loginPage = ['/login', '/register', '/about'];
  const authReq = !loginPage.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authReq && !loggedIn) {
    return next('/login');
  }
  next();
});

export default router;

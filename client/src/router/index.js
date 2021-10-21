import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/Login.vue";
import Register from "../views/register/Register.vue";
import NotFound from "../views/notfound/NotFound.vue";
import About from "../views/about/About.vue";
import HomePage from "../views/homepage/HomePage.vue";
import Forum from "../views/forum/mainForum.vue";
import UserProfile from "../views/userProfile/UserProfile.vue";
import PostCreation from "../views/forum/postCreation.vue";
import PostDisplay from "../views/forum/postDisplay.vue";
import PostReply from "../views/forum/postReply.vue";
import TaskHistory from "../views/taskHistory/taskHistory.vue";
import TaskStats from "../views/taskStats/taskStats.vue";


import AllPostsDisplay from "../views/forum/ForumCategories/allPostDisplay.vue"
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
  },
  {
    path: "/forum/category/:id",
    name: 'categoryPages',
    component: AllPostsDisplay,
  },
  {
    path: "/forum/category/:id/postcreation",
    name: 'postCreation',
    component: PostCreation,
  },
  {
    path: "/forum/category/:id/postid=:id",
    name: 'postReply',
    component: PostReply,
  },
  {
    path: '/forum/:categoryname/post/:id',
    name: 'UserPost',
    component: PostDisplay
  },
  {
    path: "/profile",
    component: UserProfile
  },
  {
    path: "/taskhistory",
    component: TaskHistory,
  },
  {
    path: "/taskStats",
    component: TaskStats,
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

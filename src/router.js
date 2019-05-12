import Vue from "vue";
import Router from "vue-router";
import About from "./views/About";
import Login from "./views/Login";
import Register from "./views/Register";
import Logout from "./views/Logout";
import Tests from "./components/Tests";
import Navigation from "./components/Navigation";
import NavigationLogged from "./components/NavigationLogged";
import AllTests from "./components/AllTests";
import DoneTests from "./components/DoneTests";
import CreateTest from "./components/CreateTest";
import PassTest from "./components/PassTest";
import PassedTests from "./components/PassedTests";
import UserTestOverview from "./components/UserTestOverview";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Navigation,
      children: [
        {
          path: "about",
          name: "about",
          component: About
        },
        {
          path: "login",
          name: "login",
          component: Login,
          beforeEnter: (to, from, next) => {
            if (sessionStorage.token !== undefined) {
              next("/");
            } else {
              next();
            }
          }
        },
        {
          path: "register",
          name: "register",
          component: Register
        }
      ],
      beforeEnter: (to, from, next) => {
        if (sessionStorage.token !== undefined) {
          next("/user");
        } else {
          next();
        }
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/test",
      name: "test",
      component: NavigationLogged,
      children: [
        {
          path: ":id",
          name: "pass-test",
          component: PassTest
        },
        {
          path: ":testid/result/:userid",
          name: "review-test",
          component: UserTestOverview
        },
      ]
    },
    {
      path: "/user",
      name: "user",
      component: NavigationLogged,
      children: [
        {
          path: "tests",
          component: Tests,
          children: [
            {
              path: "all",
              name: "all",
              component: AllTests
            },
            {
              path: "done",
              name: "done",
              component: DoneTests
            },
            {
              path: "passed",
              name: "passed",
              component: PassedTests
            }
          ]
        },
        {
          path: "create-test",
          name: "create-test",
          component: CreateTest
        }
      ],
      beforeEnter: (to, from, next) => {
        if (sessionStorage.token === undefined) {
          next("/");
        } else {
          next();
        }
      }
    }
  ]
});

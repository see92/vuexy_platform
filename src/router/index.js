import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: {
        pageTitle: "Home",
        breadcrumb: [
          {
            text: "Home",
            active: true,
          },
        ],
      },
    },
    {
      path: "/second-page",
      name: "second-page",
      component: () => import("@/views/SecondPage.vue"),
      meta: {
        pageTitle: "Second Page",
        breadcrumb: [
          {
            text: "Second Page",
            active: true,
          },
        ],
      },
    },
    {
      path: "/processList",
      name: "processList",
      component: () => import("@/views/ProcessList.vue"),
      // meta 添加导航栏信息
      meta: {
        pageTitle: "进程列表", // 导航栏标题
        breadcrumb: [
          {
            text: "进程列表", // 导航栏内容文本
            active: true,
          },
        ],
      },
    },
    {
      path: "/document",
      name: "document",
      component: () => import("@/views/document/doc_tabs.vue"),
      meta: {
        pageTitle: "1111",
        breadcrumb: [
          {
            text: "文档安全",
            active: true,
          },
        ],
      },
    },
    {
      path: "/print",
      name: "print",
      component: () => import("@/views/print/index.vue"),
      meta: {
        pageTitle: "2222",
        breadcrumb: [
          {
            text: "打印安全",
            active: true,
          },
        ],
      },
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/test/index.vue"),
      meta: {
        pageTitle: "TEST",
        breadcrumb: [
          {
            text: "测试",
            active: true,
          },
        ],
      },
    },
    {
      path: "/other",
      name: "other",
      components: () => import("@/views/other/index.vue"),
      meta: {
        pageTitle: "其他",
        breadcrumb: [
          {
            text: "其他",
            active: true,
          },
        ],
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "/error-404",
      name: "error-404",
      component: () => import("@/views/error/Error404.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "*",
      redirect: "error-404",
    },
  ],
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;

import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端文档",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "脚手架", link: "/cli/", activeMatch: "/cli/" },
      { text: "组件库", link: "/ui/", activeMatch: "/ui/" },
      { text: "业务工具库", link: "/utils/", activeMatch: "/utils/" },
    ],

    sidebar: {
      "/cli/": [
        {
          text: "脚手架",
          items: [
            { text: "SPA", link: "/cli/spa" },
            { text: "MPA", link: "/cli/mpa" },
          ],
        },
      ],
    },

    socialLinks: [
      // { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

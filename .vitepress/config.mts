import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DOCS FADLAN",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guides", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Guides",
        items: [
          { text: "Resolusi Konflik Git", link: "/git-resolusi-konflik" },
          { text: "Panduan .gitignore", link: "/gitignore-guide" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

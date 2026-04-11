import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DOCS FADLAN",
  description: "A VitePress Site",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guides Git", link: "/markdown-examples" },
      { text: "Guides Docker", link: "/docker-guide" },
      { text: "Guides Docker", link: "/devilbox-guide" },
    ],

    sidebar: [
      {
        text: "Guides Git",
        items: [
          { text: "Conventional Commit", link: "/conventional_commit" },
          { text: "Resolusi Konflik Git", link: "/git-resolusi-konflik" },
          { text: "Panduan .gitignore", link: "/gitignore-guide" },
        ],
      },
       {
        text: "Guides Docker",
        items: [{ text: "Panduan Docker", link: "/docker-guide" }],
      },
      {
        text: "Guides Devilbox",
        items: [{ text: "Panduan Devilbox", link: "/devilbox-guide" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

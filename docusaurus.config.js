// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Maze UI",
  tagline:
    "Maze-UI is a simple and customizable component library to build faster, beautiful, and more accessible React applications.",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "matozz", // Usually your GitHub org/user name.
  projectName: "maze-doc", // Usually your repo name.

  themes: ["@docusaurus/theme-live-codeblock"],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/matozz/maze/tree/maze-doc",
          sidebarCollapsible: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Maze UI",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            type: "localeDropdown",
            position: "right",
            dropdownItemsAfter: [
              {
                to: "https://github.com/Matozz/maze/pulls",
                label: "Help us translate",
              },
            ],
          },
          {
            href: "https://github.com/matozz/maze",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/docs/intro",
              },
              {
                label: "Getting Started",
                to: "/docs/getting-started/Installation",
              },
              {
                label: "Components",
                to: "/docs/components/Button",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions",
              },
              {
                label: "Discord",
                href: "https://discordapp.com",
              },
              {
                label: "Twitter",
                href: "https://twitter.com",
              },
            ],
          },
          {
            title: "More",
            items: [
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "GitHub",
                href: "https://github.com/matozz/matoz",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Matozz`,
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      // announcementBar: {
      //   // id: "support_us",
      //   content:
      //     '<b>💡 We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a> 📝</b>',
      //   backgroundColor: "#0b1929",
      //   textColor: "white",
      //   // isCloseable: true,
      // },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

module.exports = {
  title: 'localhost.run',
  tagline: '<3 local dev',
  url: 'https://localhost.run',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'localhost-run',
  projectName: 'site',
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },
    navbar: {
      title: 'localhost.run',
      logo: {
        alt: 'localhost.run logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://medium.com/localhost-run',
          label: 'Blog',
          position: 'left'
        },
        {
          href: 'https://admin.localhost.run/',
          label: 'Custom Domains Admin Console',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'The Basics',
              to: 'docs/',
            },
            {
              label: 'Custom Domains',
              to: 'docs/custom-domains',
            },
            {
              label: 'Command Line Interface',
              to: 'docs/cli',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/localhost_run',
            },
          ],
        },
        {
          title: 'Help',
          items: [
            {
              label: '@localhost.run on twitter',
              href: 'https://twitter.com/messages/compose?recipient_id=833775057159725057',
            },
            {
              label: 'email help@localhost.run',
              href: 'mailto:help@localhost.run',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://medium.com/localhost-run',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/localhost-run',
            },
          ],
        },
      ],
      copyright: 'Disseminate Consulting Limited is a company registered in England and Wales with company number 10676516.',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/docs/',
          // Please change this to your repo.
          editUrl:
            'https://github.com/localhost-run/site/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/localhost-run/iwishihadablog/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

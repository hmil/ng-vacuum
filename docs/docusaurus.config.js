module.exports = {
  title: 'NgVacuum',
  tagline: 'Angular unit tests in a vacuum',
  url: 'https://code.hmil.fr/ng-vacuum',
  baseUrl: '/ng-vacuum/',
  favicon: 'img/vacuum-cleaner.ico',
  organizationName: 'hmil', // Usually your GitHub org/user name.
  projectName: 'ng-vacuum', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'NgVacuum',
      logo: {
        alt: 'Ng Vacuum Logo',
        src: 'img/vacuum.svg',
      },
      items: [
        {
          to: 'docs/setup',
          activeBaseRegex: 'docs(?!/api)',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'docs/api/ng-vacuum',
          activeBasePath: 'docs/api',
          label: 'Reference',
          position: 'left',
        },
        {
          href: 'https://github.com/hmil/ng-vacuum',
          label: 'GitHub',
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
              label: 'Getting started',
              to: 'docs/setup',
            },
            {
              label: 'API Reference',
              to: 'docs/api-reference',
            },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/hmil/ng-vacuum',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hadrien Milano. Built with Docusaurus.<br />Vacuum cleaner icon by <a href="https://www.flaticon.com/authors/creaticca-creative-agency" title="Creaticca Creative Agency">Creaticca Creative Agency</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/hmil/ng-vacuum/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/api/ng-vacuum',
            from: '/docs/api-reference',
          },
        ],
      }
    ]
  ]
};

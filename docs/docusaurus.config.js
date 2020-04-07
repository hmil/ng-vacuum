module.exports = {
  title: 'Ng Vacuum',
  tagline: 'Angular unit tests in a vacuum',
  url: 'https://code.hmil.fr/ng-vacuum',
  baseUrl: '/',
  favicon: 'img/vacuum-cleaner.ico',
  organizationName: 'hmil', // Usually your GitHub org/user name.
  projectName: 'ng-vacuum', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'NgVacuum',
      logo: {
        alt: 'Ng Vacuum Logo',
        src: 'img/vacuum.svg',
      },
      links: [
        {
          to: 'docs/setup',
          activeBasePath: 'docs',
          label: 'Docs',
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
};

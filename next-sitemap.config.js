/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.studystay.us',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/secret-page'], // any pages you want to exclude
  // To add extra pages with params or dynamic routes, you can define additionalPaths:
  // additionalPaths: async (config) => [
  //   await config.transform(config, '/charlottesville-sublets'),
  //   await config.transform(config, '/uva-student-housing'),
  //   await config.transform(config, '/sublet-resources'),
  // ],
}

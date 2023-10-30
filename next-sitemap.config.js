/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_URL ?? 'https://skloresurs.com/',
  generateRobotsTxt: true,
  trailingSlash: false,
};

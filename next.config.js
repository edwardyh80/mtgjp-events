/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

// eslint-disable-next-line
const { withAxiom } = require("next-axiom");
// eslint-disable-next-line
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/react",
  "@fullcalendar/daygrid",
  "@fullcalendar/list",
]);

module.exports = withAxiom(withTM(nextConfig));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WORLDCOIN_APP_ID: process.env.WORLDCOIN_APP_ID,
    WORLDCOIN_VERIFY_ACTION: process.env.WORLDCOIN_VERIFY_ACTION,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    WLD_CLIENT_ID: process.env.WLD_CLIENT_ID,
    WLD_CLIENT_SECRET: process.env.WLD_CLIENT_SECRET,
    WALLETCONNECTPROJECTID: process.env.WALLETCONNECTPROJECTID,
    LOTTERYFACTORY_CONTRACT: process.env.LOTTERYFACTORY_CONTRACT,
  },
};

module.exports = nextConfig;

import dotenv from 'dotenv';

dotenv.config();

const requiredKeys = [
  'INSTAGRAM_ACCESS_TOKEN',
  'INSTAGRAM_BUSINESS_ACCOUNT_ID'
];

const config = {
  instagramAccessToken: process.env.INSTAGRAM_ACCESS_TOKEN || '',
  instagramBusinessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || '',
  appId: process.env.APP_ID || '',
  appSecret: process.env.APP_SECRET || '',
  imageUrl: process.env.IMAGE_URL || '',
  defaultCaption: process.env.DEFAULT_CAPTION || 'New content from MonkyCode'
};

for (const key of requiredKeys) {
  if (!config[key === 'INSTAGRAM_ACCESS_TOKEN' ? 'instagramAccessToken' : 'instagramBusinessAccountId']) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

export function getConfig() {
  return config;
}

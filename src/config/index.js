import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const config = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * That long string from mlab
   */
  databasePassword: process.env.DB_PASSWORD,

  /**
   * API configs
   */
  api: {
    prefix: '/api/v1',
  },

  /**
   * Auth0 Credentials
   */
  audience: process.env.AUTH0_AUDIENCE,
  domain: process.env.AUTH0_DOMAIN,
  clientOriginUrl: process.env.CLIENT_ORIGIN_URL,
};

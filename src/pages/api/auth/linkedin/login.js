import { AuthorizationCode } from 'simple-oauth2';
import { randomBytes } from 'crypto';
import nookies from 'nookies';

export const LINKEDIN_OAUTH_SCOPES = ['r_emailaddress', 'r_liteprofile'];
export const LINKEDIN_REDIRECT_URI = `${process.env.BASEURL}/auth/linkedin/redirect`;

export const LINKEDIN_CONFIG = {
  client: {
    id: process.env.LINKEDIN_OAUTH_CLIENT_ID,
    secret: process.env.LINKEDIN_OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://www.linkedin.com',
    tokenPath: '/oauth/v2/accessToken',
    authorizePath: '/oauth/v2/authorization',
  },
  http: {
    headers: { 'Content-Type': 'x-www-form-urlencoded' },
  },
  options: {
    authorizationMethod: 'body',
  },
};

export const getLinkedinState = async (req, res) => {
  const linkedinState = randomBytes(20).toString('hex');
  nookies.set({ res }, 'stateLK', linkedinState, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });

  return linkedinState;
};

const handler = async (req, res) => {
  const client = new AuthorizationCode(LINKEDIN_CONFIG);
  const linkedinState = await getLinkedinState(req, res);

  const authorizationUri = client.authorizeURL({
    redirect_uri: LINKEDIN_REDIRECT_URI,
    scope: LINKEDIN_OAUTH_SCOPES,
    state: linkedinState,
  });

  res.redirect(authorizationUri);
};

export default handler;

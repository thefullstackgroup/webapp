// CORE
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import nookies from 'nookies';
import { AuthorizationCode } from 'simple-oauth2';
import {
  LINKEDIN_CONFIG,
  LINKEDIN_OAUTH_SCOPES,
  LINKEDIN_REDIRECT_URI,
} from '../../api/auth/linkedin/login';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// COMPONENTS
const Meta = dynamic(() => import('components/common/partials/Metadata'));

import { getFirebaseAdmin } from 'next-firebase-auth';

export default function LinkedInRedirect({ firebaseToken, error }) {
  const signInWithLinkedIn = async () => {
    try {
      const res = await firebase.auth().signInWithCustomToken(firebaseToken);

      window.close();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    await signInWithLinkedIn();
  }, []);

  return (
    <>
      <Meta
        title={`${process.env.brandName}`}
        desc="The network built for Software Engineers"
        keywords=""
      />
      <div className="min-h-screen dark:bg-dovegray-900">
        <main className="mx-auto max-w-full">
          <div className="">
            <div className="relative overflow-hidden">
              <div className="relative pt-6 pb-16 sm:pb-24">
                <div className="mt-16 mx-auto max-w-5xl px-4 sm:mt-24 sm:px-6">
                  Signin in...
                  {error && <div>{error}</div>}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

const getProfileInfo = async (accessToken) => {
  return axios
    .get(
      `https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      let profileImage = null;
      if (response.data.profilePicture !== undefined) {
        profileImage =
          response.data.profilePicture['displayImage~'].elements[0]
            .identifiers[0].identifier;
      }
      return {
        id: response.data.id,
        firstName: response.data.localizedFirstName,
        lastName: response.data.localizedLastName,
        profilePicture: profileImage,
      };
    })
    .catch((error) => {
      console.error(error);
    });
};

const getProfileEmail = async (accessToken) => {
  return axios
    .get(
      `https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      let emailAddress = null;
      response.data.elements.forEach((element) => {
        if (element.type === 'EMAIL') {
          emailAddress = element['handle~'].emailAddress;
        }
      });
      return emailAddress;
    })
    .catch((error) => {
      console.error(error);
    });
};

async function createFirebaseAccount(
  linkedInID,
  displayName = null,
  photoURL = null,
  email = null
) {
  // The uid we'll assign to the user.
  const uid = `linkedin|${linkedInID}`;

  // Create or update the user account.
  let firebaseUser = Object.assign(
    {},
    displayName === null ? null : { displayName },
    photoURL === null ? null : { photoURL },
    email === null ? null : { email }
  );

  try {
    await getFirebaseAdmin().auth().updateUser(uid, firebaseUser);
  } catch (error) {
    // If user does not exists we create it.
    if (error.code === 'auth/user-not-found') {
      await getFirebaseAdmin()
        .auth()
        .createUser({
          uid: uid,
          ...firebaseUser,
        });
    } else {
      throw error;
    }
  }

  // Create the custom token
  return getFirebaseAdmin().auth().createCustomToken(uid);
}

export async function getServerSideProps({ req, query }) {
  const client = new AuthorizationCode(LINKEDIN_CONFIG);
  const cookiesReq = nookies.get({ req });
  const linkedinState = cookiesReq.stateLK;

  if (
    !query.state ||
    linkedinState === undefined ||
    query.state != linkedinState
  ) {
    console.error('ERROR: Invalid Code/State when validating token');
    return {
      props: {
        error:
          'Sorry there is an problem logging in currently with LinkedIn. Please try again.',
      },
    };
  }

  if (query.error) {
    console.error(`ERROR: ${query.error}, ${query.error_description}`);
    let errorMessage =
      'Sorry there is an problem logging in currently with LinkedIn. Please try again.';
    if (query.error === 'user_cancelled_login') {
      errorMessage =
        'Please authorize the required permissions to sign in to the application.';
    }

    return {
      props: {
        error: errorMessage,
      },
    };
  }

  const tokenParams = {
    code: query.code,
    redirect_uri: LINKEDIN_REDIRECT_URI,
    scope: LINKEDIN_OAUTH_SCOPES,
  };

  let linkedInAccessToken = '';

  try {
    linkedInAccessToken = await client.getToken(tokenParams);
  } catch (error) {
    console.log('Access Token Error', error.message);
    console.log(error);
  }

  // Get User Profile information
  const [profileInfo, profileEmail] = await Promise.all([
    getProfileInfo(linkedInAccessToken.token.access_token),
    getProfileEmail(linkedInAccessToken.token.access_token),
  ]);

  // Create a Firebase account and return custom auth token.
  let firebaseToken = null;
  let displayName =
    `${profileInfo.firstName}.${profileInfo.lastName}`.toLowerCase();
  let photoURL = profileInfo.profilePicture;
  let email = profileEmail;
  try {
    firebaseToken = await createFirebaseAccount(
      profileInfo.id,
      displayName,
      photoURL,
      email
    );
  } catch (err) {
    console.log(err);
    if (err.errorInfo.code === 'auth/email-already-exists') {
      return {
        props: {
          error:
            'This email is already used by another account. Please login with the other provider.',
        },
      };
    }
  }

  return {
    props: {
      firebaseToken: firebaseToken,
    },
  };
}

import axios from 'axios';
import { getNextStepRoute } from 'utils/signup/signUpSteps';

// This errors no location data when running locally.
const getUserLocation = async (req) => {
  let ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

  if (!ip) return null;

  return axios
    .get(
      `${process.env.API_IPAPI_URL}/${ip}/json/?key=gOxiqr1mlwF1ot66EH91aDaRuJqVNQq8UeGZw0svFTDV0FK9EW`
    )
    .then((response) => {
      return {
        geoLocationData: {
          coordinates: [response.data.latitude, response.data.longitude],
        },
        countryCode: response.data.country_code,
        countryName: response.data.country_name,
        cityName: response.data.city,
        continentCode: response.data.continent_code,
      };
    })
    .catch((error) => {
      console.log('getUserLocation request failed: ', error);
      return null;
    });
};
const getUserProfile = async (
  accessToken,
  firebaseAuthUser,
  req,
  res,
  isNewPage = false
) => {
  let myProfile = null;
  let newUserSignUp = null;

  if (!accessToken) {
    return {
      user: null,
      redirect: `/login?destination=${encodeURIComponent(
        process.env.BASEURL + '/' + req.url
      )}`,
    };
  }
  // 1 Try get the Profile from Profile Srv
  try {
    myProfile = await axios.get(`${process.env.API_PROFILE_URL}/profile/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    if (error.response.status === 404) {
      // 2 Profile for this accessToken does not exist. Means this request is a SignUp

      newUserSignUp = true;
    } else {
      return {
        user: null,
        redirect: `${process.env.BASEURL}/500`,
      };
    }
  }

  if (newUserSignUp && firebaseAuthUser) {
    // 3 Since a Profile does not exist. Create a new Profile for this SignUp
    try {
      const userLocation = await getUserLocation(req);

      // if displayName does not exist (I.E. it's a un/pw sigup)  use first part of email address as displayName
      let displayName = firebaseAuthUser?.displayName;
      let newDisplayName;
      if (!displayName) {
        const userEmail = firebaseAuthUser.email.toString();
        newDisplayName = userEmail.substring(0, userEmail.lastIndexOf('@'));
      }

      myProfile = await axios.post(
        `${process.env.API_PROFILE_URL}/profile`,
        {
          userId: firebaseAuthUser.id,
          displayName: displayName || newDisplayName,
          name: displayName,
          profilePicUrl: firebaseAuthUser?.photoURL,
          userLocation: userLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      res.writeHead(302, {
        Location: `${process.env.BASEURL}/accounts`,
      });
      res.end();
    }
  }

  const user = myProfile?.data;
  if (user === undefined || user === null) {
    return null;
  }

  const isNewUser = !user?.completedOnBoarding;

  if (isNewUser && isNewPage) {
    // TEMP SOLUTION TO CATER FOR REDIRECTS, PASS REDIRECT BACK AS A PROP
    const nextStepRoute = getNextStepRoute(user?.signUpProcessStatus);
    return {
      user: user,
      redirect: `${process.env.BASEURL}${nextStepRoute}`,
    };
  }

  return user;
};

export { getUserProfile };

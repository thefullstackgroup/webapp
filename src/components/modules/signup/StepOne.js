import axios from 'axios';
import { useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as ga from 'lib/ga';
import {
  SignUpSteps,
  setRandomPitch,
  roleTitles,
} from 'components/modules/signup/constants';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import CountrySelect from 'components/common/elements/CountrySelect';
import Avatar from 'components/common/elements/Avatar';

const StepOne = ({ user, referralCode }) => {
  const router = useRouter();
  const [fullName, setFullName] = useState(user?.name);
  const [countryName, setCountryName] = useState(user?.country);
  const [profilePicUrl, setProfilePicUrl] = useState(user?.profilePicUrl);
  const [currentTitle, setCurrentTitle] = useState(user?.currentTitle);
  const AuthUser = useAuthUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      profilePicUrl ===
      'https://terrabyte.fra1.cdn.digitaloceanspaces.com/avatars/default/default-profile.jpg'
    ) {
      alert('Please upload your avatar.');
      return false;
    }

    const profileBioData = {
      aboutUser: setRandomPitch(),
    };

    const bioRequest = await axios.patch(
      `${process.env.BASEURL}/api/profile/bio/update`,
      profileBioData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (bioRequest.status != 204) {
      console.log('Error updating profile bio');
    }

    const formData = {
      name: fullName,
      currentTitle: currentTitle,
      email: '',
      completedOnBoarding: false,
      profilePicUrl: profilePicUrl,
      signUpProcessStatus: SignUpSteps.SIGNUP_ABOUT_USER_COMPLETED.param,
    };

    if (countryName) formData.country = countryName;
    if (referralCode) formData.referrerUserId = referralCode;

    await axios
      .post(
        `${process.env.BASEURL}/api/profile/update`,
        JSON.stringify(formData),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((response) => {
        if (response.status === 204) {
          ga.event({
            action: 'SIGNUP_ABOUT_USER_COMPLETED',
          });
          if (referralCode) {
            ga.event({
              action: 'user_referred',
            });
          }

          sendSlackMessage(`A new user has begun the sign up process.`);
        }
        router.push(SignUpSteps.SIGNUP_ABOUT_USER_COMPLETED.nextRoute);
      })
      .catch((error) => {
        console.log(error);
        sendSlackMessage(`User had an error on step 1 of the sign up process`);
      });
  };

  const handleFileChange = async (event) => {
    event.preventDefault();

    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('id', user.userId);
      formData.append('file', event.target.files[0]);

      await axios
        .post(`${process.env.BASEURL}/api/profile/avatar/upload`, formData)
        .then((response) => {
          setProfilePicUrl(response.data.url);
          const profileData = {
            profilePicUrl: response.data.url,
          };

          axios.patch(
            `${process.env.BASEURL}/api/profile/update`,
            profileData,
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );
        });
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl sm:px-0">
      <div className="flex justify-center sm:w-full md:justify-start">
        <div className="mx-auto my-8 w-full max-w-3xl space-y-8 px-4 sm:px-0">
          <div className="flex w-full justify-center text-base tracking-tight sm:mb-8">
            <label
              htmlFor="avatar"
              className="relative flex cursor-pointer flex-col justify-center text-center text-xs font-medium focus:outline-none focus:ring-0"
            >
              <div className="flex flex-col space-y-2">
                <Avatar
                  image={profilePicUrl}
                  name={user?.name}
                  dimensions="w-20 h-20 md:w-32 md:h-32 opacity-80 ring-2 ring-base-700"
                  width={500}
                  height={500}
                />
                <span className="btn btn-sm btn-ghost px-0">Change avatar</span>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            </label>
          </div>
          <div className="relative w-full text-base tracking-tight sm:mb-8 sm:text-base">
            <label className="label">What&apos;s your name?</label>
            <input
              name="fullName"
              type="text"
              autoComplete="off"
              className="text-input"
              placeholder=""
              value={fullName || ''}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="relative mt-4 w-full text-base tracking-tight sm:mb-8 sm:mt-8 sm:text-base">
            <label className="label">Where are you from?</label>
            <CountrySelect
              countryName={countryName || user.countryName}
              setCountryName={setCountryName}
            />
          </div>
          <div className="mt-4 w-full text-base tracking-tight sm:mb-8 sm:mt-8 sm:text-base">
            <label className="label">What do you do?</label>

            <select
              className="text-input dark:bg-black"
              onChange={(e) => setCurrentTitle(e.target.value)}
              value={currentTitle || user.currentTitle || ''}
            >
              <option value="">Please choose ...</option>
              {roleTitles.map((role, index) => (
                <option value={role} key={index}>
                  {role}
                </option>
              ))}
            </select>
            <span className="mt-1 text-xs text-base-500">
              You can always change this later
            </span>
          </div>

          {!fullName?.trim().length ||
          !currentTitle?.trim().length ||
          !countryName?.trim().length ? (
            <button
              type="button"
              className="btn btn-primary w-full py-2"
              disabled
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary w-full py-2"
              onClick={handleSubmit}
            >
              Next &rarr;
            </button>
          )}
          <button
            onClick={() => {
              AuthUser.signOut();
              router.push({
                pathname: '/login',
                query: {
                  destination: encodeURIComponent(
                    `${process.env.BASEURL}${router.asPath}`
                  ),
                },
              });
            }}
            className="btn btn-ghost w-full px-0"
          >
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;

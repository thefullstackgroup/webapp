import axios from 'axios';
import { useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as ga from 'lib/ga';
import { SignUpSteps, hearFromList } from 'components/modules/signup/constants';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import Avatar from 'components/common/elements/Avatar';

const maxUserBio = 250;

const StepFive = ({ user, referralCode }) => {
  const router = useRouter();
  const AuthUser = useAuthUser();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [hearAbout, setHearAbout] = useState(user?.foundUsFrom || 'Select');
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);
  const [about, setAbout] = useState(user?.bio?.aboutUser || '');
  const [remainingCharsAbout, setRemainingCharsAbout] = useState(
    maxUserBio - about?.length || maxUserBio
  );

  const handleSubmit = async () => {
    const attributesData = {
      userAttributes: {
        signedUpForNewsLetter: newsletterOptIn,
      },
    };

    await axios
      .patch(`${process.env.BASEURL}/api/profile/update`, attributesData)
      .catch((error) => {
        console.log(error);
        alert('Opps, there was an error');
      });

    const profileBioData = {
      aboutUser: about,
    };

    await axios.post(
      `${process.env.BASEURL}/api/profile/bio/update`,
      profileBioData
    );

    const profileData = {
      displayName: displayName,
      profileVideoUrl: '',
      completedOnBoarding: true,
      foundUsFrom: hearAbout,
      signUpProcessStatus: SignUpSteps.SIGNUP_INTRO_COMPLETED.param,
    };

    await axios
      .patch(`${process.env.BASEURL}/api/profile/update`, profileData)
      .then((response) => {
        sendSlackMessage(
          `
          \nNEW USER SIGNED UP 🎉🎉🎉
          \nName: ${user?.name}
          \nFrom: ${user?.userLocation?.cityName}, ${user?.userLocation?.countryName}, ${user?.userLocation?.continentCode}
          \nReferral code: ${referralCode}
          \nGoal set: ${user?.profileGoal}
          \nHeard about us from: ${hearAbout}
          \nNewsletter optin: ${newsletterOptIn}
          `
        );

        ga.event({
          action: 'SIGNUP_INTRO_COMPLETED',
        });

        ga.event({
          action: 'user_completed_signup',
        });

        router.replace(`/${user.displayName}`);
      })
      .catch((error) => {
        console.log(error);
        sendSlackMessage(
          `New user got an error on Step 5 of the sign up process`
        );
      });
  };

  return (
    <div className="mx-auto mb-10 max-w-screen-xl px-4 sm:px-0">
      <div className="flex justify-center sm:w-full md:justify-start">
        <div className="w-full">
          <h4 className="mb-6 text-center text-base-500 dark:text-base-400">
            We send your introduction when you make a connection request.
          </h4>

          <div className="mb-6 w-full">
            <div className="">
              <div className="space-y-6">
                <div className="flex w-full justify-center">
                  <Avatar
                    image={user?.profilePicUrl}
                    name={user?.name}
                    dimensions="w-10 h-10 md:w-28 md:h-28 opacity-80 ring-2 ring-base-200 dark:ring-base-700"
                    width={500}
                    height={500}
                  />
                </div>

                <div>
                  <label htmlFor="country" className="label">
                    Your introduction
                  </label>
                  <textarea
                    name="bio"
                    rows="5"
                    className="text-input"
                    placeholder="Keep it short and to the point"
                    maxLength={maxUserBio}
                    value={about}
                    onChange={(e) => {
                      setAbout(e.target.value);
                      setRemainingCharsAbout(
                        e.target.value.length
                          ? 250 - e.target.value.length
                          : maxUserBio
                      );
                    }}
                  />

                  <span className="text-sm text-gray-400">
                    Remaining characters: {remainingCharsAbout}
                  </span>
                </div>

                <div className="relative mt-4 w-full text-base tracking-tight sm:mt-8 sm:text-base">
                  <label className="label">
                    Lastly, where did you hear about thefullstack?
                  </label>
                  <select
                    className="text-input dark:bg-black"
                    onChange={(e) => setHearAbout(e.target.value)}
                    value={hearAbout}
                  >
                    <option value="Select">Please select ...</option>
                    {hearFromList.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative mt-4 w-full text-base tracking-tight sm:mt-8 sm:text-base">
                  <div className="flex space-x-4">
                    <input
                      id="request"
                      name="request"
                      type="checkbox"
                      checked={newsletterOptIn}
                      className="focus:ring-primary-500 text-primary-600 border-primary-300 h-5 w-5 rounded outline-none focus:outline-none"
                      onChange={() => setNewsletterOptIn(!newsletterOptIn)}
                    />
                    <label className="text-sm text-base-500 dark:text-base-300">
                      Opt in to receive our community newsletter once a week,
                      showcasing the best projects of the week along with
                      projects actively looking for contributors.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {hearAbout !== 'Select' ? (
            <button
              type="submit"
              className="btn btn-primary w-full py-2"
              onClick={handleSubmit}
            >
              Awesome! Let&apos;s go &rarr;
            </button>
          ) : (
            <button className="btn btn-primary w-full py-2" disabled>
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepFive;

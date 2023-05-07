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
    <div className="max-w-screen-xl px-4 sm:px-0 mx-auto mb-10">
      <div className="sm:w-full flex justify-center md:justify-start">
        <div className="w-full">
          <h2 className="text-sm md:text-lg text-slate-400 text-center mb-6">
            We send your introduction when you request a connection.
          </h2>

          <div className="w-full mb-6">
            <div className="">
              <div className="space-y-6">
                <div className="w-full flex justify-center">
                  <Avatar
                    image={user?.profilePicUrl}
                    name={user?.name}
                    dimensions="w-10 h-10 md:w-28 md:h-28 opacity-80 ring-4 ring-primary-500"
                    width={500}
                    height={500}
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="text-slate-300 font-semibold"
                  >
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

                  <span className="text-gray-400 text-sm">
                    Remaining characters: {remainingCharsAbout}
                  </span>
                </div>

                <div className="relative mt-4 sm:mt-8 text-base sm:text-base tracking-tight w-full">
                  <label className="text-slate-300 font-semibold">
                    Lastly, where did you hear about thefullstack?
                  </label>
                  <select
                    className="text-input"
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

                <div className="relative mt-4 sm:mt-8 text-base sm:text-base tracking-tight w-full">
                  <div className="flex space-x-4">
                    <input
                      id="request"
                      name="request"
                      type="checkbox"
                      checked={newsletterOptIn}
                      className="focus:ring-primary-500 h-5 w-5 text-primary-600 border-primary-300 rounded outline-none focus:outline-none"
                      onChange={() => setNewsletterOptIn(!newsletterOptIn)}
                    />
                    <label className="text-slate-300 text-sm">
                      Opt in to receive our community newsletter once a week,
                      showcasing the best projects of the week along with
                      projects looking for contributors.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {hearAbout !== 'Select' ? (
            <button
              type="submit"
              className="btn-primary py-3 w-full"
              onClick={handleSubmit}
            >
              Awesome! Let&apos;s go &rarr;
            </button>
          ) : (
            <button className="btn-primary py-3 w-full" disabled>
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepFive;

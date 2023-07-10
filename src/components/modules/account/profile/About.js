import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import * as ga from 'lib/ga';
import CountrySelect from 'components/common/elements/CountrySelect';

const maxUserBio = 250;
const defaultMinLengthDisplayname = 3;
const defaultMaxLengthDisplayname = 51;

const About = ({ user }) => {
  const router = useRouter();

  const [userName, setUserName] = useState(user?.name);
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [userRole, setUserRole] = useState(user?.currentTitle);
  const [about, setAbout] = useState(user?.bio?.aboutUser || '');
  const [remainingCharsAbout, setRemainingCharsAbout] = useState(
    maxUserBio - about?.length || maxUserBio
  );
  const [isDisplayNameValid, setIsDisplayNameValid] = useState(true);
  const [suggestedNames, setSuggestedNames] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [countryName, setCountryName] = useState(user?.country || '');
  const [website, setWebsite] = useState(user?.personalWebsite || '');

  const handleDisplayNameChange = async (displayName) => {
    const restrictionsDisplayName = new RegExp(
      "[$&+,:;=\\\\?@£//^_{}#|/'\\s<>.^*()%!-]"
    );
    if (restrictionsDisplayName.test(displayName)) {
      setIsDisplayNameValid(false);
      return;
    }
    if (
      displayName === 'index' ||
      displayName === 'signup' ||
      displayName === 'resources' ||
      displayName === 'post' ||
      displayName === 'for' ||
      displayName === 'auth' ||
      displayName === 'about' ||
      displayName === 'login' ||
      displayName === 'teams' ||
      displayName === 'chat' ||
      displayName === 'explore' ||
      displayName === 'hangout' ||
      displayName === 'new' ||
      displayName === 'account' ||
      displayName === 'code-of-conduct' ||
      displayName === 'privacy-policy' ||
      displayName === 'cookie-policy'
    ) {
      setIsDisplayNameValid(false);
      return;
    }

    if (displayName.length > defaultMinLengthDisplayname) {
      await axios
        .post(`${process.env.BASEURL}/api/profile/displayName/change`, {
          displayName: displayName,
        })
        .then((response) => {
          setIsDisplayNameValid(response.data.displayNameAvailable);
          setSuggestedNames(response.data.suggestedDisplayNames);
        });
    }
  };

  const handleSubmit = async () => {
    setSuccessAlert(false);

    if (!isDisplayNameValid) {
      return;
    }

    if (user.displayName != displayName) {
      sendSlackMessage(user.displayName, displayName);
    }

    const profileData = {
      name: userName,
      currentTitle: userRole,
      displayName: displayName,
      personalWebsite: website,
      country: countryName,
    };

    await axios.patch(`${process.env.BASEURL}/api/profile/update`, profileData);

    const profileBioData = {
      aboutUser: about,
    };

    await axios.post(
      `${process.env.BASEURL}/api/profile/bio/update`,
      profileBioData
    );

    ga.event({
      action: 'user_profile_edited',
    });
    setSuccessAlert(true);
  };

  const sendSlackMessage = async (oldDisplayName, newDisplayName) => {
    const message = `EDIT PROFILE: ${userName} has updated their displayName from ${oldDisplayName} to ${newDisplayName}`;

    await fetch(`${process.env.BASEURL}/api/notifications/slack/postMessage`, {
      method: 'POST',
      body: JSON.stringify({
        message: message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <>
      <div className="mt-2 w-full">
        {successAlert && (
          <div className="relative w-full rounded-md bg-green-500/20 py-1.5 px-2 text-center text-sm text-green-500">
            Changes saved!
          </div>
        )}
        <div className="py-4">
          <div className="space-y-6">
            <div>
              <label className="label text-sm">Name</label>
              <input
                type="text"
                name="username"
                placeholder="What's your name"
                className="text-input"
                value={userName || ''}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="country" className="label text-sm">
                Intro yourself in 50 words (ish).
              </label>
              <textarea
                name="bio"
                rows="3"
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

              <span className="text-xs text-gray-400">
                Remaining characters: {remainingCharsAbout}
              </span>
            </div>

            <div>
              <label
                className={`${
                  isDisplayNameValid ? 'text-base-400' : 'text-red-600'
                } label text-sm`}
              >
                Your display name
              </label>
              <input
                type="text"
                placeholder="@name"
                name="display"
                className="text-input"
                value={displayName}
                onChange={(e) => {
                  const displayName = e.target.value;
                  setDisplayName(displayName);
                  handleDisplayNameChange(displayName);
                }}
              />
              {!isDisplayNameValid && suggestedNames?.length === 0 && (
                <p className="mt-2 text-xs text-red-600" id="email-error">
                  This display name is protected or contains invalid characters{' '}
                  {`!@£$%^&*()_|?~<`}. Please choose another slug.
                </p>
              )}
              {!isDisplayNameValid && suggestedNames?.length > 0 && (
                <>
                  <p className="mt-2 text-xs text-red-600">
                    This display name has already been taken.
                  </p>
                  <p className="text-xs">
                    Suggested: {suggestedNames.join(', ')}
                  </p>
                </>
              )}
            </div>

            <div>
              <label className="label text-sm">What do you do?</label>
              <input
                type="text"
                placeholder="e.g. Software Engineer"
                name="role"
                className="text-input"
                value={userRole || ''}
                onChange={(e) => setUserRole(e.target.value)}
              />
            </div>

            <div>
              <label className="label text-sm">Where do you live?</label>
              <CountrySelect
                countryName={countryName}
                setCountryName={setCountryName}
              />
            </div>

            <div>
              <label className="label text-sm">Personal Website?</label>
              <input
                type="text"
                name="website"
                className="text-input"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

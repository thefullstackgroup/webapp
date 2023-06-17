import { useState } from 'react';
import axios from 'axios';
import Toast from 'components/common/elements/Toast';
import { CgSpinner } from 'react-icons/cg';
import Menu from './Menu';
import Icon from 'components/common/elements/Icon';
import ToolTip from 'components/common/elements/ToolTip';
import {
  currencies,
  salaryRanges,
} from 'components/modules/account/teams/constants';

const roles = [
  'Junior Full Stack Developer',
  'Junior Frontend Stack Developer',
  'Junior Backend Stack Developer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Senior Full Stack Developer',
  'Senior Frontend Developer',
  'Senior Backend Developer',
  'Principal Architect',
  'Team Lead',
  'Engineering Manager',
];

const workTypes = [
  { label: 'Full Time', value: 'FULL_TIME' },
  { label: 'Part Time', value: 'PART_TIME' },
  { label: 'Contract', value: 'CONTRACT' },
  { label: 'Remote', value: 'REMOTE' },
  { label: 'Hybrid', value: 'HYBRID' },
  { label: 'In Office', value: 'ONSITE' },
  { label: 'No preference', value: 'ANY' },
];

const PreferredWorkType = ({ selected, addChoice, removeChoice }) => {
  return (
    <div className="flex flex-wrap items-center">
      {workTypes.map((type, index) =>
        selected.includes(type.value) ? (
          <button
            className="badge relative whitespace-nowrap bg-cyan-dark text-white dark:bg-cyan-dark"
            onClick={() => removeChoice(type.value)}
            key={index}
          >
            {type.label}
          </button>
        ) : (
          <button
            className="badge whitespace-nowrap"
            onClick={() => addChoice(type.value)}
            key={index}
          >
            {type.label}
          </button>
        )
      )}
    </div>
  );
};

const OpenToJobOpportunityChoice = ({ selected, setChoice }) => {
  return (
    <div className="flex items-center">
      <button
        className={
          'badge relative whitespace-nowrap px-4 ' +
          (selected == true && 'bg-cyan-dark text-white dark:bg-cyan-dark')
        }
        onClick={() => setChoice(true)}
      >
        Yes
      </button>
      <button
        className={
          'badge relative whitespace-nowrap px-4 ' +
          (selected == false && 'bg-cyan-dark text-white dark:bg-cyan-dark')
        }
        onClick={() => setChoice(false)}
      >
        No
      </button>
    </div>
  );
};

const RelocationChoice = ({ selected, setChoice }) => {
  return (
    <div className="flex items-center">
      <button
        className={
          'badge relative whitespace-nowrap px-4 ' +
          (selected == true && 'bg-cyan-dark text-white dark:bg-cyan-dark')
        }
        onClick={() => setChoice(true)}
      >
        Yes
      </button>
      <button
        className={
          'badge relative whitespace-nowrap px-4 ' +
          (selected == false && 'bg-cyan-dark text-white dark:bg-cyan-dark')
        }
        onClick={() => setChoice(false)}
      >
        No
      </button>
    </div>
  );
};

const JobPreferences = ({ user }) => {
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [openToJobOpportunities, setOpenToJobOpportunities] = useState(
    user.openToJobOpportunities
  );

  const [openToRelocation, setOpenToRelocation] = useState(
    user.jobPreferences?.openToRelocation
  );
  const [openToRelocationDescription, setOpenToRelocationDescription] =
    useState(user.jobPreferences?.openToRelocationDescription || '');

  const [preferredWorkTypes, setPreferredWorkTypes] = useState(
    user.jobPreferences?.preferredWorkTypes || []
  );

  const [dreamJob, setDreamJob] = useState(user.jobPreferences?.dreamJob || '');

  const [interestedRoles, setInteretedRoles] = useState(
    user.jobPreferences?.interestedRoles || []
  );

  const [remoteWorkExperience, setRemoteWorkExperience] = useState(
    user.jobPreferences?.remoteWorkExperience || 0
  );

  const [localCurrency, setLocalCurrency] = useState(
    user.jobPreferences?.localCurrency || 'EUR'
  );

  const [baseSalary, setBaseSalary] = useState(
    user.jobPreferences?.baseSalary || 0
  );
  const [maxSalary, setMaxSalary] = useState(
    user.jobPreferences?.maxSalary || 0
  );

  const [notableAccomplishment, setNotableAccomplishment] = useState(
    user.jobPreferences?.notableAccomplishment || ''
  );

  const addWorkType = (term) => {
    const newQueryTech = [...preferredWorkTypes, term];
    setPreferredWorkTypes(newQueryTech);
  };

  const removeWorkType = (term) => {
    const typeExist = preferredWorkTypes.filter(function (item) {
      return term !== item;
    });

    setPreferredWorkTypes(typeExist);
  };

  const addInterestedRole = (term) => {
    const newQueryTech = [...interestedRoles, term];
    setInteretedRoles(newQueryTech);
  };

  const removeInterestedRole = (term) => {
    const typeExist = interestedRoles.filter(function (item) {
      return term !== item;
    });

    setInteretedRoles(typeExist);
  };

  const sendSlackMessage = async () => {
    await axios.post(
      `${process.env.BASEURL}/api/notifications/slack/postMessage`,
      {
        message: `WORK PREFS: ${user.displayName} has updated their work preferences.`,
      }
    );
  };

  const handleSubmit = async () => {
    setSaving(true);

    if (baseSalary > maxSalary) {
      setFormError(true);
      setSaving(false);
      return;
    }

    const data = {
      openToJobOpportunities: openToJobOpportunities,
      jobPreferences: {
        openToRelocation: openToRelocation,
        openToRelocationDescription: openToRelocationDescription,
        dreamJob: dreamJob,
        preferredWorkTypes: preferredWorkTypes,
        interestedRoles: interestedRoles,
        remoteWorkExperience: 0,
        baseSalary: parseInt(baseSalary),
        maxSalary: parseInt(maxSalary),
        localCurrency: localCurrency,
        notableAccomplishment: notableAccomplishment,
      },
    };

    await axios
      .post(`${process.env.BASEURL}/api/profile/update`, data)
      .then((response) => {
        setToastMessage('Preferences saved');
        setShowToast(true);
        setSaving(false);
        sendSlackMessage();
      })
      .catch((error) => {
        setSaving(false);
      });
  };

  return (
    <>
      <div className="mx-auto mt-0 w-full max-w-5xl justify-center lg:mt-6">
        <div className="hidden w-full pt-4 pb-10 text-4xl font-medium tracking-tight sm:block">
          Account settings
        </div>
        <div className="flex items-start space-x-4">
          <div className="sticky top-20 w-3/12">
            <Menu selected="Work preferences" />
          </div>
          <div className="mb-4 w-full rounded-lg border border-base-200 bg-base-50 px-4 dark:border-base-700 dark:bg-base-900 sm:px-6">
            <div className="mb-36 py-4 sm:mb-0">
              <h4 className="mb-2 text-2xl font-medium">Work preferences</h4>
              <p className="mb-6">
                The Full Stack can help you find and connect to tech teams with
                open positions matched to your preferences. Set the criteria
                below for matches based upon your profile. Your details are
                private by default and not displayed on your profile. No
                recruiter spam.
              </p>
              <div className="space-y-4">
                <div className="space-y-6">
                  <div>
                    <label className="label text-sm">
                      Are you open to opportunties?
                    </label>

                    <OpenToJobOpportunityChoice
                      selected={openToJobOpportunities}
                      setChoice={setOpenToJobOpportunities}
                    />
                  </div>
                  <div>
                    <label className="label text-sm">
                      Are you open to relocation?
                    </label>

                    <RelocationChoice
                      selected={openToRelocation}
                      setChoice={setOpenToRelocation}
                    />

                    {openToRelocation && (
                      <input
                        type="text"
                        name="relocation"
                        placeholder="Any conditions or preferences to relocation?"
                        className="text-input mt-2"
                        value={openToRelocationDescription}
                        onChange={(e) => {
                          setOpenToRelocationDescription(e.target.value);
                        }}
                      />
                    )}
                  </div>

                  <div>
                    <label className="label text-sm">
                      Select your preferred work types
                    </label>
                    <div className="flex flex-wrap">
                      <PreferredWorkType
                        selected={preferredWorkTypes}
                        addChoice={addWorkType}
                        removeChoice={removeWorkType}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label text-sm">
                      What are your salary expectations?
                    </label>
                    <div className="flex items-start space-x-2">
                      <select
                        className="text-input w-48"
                        onChange={(e) => {
                          setLocalCurrency(e.target.value);
                        }}
                      >
                        {currencies.map((curr, index) =>
                          curr === localCurrency ? (
                            <option value={curr} key={index} selected>
                              {curr}
                            </option>
                          ) : (
                            <option value={curr} key={index}>
                              {curr}
                            </option>
                          )
                        )}
                      </select>
                      <div className="w-full">
                        <select
                          className="text-input"
                          onChange={(e) => {
                            setBaseSalary(e.target.value);
                          }}
                        >
                          <option value="">Minimum</option>
                          {salaryRanges.map((range, index) =>
                            range.value == baseSalary ? (
                              <option value={range.value} key={index} selected>
                                {range.label}
                              </option>
                            ) : (
                              <option value={range.value} key={index}>
                                {range.label}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="w-full">
                        <select
                          className="text-input"
                          onChange={(e) => {
                            setMaxSalary(e.target.value);
                          }}
                        >
                          <option value="">Maximum</option>
                          {salaryRanges.map((range, index) =>
                            range.value == maxSalary ? (
                              <option value={range.value} key={index} selected>
                                {range.label}
                              </option>
                            ) : (
                              <option value={range.value} key={index}>
                                {range.label}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    {formError && baseSalary > maxSalary && (
                      <span className="text-xs text-red-500">
                        Min salary cannot be greater than max salary.
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="label text-sm">
                      What kind of roles are you interested in?
                    </label>
                    <select
                      className="text-input"
                      onChange={(e) => addInterestedRole(e.target.value)}
                    >
                      <option>Choose roles ...</option>
                      {roles.map(
                        (role, index) =>
                          !interestedRoles.includes(role) && (
                            <option value={role} key={index}>
                              {role}
                            </option>
                          )
                      )}
                    </select>
                    {interestedRoles && (
                      <div className="mt-2 flex flex-wrap items-center">
                        {interestedRoles.map((interestedRole, index) => (
                          <div
                            className="group relative mr-2 mb-1 w-min cursor-pointer whitespace-nowrap rounded-md bg-base-600 px-2 py-1 text-sm"
                            key={index}
                            onClick={() => removeInterestedRole(interestedRole)}
                          >
                            <ToolTip message={'Click to remove'} />

                            {interestedRole}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="label text-sm">
                      What should your dream job look like?
                    </label>
                    <input
                      type="text"
                      name="dream"
                      placeholder="This could be anything ..."
                      className="text-input"
                      value={dreamJob}
                      onChange={(e) => {
                        setDreamJob(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label className="label text-sm">
                      Most impressive accomplishment?
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="This could be anything ..."
                      className="text-input"
                      value={notableAccomplishment}
                      onChange={(e) => {
                        setNotableAccomplishment(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-8">
                {saving ? (
                  <button
                    className="btn-primary btn-with-icon w-full justify-center"
                    disabled
                  >
                    <CgSpinner className="h-4 w-4 animate-spin" />
                    <span>Saving</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSubmit()}
                  >
                    <span className="hidden sm:block">Save preferences</span>
                    <span className="block sm:hidden">Save</span>
                  </button>
                )}
              </div>

              <div className="mt-8 flex items-center space-x-2 text-sm text-base-500 dark:text-base-400">
                <Icon name={'FiInfo'} className="h-5 w-5" />
                <span>
                  Your details are private by default and will not displayed on
                  your profile.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-0 flex w-full justify-center lg:mt-12">
        <div className="min-h-screen w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
          <div className="relative mx-auto max-w-4xl">
            <div className="mx-4 mb-10 space-y-6 md:mx-0">
              <Link href={`/account/settings`}>
                <div className="mb-4 flex cursor-pointer items-center space-x-2 sm:px-4 md:px-0">
                  <IoArrowBack className="h-5 w-5" />
                  <h2 className="text-sm font-bold">
                    Back to account settings
                  </h2>
                </div>
              </Link>
              <div className="relative w-min whitespace-nowrap">
                <h2 className="text-3xl font-bold tracking-tight sm:text-3xl">
                  Work preferences
                </h2>
              </div>
              <div className="text-base-200">
                The Full Stack can help you find and connect to tech teams with
                open positions matched to your preferences. Set the criteria
                below for matches based upon your profile. Your details are
                private by default and not displayed on your profile.{' '}
                <span className="font-bold">No recruiter spam</span>.
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
    </>
  );
};

export default JobPreferences;

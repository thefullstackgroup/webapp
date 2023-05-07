import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Toast from 'components/common/elements/Toast';
import {
  currencies,
  salaryRanges,
} from 'components/modules/account/teams/constants';
import { BsCheck } from 'react-icons/bs';
import { IoInformationCircle, IoArrowBack } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';

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
            className="relative badge text-sm px-2 py-1.5 whitespace-nowrap bg-tfsdark-500 text-white"
            onClick={() => removeChoice(type.value)}
            key={index}
          >
            <span>{type.label}</span>
            <span className="absolute bg-green-600 w-3 h-3 -top-1 -left-1 rounded-full ring-2 ring-white">
              <BsCheck className="text-white w-3 h-3" />
            </span>
          </button>
        ) : (
          <button
            className="badge bg-tfsdark-600/50 text-sm px-2 py-1.5 whitespace-nowrap text-tfsdark-200"
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
          'relative badge text-sm px-6 py-1.5 whitespace-nowrap ' +
          (selected == true
            ? 'bg-tfsdark-500 text-white'
            : 'bg-tfsdark-600/50 text-tfsdark-200')
        }
        onClick={() => setChoice(true)}
      >
        <span>Yes</span>
        {selected == true && (
          <span className="absolute bg-green-600 w-3 h-3 -top-1 -left-1 rounded-full ring-2 ring-white">
            <BsCheck className="text-white w-3 h-3" />
          </span>
        )}
      </button>
      <button
        className={
          'relative badge text-sm px-6 py-1.5 whitespace-nowrap ' +
          (selected == false
            ? 'bg-tfsdark-500 text-white'
            : 'bg-tfsdark-600/50 text-tfsdark-200')
        }
        onClick={() => setChoice(false)}
      >
        <span>No</span>
        {selected == false && (
          <span className="absolute bg-green-600 w-3 h-3 -top-1 -left-1 rounded-full ring-2 ring-white">
            <BsCheck className="text-white w-3 h-3" />
          </span>
        )}
      </button>
    </div>
  );
};

const RelocationChoice = ({ selected, setChoice }) => {
  return (
    <div className="flex items-center">
      <button
        className={
          'relative badge text-sm px-6 py-1.5 whitespace-nowrap ' +
          (selected == true
            ? 'bg-tfsdark-500 text-white'
            : 'bg-tfsdark-600/50 text-tfsdark-200')
        }
        onClick={() => setChoice(true)}
      >
        <span>Yes</span>
        {selected == true && (
          <span className="absolute bg-green-600 w-3 h-3 -top-1 -left-1 rounded-full ring-2 ring-white">
            <BsCheck className="text-white w-3 h-3" />
          </span>
        )}
      </button>
      <button
        className={
          'relative badge text-sm px-6 py-1.5 whitespace-nowrap ' +
          (selected == false
            ? 'bg-tfsdark-500 text-white'
            : 'bg-tfsdark-600/50 text-tfsdark-200')
        }
        onClick={() => setChoice(false)}
      >
        <span>No</span>
        {selected == false && (
          <span className="absolute bg-green-600 w-3 h-3 -top-1 -left-1 rounded-full ring-2 ring-white">
            <BsCheck className="text-white w-3 h-3" />
          </span>
        )}
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
      <div className="mt-0 lg:mt-12 w-full flex justify-center">
        <div className="min-h-screen w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-4xl mx-auto">
            <div className="mx-4 md:mx-0 space-y-6 mb-10">
              <Link href={`/account/settings`}>
                <div className="flex items-center space-x-2 sm:px-4 md:px-0 mb-4 cursor-pointer">
                  <IoArrowBack className="h-5 w-5" />
                  <h2 className="font-bold text-sm">
                    Back to account settings
                  </h2>
                </div>
              </Link>
              <div className="relative w-min whitespace-nowrap">
                <h2 className="text-3xl sm:text-3xl font-bold tracking-tight">
                  Work preferences
                </h2>
              </div>
              <div className="text-slate-200">
                The Full Stack can help you find and connect to tech teams with
                open positions matched to your preferences. Set the criteria
                below for matches based upon your profile. Your details are
                private by default and not displayed on your profile.{' '}
                <span className="font-bold">No recruiter spam</span>.
              </div>
              <div className="w-full rounded-lg bg-tfsdark-700 mb-4 px-4">
                <div className="py-4 sm:px-2 mb-36 sm:mb-0">
                  <div className="space-y-4">
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm text-slate-400 font-medium">
                          Are you open to opportunties?
                        </label>
                        <div className="mt-2">
                          <OpenToJobOpportunityChoice
                            selected={openToJobOpportunities}
                            setChoice={setOpenToJobOpportunities}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 font-medium">
                          Are you open to relocation?
                        </label>
                        <div className="mt-2">
                          <RelocationChoice
                            selected={openToRelocation}
                            setChoice={setOpenToRelocation}
                          />
                        </div>

                        {openToRelocation && (
                          <input
                            type="text"
                            name="relocation"
                            placeholder="Any conditions or preferences to relocation?"
                            className="text-input"
                            value={openToRelocationDescription}
                            onChange={(e) => {
                              setOpenToRelocationDescription(e.target.value);
                            }}
                          />
                        )}
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 font-medium">
                          Select your preferred work types
                        </label>
                        <div className="mt-2 flex flex-wrap">
                          <PreferredWorkType
                            selected={preferredWorkTypes}
                            addChoice={addWorkType}
                            removeChoice={removeWorkType}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 font-medium">
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
                                  <option
                                    value={range.value}
                                    key={index}
                                    selected
                                  >
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
                                  <option
                                    value={range.value}
                                    key={index}
                                    selected
                                  >
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
                          <span className="text-red-500 text-xs">
                            Min salary cannot be greater than max salary.
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 font-medium">
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
                                className="relative group px-2 py-1 bg-tfsdark-600 w-min whitespace-nowrap rounded-md text-sm mr-2 mb-1 cursor-pointer"
                                key={index}
                                onClick={() =>
                                  removeInterestedRole(interestedRole)
                                }
                              >
                                <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-tfsdark-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-tfsdark-600 before:content-[''] group-hover:opacity-100">
                                  Click to remove
                                </span>
                                {interestedRole}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 font-medium">
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
                        <label className="text-sm text-slate-400 font-medium">
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
                        className="btn-primary w-full"
                        onClick={() => handleSubmit()}
                      >
                        <span className="hidden sm:block">
                          Save preferences
                        </span>
                        <span className="block sm:hidden">Save</span>
                      </button>
                    )}
                  </div>

                  <div className="text-sm mt-8 text-slate-300 flex items-center space-x-2">
                    <IoInformationCircle className="h-5 w-5" />
                    <span>
                      Your details are private by default and will not displayed
                      on your profile.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
    </>
  );
};

export default JobPreferences;

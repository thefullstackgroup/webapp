import { useState } from 'react';
import axios from 'axios';
import Toast from 'components/common/elements/Toast';
import { CgSpinner } from 'react-icons/cg';
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
    <div className="flex flex-wrap items-center space-x-2">
      {workTypes.map((type, index) =>
        selected.includes(type.value) ? (
          <button
            className="badge badge-highlight relative cursor-pointer px-2.5 py-1.5"
            onClick={() => removeChoice(type.value)}
            key={index}
          >
            <span>{type.label}</span>
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 p-1 text-white ring-2 ring-white">
              <Icon name="FaCheck" pack="Fa" className="h-2 w-2" />
            </span>
          </button>
        ) : (
          <button
            className="badge cursor-pointer px-2.5 py-1.5"
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
    <div className="flex items-center space-x-2">
      <button
        className={
          'badge relative cursor-pointer px-2.5 py-1.5 ' +
          (selected == true && 'badge-highlight')
        }
        onClick={() => setChoice(true)}
      >
        <span>Yes, I am open to opportunties</span>
        {selected == true && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 p-1 text-white ring-2 ring-white">
            <Icon name="FaCheck" pack="Fa" className="h-2 w-2" />
          </span>
        )}
      </button>
      <button
        className={
          'badge relative cursor-pointer px-2.5 py-1.5 ' +
          (selected == false && 'badge-highlight')
        }
        onClick={() => setChoice(false)}
      >
        <span>No, I am not looking right now</span>
        {selected == false && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 p-1 text-white ring-2 ring-white">
            <Icon name="FaCheck" pack="Fa" className="h-2 w-2" />
          </span>
        )}
      </button>
    </div>
  );
};

const RelocationChoice = ({ selected, setChoice }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        className={
          'badge relative cursor-pointer px-2.5 py-1.5 ' +
          (selected == true && 'badge-highlight')
        }
        onClick={() => setChoice(true)}
      >
        <span>Yes, I am open to relocating</span>
        {selected == true && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 p-1 text-white ring-2 ring-white">
            <Icon name="FaCheck" pack="Fa" className="h-2 w-2" />
          </span>
        )}
      </button>
      <button
        className={
          'badge relative cursor-pointer px-2.5 py-1.5 ' +
          (selected == false && 'badge-highlight')
        }
        onClick={() => setChoice(false)}
      >
        <span>No, I like where live</span>
        {selected == false && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 p-1 text-white ring-2 ring-white">
            <Icon name="FaCheck" pack="Fa" className="h-2 w-2" />
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
      <div className="page page-6xl space-y-6">
        <h2>Work preferences</h2>
        <p>
          The Full Stack can help you find and connect to tech teams with open
          positions matched to your preferences. Set the criteria below for
          matches based upon your profile. Your details are private by default
          and not displayed on your profile. No recruiter spam.
        </p>
        <div className="box px-6 py-4">
          <div className="space-y-6">
            <div>
              <label className="label">Are you open to opportunties?</label>

              <OpenToJobOpportunityChoice
                selected={openToJobOpportunities}
                setChoice={setOpenToJobOpportunities}
              />
            </div>
            <div>
              <label className="label">Are you open to relocation?</label>

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
              <label className="label">Select your preferred work types</label>
              <div className="flex flex-wrap">
                <PreferredWorkType
                  selected={preferredWorkTypes}
                  addChoice={addWorkType}
                  removeChoice={removeWorkType}
                />
              </div>
            </div>

            <div>
              <label className="label">
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
              <label className="label">
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
                      className="badge cursor-pointer"
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
              <label className="label">
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
              <label className="label">Most impressive accomplishment?</label>
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
              Your details are private by default and will not be displayed on
              your profile.
            </span>
          </div>
        </div>
      </div>

      <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
    </>
  );
};

export default JobPreferences;

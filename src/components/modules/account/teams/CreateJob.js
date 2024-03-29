import { useState } from 'react';
import axios from 'axios';
import { FaMarkdown } from 'react-icons/fa';
import CountrySelect from 'components/common/elements/CountrySelect';
import { IoCloseOutline, IoInformationCircleSharp } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';
import {
  EmploymentType,
  LocationType,
  currencies,
  salaryRanges,
} from 'components/modules/account/teams/constants';
import TechBadge from 'components/common/tags/TagStack';
import TeamTech from 'components/modules/account/teams/TeamTech';

const CreateJob = ({ teamId, setShow }) => {
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(false);
  const [selectedTab, setSelectedTab] = useState('write');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [locationType, setLocationType] = useState('');
  const [locations, setLocations] = useState([]);
  const [showTechStackOptions, setShowTechStackOptions] = useState(false);
  const [techStack, setTechStack] = useState([]);
  const [applyURL, setApplyURL] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(0);

  const addLocation = (term) => {
    const newQueryTech = [...locations, term];
    setLocations(newQueryTech);
  };

  const removeLocation = (term) => {
    const locationExist = locations.filter(function (item) {
      return term !== item;
    });
    setLocations(locationExist);
  };

  const removeTechStack = (skill) => {
    const filteredSavedTechStack = techStack.filter(function (item) {
      return skill !== item;
    });

    setTechStack(filteredSavedTechStack);
  };

  // const sendSlackMessage = async (external = false) => {
  //   let message = `TEAMS: ${user.name} has invited a member to their team '${teamName}'. Fuck yeah!`;
  //   if (external) {
  //     message = `TEAMS: ${user.name} has sent invite(s) to their team '${teamName}'. Fuck yeah even more!`;
  //   }
  //   await fetch(`${process.env.BASEURL}/api/notifications/slack/postMessage`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       message: message,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // };

  const handleSubmit = async () => {
    setSaving(true);

    if (
      !title.trim().length > 0 ||
      !applyURL.trim().length > 0 ||
      !salaryMin > 0 ||
      !salaryMax > 0 ||
      !type.trim().length > 0 ||
      !techStack.length > 0 ||
      !description.trim().length > 0
    ) {
      setFormError(true);
      setSaving(false);
      return;
    }

    if (salaryMin > salaryMax) {
      setFormError(true);
      setSaving(false);
      return;
    }

    const data = {
      teamId: teamId,
      title: title,
      description: description,
      locationType: locationType,
      location: locations,
      techStack: techStack,
      applyURL: applyURL,
      employmentType: type,
      salaryRange: {
        min: parseInt(salaryMin),
        max: parseInt(salaryMax),
        currency: currency,
      },
      startDate: '2023-01-20T16:21:06.358Z',
      endDate: '2023-01-20T16:21:06.358Z',
      paymentStatus: 'PAID',
    };

    await axios
      .post(`${process.env.BASEURL}/api/jobs/create`, {
        data,
      })
      .then((response) => {
        setShow(false);
        setSaving(false);
        // sendSlackMessage();
      })
      .catch((error) => {
        setSaving(false);
      });
  };

  return (
    <>
      <div className="no-scrollbar h-[85vh] overflow-scroll py-4">
        <div className="space-y-6">
          <div>
            <label className="label text-sm">Job title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Full stack developer, frontend developer, etc."
              className="text-input"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {formError && !title?.trim().length > 0 && (
              <span className="text-xs text-red-500">
                Please give a job title.
              </span>
            )}
          </div>
          <div>
            <label className="label text-sm">Link to apply</label>
            <input
              type="text"
              name="applyurl"
              placeholder="URL to apply for role"
              className="text-input"
              value={applyURL}
              onChange={(e) => {
                setApplyURL(e.target.value);
              }}
            />
            {formError && !applyURL?.trim().length > 0 && (
              <span className="text-xs text-red-500">
                Please give a URL to apply for position.
              </span>
            )}
          </div>
          <div>
            <label className="label text-sm">Salary range</label>
            <div className="flex items-start space-x-2">
              <select
                className="text-input w-48"
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
              >
                {currencies.map((curr, index) => (
                  <option value={curr} key={index}>
                    {curr}
                  </option>
                ))}
              </select>
              <div className="w-full">
                <select
                  className="text-input"
                  onChange={(e) => {
                    setSalaryMin(e.target.value);
                  }}
                >
                  <option value="">Minimum pay</option>
                  {salaryRanges.map((range, index) => (
                    <option value={range.value} key={index}>
                      {range.label}
                    </option>
                  ))}
                </select>
                {formError && !salaryMin > 0 && (
                  <span className="text-xs text-red-500">
                    Please select min salary.
                  </span>
                )}
              </div>
              <div className="w-full">
                <select
                  className="text-input"
                  onChange={(e) => {
                    setSalaryMax(e.target.value);
                  }}
                >
                  <option value="">Maximum pay</option>
                  {salaryRanges.map((range, index) => (
                    <option value={range.value} key={index}>
                      {range.label}
                    </option>
                  ))}
                </select>
                {formError && !salaryMax > 0 && (
                  <span className="text-xs text-red-500">
                    Please select max salary.
                  </span>
                )}
              </div>
            </div>
            {formError && salaryMin > salaryMax && (
              <span className="text-xs text-red-500">
                Min salary cannot be greater than max salary.
              </span>
            )}
          </div>
          <div>
            <label className="label text-sm">Employment type</label>
            <EmploymentType selected={type} setType={setType} />
            {formError && !type?.trim().length > 0 && (
              <span className="text-xs text-red-500">
                Please select employment type.
              </span>
            )}
          </div>
          <div>
            <label className="label text-sm">Location(s)</label>

            <LocationType selected={locationType} setType={setLocationType} />

            {formError && !locationType && (
              <span className="text-xs text-red-500">
                Please select at least one.
              </span>
            )}

            {locationType && (
              <>
                <div className="w-1/2">
                  <CountrySelect setCountryName={addLocation} />
                </div>

                <div className="mt-2 flex flex-wrap items-center">
                  {locations?.map((location, index) => (
                    <button
                      key={index}
                      className="badge badge-with-icon"
                      onClick={() => removeLocation(location)}
                    >
                      <span>{location}</span>
                      <IoCloseOutline />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <label className="label text-sm">Tech Stack:</label>
            <div className="no-scrollbar flex flex-wrap items-center">
              {techStack?.map((stack, index) => (
                <button key={index} onClick={() => removeTechStack(stack)}>
                  <TechBadge tech={stack} size={'sm'} />
                </button>
              ))}
            </div>
            <div className="relative">
              <button
                className="btn btn-secondary space-x-1 rounded-md py-1.5 text-sm"
                onClick={() => setShowTechStackOptions(true)}
              >
                <span>Add tech stack</span>
              </button>
              {showTechStackOptions && (
                <div className="absolute top-10 left-0 z-20 w-80">
                  <div
                    className="fixed inset-0"
                    onClick={() =>
                      setShowTechStackOptions(!showTechStackOptions)
                    }
                  ></div>

                  <TeamTech
                    postTechStack={techStack}
                    setPostTechStack={setTechStack}
                  />
                </div>
              )}
            </div>
            {formError && !techStack?.length > 0 && (
              <span className="text-xs text-red-500">
                Please select tech stack.
              </span>
            )}
          </div>

          <div>
            <label className="label text-sm">Job description</label>

            <textarea
              className="text-input"
              rows={5}
              onChange={setDescription}
              placeholder="Describe the role ..."
            >
              {description}
            </textarea>

            {formError && !description?.length > 0 && (
              <span className="text-xs text-red-500">
                Please give job description.
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between py-4">
          <div className="flex items-center space-x-2 text-xs text-base-300">
            <IoInformationCircleSharp className="h-4 w-4" />
            <span>
              Information from your team profile will be added to your role
              listing.
            </span>
          </div>
          {saving ? (
            <button className="btn btn-primary btn-with-icon" disabled>
              <CgSpinner className="h-4 w-4 animate-spin" />
              <span>Saving</span>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleSubmit()}>
              <span className="hidden sm:block">Submit</span>
              <span className="block sm:hidden">Submit</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateJob;

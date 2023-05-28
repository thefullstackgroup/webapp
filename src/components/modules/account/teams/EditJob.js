import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { FaMarkdown } from 'react-icons/fa';
const ReactMde = dynamic(() => import('react-mde'), { ssr: false });
import Markdown from 'markdown-to-jsx';
import CountrySelect from 'components/common/elements/CountrySelect';
import { IoCloseOutline } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';
import {
  EmploymentType,
  LocationType,
  currencies,
  salaryRanges,
} from 'components/modules/account/teams/constants';
import TechBadge from 'components/common/tags/TagStack';
import TeamTech from 'components/modules/account/teams/TeamTech';
import ModalAlert from 'components/common/modals/ModalAlert';

const customCommand = {
  name: 'markdown-link',
  icon: () => <FaMarkdown className="h-6 w-6" />,
  execute: () => {
    window.open(
      'https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'
    );
  },
};

const EditJob = ({ user, job, teamId, setShow }) => {
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(false);
  const [selectedTab, setSelectedTab] = useState('write');
  const [title, setTitle] = useState(job.title || '');
  const [description, setDescription] = useState(job.description || '');
  const [type, setType] = useState(job.employmentType || '');
  const [locationType, setLocationType] = useState(job.locationType || '');
  const [locations, setLocations] = useState(job.location || []);
  const [showTechStackOptions, setShowTechStackOptions] = useState(false);
  const [techStack, setTechStack] = useState(job.techStack || []);
  const [applyURL, setApplyURL] = useState(job.applyURL || '');
  const [currency, setCurrency] = useState(job.salaryRange.currency || 'EUR');
  const [salaryMin, setSalaryMin] = useState(job.salaryRange.min || 0);
  const [salaryMax, setSalaryMax] = useState(job.salaryRange.max || 0);

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
      .post(`${process.env.BASEURL}/api/jobs/update?jobId=${job.id}`, {
        data,
      })
      .then((response) => {
        setShow(false);
        setSaving(false);
      })
      .catch((error) => {
        setSaving(false);
      });
  };

  const deleteJob = async () => {
    await axios.post(`${process.env.BASEURL}/api/jobs/delete`, {
      jobId: job.id,
    });
    setShow(false);
  };

  return (
    <>
      <div className=" mb-4 p-4 py-1">
        <div className="no-scrollbar h-[74vh] space-y-4 overflow-y-scroll overscroll-contain py-4">
          <div className="space-y-8">
            <div>
              <label className="text-sm font-medium text-slate-400">
                Job title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Full stack developer, frontend developer, etc."
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
              <label className="text-sm font-medium text-slate-400">
                Email or link to apply
              </label>
              <input
                type="text"
                name="applyurl"
                placeholder="Email or URL"
                className="text-input"
                value={applyURL}
                onChange={(e) => {
                  setApplyURL(e.target.value);
                }}
              />
              {formError && !applyURL?.trim().length > 0 && (
                <span className="text-xs text-red-500">
                  Please give a URL or email address to apply for position.
                </span>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-400">
                Salary range
              </label>
              <div className="flex items-start space-x-2">
                <select
                  className="text-input w-48"
                  onChange={(e) => {
                    setCurrency(e.target.value);
                  }}
                >
                  {currencies.map((curr, index) =>
                    curr === currency ? (
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
                      setSalaryMin(e.target.value);
                    }}
                  >
                    <option value="">Minimum pay</option>
                    {salaryRanges.map((range, index) =>
                      range.value == salaryMin ? (
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
                    {salaryRanges.map((range, index) =>
                      range.value == salaryMax ? (
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">
                Employment type
              </label>
              <EmploymentType selected={type} setType={setType} />
              {formError && !type?.trim().length > 0 && (
                <span className="text-xs text-red-500">
                  Please select employment type.
                </span>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-400">
                Location(s)
              </label>

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
              <label className="text-sm font-medium text-slate-400">
                Tech Stack:
              </label>
              <div className="no-scrollbar mt-2 flex flex-wrap items-center">
                {techStack?.map((stack, index) => (
                  <button key={index} onClick={() => removeTechStack(stack)}>
                    <TechBadge tech={stack} size={'sm'} />
                  </button>
                ))}

                <div className="relative">
                  <button
                    className="btn-primary mb-1 space-x-1 rounded-md py-1.5 text-sm"
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
              </div>
              {formError && !techStack?.length > 0 && (
                <span className="text-xs text-red-500">
                  Please select tech stack.
                </span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-400">
                Job description
              </label>
              <div className="rounded-md bg-base-600/50">
                <ReactMde
                  value={description}
                  onChange={setDescription}
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                  generateMarkdownPreview={(markdown) =>
                    Promise.resolve(
                      <div className="prose prose-dark mt-4 max-w-full">
                        <Markdown
                          options={{
                            overrides: {
                              a: {
                                props: { target: '_blank' },
                              },
                            },
                          }}
                        >
                          {markdown}
                        </Markdown>
                      </div>
                    )
                  }
                  minEditorHeight={350}
                  maxEditorHeight={10000}
                  childProps={{
                    textArea: {
                      placeholder: 'Describe the job position ...',
                    },
                  }}
                  commands={{
                    'markdown-link': customCommand,
                  }}
                  toolbarCommands={[
                    ['header', 'bold', 'italic', 'strikethrough'],
                    ['quote', 'code'],
                    ['unordered-list', 'ordered-list', 'checked-list'],
                    ['markdown-link'],
                  ]}
                />
              </div>
              {formError && !description?.length > 0 && (
                <span className="text-xs text-red-500">
                  Please give job description.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <button
            className="btn-ghost btn-with-icon px-0 font-normal text-red-500 opacity-60 hover:text-red-500 hover:opacity-100"
            onClick={() => setIsDeletePromptOpen(true)}
          >
            <span>Delete listing</span>
          </button>
          {saving ? (
            <button className="btn-primary btn-with-icon" disabled>
              <CgSpinner className="h-4 w-4 animate-spin" />
              <span>Saving</span>
            </button>
          ) : (
            <button className="btn-primary" onClick={() => handleSubmit()}>
              <span className="hidden sm:block">Update listing</span>
              <span className="block sm:hidden">Save</span>
            </button>
          )}
        </div>
      </div>

      {isDeletePromptOpen && (
        <ModalAlert show={isDeletePromptOpen} setShow={setIsDeletePromptOpen}>
          <div>
            <div className="justify-center sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0">
                <h3 className="text-xl font-bold text-slate-200">
                  Delete job listing?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-slate-300">
                    Are you sure you want to delete this job listing? This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-center space-x-2 sm:mt-4">
              <button
                type="button"
                className="btn-primary bg-red-600/80 hover:bg-red-500"
                onClick={() => deleteJob()}
              >
                Yes, delete job listing
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsDeletePromptOpen(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </ModalAlert>
      )}
    </>
  );
};

export default EditJob;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import validator from 'validator';
import axios from 'axios';
import Image from 'next/future/image';
import Menu from 'components/modules/account/teams/Menu';
import TechBadge from 'components/common/tags/TagStack';
import TeamTech from 'components/modules/account/teams/TeamTech';
import CountrySelect from 'components/common/elements/CountrySelect';
import { CgSpinner } from 'react-icons/cg';
import { IoCloseOutline } from 'react-icons/io5';
import ModalAlert from 'components/common/modals/ModalAlert';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const stageOptions = [
  'Bootstrapped',
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B+',
  'Funded',
  'Profitable',
  'Private',
  'Public',
];

const TeamProfile = ({ user, team = null }) => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  const [formError, setFormError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [githubUrlError, setGithubUrlError] = useState(false);
  const [name, setName] = useState(team?.name || '');
  const [logo, setLogo] = useState(team?.image || '');
  const [imageOne, setImageOne] = useState(team?.imagesGallery[0] || '');
  const [imageTwo, setImageTwo] = useState(team?.imagesGallery[1] || '');
  const [imageThree, setImageThree] = useState(team?.imagesGallery[2] || '');
  const [description, setDescription] = useState(team?.description || '');
  const [mission, setMission] = useState(team?.mission || '');
  const [techStack, setTechStack] = useState(team?.techStack || []);
  const [showTechStackOptions, setShowTechStackOptions] = useState(false);
  const [url, setUrl] = useState(team?.url || '');
  const [founded, setFounded] = useState(team?.details?.founded || 2022);
  const [location, setLocation] = useState(team?.details?.location || []);
  const [githubUrl, setGithubUrl] = useState(
    team?.details?.socialMediaLinks?.github || ''
  );
  const [nrEmployees, setNrEmployees] = useState(
    team?.details?.nrEmployees || 0
  );
  const [stage, setStage] = useState(team?.businessDetails?.stage || '');
  const [teamStructure, setTeamStructure] = useState(
    team?.details?.teamStructure || ''
  );
  const [devTools, setDevTools] = useState(team?.details?.devTools || '');
  const [devProcess, setDevProcess] = useState(team?.details?.devProcess || '');
  const [hiringProcess, setHiringProcess] = useState(
    team?.details?.hiringProcess || ''
  );
  const [isHiring, setIsHiring] = useState(team?.details?.isHiring || false);
  const [careersUrl, setCareersUrl] = useState(team?.details?.careersUrl || '');

  const isValidURL = (input) => {
    if (validator.isURL(input, { require_protocol: true })) {
      return true;
    } else {
      return false;
    }
  };

  const addLocation = (term) => {
    const newQueryTech = [...location, term];
    setLocation(newQueryTech);
  };

  const removeLocation = (term) => {
    const locationExist = location.filter(function (item) {
      return term !== item;
    });
    setLocation(locationExist);
  };

  const handleUploadLogo = async (event) => {
    event.preventDefault();

    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('id', user.userId);
      formData.append('file', event.target.files[0]);

      await axios
        .post(`${process.env.BASEURL}/api/teams/upload`, formData)
        .then((response) => {
          setLogo(response.data.url);
        });
    }
  };

  const handleUploadGalleryImage = async (event, position) => {
    event.preventDefault();

    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('id', user.userId);
      formData.append('file', event.target.files[0]);

      await axios
        .post(`${process.env.BASEURL}/api/teams/uploadGalleryImage`, formData)
        .then((response) => {
          if (position == 1) setImageOne(response.data.url);
          if (position == 2) setImageTwo(response.data.url);
          if (position == 3) setImageThree(response.data.url);
        });
    }
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
      !name.trim().length > 0 ||
      !logo.trim().length > 0 ||
      !description.trim().length > 0
    ) {
      setFormError(true);
      setSaving(false);
      return;
    }

    const data = {
      name: name,
      type: 'BUSINESS',
      mission: mission,
      description: description,
      url: url,
      image: logo,
      imagesGallery: [imageOne, imageTwo, imageThree],
      techStack: techStack,
      details: {
        founded: founded,
        category: 'Platform',
        location: location,
        nrEmployees: nrEmployees,
        stage: stage,
        socialMediaLinks: {
          instagram: '',
          facebook: '',
          github: githubUrl,
          twitter: '',
          linkedin: '',
        },
        teamStructure: teamStructure,
        devTools: devTools,
        devProcess: devProcess,
        hiringProcess: hiringProcess,
        isHiring: isHiring,
        careersUrl: '',
        idea: '',
        ideaDescription: '',
        timezone: 'string',
      },
    };

    await axios.post(`${process.env.BASEURL}/api/teams/updateTeam`, {
      teamId: team.id,
      data: data,
    });

    sendSlackMessage(
      `TEAMS: ${user.name} has updated the team called '${data.name}'.`
    );
    router.push('/account/teams');
  };

  const deleteTeam = async () => {
    await axios.post(`${process.env.BASEURL}/api/teams/deleteTeam`, {
      teamId: team.id,
    });
    router.push(`/account/settings`);
  };

  useEffect(() => {
    if (url !== '' && !isValidURL(url)) {
      setUrlError(true);
    } else setUrlError(false);

    if (githubUrl !== '' && !isValidURL(githubUrl)) {
      setGithubUrlError(true);
    } else setGithubUrlError(false);
  }, [careersUrl, url, githubUrl]);

  if (team?.ownerId !== user.userId) {
    return (
      <div className="flex h-screen flex-1 items-center justify-center">
        You are not the owner of this team.
      </div>
    );
  }

  return (
    <>
      <div className="page page-4xl">
        <Menu team={team} user={user} />
        <div>
          <div className="box">
            <div className="space-y-4">
              <div className="">
                <div className="flex items-center space-x-4">
                  {logo ? (
                    <>
                      <div className="h-20 w-24 overflow-hidden rounded-lg border border-base-600">
                        <Image
                          src={logo}
                          className="h-full w-full object-cover"
                          alt={name || ''}
                          title={name}
                          referrerPolicy="no-referrer"
                          width={100}
                          height={100}
                          layout="fill"
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="logo"
                          className="relative flex cursor-pointer flex-col justify-center text-center text-xs font-medium focus:outline-none focus:ring-0"
                        >
                          <span className="btn btn-secondary w-min whitespace-nowrap text-sm">
                            Change logo
                          </span>
                          <input
                            id="logo"
                            name="logo"
                            type="file"
                            className="sr-only"
                            onChange={(e) => handleUploadLogo(e)}
                          />
                        </label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-40 w-44 overflow-hidden rounded-xl border border-base-600">
                        <div className="h-full w-full bg-base-600"></div>
                      </div>
                      <div className="mt-4 w-full text-center">
                        <label
                          htmlFor="logo"
                          className="relative flex cursor-pointer flex-col justify-center text-center text-xs font-medium focus:outline-none focus:ring-0"
                        >
                          <span className="btn btn-secondary w-min whitespace-nowrap text-xs">
                            Upload team logo
                          </span>
                          <input
                            id="logo"
                            name="logo"
                            type="file"
                            className="sr-only"
                            onChange={(e) => handleUploadLogo(e)}
                          />
                        </label>
                      </div>
                    </>
                  )}
                </div>

                {formError && !logo?.trim().length > 0 && (
                  <span className="ml-6 text-xs text-red-500">
                    Please upload your team icon.
                  </span>
                )}
              </div>

              <div>
                <label className="label">Team name:</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Name of team"
                  className="text-input"
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                />

                {formError && !name?.trim().length > 0 && (
                  <span className="text-xs text-red-500">
                    Please give a name for your team.
                  </span>
                )}
              </div>

              <div>
                <label className="label">One liner of what you do:</label>
                <input
                  type="text"
                  name="description"
                  placeholder="One liner for your team"
                  className="text-input"
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {formError && !description?.trim().length > 0 && (
                  <span className="text-xs text-red-500">
                    Please give a one liner description for your team.
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-1/3">
                  <label className="label">Founded:</label>
                  <select
                    className="text-input w-full"
                    onChange={(e) => setFounded(e.target.value)}
                  >
                    {[...Array(100)].map((year = 2022, index) =>
                      founded == year - index ? (
                        <option key={index} value={year - index} selected>
                          {year - index}
                        </option>
                      ) : (
                        <option key={index} value={year - index}>
                          {year - index}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="w-1/3">
                  <label className="label">Stage:</label>
                  <select
                    className="text-input"
                    onChange={(e) => setStage(e.target.value)}
                  >
                    {stageOptions.map((stage, index) =>
                      stage === team?.businessDetails?.stage ? (
                        <option key={index} value={stage} selected>
                          {stage}
                        </option>
                      ) : (
                        <option key={index} value={stage}>
                          {stage}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="w-1/3">
                  <label className="label">Number of team members:</label>
                  <input
                    type="text"
                    name="nrEmployees"
                    placeholder=""
                    className="text-input"
                    value={nrEmployees || ''}
                    onChange={(e) => setNrEmployees(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="label">Location(s):</label>
                <CountrySelect setCountryName={addLocation} />
                <div className="mt-2 flex flex-wrap items-center">
                  {location?.map((location, index) => (
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
              </div>
              <div>
                <label className="label">GitHub team account:</label>
                <input
                  type="text"
                  name="githuburl"
                  placeholder="https://github.com/..."
                  className={
                    'text-input ' + (githubUrlError && 'bg-red-500/20')
                  }
                  value={githubUrl || ''}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Website:</label>
                <input
                  type="text"
                  name="url"
                  placeholder="https://..."
                  className={
                    'text-input text-base ' + (urlError && 'bg-red-500/20')
                  }
                  value={url || ''}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Mission statement:</label>
                <textarea
                  type="text"
                  name="mission"
                  rows={3}
                  placeholder="What's your team's mission'?"
                  className="text-input"
                  value={mission || ''}
                  onChange={(e) => setMission(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Tech Stack:</label>
                <div className="no-scrollbar mt-2 flex flex-wrap items-center">
                  {techStack?.map((stack, index) => (
                    <button key={index} onClick={() => removeTechStack(stack)}>
                      <TechBadge tech={stack} size={'sm'} />
                    </button>
                  ))}

                  <div className="relative">
                    <button
                      className="btn btn-secondary mb-1 space-x-1 rounded-md py-1.5 text-sm"
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
              </div>

              <div>
                <label className="label">Images:</label>
                <div className="flex gap-4">
                  <div className="relative h-36 w-40 overflow-hidden rounded-md">
                    {imageOne ? (
                      <>
                        <Image
                          src={imageOne}
                          className="h-full w-full object-cover"
                          alt={name || ''}
                          title={name}
                          referrerPolicy="no-referrer"
                          width={400}
                          height={400}
                          layout="fill"
                        />
                        <div className="absolute bottom-2 left-2 w-full">
                          <button
                            className="btn-secondary bg-red-500 text-xs"
                            onClick={() => setImageOne('')}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-full w-full bg-base-600"></div>
                        <div className="absolute top-0 flex h-full w-full items-center text-center md:w-full">
                          <label
                            htmlFor="image1"
                            className="relative flex w-full cursor-pointer justify-center text-center text-sm font-medium focus:outline-none focus:ring-0"
                          >
                            <span className="text-white">Upload image</span>
                            <input
                              id="image1"
                              name="image1"
                              type="file"
                              className="sr-only"
                              onChange={(e) => handleUploadGalleryImage(e, 1)}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative h-36 w-40 overflow-hidden rounded-md">
                    {imageTwo ? (
                      <>
                        <Image
                          src={imageTwo}
                          className="h-full w-full object-cover"
                          alt={name || ''}
                          title={name}
                          referrerPolicy="no-referrer"
                          width={200}
                          height={200}
                          layout="fill"
                        />
                        <div className="absolute bottom-2 left-2 w-full">
                          <button
                            className="btn-secondary bg-red-500 text-xs"
                            onClick={() => setImageTwo('')}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-full w-full bg-base-600"></div>
                        <div className="absolute top-0 flex h-full w-full items-center text-center md:w-full">
                          <label
                            htmlFor="image2"
                            className="relative flex w-full cursor-pointer justify-center text-center text-sm font-medium focus:outline-none focus:ring-0"
                          >
                            <span className="text-white">Upload image</span>
                            <input
                              id="image2"
                              name="image2"
                              type="file"
                              className="sr-only"
                              onChange={(e) => handleUploadGalleryImage(e, 2)}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="relative h-36 w-40 overflow-hidden rounded-md">
                    {imageThree ? (
                      <>
                        <Image
                          src={imageThree}
                          className="h-full w-full object-cover"
                          alt={name || ''}
                          title={name}
                          referrerPolicy="no-referrer"
                          width={200}
                          height={200}
                          layout="fill"
                        />
                        <div className="absolute bottom-2 left-2 w-full">
                          <button
                            className="btn-secondary bg-red-500 text-xs"
                            onClick={() => setImageThree('')}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-full w-full bg-base-600"></div>
                        <div className="absolute top-0 flex h-full w-full items-center text-center md:w-full">
                          <label
                            htmlFor="image3"
                            className="relative flex w-full cursor-pointer justify-center text-center text-sm font-medium focus:outline-none focus:ring-0"
                          >
                            <span className="text-white">Upload image</span>
                            <input
                              id="image3"
                              name="image3"
                              type="file"
                              className="sr-only"
                              onChange={(e) => handleUploadGalleryImage(e, 3)}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="label">How are the teams structured?</label>
                <textarea
                  type="text"
                  name="teamStructure"
                  rows={5}
                  placeholder="What's your team structure?"
                  className="text-input"
                  value={teamStructure || ''}
                  onChange={(e) => setTeamStructure(e.target.value)}
                />
              </div>

              <div>
                <label className="label">
                  How does your dev process work? What&apos;s the process for
                  working through bugs, features and tech debt?
                </label>
                <textarea
                  type="text"
                  name="devProcess"
                  rows={5}
                  placeholder="What's your dev process?"
                  className="text-input"
                  value={devProcess || ''}
                  onChange={(e) => setDevProcess(e.target.value)}
                />
              </div>

              <div>
                <label className="label">
                  What tools do your developers use?
                </label>
                <textarea
                  type="text"
                  name="devTools"
                  rows={5}
                  placeholder="List out the dev tools developers use ..."
                  className="text-input"
                  value={devTools || ''}
                  onChange={(e) => setDevTools(e.target.value)}
                />
              </div>

              <div>
                <label className="label">
                  What does your hiring process look like?
                </label>
                <textarea
                  type="text"
                  name="hiringProcess"
                  rows={5}
                  placeholder="What's your hiring process?"
                  className="text-input"
                  value={hiringProcess || ''}
                  onChange={(e) => setHiringProcess(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              className="btn btn-danger"
              onClick={() => setIsDeletePromptOpen(true)}
            >
              <span>Delete Team</span>
            </button>
            {saving ? (
              <button className="btn btn-primary btn-with-icon px-4" disabled>
                <CgSpinner className="h-4 w-4 animate-spin" />
                <span>Saving</span>
              </button>
            ) : (
              <button
                className="btn btn-primary  px-4"
                onClick={() => handleSubmit()}
              >
                <span className="hidden sm:block">Update profile</span>
                <span className="block sm:hidden">Update</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {isDeletePromptOpen && (
        <ModalAlert show={isDeletePromptOpen} setShow={setIsDeletePromptOpen}>
          <div>
            <div className="justify-center sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0">
                <h3 className="text-xl font-bold text-base-200">
                  Delete team?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-base-300">
                    Are you sure you want to delete this team? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-center space-x-2 sm:mt-4">
              <button
                type="button"
                className="btn-primary bg-red-600/80 hover:bg-red-500"
                onClick={() => deleteTeam()}
              >
                Yes, delete team
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

export default TeamProfile;

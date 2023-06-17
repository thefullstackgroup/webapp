import axios from 'axios';
import Image from 'next/future/image';
import Faq from 'components/modules/account/settings/subscriptions/Faq';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { IoCameraOutline } from 'react-icons/io5';
import ModalAlert from 'components/common/modals/ModalAlert';
import Icon from 'components/common/elements/Icon';

const CreateTeam = ({ user, setCreateTeamPanel, teams }) => {
  const router = useRouter();
  const [showFaq, setShowFaq] = useState(false);
  const [saving, setSaving] = useState(false);
  const [displaySplash, setDisplaySplash] = useState(true);
  const [formError, setFormError] = useState(false);
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');

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
      mission: '',
      description: description,
      url: '',
      image: logo,
      imagesGallery: [],
      techStack: [],
      details: {
        founded: 2022,
        category: 'Platform',
        location: [],
        nrEmployees: 0,
        stage: '',
        socialMediaLinks: {
          instagram: '',
          facebook: '',
          github: '',
          twitter: '',
          linkedin: '',
        },
        teamStructure: '',
        devTools: '',
        devProcess: '',
        hiringProcess: '',
        isHiring: false,
        careersUrl: '',
        idea: '',
        ideaDescription: '',
        timezone: 'string',
      },
    };

    await axios
      .post(`${process.env.BASEURL}/api/teams/createTeam`, { data })
      .then((response) => {
        if (response.data._id) {
          router.push(`/account/teams/profile/${response.data._id}`);
        } else {
          alert(
            "Sorry, there has been some problem. We'll fix this right away."
          );
          setSaving(false);
        }
      });

    sendSlackMessage();
  };

  const sendSlackMessage = async () => {
    let message = `TEAMS: ${user.name} has created a new team called '${name}'. Please review team profile.`;

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

  return displaySplash ? (
    <>
      <div className="py-4 px-4">
        <ol role="list" className="overflow-hidden">
          <li className="relative pb-10">
            <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-violet-600"></div>

            <div className="group relative flex items-start">
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-base-50 dark:bg-base-900">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-600"></span>
                </span>
              </span>
              <span className="ml-4 flex min-w-0 flex-col">
                <span className="mt-1 text-lg font-semibold">
                  Create a team profile
                  <span className="badge relative -top-1 ml-2 mb-2 px-1.5 py-0.5 text-[0.6em]">
                    Free
                  </span>
                </span>
                <span className="text-sm text-base-400">
                  Your team profile should answer the questions developers want
                  to know about your team / company, how you work, your dev
                  tools and hiring process.
                </span>
              </span>
            </div>
          </li>

          <li className="relative pb-10">
            <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-violet-600"></div>

            <div className="group relative flex items-start">
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-base-50 dark:bg-base-900">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-600"></span>
                </span>
              </span>
              <span className="ml-4 flex min-w-0 flex-col">
                <span className="mt-1 text-lg font-semibold">
                  Add your teammates
                  <span className="badge relative -top-1 ml-2 mb-2 px-1.5 py-0.5 text-[0.6em]">
                    Free
                  </span>
                </span>

                <span className="text-sm text-base-400">
                  Invite your teammates to join. Their profiles will be
                  displayed on your team profile, which really helps to make
                  strong connections with people looking to collaborate or find
                  work.
                </span>
              </span>
            </div>
          </li>
          <li className="relative pb-10">
            <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-violet-600"></div>

            <div className="group relative flex items-start">
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-base-50 dark:bg-base-900">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-600"></span>
                </span>
              </span>
              <span className="ml-4 flex min-w-0 flex-col">
                <span className="mt-1 text-lg font-semibold">
                  Post open roles
                  <span className="badge relative -top-1 ml-2 mb-2 px-1.5 py-0.5 text-[0.6em]">
                    Subscription
                  </span>
                </span>
                <span className="text-sm text-base-400">
                  Looking to connect and hire developers for your team? Post
                  open roles to your team profile. We will also share on our
                  weekly newsletter and share across other socials.
                </span>
              </span>
            </div>
          </li>
          <li className="relative pb-10">
            <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5"></div>

            <div className="group relative flex items-start">
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-violet-600 bg-base-50 dark:bg-base-900">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-600"></span>
                </span>
              </span>
              <span className="ml-4 w-full">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => setDisplaySplash(false)}
                >
                  Get started &rarr;
                </button>
              </span>
            </div>
          </li>
        </ol>
        <div className="text-center">
          <button
            className="btn-ghost text-sm"
            onClick={() => setShowFaq(true)}
          >
            Got a question? Check our FAQ
          </button>
        </div>
      </div>

      <ModalAlert
        show={showFaq}
        setShow={setShowFaq}
        title="Frequently asked questions"
      >
        <div className="no-scrollbar h-[50vh] overflow-y-scroll overscroll-contain p-2">
          <Faq showTitle={false} />
        </div>
      </ModalAlert>
    </>
  ) : (
    <>
      <div className="space-y-6 py-4 px-2">
        <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-base-300 dark:border-base-700">
          {logo ? (
            <>
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
              <div className="absolute bottom-2 w-full text-center md:w-full">
                <label
                  htmlFor="logo"
                  className="relative flex cursor-pointer flex-col justify-center text-center text-xs font-medium focus:outline-none focus:ring-0"
                >
                  <span className="btn btn-danger mx-auto w-min py-0.5 px-1 text-xs">
                    Delete
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
              <div className="h-full w-full"></div>
              <div className="absolute top-6 h-8 w-full text-center md:top-8 md:h-12 md:w-full">
                <label
                  htmlFor="logo"
                  className="relative flex cursor-pointer flex-col justify-center text-center text-xs focus:outline-none focus:ring-0"
                >
                  <Icon name="FiCamera" className="mx-auto h-full w-8" />
                  <span className="">Upload logo</span>
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
          <span className="text-xs text-red-500">
            Please upload your team icon.
          </span>
        )}

        <div>
          <label className="label text-sm">Team name</label>
          <input
            type="text"
            name="username"
            placeholder="Name of your team"
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
          <label className="label text-sm">Team tagline</label>
          <input
            type="text"
            name="description"
            placeholder="One-liner about your team"
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

        <div className="flex justify-between">
          <button
            className="btn btn-ghost px-0"
            onClick={() => setCreateTeamPanel(false)}
          >
            Cancel
          </button>
          {saving ? (
            <button className="btn btn-primary btn-with-icon" disabled>
              <CgSpinner className="h-4 w-4 animate-spin" />
              <span>Creating</span>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleSubmit()}>
              Create Team
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateTeam;

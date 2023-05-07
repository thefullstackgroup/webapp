import axios from 'axios';
import ModalDialog from 'components/common/modals/ModalDialog';
import Image from 'next/future/image';
import Faq from 'components/modules/account/settings/subscriptions/Faq';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { IoCameraOutline } from 'react-icons/io5';

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
            <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-primary-600"></div>

            <div className="group relative flex items-start">
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-tfsdark-800">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary-600"></span>
                </span>
              </span>
              <span className="ml-4 flex min-w-0 flex-col">
                <span className="mt-1 font-semibold text-white text-lg">
                  Create a team profile
                  <span className="relative -top-1 ml-2 mb-2 badge text-[0.6em] px-1.5 py-0.5">
                    Free
                  </span>
                </span>
                <span className="text-sm text-slate-400">
                  Your team profile should answer the questions developers want
                  to know about your team / company, how you work, your dev
                  tools and hiring process.
                </span>
              </span>
            </div>
          </li>

          <li className="relative pb-10">
            <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-primary-600"></div>

            <div className="group relative flex items-start">
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-tfsdark-800">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary-600"></span>
                </span>
              </span>
              <span className="ml-4 flex min-w-0 flex-col">
                <span className="mt-1 font-semibold text-white text-lg">
                  Add your teammates
                  <span className="relative -top-1 ml-2 mb-2 badge text-[0.6em] px-1.5 py-0.5">
                    Free
                  </span>
                </span>

                <span className="text-sm text-slate-400">
                  Invite your teammates to join. Their profiles will be
                  displayed on your team profile, which really helps to make
                  strong connections with people looking to collaborate or find
                  work.
                </span>
              </span>
            </div>
          </li>
          <li className="relative pb-10">
            <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-primary-600"></div>

            <div className="group relative flex items-start">
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-tfsdark-800">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary-600"></span>
                </span>
              </span>
              <span className="ml-4 flex min-w-0 flex-col">
                <span className="mt-1 font-semibold text-white text-lg">
                  Post open roles
                  <span className="relative -top-1 ml-2 mb-2 badge text-[0.6em] px-1.5 py-0.5">
                    Subscription
                  </span>
                </span>
                <span className="text-sm text-slate-400">
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
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-600 bg-tfsdark-800">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary-600"></span>
                </span>
              </span>
              <span className="ml-4 w-full">
                <button
                  className="btn-primary py-2 w-full"
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

      {showFaq && (
        <ModalDialog
          show={showFaq}
          setShow={setShowFaq}
          title="Frequently asked questions"
          dimensions={'absolute inset-0 top-0 max-w-3xl'}
          disabled
        >
          <div className="h-[50vh] overflow-y-scroll overscroll-contain no-scrollbar p-2">
            <Faq showTitle={false} />
          </div>
        </ModalDialog>
      )}
    </>
  ) : (
    <div className="py-4 px-2 space-y-6">
      <div className="relative w-28 h-28 overflow-hidden rounded-xl">
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
            <div className="absolute bottom-2 w-full md:w-full text-center">
              <label
                htmlFor="logo"
                className="relative cursor-pointer font-medium focus:outline-none focus:ring-0 text-center text-xs flex flex-col justify-center"
              >
                <span className="btn-secondary bg-red-500 w-min mx-auto text-xs">
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
            <div className="h-full w-full bg-tfsdark-600"></div>
            <div className="absolute top-6 md:top-8 h-8 w-full md:h-12 md:w-full text-center">
              <label
                htmlFor="logo"
                className="relative cursor-pointer font-medium focus:outline-none focus:ring-0 text-center text-xs flex flex-col justify-center"
              >
                <IoCameraOutline className="text-white opacity-90 h-full w-10 mx-auto" />
                <span className="text-white">Upload logo</span>
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
        <span className="text-red-500 text-xs">
          Please upload your team icon.
        </span>
      )}

      <div>
        <label className="text-sm font-medium text-slate-400">Team name</label>
        <input
          type="text"
          name="username"
          placeholder="Name of your team"
          className="text-input"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
        {formError && !name?.trim().length > 0 && (
          <span className="text-red-500 text-xs">
            Please give a name for your team.
          </span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-slate-400">
          Team tagline
        </label>
        <input
          type="text"
          name="description"
          placeholder="One-liner about your team"
          className="text-input"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />
        {formError && !description?.trim().length > 0 && (
          <span className="text-red-500 text-xs">
            Please give a one liner description for your team.
          </span>
        )}
      </div>

      <div className="flex justify-between">
        <button
          className="hidden sm:block btn-ghost"
          onClick={() => setCreateTeamPanel(false)}
        >
          Cancel
        </button>
        {saving ? (
          <button className="btn-primary btn-with-icon" disabled>
            <CgSpinner className="h-4 w-4 animate-spin" />
            <span>Creating</span>
          </button>
        ) : (
          <button
            className="btn-primary w-full sm:w-auto"
            onClick={() => handleSubmit()}
          >
            Create Team
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateTeam;

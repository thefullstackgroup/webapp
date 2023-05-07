import axios from 'axios';
import ModalDialog from 'components/common/modals/ModalDialog';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaDev, FaGithub, FaMedium } from 'react-icons/fa';
import { IoAdd, IoCheckmark } from 'react-icons/io5';
import { SiHashnode } from 'react-icons/si';

const channels = [
  {
    name: 'GITHUB',
    title: 'Github',
    desc: 'Connect your Github account to import repos and share your stats.',
  },
  {
    name: 'DEV_TO',
    title: 'DEV',
    desc: 'Connect your DEV account to show off your articles on your profile.',
  },
  {
    name: 'HASH_NODE',
    title: 'Hashnode',
    desc: 'Connect your Hashnode account to show off your posts on your profile.',
  },
  {
    name: 'MEDIUM',
    title: 'Medium',
    desc: 'Connect your Medium account to show off your articles on your profile.',
  },
];

const Card = ({ channel, profile }) => {
  const router = useRouter();
  const [showConnect, setShowConnect] = useState(false);
  const [connection, setConnection] = useState({});
  const [placeholder, setPlaceholder] = useState(
    channel.name === 'MEDIUM' ? '@username' : 'Username'
  );
  const [username, setUsername] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  let connected = false;
  if (profile.bio.gitHubAccount && channel.name === 'GITHUB') {
    connected = true;
  }
  if (profile.bio.devToAccount && channel.name === 'DEV_TO') {
    connected = true;
  }
  if (profile.bio.hashNodeAccount && channel.name === 'HASH_NODE') {
    connected = true;
  }
  if (profile.bio.mediumAccount && channel.name === 'MEDIUM') {
    connected = true;
  }

  const sendSlackMessage = async (connect, importContent = false) => {
    let message = `User @${profile?.displayName} has connected their ${connection.title} account.`;
    if (!connect)
      message = `User @${profile?.displayName} has disconnected their ${connection.title} account.`;

    if (importContent)
      message = `User @${profile?.displayName} has imported their ${connection.title} content.`;

    await axios.post(
      `${process.env.BASEURL}/api/notifications/slack/postMessage`,
      {
        message: message,
      }
    );
  };

  const handleImportContent = async () => {
    let user = username;
    if (channel.name === 'MEDIUM') {
      if (!username?.includes('@')) user = `@${username}`;
    }

    await axios
      .post(
        `${process.env.BASEURL}/api/profile/sng/importContent?username=${user}&source=${channel.name}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        sendSlackMessage(true, true);
        handleSaveChannel(true);
        return true;
      })
      .catch((error) => {
        alert('Invalid username');
        setConnecting(false);
        setDisconnecting(false);
      });

    return false;
  };

  const handleDeleteContent = async () => {
    await axios
      .post(
        `${process.env.BASEURL}/api/profile/sng/deleteContent?source=${channel.name}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        sendSlackMessage(true, true);
        handleSaveChannel(false);
      })
      .catch((error) => {
        alert('Oops, sorry, something went wrong');
        setConnecting(false);
        setDisconnecting(false);
      });
  };

  const handleSaveChannel = async (connect) => {
    if (connect) setConnecting(true);
    else setDisconnecting(true);

    let formData = '';
    if (connection.name === 'GITHUB') {
      formData = {
        gitHubAccount: connect ? username : '',
      };
    }
    if (connection.name === 'DEV_TO') {
      formData = {
        devToAccount: connect ? username : '',
      };
    }
    if (connection.name === 'HASH_NODE') {
      formData = {
        hashNodeAccount: connect ? username : '',
      };
    }
    if (connection.name === 'MEDIUM') {
      let user = username;
      if (!username?.includes('@')) user = `@${username}`;

      formData = {
        mediumAccount: connect ? user : '',
      };
    }

    await axios
      .post(
        `${process.env.BASEURL}/api/profile/bio/update`,
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status == 204) {
          sendSlackMessage(connect);
          router.reload();
        }
      })
      .catch((error) => {
        alert('Invalid username, try again?');
        setConnecting(false);
        setDisconnecting(false);
      });
  };

  const handleImportAndSave = (connect) => {
    if (connect) {
      setConnecting(true);
      handleImportContent();
    }
    if (!connect) {
      setDisconnecting(true);
      handleDeleteContent();
    }
  };

  const handleSave = (connect) => {
    if (connection.name === 'GITHUB') handleSaveChannel(connect);
    else handleImportAndSave(connect);
  };

  return (
    <>
      <div
        className={
          'h-20 sm:h-16 lg:h-40 flex items-start gap-4 bg-tfsdark-700 rounded-md px-3 py-2 lg:py-4 w-full mb-2 lg:mb-0 lg:w-1/4 border-2 border-transparent duration-200 cursor-pointer ' +
          (connected
            ? 'opacity-70'
            : 'sm:hover:shadow-xl sm:hover:shadow-primary-500/20 sm:hover:border-primary-700')
        }
        onClick={() => {
          setConnection(channel);
          setShowConnect(true);
        }}
      >
        <div className="flex lg:hidden space-x-4 justify-between w-full">
          <div>
            {channel.name === 'GITHUB' && <FaGithub className="h-10 w-10" />}
            {channel.name === 'DEV_TO' && <FaDev className="h-10 w-10" />}
            {channel.name === 'HASH_NODE' && (
              <SiHashnode className="h-10 w-10" />
            )}
            {channel.name === 'MEDIUM' && <FaMedium className="h-10 w-10" />}
          </div>
          <div className="w-full">
            <h4 className="font-semibold">{channel.title}</h4>
            <p className="text-slate-400 text-xs md:text-sm">{channel.desc}</p>
          </div>
          <div className="mt-2">
            {connected ? (
              <div className="flex text-xs w-min py-0 space-x-1 text-green-600">
                <IoCheckmark className="h-6 w-6" />
              </div>
            ) : (
              <button className="btn-secondary text-xs w-min py-1.5 px-2 space-x-1">
                <IoAdd className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
        <div className="relative hidden lg:block h-full">
          <div className="flex items-center space-x-2 mb-2">
            {channel.name === 'GITHUB' && (
              <FaGithub className="h-10 w-10 sm:h-8 sm:w-8" />
            )}
            {channel.name === 'DEV_TO' && (
              <FaDev className="h-10 w-10 sm:h-8 sm:w-8" />
            )}
            {channel.name === 'HASH_NODE' && (
              <SiHashnode className="h-10 w-10 sm:h-8 sm:w-8" />
            )}
            {channel.name === 'MEDIUM' && (
              <FaMedium className="h-10 w-10 sm:h-8 sm:w-8" />
            )}
            <h4 className="font-semibold">{channel.title}</h4>
          </div>
          <p className="text-slate-400 text-xs">{channel.desc}</p>
          <div className="absolute bottom-2 left-0 mt-2">
            {connected ? (
              <div className="flex text-xs w-min py-1.5 space-x-1 text-green-600">
                <IoCheckmark className="h-4 w-4" />
                <span>Connected</span>
              </div>
            ) : (
              <button className="btn-secondary btn-with-icon text-xs w-min py-1.5 pl-1.5 pr-2.5 space-x-1">
                <IoAdd className="h-4 w-4" />
                <span>Connect</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showConnect && !connected && (
        <ModalDialog
          show={showConnect}
          setShow={setShowConnect}
          title={`Connect your ${channel.title} account`}
          disabled={true}
          dimensions={`sm:max-w-md`}
        >
          <div>
            <div className="py-4 no-scrollbar overflow-y-scroll overflow-visible overscroll-contain h-4/5 pb-20 sm:pb-4 sm:h-auto w-full">
              <div className="top-0 w-full mx-auto bg-transparent px-2 space-y-6 relative h-full">
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    {channel.name === 'GITHUB' && (
                      <FaGithub className="h-16 w-16" />
                    )}
                    {channel.name === 'DEV_TO' && (
                      <FaDev className="h-16 w-16" />
                    )}
                    {channel.name === 'HASH_NODE' && (
                      <SiHashnode className="h-16 w-16" />
                    )}
                    {channel.name === 'MEDIUM' && (
                      <FaMedium className="h-16 w-16" />
                    )}
                  </div>
                  <div className="text-slate-400">{channel.desc}</div>
                </div>
                <div className="space-y-2">
                  <label>Your {channel.title} username</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-input"
                  />
                  {!connecting ? (
                    <button
                      className="btn-primary w-full"
                      onClick={() => handleSave(true)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn-primary btn-with-icon w-full justify-center"
                      disabled
                    >
                      <CgSpinner className="h-6 w-6 animate-spin" />
                      <span>Connecting account</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ModalDialog>
      )}

      {showConnect && connected && (
        <ModalDialog
          show={showConnect}
          setShow={setShowConnect}
          title={`Disconnect ${channel.title} account`}
          disabled={true}
          dimensions={`sm:max-w-md`}
        >
          <div>
            <div className="py-4 no-scrollbar overflow-y-scroll overflow-visible overscroll-contain h-4/5 pb-20 sm:pb-4 sm:h-56 w-full">
              <div className="top-0 w-full mx-auto bg-transparent px-2 space-y-6 relative h-full">
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    {channel.name === 'GITHUB' && (
                      <FaGithub className="h-16 w-16" />
                    )}
                    {channel.name === 'DEV_TO' && (
                      <FaDev className="h-16 w-16" />
                    )}
                    {channel.name === 'HASH_NODE' && (
                      <SiHashnode className="h-16 w-16" />
                    )}
                    {channel.name === 'MEDIUM' && (
                      <FaMedium className="h-16 w-16" />
                    )}
                  </div>
                  <div>
                    <p className="text-slate-400">
                      Do you want to disconnect the {channel.title} account
                      {channel.name === 'GITHUB' && (
                        <span className="px-1 inline-flex text-slate-100 font-mono">
                          {profile.bio.gitHubAccount}
                        </span>
                      )}
                      {channel.name === 'DEV_TO' && (
                        <span className="px-1 inline-flex text-slate-100 font-mono">
                          {profile.bio.devToAccount}
                        </span>
                      )}
                      {channel.name === 'HASH_NODE' && (
                        <span className="px-1 inline-flex text-slate-100 font-mono">
                          {profile.bio.hashNodeAccount}
                        </span>
                      )}
                      {channel.name === 'MEDIUM' && (
                        <span className="px-1 inline-flex text-slate-100 font-mono">
                          {profile.bio.mediumAccount}
                        </span>
                      )}
                      from your profile?
                    </p>
                  </div>
                </div>
                {!disconnecting ? (
                  <button
                    className="btn-primary w-full"
                    onClick={() => handleSave(false)}
                  >
                    Yes, disconnect
                  </button>
                ) : (
                  <button
                    className="btn-primary btn-with-icon w-full justify-center"
                    disabled
                  >
                    <CgSpinner className="h-6 w-6 animate-spin" />
                    <span>Disconnecting account</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </ModalDialog>
      )}
    </>
  );
};

const Accounts = ({ profile }) => {
  return channels.map((channel, index) => (
    <>
      <Card channel={channel} profile={profile} key={index} />
    </>
  ));
};

export default Accounts;

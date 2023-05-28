import { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Page from 'components/modules/project/Container';
import Link from 'next/link';
import Loader from 'components/common/elements/Loader';
import { IoCloseSharp } from 'react-icons/io5';
import ToolTip from 'components/common/elements/ToolTip';
import fetcher from 'utils/fetcher';
import dynamic from 'next/dynamic';

const Reactions = dynamic(() => import('components/modules/project/Reactions'));

const Modal = ({
  projectSlug,
  projectUserId,
  user,
  setShowProject,
  standalone = false,
}) => {
  const [isConnectionPending, setIsConnectionPending] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  let url = `${process.env.BASEURL}/api/posts/getPost?postId=${projectSlug}&authorId=${projectUserId}`;
  // cater for when user not logged in.
  if (!user)
    url = `${process.env.BASEURL}/api/posts/getPublicPost?postId=${projectSlug}&authorId=${projectUserId}`;
  const { data } = useSWR(url, fetcher);
  const project = data ? data : null;

  const checkIfConnected = async () => {
    axios
      .get(
        `${process.env.BASEURL}/api/profile/verify_connection?userId=${project?.userId}&connectedTo=${user.userId}`
      )
      .then((res) => {
        if (res.data.success === true) {
          setIsConnected(true);
        } else if (res.data.message === 'Pending') {
          setIsConnectionPending(true);
        } else {
          setIsConnected(false);
        }
      });
  };

  useEffect(() => {
    if (user) checkIfConnected();
  }, []);

  if (!project)
    return (
      <div className="mx-auto flex h-screen max-w-screen-xl flex-1 items-center justify-center bg-base-900">
        <Loader />
      </div>
    );

  if (project && !project.projectName)
    return (
      <div className="flex h-screen items-start justify-center sm:items-center">
        <div className="prose prose-dark mx-auto max-w-md rounded-md bg-base-700 p-8 text-center">
          <h2 className="text-xl font-semibold">Oops! Post not found</h2>
          <p>
            This post may have been moved by the author!{' '}
            <Link href={`/${projectUserId}`}>
              <a>Check out their profile</a>
            </Link>{' '}
            to see.
          </p>
        </div>
      </div>
    );

  return (
    <>
      <div className="mx-auto h-screen w-full max-w-screen-2xl overflow-scroll overscroll-contain lg:grid lg:grid-cols-12 xl:border-l xl:border-r xl:border-base-600/50">
        <div className="col-span-8">
          <Page
            project={project}
            isConnected={isConnected}
            isConnectionPending={isConnectionPending}
            user={user}
            setShowProject={setShowProject}
            standalone={standalone}
          />
        </div>
        <div className="col-span-4 border-l border-base-700">
          <Reactions
            project={project}
            isConnected={isConnected}
            isConnectionPending={isConnectionPending}
            user={user}
            setShowProject={setShowProject}
            standalone={standalone}
          />
        </div>
      </div>
      <div className="fixed top-2 right-2 z-10 xl:top-4 2xl:right-4">
        <button
          className="group rounded-xl bg-black bg-opacity-70 p-1 duration-150 hover:bg-base-700"
          onClick={() => setShowProject(false)}
        >
          <ToolTip message="Close" position="bottom" />
          <IoCloseSharp className="h-8 w-8 xl:h-8 xl:w-8" />
        </button>
      </div>
    </>
  );
};

export default Modal;

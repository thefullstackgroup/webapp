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
      <div className="bg-tfsdark-900 h-screen max-w-screen-xl mx-auto flex flex-1 justify-center items-center">
        <Loader />
      </div>
    );

  if (project && !project.projectName)
    return (
      <div className="flex justify-center items-start sm:items-center h-screen">
        <div className="bg-tfsdark-700 max-w-md mx-auto text-center p-8 rounded-md prose prose-dark">
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
      <div className="lg:grid lg:grid-cols-12 w-full max-w-screen-2xl mx-auto h-screen overflow-scroll overscroll-contain xl:border-l xl:border-r xl:border-tfsdark-600/50">
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
        <div className="col-span-4 border-l border-tfsdark-700">
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
      <div className="fixed z-10 top-2 xl:top-4 right-2 2xl:right-4">
        <button
          className="group bg-black bg-opacity-70 rounded-xl p-1 hover:bg-tfsdark-700 duration-150"
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

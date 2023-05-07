import { useEffect, useState } from 'react';
import axios from 'axios';
import Page from 'components/modules/project/Container';
import Link from 'next/link';
import Loader from 'components/common/elements/Loader';
import dynamic from 'next/dynamic';
const Reactions = dynamic(() => import('components/modules/project/Reactions'));

const Main = ({ project, user, setShowProject, standalone = false }) => {
  const [isConnectionPending, setIsConnectionPending] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

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
      <div className="bg-tfsdark-800 h-screen max-w-screen-xl mx-auto flex flex-1 justify-center items-center">
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
            <Link href={`/${project.id}`}>
              <a>Check out their profile</a>
            </Link>{' '}
            to see.
          </p>
        </div>
      </div>
    );

  return (
    <>
      <div className="mt-0 lg:mt-0 w-full flex justify-center inset-0">
        <div
          className={
            'min-h-screen w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 ' +
            (user && ' md:ml-0 lg:ml-20 xl:ml-52 2xl:ml-56')
          }
        >
          <div className="relative max-w-screen-2xl mx-auto">
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
              <div className="hidden lg:block col-span-4 border-l border-tfsdark-700">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

import { useEffect, useState } from 'react';
import axios from 'axios';
import Page from 'components/modules/project/Container';
import Link from 'next/link';
import Loader from 'components/common/elements/Loader';
// import Reactions from 'components/modules/project/Reactions';

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
      <div className="mx-auto flex h-screen max-w-screen-xl flex-1 items-center justify-center bg-base-800">
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
      <div className="relative mx-auto">
        <Page
          project={project}
          isConnected={isConnected}
          isConnectionPending={isConnectionPending}
          user={user}
          setShowProject={setShowProject}
          standalone={standalone}
        />
      </div>
      {/* <div className="mx-auto w-full max-w-screen-2xl gap-14 lg:grid lg:grid-cols-12"> */}
      {/* <div className="col-span-8">
            <Page
              project={project}
              isConnected={isConnected}
              isConnectionPending={isConnectionPending}
              user={user}
              setShowProject={setShowProject}
              standalone={standalone}
            />
          </div>
          <div className="col-span-4 hidden lg:block">
            <Reactions
              project={project}
              isConnected={isConnected}
              isConnectionPending={isConnectionPending}
              user={user}
              setShowProject={setShowProject}
              standalone={standalone}
            />
          </div> */}
      {/* </div> */}
    </>
  );
};

export default Main;

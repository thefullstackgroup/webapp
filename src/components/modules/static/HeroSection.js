import useSWR from 'swr';
import { useMemo } from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { IoArrowDown } from 'react-icons/io5';
import { isMobile } from 'react-device-detect';
import fetcher from 'utils/fetcher';

const HeroSection = ({ setShowSignupModal, sendSlackSignUpMessage }) => {
  const url = `${
    process.env.BASEURL
  }/api/projects/showcase?page=0&size=${32}&sort=mostpopular&projectType=PROJECT`;

  const { data } = useSWR(url, fetcher);

  const projectCards = useMemo(() => {
    const projectList = data ? data : [];
    return projectList
      .sort(() => Math.random() - 0.5)
      .map((project) => (
        <div
          className="h-[30vh] w-full overflow-hidden rounded-none bg-black opacity-30 duration-300 hover:opacity-40"
          key={project.projectId}
        >
          <Image
            src={project.projectImgURI}
            className="h-full w-full object-cover opacity-70"
            alt={project.projectName}
            width={800}
            height={800}
            layout="fill"
          />
        </div>
      ));
  }, [data]);

  return (
    <div className="relative h-[80vh] overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-base-900/40 via-black to-base-900 sm:h-[105vh]">
      <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:pt-40 lg:h-4/5 xl:px-8">
        <div className="relative z-20 mx-auto max-w-full pt-20 sm:pt-28 lg:max-w-7xl">
          <h1 className="flex justify-center -space-y-4 bg-gradient-to-r from-base-300 via-base-100 to-base-400 bg-clip-text text-center font-intertight text-6xl font-bold tracking-tight text-transparent md:text-9xl">
            Make code, not war
          </h1>

          <p className="mt-4 block px-4 text-center font-intertight text-xl text-base-300 sm:text-2xl lg:text-3xl">
            Discover and connect with developers sharing their work.
          </p>

          <div className="my-12 flex w-full justify-center md:space-x-6">
            <button
              className="btn-primary from-primary-500 rounded-lg bg-gradient-to-br via-violet-600 to-purple-700 py-2 px-4 text-lg md:py-3 md:px-6 md:text-xl"
              onClick={() => {
                setShowSignupModal(true);
                sendSlackSignUpMessage('GET STARTED');
              }}
            >
              Get started
            </button>
            <Link href="/for/developers">
              <button className="btn-secondary hidden rounded-lg bg-base-400/70 py-2 px-4 text-lg hover:bg-base-600 md:block md:py-3 md:px-6 md:text-xl">
                Learn more
              </button>
            </Link>
          </div>
        </div>
      </div>
      {!isMobile && (
        <>
          <div className="absolute -top-4 z-10 w-full">
            <div className="grid grid-cols-3 gap-0 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8">
              {projectCards}
            </div>
          </div>
          <div className="absolute top-0 left-0 z-10 hidden h-10 w-full bg-gradient-to-b from-base-900 via-base-900 to-transparent sm:h-36 md:block"></div>
          <div className="absolute bottom-0 left-0 z-10 hidden h-20 w-full bg-gradient-to-t from-base-900 via-base-900 to-transparent md:block"></div>
          <div className="absolute bottom-20 z-10 w-full text-center md:bottom-14">
            <IoArrowDown className="mx-auto h-8 w-auto animate-bounce text-base-100 md:h-12" />
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSection;

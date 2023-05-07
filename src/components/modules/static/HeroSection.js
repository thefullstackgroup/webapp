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
          className="h-[30vh] w-full bg-black rounded-none overflow-hidden opacity-30 hover:opacity-40 duration-300"
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
    <div className="relative h-[80vh] sm:h-[105vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-black to-tfsdark-900 overflow-hidden">
      <div className="pt-20 sm:pt-40 px-4 xl:px-8 max-w-7xl mx-auto relative lg:h-4/5">
        <div className="relative z-20 pt-20 sm:pt-28 max-w-full lg:max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 font-intertight flex justify-center text-center -space-y-4">
            Make code, not war
          </h1>

          <p className="block mt-4 text-xl text-slate-300 sm:text-2xl lg:text-3xl px-4 text-center font-intertight">
            Discover and connect with developers sharing their work.
          </p>

          <div className="my-12 w-full flex justify-center md:space-x-6">
            <button
              className="btn-primary text-lg md:text-xl py-2 px-4 md:py-3 md:px-6 bg-gradient-to-br from-primary-500 via-violet-600 to-purple-700 rounded-lg"
              onClick={() => {
                setShowSignupModal(true);
                sendSlackSignUpMessage('GET STARTED');
              }}
            >
              Get started
            </button>
            <Link href="/for/developers">
              <button className="hidden md:block btn-secondary text-lg md:text-xl py-2 px-4 md:py-3 md:px-6 bg-tfsdark-400/70 hover:bg-tfsdark-600 rounded-lg">
                Learn more
              </button>
            </Link>
          </div>
        </div>
      </div>
      {!isMobile && (
        <>
          <div className="w-full absolute z-10 -top-4">
            <div className="grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 gap-0">
              {projectCards}
            </div>
          </div>
          <div className="w-full absolute hidden md:block top-0 left-0 z-10 bg-gradient-to-b from-tfsdark-900 via-tfsdark-900 to-transparent h-10 sm:h-36"></div>
          <div className="w-full absolute hidden md:block bottom-0 left-0 z-10 bg-gradient-to-t from-tfsdark-900 via-tfsdark-900 to-transparent h-20"></div>
          <div className="z-10 absolute bottom-20 md:bottom-14 w-full text-center">
            <IoArrowDown className="text-tfsdark-100 w-auto h-8 md:h-12 mx-auto animate-bounce" />
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSection;

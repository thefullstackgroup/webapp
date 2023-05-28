import { Transition } from '@headlessui/react';
import { useState } from 'react';
import Image from 'next/future/image';
import TechBadge from 'components/common/tags/TagStack';
import Project from 'components/modules/project/Modal';
import {
  awesomeProjects,
  featuredProject,
} from 'components/modules/static/shared/constants';

const SubCard = ({ project }) => {
  const [showProject, setShowProject] = useState(false);

  return (
    <>
      <div
        className="sm:hover:border-primary-500 group relative h-80 w-full cursor-pointer overflow-hidden rounded-2xl border-4 border-transparent bg-gradient-to-t from-black via-base-700 to-transparent duration-200 sm:hover:shadow-lg sm:hover:shadow-purple-900"
        onClick={() => setShowProject(!showProject)}
        key={project.id}
      >
        <div className="h-full w-full cursor-pointer overflow-hidden rounded-l-xl bg-gradient-to-b from-transparent to-purple-900/40">
          <Image
            src={project.image}
            className="h-full w-full translate-x-40 translate-y-10 rounded-l-xl object-cover opacity-30 duration-200 group-hover:opacity-60"
            alt={project.title}
            width={1200}
            height={1200}
            layout="fill"
          />
        </div>

        <div className="absolute top-4 left-4 mb-6 w-min whitespace-nowrap rounded-full border border-base-400 bg-base-700/50 px-4 py-1 text-sm text-white">
          Featured
        </div>

        <div className="absolute left-0 bottom-0 w-full space-y-0 py-6 px-4 pr-10">
          <p className="font-intertight text-sm font-medium text-base-300">
            {project.author}
          </p>
          <h3 className="font-intertight text-xl font-medium md:text-3xl">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Project Detail Modal */}
      <Transition
        show={showProject}
        enter=""
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave=""
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed top-0 left-0 z-50 h-screen w-full overscroll-contain bg-base-800/70 backdrop-blur-md"
      >
        <div
          className="fixed inset-0 h-screen w-full"
          onClick={() => setShowProject(false)}
        ></div>
        <div>
          <div className="no-scrollbar relative mx-auto flex h-screen w-full max-w-screen-2xl flex-col overflow-hidden overflow-y-scroll overscroll-contain 2xl:px-10">
            <div className="top-0 mx-auto w-full max-w-full bg-base-900">
              <Project
                projectId={project.id}
                projectSlug={project.slug}
                projectUserId={project.author}
                setShowProject={setShowProject}
              />
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

const Featured = () => {
  const [showProject, setShowProject] = useState(false);

  return (
    <>
      <div className="">
        <div className="mx-auto mb-6 flex w-full max-w-screen-xl flex-col gap-6 px-4 xl:grid xl:grid-cols-5 xl:px-0">
          <div className="rounded-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-blue-600 p-2 xl:col-span-3">
            <div
              className="group h-full w-full cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setShowProject(!showProject)}
            >
              <Image
                src={featuredProject.image}
                className="h-full w-full object-cover duration-300 group-hover:scale-105"
                alt={featuredProject.title}
                width={1200}
                height={1200}
                layout="fill"
              />
            </div>
          </div>

          <div
            className="cursor-pointer space-y-4 rounded-xl bg-gradient-to-br from-base-900 via-base-700 to-base-800 py-6 px-4 md:px-10 xl:col-span-2"
            onClick={() => setShowProject(!showProject)}
          >
            <div className="mb-6 w-min whitespace-nowrap rounded-full border border-base-400 bg-base-700/50 px-4 py-1 text-sm text-white">
              Popular
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 overflow-hidden rounded-full border-4 border-purple-600 sm:h-20 sm:w-20">
                <Image
                  src={featuredProject.authorImage}
                  className="h-full w-full object-cover"
                  alt={featuredProject.author}
                  width={400}
                  height={400}
                  layout="fill"
                />
              </div>
              <div>
                <h3 className="font-intertight text-lg font-medium md:text-2xl">
                  {featuredProject.author}
                </h3>
                <p className="text-sm text-base-400 md:text-lg">
                  {featuredProject.authorRole}
                </p>
              </div>
            </div>
            <h3 className="font-intertight text-2xl font-medium md:text-5xl">
              {featuredProject.title}
            </h3>
            <p className="text-base text-base-300 md:text-xl">
              {featuredProject.desc}
            </p>
            <div className="flex space-x-4">
              {featuredProject.stack.map((stack, index) => (
                <TechBadge
                  tech={stack}
                  size={'lg'}
                  key={index}
                  iconOnly={true}
                  style="h-10 w-10 text-base-500 rounded"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mb-20 flex w-full max-w-screen-xl flex-col-reverse gap-6 px-4 xl:grid xl:grid-cols-3 xl:px-0">
          {awesomeProjects.map((project) => (
            <SubCard project={project} key={project.id} />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Transition
        show={showProject}
        enter=""
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave=""
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed top-0 left-0 z-50 h-screen w-full overscroll-contain bg-base-800/70 backdrop-blur-md"
      >
        <div
          className="fixed inset-0 h-screen w-full"
          onClick={() => setShowProject(false)}
        ></div>
        <div>
          <div className="no-scrollbar relative mx-auto flex h-screen w-full max-w-screen-2xl flex-col overflow-hidden overflow-y-scroll overscroll-contain 2xl:px-10">
            <div className="top-0 mx-auto w-full max-w-full bg-base-900">
              <Project
                projectId={featuredProject.id}
                projectSlug={featuredProject.slug}
                projectUserId={featuredProject.author}
                setShowProject={setShowProject}
              />
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Featured;

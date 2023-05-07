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
        className="group relative w-full rounded-2xl overflow-hidden bg-gradient-to-t from-black via-tfsdark-700 to-transparent h-80 border-4 border-transparent sm:hover:border-primary-500 duration-200 sm:hover:shadow-lg sm:hover:shadow-purple-900 cursor-pointer"
        onClick={() => setShowProject(!showProject)}
        key={project.id}
      >
        <div className="rounded-l-xl w-full h-full overflow-hidden cursor-pointer bg-gradient-to-b from-transparent to-purple-900/40">
          <Image
            src={project.image}
            className="h-full w-full rounded-l-xl object-cover opacity-30 group-hover:opacity-60 translate-x-40 translate-y-10 duration-200"
            alt={project.title}
            width={1200}
            height={1200}
            layout="fill"
          />
        </div>

        <div className="absolute top-4 left-4 rounded-full text-white bg-tfsdark-700/50 border border-tfsdark-400 px-4 py-1 text-sm w-min whitespace-nowrap mb-6">
          Featured
        </div>

        <div className="absolute left-0 bottom-0 py-6 w-full px-4 pr-10 space-y-0">
          <p className="text-slate-300 text-sm font-intertight font-medium">
            {project.author}
          </p>
          <h3 className="text-xl md:text-3xl font-intertight font-medium">
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
        className="fixed z-50 top-0 left-0 w-full h-screen bg-tfsdark-800/70 backdrop-blur-md overscroll-contain"
      >
        <div
          className="fixed inset-0 h-screen w-full"
          onClick={() => setShowProject(false)}
        ></div>
        <div>
          <div className="relative w-full max-w-screen-2xl mx-auto 2xl:px-10 flex flex-col h-screen overflow-hidden overflow-y-scroll no-scrollbar overscroll-contain">
            <div className="top-0 w-full max-w-full mx-auto bg-tfsdark-900">
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
        <div className="flex flex-col xl:grid xl:grid-cols-5 gap-6 w-full max-w-screen-xl mx-auto mb-6 px-4 xl:px-0">
          <div className="xl:col-span-3 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-blue-600 p-2">
            <div
              className="group rounded-2xl w-full h-full overflow-hidden cursor-pointer"
              onClick={() => setShowProject(!showProject)}
            >
              <Image
                src={featuredProject.image}
                className="h-full w-full object-cover group-hover:scale-105 duration-300"
                alt={featuredProject.title}
                width={1200}
                height={1200}
                layout="fill"
              />
            </div>
          </div>

          <div
            className="xl:col-span-2 py-6 px-4 md:px-10 space-y-4 rounded-xl bg-gradient-to-br from-tfsdark-900 via-tfsdark-700 to-tfsdark-800 cursor-pointer"
            onClick={() => setShowProject(!showProject)}
          >
            <div className="rounded-full text-white bg-tfsdark-700/50 border border-tfsdark-400 px-4 py-1 text-sm w-min whitespace-nowrap mb-6">
              Popular
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-purple-600">
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
                <h3 className="text-lg md:text-2xl font-intertight font-medium">
                  {featuredProject.author}
                </h3>
                <p className="text-slate-400 text-sm md:text-lg">
                  {featuredProject.authorRole}
                </p>
              </div>
            </div>
            <h3 className="text-2xl md:text-5xl font-intertight font-medium">
              {featuredProject.title}
            </h3>
            <p className="text-slate-300 text-base md:text-xl">
              {featuredProject.desc}
            </p>
            <div className="flex space-x-4">
              {featuredProject.stack.map((stack, index) => (
                <TechBadge
                  tech={stack}
                  size={'lg'}
                  key={index}
                  iconOnly={true}
                  style="h-10 w-10 text-slate-500 rounded"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:grid xl:grid-cols-3 gap-6 w-full max-w-screen-xl mx-auto mb-20 px-4 xl:px-0">
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
        className="fixed z-50 top-0 left-0 w-full h-screen bg-tfsdark-800/70 backdrop-blur-md overscroll-contain"
      >
        <div
          className="fixed inset-0 h-screen w-full"
          onClick={() => setShowProject(false)}
        ></div>
        <div>
          <div className="relative w-full max-w-screen-2xl mx-auto 2xl:px-10 flex flex-col h-screen overflow-hidden overflow-y-scroll no-scrollbar overscroll-contain">
            <div className="top-0 w-full max-w-full mx-auto bg-tfsdark-900">
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

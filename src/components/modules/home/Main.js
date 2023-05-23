import { IoLogoGithub } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import ProjectGallery from 'components/modules/explore/ProjectGallery';
import Filters from 'components/modules/explore/Filters';
import { useState } from 'react';
import { RangeFilter, SortFilter } from '../explore/constants';

const Main = () => {
  const [sort, setSort] = useState(SortFilter[0]);
  const [range, setRange] = useState(RangeFilter[2]);
  const [stack, setStack] = useState(null);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl py-20 text-center">
        <div className="relative space-y-6">
          <h2 className="text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
              Discover and connect
            </span>{' '}
            with developers sharing projects.
          </h2>
          <h4 className="mx-auto max-w-2xl text-xl font-normal tracking-tight text-gray-400 dark:text-gray-400">
            The Full Stack is an open source platform for developers to share
            projects with a supportive dev community and grow a network of
            value.
          </h4>
          <div className="flex items-center justify-center space-x-4">
            <button className="btn btn-secondary btn-with-icon rounded-full py-2">
              <IoLogoGithub className="h-5 w-5" />
              <span>Continue with GitHub</span>
            </button>
            <button className="btn btn-secondary btn-with-icon rounded-full py-2">
              <FcGoogle />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
      <div className="relative space-y-8">
        <Filters
          range={range}
          setRange={setRange}
          stack={stack}
          setStack={setStack}
          sort={sort}
          setSort={setSort}
        />
        <ProjectGallery sort={sort.value} range={range.value} stack={stack} />
      </div>
    </div>
  );
};

export default Main;

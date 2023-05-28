import { IoLogoGithub } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import ProjectGallery from 'components/modules/explore/ProjectGallery';
import Filters from 'components/modules/explore/Filters';
import Discover from 'components/modules/explore/Discover';
import { useState } from 'react';
import { RangeFilter, SortFilter } from '../explore/constants';

const Main = ({ user }) => {
  const [sort, setSort] = useState(SortFilter[0]);
  const [range, setRange] = useState(RangeFilter[2]);
  const [stack, setStack] = useState(null);

  return (
    <div className="min-h-screen space-y-10 pt-6">
      {!user && (
        <div className="rounded-2xl bg-base-200/80 dark:bg-base-800">
          <div className="mx-auto max-w-3xl py-14 text-center">
            <div className="relative space-y-6">
              <h2 className="text-5xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  Discover and connect
                </span>{' '}
                with developers sharing projects.
              </h2>
              <h4 className="mx-auto max-w-2xl text-xl font-normal tracking-tight text-base-400 dark:text-base-400">
                The Full Stack is an open source platform for developers to
                share projects with a supportive dev community and grow a
                network of value.
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
        </div>
      )}
      <div className="relative mb-12 space-y-4">
        <Discover user={user} sort="newest" range={90} />
      </div>
      <div className="relative mb-12">
        <h3 className="text-2xl font-bold tracking-tight">
          Popular this month
        </h3>
        <ProjectGallery
          sort={'mostpopular'}
          range={90}
          count={4}
          cols={4}
          feature={true}
        />
      </div>
      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">
            Explore showcase
          </h3>
          <Filters
            range={range}
            setRange={setRange}
            sort={sort}
            setSort={setSort}
          />
        </div>
        <ProjectGallery sort={sort.orderBy} range={range.days} stack={stack} />
      </div>
    </div>
  );
};

export default Main;

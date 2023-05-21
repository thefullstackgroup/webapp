import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import useSWR from 'swr';
import Link from 'next/link';
import fetcher from 'utils/fetcher';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import {
  RangeFilter,
  SortFilter,
  categories,
} from 'components/modules/explore/constants';
import { IoAdd, IoSearchOutline } from 'react-icons/io5';
import dynamic from 'next/dynamic';
import ProjectGallery from './ProjectGallery';

const Filters = dynamic(() => import('components/modules/explore/Filters'));
const Feed = dynamic(() => import('components/modules/explore/Feed'));
const Discover = dynamic(() => import('components/modules/explore/Discover'));
const Highlight = dynamic(() => import('components/modules/explore/Highlight'));

export const Greeting = ({ name }) => {
  const myDate = new Date();
  const hours = myDate.getHours();
  const firstName = name.split(' ');
  let greet = '';

  if (hours < 12) greet = 'Good morning';
  else if (hours >= 12 && hours <= 17) greet = 'Good afternoon';
  else if (hours >= 17 && hours <= 24) greet = 'Good evening';

  return (
    <h4 className="mb-4 hidden text-xl font-semibold tracking-tight text-slate-100 md:block md:text-2xl">
      {greet}, <span className="capitlize">{firstName[0]}</span> 👋
    </h4>
  );
};

const Main = ({ user, slug }) => {
  const [sort, setSort] = useState(SortFilter[0]);
  const [range, setRange] = useState(RangeFilter[2]);
  const [stack, setStack] = useState(null);
  const [term, setTerm] = useState('');

  return (
    <>
      <div className="min-h-screen">
        <div className="space-y-2 py-10 text-center">
          <h2 className="text-5xl font-bold tracking-tight">
            Explore showcase
          </h2>
          <h4 className="mx-auto max-w-2xl text-xl font-normal tracking-tight text-gray-400 dark:text-gray-400">
            Discover awesome projects from the developer showcase
          </h4>
        </div>
        <div className="relative">
          <Filters
            range={range}
            setRange={setRange}
            stack={stack}
            setStack={setStack}
            sort={sort}
            setSort={setSort}
          />
          <ProjectGallery
            sort={sort.value}
            range={range.value}
            stack={stack}
            category={slug}
          />
        </div>
      </div>
      {/* <div className="mt-0 lg:mt-4 w-full flex justify-center">
        <div className="min-h-screen w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-screen-2xl mx-auto">
            <Link href="/post" passHref>
              <button className="fixed bottom-20 right-0 lg:bottom-14 z-50 lg:right-5 btn-primary btn-with-icon mx-4 text-xl px-2 lg:pl-4 lg:pr-5 rounded-full shadow-xl font-semibold">
                <IoAdd className="h-8 w-8" />
                <span className="hidden lg:block">Create</span>
              </button>
            </Link>
            <div className="xl:py-0 mb-4 md:mb-10 md:space-y-4 mt-2 lg:mt-4">
              <Greeting name={user?.name} />

              <div className="grid grid-cols-1 space-y-4 sm:space-y-10 overflow-visible mb-4 sm:mb-0">
                <Discover user={user} sort="newest" range="" />
                {!isMobile && <Highlight user={user} />}

                <div className="grid grid-cols-1">
                  <div className="px-4 md:px-0 flex items-center space-x-4 justify-between">
                    <h4 className="text-xl md:text-2xl text-slate-100 font-semibold">
                      Explore shows
                    </h4>

                    <div className="hidden md:flex text-input rounded-lg w-72 py-0 items-center">
                      <IoSearchOutline />
                      <input
                        type="text"
                        name="q"
                        placeholder="Search showcase..."
                        className="bg-transparent text-input rounded-lg m-0"
                        value={term || ''}
                        onChange={(e) => setTerm(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            router.push(`/search?q=${term}`);
                            sendSlackMessage(
                              `Ran a showcase search with the term '${term}'`
                            );
                          }
                        }}
                      />
                    </div>
                    <div className="block md:hidden">
                      <Link href="/search">
                        <IoSearchOutline className="h-5 w-5 cursor-pointer" />
                      </Link>
                    </div>
                  </div>

                  <Filters
                    range={range}
                    setRange={setRange}
                    sort={sort}
                    setSort={setSort}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    viewType={viewType}
                    setViewType={setViewType}
                    hideFilters={true}
                  />
                </div>
              </div>

              {selectedCategory && range && (
                <Feed
                  user={user}
                  range={range || 90}
                  sort={sort || 'newest'}
                  category={selectedCategory}
                  following={following}
                  viewType={viewType}
                />
              )}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Main;

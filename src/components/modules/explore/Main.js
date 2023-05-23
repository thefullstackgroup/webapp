import React, { useState } from 'react';
import { RangeFilter, SortFilter } from 'components/modules/explore/constants';
import dynamic from 'next/dynamic';
import ProjectGallery from './ProjectGallery';
import Filters from 'components/modules/explore/Filters';

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

const Main = ({ user, orderBy, rangeFrom, category }) => {
  const [sort, setSort] = useState(orderBy || SortFilter[0]);
  const [range, setRange] = useState(rangeFrom || RangeFilter[2]);
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
            category={category}
          />
        </div>
      </div>
    </>
  );
};

export default Main;

import React, { useState } from 'react';
import { IoArrowDownOutline } from 'react-icons/io5';
import Link from 'next/link';

const stacks = [
  {
    label: 'Go',
    type: 'go',
    icon: 'SiGo',
  },
  {
    label: 'JavaScript',
    type: 'javascript',
    icon: 'SiJavascript',
  },
  {
    label: 'NodeJS',
    type: 'nodejs',
    icon: 'SiNodedotjs',
  },
  {
    label: 'Python',
    type: 'pythin',
    icon: 'SiPython',
  },
  {
    label: 'React',
    type: 'react',
    icon: 'SiReact',
  },
  {
    label: 'Ruby',
    type: 'ruby',
    icon: 'SiRuby',
  },
];

const stageOptions = [
  'Bootstrapped',
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B+',
  'Funded',
  'Profitable',
  // 'Private',
  // 'Public',
];

const FilterTeams = ({ setCreateTeamPanel }) => {
  const [isHiring, setIsHiring] = useState(false);

  return (
    <div className="absolute right-0 xl:right-10 2xl:right-12 top-32 w-52 2xl:w-64 hidden xl:block">
      <div className="fixed w-56 space-y-6">
        <div className="">
          <div className="flex space-x-2 items-center">
            <IoArrowDownOutline className="w-auto h-4 text-slate-100" />
            <span className="font-medium text-slate-100 text-base">
              Filter by stack
            </span>
          </div>

          <ul className="max-h-[78vh] overflow-visible no-scrollbar">
            {stacks.map((item, index) => (
              <li key={index}>
                <button
                  href="#"
                  className="group relative text-sm px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg whitespace-nowrap font-medium text-slate-500 hover:text-white hover:bg-tfsdark-600 w-full text-left"
                >
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-tfsdark-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-tfsdark-600 before:content-[''] group-hover:opacity-100">
                    Filter not active
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex space-x-2 items-center mb-2">
            <IoArrowDownOutline className="w-auto h-4 text-slate-100" />
            <span className="font-medium text-slate-100 text-base">
              Filter by stage
            </span>
          </div>

          <ul className="max-h-[78vh] overflow-scroll no-scrollbar">
            {stageOptions.map((stage, index) => (
              <li key={index}>
                <button
                  href="#"
                  className="group relative text-sm px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg whitespace-nowrap font-medium text-slate-500 hover:text-white hover:bg-tfsdark-600 w-full text-left"
                >
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-tfsdark-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-tfsdark-600 before:content-[''] group-hover:opacity-100">
                    Filter not active
                  </span>
                  <span>{stage}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative group mt-6 ml-6 flex items-center space-x-2 text-sm font-medium text-slate-500">
            <span>Hiring?</span>
            <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-tfsdark-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-tfsdark-600 before:content-[''] group-hover:opacity-100">
              Filter not active
            </span>
            <button
              type="button"
              className={
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 ' +
                (isHiring ? 'bg-green-500' : 'bg-tfsdark-600')
              }
              onClick={() => setIsHiring(!isHiring)}
            >
              <span
                className={
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ' +
                  (isHiring ? 'translate-x-5' : 'translate-x-0')
                }
              ></span>
            </button>
          </div>
        </div>
        <div className="pl-6 space-y-4">
          <Link href="/resources/contact/teams">
            <button className="text-sm text-slate-500">
              Questions or feedback?
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilterTeams;

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
    <div className="absolute right-0 top-32 hidden w-52 xl:right-10 xl:block 2xl:right-12 2xl:w-64">
      <div className="fixed w-56 space-y-6">
        <div className="">
          <div className="flex items-center space-x-2">
            <IoArrowDownOutline className="h-4 w-auto text-base-100" />
            <span className="text-base font-medium text-base-100">
              Filter by stack
            </span>
          </div>

          <ul className="no-scrollbar max-h-[78vh] overflow-visible">
            {stacks.map((item, index) => (
              <li key={index}>
                <button
                  href="#"
                  className="group relative w-full whitespace-nowrap rounded-lg px-3 py-1.5 text-left text-sm font-medium text-base-500 hover:bg-base-600 hover:text-white sm:px-6 sm:py-2"
                >
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-base-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-base-600 before:content-[''] group-hover:opacity-100">
                    Filter not active
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center space-x-2">
            <IoArrowDownOutline className="h-4 w-auto text-base-100" />
            <span className="text-base font-medium text-base-100">
              Filter by stage
            </span>
          </div>

          <ul className="no-scrollbar max-h-[78vh] overflow-scroll">
            {stageOptions.map((stage, index) => (
              <li key={index}>
                <button
                  href="#"
                  className="group relative w-full whitespace-nowrap rounded-lg px-3 py-1.5 text-left text-sm font-medium text-base-500 hover:bg-base-600 hover:text-white sm:px-6 sm:py-2"
                >
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-base-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-base-600 before:content-[''] group-hover:opacity-100">
                    Filter not active
                  </span>
                  <span>{stage}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="group relative mt-6 ml-6 flex items-center space-x-2 text-sm font-medium text-base-500">
            <span>Hiring?</span>
            <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-base-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-base-600 before:content-[''] group-hover:opacity-100">
              Filter not active
            </span>
            <button
              type="button"
              className={
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 ' +
                (isHiring ? 'bg-green-500' : 'bg-base-600')
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
        <div className="space-y-4 pl-6">
          <Link href="/resources/contact/teams">
            <button className="text-sm text-base-500">
              Questions or feedback?
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilterTeams;

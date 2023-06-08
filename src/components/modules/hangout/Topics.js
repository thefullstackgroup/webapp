import React from 'react';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { IoArrowDownOutline } from 'react-icons/io5';
import * as Icons from 'react-icons/hi';
import { IoCodeSlashSharp } from 'react-icons/io5';
import Icon from 'components/common/elements/Icon';
import { useRouter } from 'next/router';
import Link from 'next/link';

const topics = [
  {
    label: 'All topics',
    slug: '',
    icon: 'FiHash',
  },
  {
    label: 'Sparks',
    slug: 'spark',
    icon: 'FiZap',
  },
  {
    label: 'Braindumps',
    slug: 'post',
    icon: 'FiCloud',
  },
  {
    label: 'Frameworks',
    slug: 'frameworks',
    icon: 'FiMaximize',
  },
  {
    label: 'Utilities',
    slug: 'utilities',
    icon: 'FiTerminal',
  },
  {
    label: 'Articles',
    slug: 'article',
    icon: 'FiFileText',
  },
  {
    label: 'Polls',
    slug: 'poll',
    icon: 'FiPieChart',
  },
  {
    label: 'Tutorials',
    slug: 'tutorials',
    icon: 'FiYoutube',
  },
  {
    label: 'Learning',
    slug: 'learning',
    icon: 'FiBookOpen',
  },
  {
    label: 'Career advice',
    slug: 'career_advice',
    icon: 'FiBriefcase',
  },
  {
    label: 'Working remote',
    slug: 'working_remotely',
    icon: 'FiCast',
  },
  {
    label: 'My desk setup',
    slug: 'desk_setup',
    icon: 'FiMonitor',
  },
  {
    label: 'Design tips',
    slug: 'design_tips',
    icon: 'FiDroplet',
  },
  {
    label: 'Memes',
    slug: 'meme',
    icon: 'FiSmile',
  },
  {
    label: 'Project ideas',
    slug: 'project_ideas',
    icon: 'FiLoader',
  },
  {
    label: 'Pair up',
    slug: 'collabs',
    icon: 'FiUsers',
  },
];

const Topics = ({ topic }) => {
  const router = useRouter();

  return (
    <div className="fixed top-16 w-72 rounded-md px-6 pt-6">
      <div className="mb-4 flex items-center space-x-2">
        <span className="text-lg font-semibold">Filter by #topic</span>
      </div>

      <ul className="no-scrollbar max-h-[78vh] overflow-scroll">
        {topics.map((item, index) => (
          <li key={index} className="mb-1">
            <Link href={`/hangout/${item.slug}`} passHref>
              <a
                href="#"
                className={
                  'flex w-full items-center space-x-3 rounded-md py-1.5 text-left text-base hover:text-base-900 dark:hover:text-white  ' +
                  (topic === item.slug
                    ? 'text-base-900 dark:text-white dark:hover:bg-base-900'
                    : 'text-base-400 hover:text-base-900 dark:text-base-400 dark:hover:text-base-500')
                }
              >
                <Icon name={`${item.icon}`} />
                <span className="relative">
                  {item.label}
                  {item.slug === 'article' && (
                    <span className="absolute top-0 -right-3 h-2 w-2 rounded-full bg-red-500 px-1"></span>
                  )}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;

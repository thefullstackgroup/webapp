import { useState } from 'react';
import Avatar from 'components/common/elements/Avatar';
import Projects from 'components/modules/account/dashboard/Projects';
import Followers from 'components/modules/account/dashboard/Followers';
import Following from 'components/modules/account/dashboard/Following';
import Saved from 'components/modules/account/dashboard/Saved';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import {
  IoApps,
  IoArrowRedoOutline,
  IoEyeOutline,
  IoHeartOutline,
  IoPersonAddOutline,
} from 'react-icons/io5';
import ToolTip from 'components/common/elements/ToolTip';
import Icon from 'components/common/elements/Icon';

const tabs = [
  {
    label: 'My Projects',
    tab: 1,
  },
  {
    label: 'Saved Projects',
    tab: 2,
  },
  {
    label: 'Followers',
    tab: 3,
  },
  {
    label: 'Following',
    tab: 4,
  },
];

const Main = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState({
    label: 'Projects',
    tab: 1,
  });

  const viewsURL = `${process.env.BASEURL}/api/stats/profile/getStats`;
  const { data: views } = useSWR(viewsURL, fetcher);
  const numberOfViews = views ? views.totalUniqueProfileViewCount : 0;
  const numberOfReactions = views ? views.totalNumberOfReactions : 0;

  const viewsLastWeekURL = `${process.env.BASEURL}/api/stats/profile/getStats?range=7`;
  const { data: viewsLastWeek } = useSWR(viewsLastWeekURL, fetcher);

  const numberOfViewsLastWeek = viewsLastWeek
    ? viewsLastWeek.totalUniqueProfileViewCount
    : 0;
  const numberOfReactionsLastWeek = viewsLastWeek
    ? viewsLastWeek.totalNumberOfReactions
    : 0;

  const viewsDiff = (numberOfViewsLastWeek / numberOfViews) * 100;
  const reactionsDiff = (numberOfReactionsLastWeek / numberOfReactions) * 100;

  const followersURL = `${process.env.BASEURL}/api/profile/social/followers`;
  const { data: followers } = useSWR(followersURL, fetcher);
  const numberOfFollowers = followers ? followers.length : 0;

  return (
    <>
      <div className="mx-auto mt-0 w-full max-w-5xl justify-center lg:mt-6">
        <div className="hidden w-full py-4 text-4xl font-medium tracking-tight sm:block">
          Dashboard
        </div>

        <div className="mb-6 grid grid-cols-2 items-center justify-evenly gap-4 lg:grid-cols-4">
          <div className="flex w-full flex-col space-y-2 rounded-md border border-base-200 px-4 py-3 dark:border-base-700">
            <div className="flex items-center space-x-1 whitespace-nowrap text-base-400">
              <Icon name={'FiEye'} className="h-4 w-4" />
              <span className="text-sm font-semibold">Profile views</span>
            </div>
            <div className="text-2xl font-medium sm:text-3xl">
              {numberOfViews}

              {viewsDiff > 0 ? (
                <span className="pl-2 text-base text-green-500">
                  +{viewsDiff.toFixed(1)}%
                </span>
              ) : (
                <span className="pl-2 text-base font-normal tracking-tighter text-orange-500">
                  ~ no change
                </span>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col space-y-2 rounded-md border border-base-200 px-4 py-3 dark:border-base-700">
            <div className="flex items-center space-x-1 whitespace-nowrap text-base-400">
              <Icon name={'FiHeart'} className="h-4 w-4" />
              <span className="text-sm font-semibold">Reactions</span>
            </div>
            <div className="text-2xl font-medium sm:text-3xl">
              {numberOfReactions}

              {reactionsDiff > 0 ? (
                <span className="pl-2 text-base text-green-500">
                  +{reactionsDiff.toFixed(1)}%
                </span>
              ) : (
                <span className="pl-2 text-base font-normal tracking-tighter text-orange-500">
                  ~ no change
                </span>
              )}
            </div>
          </div>

          <div className="group relative flex w-full flex-col space-y-2 rounded-md border border-base-200 px-4 py-3 dark:border-base-700">
            <div className="flex items-center space-x-1 whitespace-nowrap text-base-400">
              <Icon name={'FiShare2'} className="h-4 w-4" />
              <span className="text-sm font-semibold">Shares</span>
            </div>
            <div className="text-2xl font-medium sm:text-3xl">--</div>
            <ToolTip message={'Profile shares coming soon'} />
          </div>
          <div className="flex w-full flex-col space-y-2 rounded-md border border-base-200 px-4 py-3 dark:border-base-700">
            <div className="flex items-center space-x-1 whitespace-nowrap text-base-400">
              <Icon name={'FiUsers'} className="h-4 w-4" />
              <span className="text-sm font-semibold">Followers</span>
            </div>
            <div className="text-2xl font-medium sm:text-3xl">
              {numberOfFollowers}
            </div>
          </div>
        </div>

        <div className="no-scrollbar flex w-auto gap-2 overflow-x-scroll px-0">
          {tabs.map((tab, index) => (
            <button
              className={
                tab.tab == selectedTab?.tab ? `btn-pill-active` : `btn-pill`
              }
              key={index}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>{selectedTab.tab == 1 && <Projects user={user} />}</div>
        <div>{selectedTab.tab == 2 && <Saved user={user} />}</div>
        <div>{selectedTab.tab == 3 && <Followers user={user} />}</div>
        <div>{selectedTab.tab == 4 && <Following user={user} />}</div>
      </div>
    </>
  );
};

export default Main;

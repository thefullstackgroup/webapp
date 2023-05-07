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
      <div className="mt-0 lg:mt-12 w-full flex justify-center mb-20">
        <div className="min-h-screen w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-4xl mx-auto">
            <div className="pt-2 sm:pt-0 mx-4 md:mx-0 space-y-6">
              <div className="flex items-center space-x-2">
                <IoApps className="h-7 w-7" />
                <div>
                  <h2 className="font-bold text-lg md:text-3xl">Dashboard</h2>
                </div>
              </div>

              <div className="w-1/3 hidden sm:flex whitespace-nowrap items-start space-x-4 px-4 md:px-0 mb-4">
                <Avatar
                  image={user?.profilePicUrl}
                  name={user?.name}
                  dimensions="w-10 h-10 md:w-14 md:h-14"
                  width={500}
                  height={500}
                />
                <div>
                  <h2 className="font-medium font-intertight text-2xl">
                    {user.name}
                  </h2>
                  <h2 className="text-slate-400 text-base">
                    @{user.displayName}
                  </h2>
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-2 lg:grid-cols-4 justify-evenly items-center gap-4">
                  <div className="w-full flex flex-col rounded-md space-y-2 border border-tfsdark-600 px-4 py-3">
                    <div className="flex items-center space-x-1 whitespace-nowrap text-slate-400">
                      <IoEyeOutline className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        Profile views
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-medium">
                      {numberOfViews}

                      {viewsDiff > 0 ? (
                        <span className="pl-2 text-green-500 text-base">
                          +{viewsDiff.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="pl-2 text-orange-500 text-base tracking-tighter font-normal">
                          ~ no change
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full flex flex-col rounded-md space-y-2 border border-tfsdark-600 px-4 py-3">
                    <div className="flex items-center space-x-1 whitespace-nowrap text-slate-400">
                      <IoHeartOutline className="h-4 w-4" />
                      <span className="text-sm font-semibold">Reactions</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-medium">
                      {numberOfReactions}

                      {reactionsDiff > 0 ? (
                        <span className="pl-2 text-green-500 text-base">
                          +{reactionsDiff.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="pl-2 text-orange-500 text-base tracking-tighter font-normal">
                          ~ no change
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="group relative w-full flex flex-col rounded-md space-y-2 border border-tfsdark-600 px-4 py-3">
                    <div className="flex items-center space-x-1 whitespace-nowrap text-slate-400">
                      <IoArrowRedoOutline className="h-4 w-4" />
                      <span className="text-sm font-semibold">Shares</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-medium">--</div>
                    <span className="text-sm pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-tfsdark-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-tfsdark-600 before:content-[''] group-hover:opacity-100">
                      Profile shares coming soon
                    </span>
                  </div>
                  <div className="w-full flex flex-col rounded-md space-y-2 border border-tfsdark-600 px-4 py-3">
                    <div className="flex items-center space-x-1 whitespace-nowrap text-slate-400">
                      <IoPersonAddOutline className="h-4 w-4" />
                      <span className="text-sm font-semibold">Followers</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-medium">
                      {numberOfFollowers}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pb-20">
                <div className="flex overflow-x-scroll no-scrollbar w-auto gap-2 px-0">
                  {tabs.map((tab, index) => (
                    <button
                      className={
                        `text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap font-medium focus:ring-0 focus:border-none ` +
                        (tab.tab == selectedTab?.tab
                          ? `bg-tfsdark-600/70 text-white`
                          : `bg-tfsdark-700/70 text-slate-400 hover:text-white`)
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

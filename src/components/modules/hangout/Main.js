import React, { useState } from 'react';
import Feed from 'components/modules/hangout/Feed';
import CreatePost from 'components/modules/hangout/CreatePost';
import Topics from 'components/modules/hangout/Topics';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const Main = ({ user }) => {
  const [topicSelected, setTopicSelected] = useState();

  const url = `${process.env.BASEURL}/api/profile/social/following?userId=${user.userId}`;
  const { data } = useSWR(url, fetcher);
  const following =
    (data && data?.map(({ followUserId }) => followUserId).join(',')) || null;

  return (
    <>
      <div className="mt-4 flex md:mt-12">
        <div className="mx-auto w-full max-w-2xl overflow-hidden lg:max-w-3xl">
          <div className="w-full">
            <CreatePost user={user} />
            <div className="relative flex space-x-8 border-b border-base-600 px-4 pb-4 text-base sm:border-b-0 sm:px-1">
              {topicSelected && topicSelected?.type !== 'following' && (
                <button className="rounded-md font-semibold text-slate-100">
                  <h3>{topicSelected?.label}</h3>
                </button>
              )}

              <button
                className={`${
                  topicSelected ? 'text-slate-400' : 'text-slate-100'
                } font-semibold `}
                onClick={() => setTopicSelected(null)}
              >
                <h3>Global</h3>
              </button>

              <button
                className={`${
                  topicSelected?.type === 'following'
                    ? 'text-slate-100'
                    : 'text-slate-400'
                } relative font-semibold `}
                onClick={() => {
                  setTopicSelected({
                    label: 'Following',
                    type: 'following',
                    icon: '',
                  });
                  sendSlackMessage(
                    `HANGOUT: ${user.name} has selected the Following tab.`
                  );
                }}
              >
                <h3>Following </h3>
                <div className="absolute -top-2 -right-10">
                  <span className="rounded-xl border border-green-700 py-0.5 px-1 text-[0.7em] text-green-600">
                    Beta
                  </span>
                </div>
              </button>
            </div>
          </div>

          <Feed user={user} topic={topicSelected?.type} following={following} />
        </div>
      </div>
      <Topics topic={topicSelected} setTopicSelected={setTopicSelected} />
    </>
  );
};

export default Main;

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
      <div className="mt-4 md:mt-12 flex">
        <div className="w-full max-w-2xl lg:max-w-3xl overflow-hidden mx-auto">
          <div className="w-full">
            <CreatePost user={user} />
            <div className="text-base flex space-x-8 relative px-4 sm:px-1 pb-4 border-b sm:border-b-0 border-tfsdark-600">
              {topicSelected && topicSelected?.type !== 'following' && (
                <button className="text-slate-100 rounded-md font-semibold">
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
                } font-semibold relative `}
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
                  <span className="border border-green-700 py-0.5 px-1 rounded-xl text-green-600 text-[0.7em]">
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

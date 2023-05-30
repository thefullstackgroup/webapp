import React, { useState } from 'react';
import Feed from 'components/modules/hangout/Feed';
import CreatePost from 'components/modules/hangout/CreatePost';
import Topics from 'components/modules/hangout/Topics';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const Main = ({ user }) => {
  const [topicSelected, setTopicSelected] = useState();

  // const url = `${process.env.BASEURL}/api/profile/social/following?userId=${user?.userId}`;
  // const { data } = useSWR(url, fetcher);
  // const following =
  //   (data && data?.map(({ followUserId }) => followUserId).join(',')) || null;

  return (
    <>
      <div className="flex gap-20">
        <div className="w-1/5">
          <Topics topic={topicSelected} setTopicSelected={setTopicSelected} />
        </div>
        <div className="min-h-screen w-3/5 border-l border-r border-base-200 dark:border-base-700">
          <div className="w-full">
            <CreatePost user={user} />
            <div className="relative flex space-x-4 border-b border-base-200 px-8 pb-4 dark:border-base-600">
              <button
                className={
                  topicSelected?.type == null ? 'btn-pill-active' : 'btn-pill'
                }
                onClick={() => setTopicSelected(null)}
              >
                Global
              </button>

              {topicSelected && topicSelected?.type !== 'following' && (
                <button className="btn-pill-active">
                  &rarr; {topicSelected?.label}
                </button>
              )}

              <button
                className={
                  topicSelected?.type === 'following'
                    ? 'btn-pill-active relative'
                    : 'btn-pill relative'
                }
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
                Following
                <div className="absolute -top-2 -right-4">
                  <span className="rounded-xl border border-green-700 bg-base-50 py-0.5 px-1 text-[0.7em] text-green-600 dark:bg-base-900">
                    Beta
                  </span>
                </div>
              </button>
            </div>
          </div>

          <Feed user={user} topic={topicSelected?.type} following={null} />
        </div>
        <div className="w-1/5"></div>
      </div>
    </>
  );
};

export default Main;

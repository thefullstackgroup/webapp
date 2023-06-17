import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { useMemo } from 'react';
import Avatar from 'components/common/elements/Avatar';
import FollowingCard from 'components/common/cards/FollowingCard';

const Activity = ({ user, following }) => {
  let url = `${process.env.BASEURL}/api/explore/getActivity?range=100&size=10&following=${following}`;
  const { data } = useSWR(url, fetcher);

  return (
    <div className="sticky top-20 rounded-md px-6 pt-4">
      <div className="w-full space-y-5 rounded-lg border border-base-200 bg-base-50 px-4 py-4 dark:border-base-700 dark:bg-transparent">
        <span className="text-lg font-semibold">Activity</span>

        {data &&
          data.map((post, index) => (
            <FollowingCard post={post} user={user} key={post.id} />
          ))}
      </div>
    </div>
  );
};

export default Activity;

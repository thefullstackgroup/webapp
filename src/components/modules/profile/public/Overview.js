import React from 'react';
import Avatar from 'components/common/elements/Avatar';
import Link from 'next/link';

const Overview = ({ profile }) => {
  return (
    <>
      <div className="-mt-28 w-full">
        <div className="mt-12 flex justify-center">
          <Avatar
            image={profile.profilePicUrl}
            name={profile.name}
            dimensions="h-32 w-32 ring-4 ring-primary-500"
            width={500}
            height={500}
          />
        </div>
        <div className="mt-4 w-full bg-base-700 px-4 sm:px-14">
          <h1 className="text-center text-2xl font-bold tracking-tight text-white md:text-3xl">
            {profile.name}
          </h1>
          <p className="text-center text-base font-medium text-base-400">
            {profile.currentTitle}
          </p>
          <p className="mt-2 text-center text-base text-base-200">
            {profile.bio.aboutUser}
          </p>
          <div className="mt-4 text-center">
            <Link href="/signup">
              <button className="btn-primary rounded-full px-8">Connect</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;

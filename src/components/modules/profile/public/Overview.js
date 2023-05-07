import React from 'react';
import Avatar from 'components/common/elements/Avatar';
import Link from 'next/link';

const Overview = ({ profile }) => {
  return (
    <>
      <div className="-mt-28 w-full">
        <div className="flex justify-center mt-12">
          <Avatar
            image={profile.profilePicUrl}
            name={profile.name}
            dimensions="h-32 w-32 ring-4 ring-primary-500"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full mt-4 bg-tfsdark-700 px-4 sm:px-14">
          <h1 className="text-center text-2xl md:text-3xl tracking-tight text-white font-bold">
            {profile.name}
          </h1>
          <p className="text-center text-base font-medium text-slate-400">
            {profile.currentTitle}
          </p>
          <p className="text-center text-base text-slate-200 mt-2">
            {profile.bio.aboutUser}
          </p>
          <div className="mt-4 text-center">
            <Link href="/signup">
              <button className="btn-primary px-8 rounded-full">Connect</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;

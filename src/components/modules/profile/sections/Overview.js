import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Moment from 'moment';
import lookup from 'country-code-lookup';
import Actions from 'components/modules/profile/Actions';
import Avatar from 'components/common/elements/Avatar';
import TagStack from 'components/common/tags/TagStack';
import Social from 'components/modules/profile/sections/Social';
import { countryCodeEmoji } from 'country-code-emoji';
import { HiThumbUp } from 'react-icons/hi';
import {
  IoCalendarNumberOutline,
  IoCameraOutline,
  IoChevronDown,
  IoChevronUp,
  IoPeopleSharp,
} from 'react-icons/io5';

const Overview = ({
  profile,
  user,
  isConnected,
  isConnectionPending,
  teams,
  setShowEditProfile,
  setUploadVideoIntroPanel,
}) => {
  const [showStacks, setShowStacks] = useState(false);
  const [myProfileImage, setMyProfileImage] = useState(user.profilePicUrl);
  const countryCode = profile ? lookup.byCountry(profile?.country) : null;

  const handleFileChange = async (event) => {
    event.preventDefault();

    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('id', user.userId);
      formData.append('file', event.target.files[0]);

      await axios
        .post(`${process.env.BASEURL}/api/profile/avatar/upload`, formData)
        .then((response) => {
          setMyProfileImage(response.data.url);
          const profileData = {
            profilePicUrl: response.data.url,
          };

          axios.patch(
            `${process.env.BASEURL}/api/profile/update`,
            profileData,
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );
        });
    }
  };

  return (
    <div className="relative max-w-screen-lg mx-auto px-4 md:px-0 border-b md:border-none border-tfsdark-700 mb-4 md:mb-0">
      <div className="mt-2 md:mt-10 lg:mb-8 lg:flex items-start justify-between lg:space-x-4 md:border-none border-tfsdark-700 pb-4 lg:pb-4">
        <div className="flex items-center lg:items-start space-x-4 md:space-x-8 w-full">
          <div className="relative mt-1">
            <Avatar
              userId={profile?.userId}
              image={
                profile?.userId === user.userId
                  ? myProfileImage
                  : profile?.profilePicUrl
              }
              name={profile?.name}
              dimensions="w-20 h-20 md:w-36 md:h-36 ring-4 ring-primary-500"
              width={500}
              height={500}
              layout="fill"
            />
            {isConnected && profile?.userId !== user.userId && (
              <div className="absolute group -bottom-2 md:-bottom-2 -left-1 md:left-0 text-yellow-500 text-xs flex items-center space-x-1 bg-tfsdark-700 py-1 px-2 rounded-full cursor-pointer">
                <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-tfsdark-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-tfsdark-600 before:content-[''] group-hover:opacity-100">
                  You are connected
                </span>
                <HiThumbUp className="h-4 w-4 md:h-5 md:w-5" />
                <span>Buddy</span>
              </div>
            )}
            {profile?.userId === user.userId && (
              <div className="absolute top-4 left-5 md:top-10 md:left-12 h-8 w-10 md:h-12 md:w-12">
                <label
                  htmlFor="avatar"
                  className="relative cursor-pointer font-medium focus:outline-none focus:ring-0 text-center text-xs flex flex-col justify-center"
                >
                  <IoCameraOutline className="text-white opacity-90 h-8 w-8 mx-auto md:h-full md:w-full" />
                  <span className="text-white">Edit</span>
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    className="sr-only"
                    onChange={(e) => handleFileChange(e)}
                  />
                </label>
              </div>
            )}
          </div>

          <div className="md:pr-4 w-full">
            <div className="lg:flex items-baseline md:space-x-2">
              <h2 className="font-bold text-xl md:text-3xl">{profile?.name}</h2>
              <p className="text-slate-500 text-sm md:text-base">
                @{profile?.displayName}
              </p>
            </div>
            <div className="text-sm lg:text-base text-slate-300">
              {profile?.currentTitle}
            </div>
            <div className="mt-2 mb-3 hidden lg:flex space-x-3 items-center text-sm text-slate-500">
              {profile?.country && countryCode && (
                <div className="flex space-x-1 items-center">
                  <span>{countryCodeEmoji(countryCode.iso2)}</span>
                  <span className="capitalize">{profile?.country}</span>
                </div>
              )}
              <div className="flex space-x-1 items-center">
                <IoCalendarNumberOutline className="h-4 w-4" />
                <span>
                  Joined {Moment(profile?.createdDate).format('MMMM YYYY')}
                </span>
              </div>
              {teams?.data[0]?.status === 'ACTIVE' && teams?.data?.length > 0 && (
                <Link href={`/teams/${teams.data[0].id}`} passHref>
                  <a className="flex items-center space-x-1 group">
                    <span className="rounded-full border border-tfsdark-600 px-2 text-[0.7em] text-slate-400">
                      Team
                    </span>
                    <span className="group-hover:text-slate-100">
                      {teams.data[0].name}
                    </span>
                  </a>
                </Link>
              )}
            </div>

            <div className="hidden lg:block text-base text-slate-200 mt-3 cursor-pointer">
              {profile?.bio?.aboutUser}
            </div>

            <div
              className="hidden lg:flex flex-wrap mt-4 w-full cursor-pointer"
              onClick={() => setShowStacks(!showStacks)}
            >
              {showStacks
                ? profile?.userTechStacks?.map(
                    (stack, index) =>
                      stack != null && (
                        <TagStack tech={stack} key={index} size="xs" />
                      )
                  )
                : profile?.userTechStacks?.map(
                    (stack, index) =>
                      stack != null &&
                      index < 12 && (
                        <TagStack tech={stack} key={index} size="xs" />
                      )
                  )}

              {profile?.userTechStacks.length > 12 &&
                (showStacks ? (
                  <button
                    className="flex items-center space-x-1 text-xs text-slate-400"
                    onClick={() => setShowStacks(true)}
                  >
                    <IoChevronUp />
                    <span>Less</span>
                  </button>
                ) : (
                  <button
                    className="flex items-center space-x-1 text-xs text-slate-400"
                    onClick={() => setShowStacks(true)}
                  >
                    <IoChevronDown />
                    <span>More</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className="hidden lg:block mt-2">
          <Actions
            isConnected={isConnected}
            isConnectionPending={isConnectionPending}
            profile={profile}
            myProfile={user}
            setShowEditProfile={setShowEditProfile}
            setUploadVideoIntroPanel={setUploadVideoIntroPanel}
          />
        </div>
      </div>

      <div className="block lg:hidden text-sm text-slate-200 cursor-pointer">
        {profile?.bio?.aboutUser}
      </div>

      <div className="block lg:hidden mt-2">
        <Social social={profile} />
      </div>

      <div className="flex mt-2 lg:hidden space-x-4 items-center text-xs text-slate-500">
        {profile?.country && countryCode && (
          <div className="flex space-x-1 items-center">
            <span>{countryCodeEmoji(countryCode.iso2)}</span>
            <span className="capitalize">{profile?.country}</span>
          </div>
        )}
        <div className="flex space-x-1 items-center">
          <IoCalendarNumberOutline className="h-4 w-4" />
          <span>Joined {Moment(profile?.createdDate).format('MMMM YYYY')}</span>
        </div>

        {teams?.data[0]?.status === 'ACTIVE' && teams?.data?.length > 0 && (
          <Link href={`/teams/${teams.data[0].id}`} passHref>
            <a className="flex items-center space-x-1 group">
              <span className="rounded-full border border-tfsdark-600 px-1.5 text-[0.7em] text-slate-400">
                Team
              </span>
              <span className="group-hover:text-slate-100">
                {teams.data[0].name}
              </span>
            </a>
          </Link>
        )}
      </div>

      <div
        className="flex lg:hidden mt-3 -ml-1 w-full cursor-pointer overflow-x-scroll no-scrollbar"
        onClick={() => setShowStacks(!showStacks)}
      >
        {profile?.userTechStacks?.map(
          (stack, index) =>
            stack != null && <TagStack tech={stack} key={index} size="xs" />
        )}
      </div>

      <div className="lg:hidden mt-4 mb-6">
        <Actions
          isConnected={isConnected}
          isConnectionPending={isConnectionPending}
          profile={profile}
          myProfile={user}
          setShowEditProfile={setShowEditProfile}
          setUploadVideoIntroPanel={setUploadVideoIntroPanel}
        />
      </div>
    </div>
  );
};

export default Overview;

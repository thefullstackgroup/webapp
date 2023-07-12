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
} from 'react-icons/io5';
import ToolTip from 'components/common/elements/ToolTip';

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
  const [myProfileImage, setMyProfileImage] = useState(user?.profilePicUrl);
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
    <div className="relative mb-4 border-b border-base-200 px-4 dark:border-base-700 md:mb-0 md:border-none lg:px-0">
      <div className="mt-2 items-start justify-between border-base-700 pb-4 md:mt-10 md:border-none lg:mb-8 lg:flex lg:space-x-4 lg:pb-4">
        <div className="flex w-full items-center space-x-3 lg:flex-row lg:items-start lg:space-x-8">
          <div className="relative mt-1 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-blue-600 p-0.5 lg:p-1">
            <div className="relative rounded-full bg-base-50 dark:bg-base-900">
              <Avatar
                userId={profile?.userId}
                image={
                  profile?.userId === user?.userId
                    ? myProfileImage
                    : profile?.profilePicUrl
                }
                name={profile?.name}
                dimensions="w-20 h-20 md:w-36 md:h-36"
                width={500}
                height={500}
                layout="fill"
              />
              {user && isConnected && profile?.userId !== user.userId && (
                <div className="group absolute top-0 right-0 flex cursor-pointer items-end rounded-full bg-base-900 py-1 px-2 text-xs text-yellow-400">
                  <ToolTip message={'You are both connected'} />
                  <HiThumbUp className="h-4 w-4 md:h-5 md:w-5" />
                </div>
              )}
              {user && profile?.userId === user.userId && (
                <div className="absolute top-4 left-5 h-8 w-10 md:top-10 md:left-12 md:h-12 md:w-12">
                  <label
                    htmlFor="avatar"
                    className="relative flex cursor-pointer flex-col justify-center text-center text-xs font-medium focus:outline-none focus:ring-0"
                  >
                    <IoCameraOutline className="mx-auto h-8 w-8 text-white opacity-90 md:h-full md:w-full" />
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
          </div>

          <div className="w-full lg:pr-4">
            <div className="items-baseline lg:flex lg:space-x-2">
              <h2 className="mb-0 font-manrope text-2xl font-bold md:text-3xl">
                {profile?.name}
              </h2>
              <p className="text-sm text-base-500 md:text-base">
                @{profile?.displayName}
              </p>
            </div>
            <div className="text-sm text-base-700 dark:text-base-300 lg:text-base">
              {profile?.currentTitle}
            </div>

            <div className="mt-3 hidden cursor-pointer text-base lg:block">
              {profile?.bio?.aboutUser}
            </div>

            <div className="mt-3 mb-3 hidden items-center space-x-3 text-sm text-base-500 lg:flex">
              {profile?.country && countryCode && (
                <div className="flex items-center space-x-1">
                  <span>{countryCodeEmoji(countryCode.iso2)}</span>
                  <span className="capitalize">{profile?.country}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <IoCalendarNumberOutline className="h-4 w-4" />
                <span>
                  Joined {Moment(profile?.createdDate).format('MMMM YYYY')}
                </span>
              </div>
              {teams?.data[0]?.status === 'ACTIVE' &&
                teams?.data?.length > 0 && (
                  <Link href={`/teams/${teams.data[0].id}`} passHref>
                    <a className="group flex items-center space-x-1">
                      <span className="rounded-full border border-base-600 px-2 text-[0.7em] text-base-400">
                        Team
                      </span>
                      <span className="group-hover:text-base-100">
                        {teams.data[0].name}
                      </span>
                    </a>
                  </Link>
                )}
            </div>

            <div
              className="mt-4 hidden w-full cursor-pointer flex-wrap lg:flex"
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

              {profile?.userTechStacks?.length > 12 &&
                (showStacks ? (
                  <button
                    className="flex items-center space-x-1 text-xs text-base-400"
                    onClick={() => setShowStacks(true)}
                  >
                    <IoChevronUp />
                    <span>Less</span>
                  </button>
                ) : (
                  <button
                    className="flex items-center space-x-1 text-xs text-base-400"
                    onClick={() => setShowStacks(true)}
                  >
                    <IoChevronDown />
                    <span>More</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-2 hidden lg:block">
          <Actions
            isConnected={isConnected}
            isConnectionPending={isConnectionPending}
            profile={profile}
            myProfile={user}
            setShowEditProfile={setShowEditProfile}
            setUploadVideoIntroPanel={setUploadVideoIntroPanel}
          />
        </div>
        {!user && (
          <div className="hidden items-center space-x-2 lg:flex">
            <Link href="/signup">
              <button className="btn btn-secondary">Follow</button>
            </Link>
            <Link href="/signup">
              <button className="btn btn-primary">Connect</button>
            </Link>
          </div>
        )}
      </div>

      <div className="block cursor-pointer text-sm text-base-600 dark:text-base-300 lg:hidden">
        {profile?.bio?.aboutUser}
      </div>

      <div className="mt-2 block lg:hidden">
        <Social social={profile} />
      </div>

      <div className="mt-2 flex items-center space-x-4 text-xs text-base-500 lg:hidden">
        {profile?.country && countryCode && (
          <div className="flex items-center space-x-1">
            <span>{countryCodeEmoji(countryCode.iso2)}</span>
            <span className="capitalize">{profile?.country}</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <IoCalendarNumberOutline className="h-4 w-4" />
          <span>Joined {Moment(profile?.createdDate).format('MMMM YYYY')}</span>
        </div>

        {teams?.data[0]?.status === 'ACTIVE' && teams?.data?.length > 0 && (
          <Link href={`/teams/${teams.data[0].id}`} passHref>
            <a className="group flex items-center space-x-1">
              <span className="rounded-full border border-base-600 px-1.5 text-[0.7em] text-base-400">
                Team
              </span>
              <span className="group-hover:text-base-100">
                {teams.data[0].name}
              </span>
            </a>
          </Link>
        )}
      </div>

      <div
        className="no-scrollbar mt-3 -ml-1 flex w-full cursor-pointer overflow-x-scroll px-1 lg:hidden"
        onClick={() => setShowStacks(!showStacks)}
      >
        {profile?.userTechStacks?.map(
          (stack, index) =>
            stack != null && <TagStack tech={stack} key={index} size="xs" />
        )}
      </div>

      <div className="mt-4 mb-6 lg:hidden">
        <Actions
          isConnected={isConnected}
          isConnectionPending={isConnectionPending}
          profile={profile}
          myProfile={user}
          setShowEditProfile={setShowEditProfile}
          setUploadVideoIntroPanel={setUploadVideoIntroPanel}
        />

        {!user && (
          <div className="flex items-center space-x-2 lg:hidden">
            <Link href="/signup">
              <button className="btn btn-secondary w-full">Follow</button>
            </Link>
            <Link href="/signup">
              <button className="btn btn-primary">Connect</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;

import ButtonConnect from 'components/common/buttons/Connect';
import ButtonChat from 'components/common/buttons/Chat';
import ButtonFollow from 'components/common/buttons/Follow';
import ButtonReport from 'components/common/buttons/Report';
import ToolTip from 'components/common/elements/ToolTip';
import Link from 'next/link';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import Icon from 'components/common/elements/Icon';

const Actions = ({
  isConnected,
  isConnectionPending,
  profile,
  myProfile,
  setShowEditProfile,
  setUploadVideoIntroPanel,
}) => {
  return (
    <div className="flex items-center justify-start space-x-3">
      {myProfile && profile?.userId !== myProfile?.userId && (
        <ButtonFollow
          followToUser={profile?.userId}
          followFromUser={myProfile?.userId}
          followToName={profile?.displayName}
        />
      )}

      {myProfile && !isConnected && profile?.userId !== myProfile?.userId && (
        <ButtonConnect
          connectionPending={isConnectionPending}
          connectFrom={myProfile}
          connectTo={profile}
        />
      )}

      {myProfile && isConnected && profile?.userId !== myProfile?.userId && (
        <div>
          <ButtonChat profile={profile} myProfile={myProfile} />
        </div>
      )}

      {myProfile && profile?.userId !== myProfile?.userId && (
        <div>
          <ButtonReport user={myProfile} profile={profile} />
        </div>
      )}

      {profile?.userId === myProfile?.userId && (
        <>
          <button
            className="btn btn-secondary w-full md:w-auto"
            onClick={() => setShowEditProfile(true)}
          >
            <span className="whitespace-nowrap">Edit profile</span>
          </button>

          <button
            className="btn btn-ghost group relative px-4"
            onClick={() => {
              setUploadVideoIntroPanel(true);
              sendSlackMessage(
                `Clicked on video intro and might add to their profile.`
              );
            }}
          >
            <ToolTip message="Your video intro" />
            <Icon name="FiPlayCircle" className="h-6 w-6" />
          </button>

          <Link href="/account/settings">
            <button className="btn btn-ghost group relative px-0">
              <ToolTip message="Settings" />
              <Icon name="FiSettings" className="h-6 w-6" />
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Actions;

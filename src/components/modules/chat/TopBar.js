import Avatar from 'components/common/elements/Avatar';
import Link from 'next/link';
import ReportButton from 'components/common/buttons/Report';

const TopBar = ({ user, chatUserInfo }) => {
  if (!chatUserInfo)
    return (
      <div className="px-8 py-4 text-xs text-base-500">Loading user...</div>
    );
  return (
    <div className="flex h-16 w-full items-center space-x-2 border-b border-base-700 px-4 sm:px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full justify-start space-x-2">
          {chatUserInfo && (
            <Avatar
              image={chatUserInfo?.profilePicUrl}
              name={chatUserInfo?.name}
              href={`/${chatUserInfo?.displayName}`}
              dimensions="h-8 w-8"
            />
          )}

          {chatUserInfo && (
            <Link href={`/${chatUserInfo?.displayName}`}>
              <div className="flex cursor-pointer items-center space-x-2">
                <span className="font-bold">{chatUserInfo?.name}</span>
                <span className="hidden text-sm font-normal text-gray-400 md:block">
                  @{chatUserInfo?.displayName}
                </span>
              </div>
            </Link>
          )}
        </div>
        <div>
          <ReportButton user={user} profile={chatUserInfo} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

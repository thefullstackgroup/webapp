import Avatar from 'components/common/elements/Avatar';
import Link from 'next/link';
import ReportButton from 'components/common/buttons/Report';

const TopBar = ({ user, chatUserInfo }) => {
  if (!chatUserInfo)
    return (
      <div className="px-8 py-4 text-slate-500 text-xs">Loading user...</div>
    );
  return (
    <div className="flex h-16 w-full px-4 sm:px-6 items-center space-x-2 border-b border-tfsdark-700">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start w-full space-x-2">
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
              <div className="flex items-center space-x-2 cursor-pointer">
                <span className="font-bold">{chatUserInfo?.name}</span>
                <span className="hidden md:block font-normal text-sm text-gray-400">
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

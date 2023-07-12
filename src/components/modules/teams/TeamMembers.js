import Avatar from 'components/common/elements/Avatar';
import Link from 'next/link';

const TeamMembers = ({ title, teamOwner, teamMembers }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">{title}</h3>
      <div className="box">
        <div className="mt-2 flex flex-wrap items-center">
          {teamOwner && (
            <div className="mb-4 flex items-center space-x-3 pr-4 sm:w-1/2">
              <Avatar
                href={`/${teamOwner.displayName}`}
                name={teamOwner.name}
                image={teamOwner.profilePicUrl}
                dimensions="h-12 w-12 sm:h-13 sm:w-13"
              />
              <Link href={`/${teamOwner.displayName}`}>
                <div className="cursor-pointer">
                  <h4 className="font-semibold">
                    {teamOwner.name}
                    <span className="relative -top-2 ml-2 rounded-full bg-base-200 px-2 py-1 text-[0.6em] dark:bg-base-600">
                      Team Owner
                    </span>
                  </h4>
                  <span className="text-sm text-base-400">
                    {teamOwner.currentTitle}
                  </span>
                </div>
              </Link>
            </div>
          )}
          {teamMembers?.map((member) => (
            <div
              className="mb-4 flex items-center space-x-3 pr-4 sm:w-1/2"
              key={member.id}
            >
              <Avatar
                image={member.profilePicUrl}
                href={`/${member.displayName}`}
                dimensions="h-12 w-12 sm:h-13 sm:w-13"
              />
              <Link href={`/${member.displayName}`}>
                <div className="cursor-pointer">
                  <h4 className="font-semibold">{member.name}</h4>
                  <span className="text-sm text-base-400">
                    {member.currentTitle}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;

import Avatar from 'components/common/elements/Avatar';
import Link from 'next/link';

const TeamMembers = ({ title, teamOwner, teamMembers }) => {
  return (
    <div className="space-y-2">
      <p className="font-semibold text-white">{title}</p>
      <div className="divide-base-600/50 rounded-md border border-base-600 bg-base-800 px-5 py-1">
        <div className="mt-4 flex flex-wrap items-center">
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
                    <span className="relative -top-2 ml-2 rounded-full bg-base-600 px-2 py-1 text-[0.6em]">
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

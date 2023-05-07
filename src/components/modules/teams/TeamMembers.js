import Avatar from 'components/common/elements/Avatar';
import Link from 'next/link';

const TeamMembers = ({ title, teamOwner, teamMembers }) => {
  return (
    <div className="space-y-2">
      <p className="text-white font-semibold">{title}</p>
      <div className="bg-tfsdark-800 rounded-md border border-tfsdark-600 divide-tfsdark-600/50 px-5 py-1">
        <div className="flex flex-wrap mt-4 items-center">
          {teamOwner && (
            <div className="flex items-center space-x-3 sm:w-1/2 pr-4 mb-4">
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
                    <span className="relative -top-2 bg-tfsdark-600 text-[0.6em] px-2 py-1 ml-2 rounded-full">
                      Team Owner
                    </span>
                  </h4>
                  <span className="text-slate-400 text-sm">
                    {teamOwner.currentTitle}
                  </span>
                </div>
              </Link>
            </div>
          )}
          {teamMembers?.map((member) => (
            <div
              className="flex items-center space-x-3 sm:w-1/2 pr-4 mb-4"
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
                  <span className="text-slate-400 text-sm">
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

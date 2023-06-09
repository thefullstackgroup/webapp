import Menu from 'components/modules/account/teams/Menu';
import InviteMembers from 'components/modules/account/teams/InviteMembers';
import { useState } from 'react';

const Members = ({ user, team = null }) => {
  const [inviteMembersPanel, setInviteMembersPanel] = useState(false);

  if (!team) return false;

  if (team?.ownerId !== user.userId) {
    return (
      <div className="h-screen flex flex-1 justify-center items-center">
        You are not the owner of this team.
      </div>
    );
  }

  return (
    <>
      <div className="mt-0 lg:mt-12 w-full flex justify-center">
        <div className="w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-4xl mx-auto">
            <div className="mx-4 md:mx-0 mb-20">
              <Menu team={team} user={user} />
              <div className="space-y-4">
                <div className="w-full rounded-lg bg-tfsdark-700 px-4 sm:px-6 py-4">
                  <InviteMembers
                    user={user}
                    teamId={team?.id}
                    teamName={team?.name}
                    membersIds={team?.membersIds}
                    inviteMembersPanel={inviteMembersPanel}
                    setInviteMembersPanel={setInviteMembersPanel}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="btn-primary text-sm"
                    onClick={() => {
                      setInviteMembersPanel(!inviteMembersPanel);
                    }}
                  >
                    <span>Add member</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Members;

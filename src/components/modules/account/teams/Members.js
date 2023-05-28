import Menu from 'components/modules/account/teams/Menu';
import InviteMembers from 'components/modules/account/teams/InviteMembers';
import { useState } from 'react';

const Members = ({ user, team = null }) => {
  const [inviteMembersPanel, setInviteMembersPanel] = useState(false);

  if (!team) return false;

  if (team?.ownerId !== user.userId) {
    return (
      <div className="flex h-screen flex-1 items-center justify-center">
        You are not the owner of this team.
      </div>
    );
  }

  return (
    <>
      <div className="mt-0 flex w-full justify-center lg:mt-12">
        <div className="w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
          <div className="relative mx-auto max-w-4xl">
            <div className="mx-4 mb-20 md:mx-0">
              <Menu team={team} user={user} />
              <div className="space-y-4">
                <div className="w-full rounded-lg bg-base-700 px-4 py-4 sm:px-6">
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

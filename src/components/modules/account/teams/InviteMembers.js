import { useEffect, useRef, useState } from 'react';
import { useAuthUser } from 'next-firebase-auth';
import axios from 'axios';
import Avatar from 'components/common/elements/Avatar';
import ModalDialog from 'components/common/modals/ModalDialog';
import Loader from 'components/common/elements/Loader';

const InviteMembers = ({
  user,
  teamId,
  teamName,
  membersIds,
  inviteMembersPanel,
  setInviteMembersPanel,
}) => {
  const AuthUser = useAuthUser();
  const [emailInvites, setEmailInvites] = useState();
  const [emailInvitesSent, setEmailInvitesSent] = useState(false);
  const [teamMemberAdded, setTeamMemberAdded] = useState(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState(
    membersIds || []
  );
  const [teamMembers, setTeamMembers] = useState(membersIds || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLoadingResults, setShowLoadingResults] = useState(false);
  const searchTermRef = useRef(null);

  const sendSlackMessage = async (external = false) => {
    let message = `TEAMS: ${user.name} has invited a member to their team '${teamName}'. Fuck yeah!`;
    if (external) {
      message = `TEAMS: ${user.name} has sent invite(s) to their team '${teamName}'. Fuck yeah even more!`;
    }
    await fetch(`${process.env.BASEURL}/api/notifications/slack/postMessage`, {
      method: 'POST',
      body: JSON.stringify({
        message: message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const handleSearch = async (event) => {
    const accessToken = await AuthUser.getIdToken();
    event.preventDefault();

    if (searchTermRef.current.value && searchTermRef.current.value.length > 1) {
      setShowLoadingResults(true);
      await axios
        .get(
          `${process.env.BASEURL}/api/search/profiles/search?term=${searchTermRef.current.value}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          setSearchResults(res.data);
          setShowSearchResults(true);
        });
      setShowLoadingResults(false);
    }
  };

  const addTeamMember = async (profileId) => {
    setSearchTerm('');
    setTeamMemberAdded(false);
    const memberExists = selectedTeamMembers.find(function (item) {
      return profileId === item;
    });

    if (!memberExists && profileId != -1) {
      await axios
        .post(`${process.env.BASEURL}/api/teams/members/add`, {
          teamId: teamId,
          userId: profileId,
        })
        .then((response) => {
          setSelectedTeamMembers([...selectedTeamMembers, profileId]);
          setTeamMemberAdded(true);
          sendSlackMessage(false);
        })
        .catch((error) => {
          // console.log(error.status);
        });
    }
  };

  const removeTeamMember = async (profileId) => {
    const filteredSelectedTeamMembers = selectedTeamMembers.filter(function (
      item
    ) {
      return profileId !== item;
    });

    await axios
      .post(`${process.env.BASEURL}/api/teams/members/delete`, {
        teamId: teamId,
        userId: profileId,
      })
      .then((response) => {
        setSelectedTeamMembers(filteredSelectedTeamMembers);
      })
      .catch((error) => {
        // console.log(error.status);
      });
  };

  const getTeamMembers = async () => {
    const memberIds =
      selectedTeamMembers?.map((userId) => userId).join(',') || null;

    await axios
      .get(`${process.env.BASEURL}/api/profile/getUsers?userIds=${memberIds}`)
      .then((response) => {
        setTeamMembers(response.data);
      })
      .catch((error) => {
        // console.log(error.status);
      });
  };

  const inviteTeamMembers = async () => {
    setTeamMemberAdded(false);
    setEmailInvitesSent(false);

    if (!emailInvites.trim().length > 0) {
      return;
    }
    await axios
      .post(`${process.env.BASEURL}/api/teams/members/invite/external`, {
        teamId: teamId,
        emails: [emailInvites],
      })
      .then((response) => {
        setEmailInvitesSent(true);
        sendSlackMessage(true);
        setEmailInvites('');
      })
      .catch((error) => {
        // console.log(error.status);
      });
  };

  useEffect(() => {
    getTeamMembers();
  }, [selectedTeamMembers]);

  return (
    <>
      <div>
        <div className="">
          <div className="items-center divide-y divide-tfsdark-700">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3 cursor-pointer">
                <Avatar
                  href={`/${user.displayName}`}
                  name={user.name}
                  image={user.profilePicUrl}
                  dimensions="h-8 w-8 sm:h-8 sm:w-8"
                />

                <h4>{user.name}</h4>
                <span className="text-slate-400">{user.currentTitle}</span>
              </div>
              <button className="btn-ghost text-xs text-left">
                Team owner
              </button>
            </div>

            {teamMembers?.map((member) => (
              <div
                className="flex items-center justify-between py-3"
                key={member.id}
              >
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Avatar
                    image={member.profilePicUrl}
                    href={`/${member.displayName}`}
                    dimensions="h-8 w-8 sm:h-8 sm:w-8"
                  />

                  <h4>{member.name}</h4>
                  <span className="text-slate-400">{member.currentTitle}</span>
                </div>
                <button
                  className="btn-ghost text-xs text-left text-red-500"
                  onClick={() => removeTeamMember(member.userId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          {!teamId && (
            <button
              className="btn-primary btn-with-icon text-sm"
              onClick={() => alert('Save team before adding teammates')}
            >
              <span>Add member</span>
            </button>
          )}
        </div>
      </div>

      <ModalDialog
        show={inviteMembersPanel}
        setShow={setInviteMembersPanel}
        title="Add team members"
        disabled
      >
        <div className="py-4 px-2">
          {teamMemberAdded && (
            <div className="mt-2 mb-4 relative bg-green-500/20 text-green-500 text-sm text-center w-full rounded-md py-1.5 px-2">
              Team member added
            </div>
          )}
          <p className="font-semibold">Search for user</p>
          <div className="w-full">
            {showSearchResults && (
              <div
                className="fixed inset-0"
                onClick={() => setShowSearchResults(!showSearchResults)}
              ></div>
            )}

            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="Member's name"
                className="text-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setTeamMemberAdded(false);
                  handleSearch(e);
                }}
                ref={searchTermRef}
              />

              {showLoadingResults && (
                <div className="-mt-1 h-72 w-full bg-tfsdark-700 flex flex-1 items-center justify-center">
                  <Loader />
                </div>
              )}
              {!showLoadingResults && showSearchResults && (
                <div className="absolute -mt-1 z-50 w-full rounded-b-lg bg-tfsdark-700">
                  {!searchResults?.length > 0 && (
                    <div className="h-20 flex flex-1 text-sm items-center justify-center">
                      <p>User not found. Invite them by email.</p>
                    </div>
                  )}

                  {searchResults?.length > 0 && (
                    <ul className="overflow-hidden h-72 overflow-y-scroll overscroll-contain">
                      {searchResults?.map((eng, index) => (
                        <li
                          className="hover:bg-tfsdark-600 px-4 text-left"
                          key={index}
                          onClick={() => {
                            addTeamMember(eng.userId);
                            setShowSearchResults(false);
                          }}
                        >
                          {eng?.displayName != null ? (
                            <div className="outline-none relative py-3 flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <Avatar
                                  image={
                                    eng?.profilePicUrl || eng?.profilePicURL
                                  }
                                  href={`/${eng?.displayName}`}
                                  dimensions="h-10 w-10"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <a href="#" className="focus:outline-none">
                                  <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                  ></span>
                                  <p className="text-sm font-medium text-slate-100">
                                    {eng?.name || eng?.displayName}
                                  </p>
                                  <p className="text-sm text-slate-400 truncate">
                                    {eng?.currentTitle}
                                  </p>
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="outline-none relative py-5 flex items-center space-x-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-100">
                                  Sorry an unexpected error has occurred with
                                  this search result.
                                </p>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-tfsdark-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-tfsdark-900 px-2 text-sm text-slate-400">
                Can&apos;t find them? Send an invite
              </span>
            </div>
          </div>
          {emailInvitesSent && (
            <div className="mt-2 mb-4 relative bg-green-500/20 text-green-500 text-sm text-center w-full rounded-md py-1.5 px-2">
              Invite sent
            </div>
          )}
          <p className="font-semibold">Invite by email</p>
          <textarea
            rows={3}
            className="text-input"
            value={emailInvites}
            placeholder="email@example.com, email2@example.com"
            onChange={(e) => setEmailInvites(e.target.value)}
          ></textarea>
          <div className="flex justify-end py-4">
            <button
              className="btn-primary text-sm"
              onClick={() => inviteTeamMembers()}
            >
              Send invites
            </button>
          </div>
        </div>
      </ModalDialog>
    </>
  );
};

export default InviteMembers;

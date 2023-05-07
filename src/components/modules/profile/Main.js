import React, { useEffect } from 'react';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import GitHubCalendar from 'react-github-calendar';
import fetcher from 'utils/fetcher';
import Loader from 'components/common/elements/Loader';
import NotFound from 'components/modules/profile/NotFound';
import AccountsSection from 'components/modules/profile/sections/Accounts';
import Menu from 'components/modules/profile/Menu';
import ProjectsSection from 'components/modules/profile/sections/Projects';
import SnippetsSection from 'components/modules/profile/sections/Snippets';
import SparksSection from 'components/modules/profile/sections/Sparks';
import ArticlesSection from 'components/modules/profile/sections/Articles';
import Social from 'components/modules/profile/sections/Social';
import ModalDialog from 'components/common/modals/ModalDialog';
import EditProfile from 'components/modules/account/profile/EditProfile';
import CreateTeam from 'components/modules/teams/CreateTeam';
import VideoIntro from 'components/modules/account/profile/VideoIntro';
import Intro from 'components/modules/profile/sections/Intro';
import Goals from 'components/modules/profile/sections/Goals';
import Overview from 'components/modules/profile/sections/Overview';

const GitHubCalendarTheme = {
  level4: '#39D353',
  level3: '#26A641',
  level2: '#006D32',
  level1: '#0E4429',
  level0: '#161B22',
};

const Main = (props) => {
  const [tab, setTab] = useState(0);
  const [createTeamPanel, setCreateTeamPanel] = useState(false);
  const [uploadVideoIntroPanel, setUploadVideoIntroPanel] = useState(false);
  const [showVideoIntro, setShowVideoIntro] = useState(false);
  const [hideVideoIntro, setHideVideoIntro] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectionPending, setIsConnectionPending] = useState(false);

  const profileURL = `${process.env.BASEURL}/api/profile/user?userId=${props.displayName}`;
  const { data: profile } = useSWR(profileURL, fetcher);

  const myProfileURL = `${process.env.BASEURL}/api/profile/me`;
  const { data: myProfile } = useSWR(myProfileURL, fetcher);

  const teamsURL = `${process.env.BASEURL}/api/teams/getTeamsByUser?userId=${profile?.userId}`;
  const { data: teams } = useSWR(teamsURL, fetcher);

  const checkIfConnected = async () => {
    axios
      .get(
        `${process.env.BASEURL}/api/profile/verify_connection?userId=${profile?.userId}&connectedTo=${props.myProfile.userId}`
      )
      .then((res) => {
        if (res.data.success === true) {
          setIsConnected(true);
        } else if (res.data.message === 'Pending') {
          setIsConnectionPending(true);
        } else {
          setIsConnected(false);
        }
      });
  };

  useEffect(() => {
    if (profile) checkIfConnected(profile?.userId);
  }, [isConnected, profile]);

  useEffect(() => {
    if (profile && !profile?.error) mutate(profileURL);
    if (myProfile && !myProfile?.error) mutate(myProfileURL);
  });

  if (!profile)
    return (
      <div className="my-48 w-full flex justify-center">
        <Loader />
      </div>
    );

  if (profile && profile?.error) {
    return <NotFound />;
  }

  return (
    <>
      <div className="mt-0 lg:mt-8 w-full flex justify-center">
        <div className="w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56 mb-20">
          <Overview
            profile={profile}
            user={props.myProfile}
            isConnected={isConnected}
            isConnectionPending={isConnectionPending}
            teams={teams}
            setShowEditProfile={setShowEditProfile}
            setUploadVideoIntroPanel={setUploadVideoIntroPanel}
          />

          {profile.userId === props.myProfile.userId && (
            <Goals
              goal={props.myProfile.profileGoal}
              setCreateTeamPanel={setCreateTeamPanel}
            />
          )}

          {profile?.userId === props.myProfile.userId && (
            <div className="relative lg:flex gap-4 max-w-screen-lg mx-auto mb-8 sm:mb-10 px-4 md:px-0">
              <AccountsSection profile={profile} />
            </div>
          )}

          {profile?.gitHubUserName && (
            <div className="relative max-w-screen-lg mx-auto mb-8 sm:mb-10 px-4 md:px-0">
              <GitHubCalendar
                username={profile?.gitHubUserName}
                blockSize={16}
                theme={GitHubCalendarTheme}
                hideColorLegend={isMobile ? true : false}
                hideMonthLabels={isMobile ? true : false}
              />
            </div>
          )}

          <div className="relative max-w-screen-lg mx-auto">
            <div className="flex justify-between items-center overflow-y-scroll no-scrollbar">
              <Menu tab={tab} setTab={setTab} profile={profile} />
              <div className="hidden md:block">
                <Social social={profile} />
              </div>
            </div>

            {tab == 0 && (
              <ProjectsSection profile={profile} myProfile={props.myProfile} />
            )}
            {tab == 1 && <SnippetsSection />}

            {tab == 2 && (
              <SparksSection profile={profile} myProfile={props.myProfile} />
            )}

            {tab == 3 && (
              <ArticlesSection profile={profile} source={'DEV_TO'} />
            )}

            {tab == 4 && (
              <ArticlesSection profile={profile} source={'HASH_NODE'} />
            )}

            {tab == 5 && (
              <ArticlesSection profile={profile} source={'MEDIUM'} />
            )}
          </div>
        </div>
      </div>

      <ModalDialog
        show={showEditProfile}
        setShow={setShowEditProfile}
        title="Edit Profile"
        dimensions={'sm:max-w-screen-sm'}
        disabled
      >
        <div>
          <div className="relative z-20 w-full flex flex-col h-screen overflow-hidden overflow-y-scroll no-scrollbar overscroll-contain">
            <div className="top-0 w-full max-w-3xl mx-auto bg-transparent">
              <EditProfile displayName={profile?.displayName} />
            </div>
          </div>
        </div>
      </ModalDialog>

      <ModalDialog
        show={createTeamPanel}
        setShow={setCreateTeamPanel}
        title="Let's setup your team"
        dimensions={'max-w-lg'}
        disabled
      >
        <CreateTeam
          user={props.myProfile}
          setCreateTeamPanel={setCreateTeamPanel}
          teams={teams}
        />
      </ModalDialog>

      {profile.userId === props.myProfile.userId && (
        <>
          <ModalDialog
            show={uploadVideoIntroPanel}
            setShow={setUploadVideoIntroPanel}
            title="Introduce yourself"
            dimensions={'sm:max-w-3xl'}
            disabled
          >
            <div className="">
              <VideoIntro user={myProfile} />
            </div>
          </ModalDialog>
        </>
      )}

      {profile?.profileVideoUrl && !hideVideoIntro && (
        <Intro
          profile={profile}
          showVideoIntro={showVideoIntro}
          setShowVideoIntro={setShowVideoIntro}
          setHideVideoIntro={setHideVideoIntro}
        />
      )}
    </>
  );
};

export default Main;

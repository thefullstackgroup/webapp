import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTheme } from 'next-themes';
import GitHubCalendar from 'react-github-calendar';
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
import ModalAlert from 'components/common/modals/ModalAlert';

const GitHubCalendarLightTheme = {
  level4: '#216E39',
  level3: '#30A14E',
  level2: '#40C463',
  level1: '#9BE9A8',
  level0: '#EBEDF0',
};

const GitHubCalendarDarkTheme = {
  level4: '#39D353',
  level3: '#26A641',
  level2: '#006D32',
  level1: '#0E4429',
  level0: '#161B22',
};

const Main = ({ profile, myProfile }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [tab, setTab] = useState(0);
  const [createTeamPanel, setCreateTeamPanel] = useState(false);
  const [uploadVideoIntroPanel, setUploadVideoIntroPanel] = useState(false);
  const [showVideoIntro, setShowVideoIntro] = useState(false);
  const [hideVideoIntro, setHideVideoIntro] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectionPending, setIsConnectionPending] = useState(false);

  const checkIfConnected = async () => {
    axios
      .get(
        `${process.env.BASEURL}/api/profile/verify_connection?userId=${profile?.userId}&connectedTo=${myProfile.userId}`
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
    if (myProfile) checkIfConnected(profile?.userId);
  }, [isConnected, profile]);

  if (!profile)
    return (
      <div className="my-48 flex w-full justify-center">
        <Loader />
      </div>
    );

  if (profile && profile?.error) {
    return <NotFound />;
  }

  return (
    <>
      <div className="mx-auto mb-20 max-w-screen-lg">
        <Overview
          profile={profile}
          user={myProfile}
          isConnected={isConnected}
          isConnectionPending={isConnectionPending}
          teams={null}
          setShowEditProfile={setShowEditProfile}
          setUploadVideoIntroPanel={setUploadVideoIntroPanel}
        />

        {profile.userId === myProfile?.userId && (
          <Goals
            goal={myProfile?.profileGoal}
            setCreateTeamPanel={setCreateTeamPanel}
          />
        )}

        {profile?.userId === myProfile?.userId && (
          <div className="relative mx-auto mb-8 hidden max-w-screen-lg gap-4 px-4 sm:mb-10 md:px-0 lg:flex">
            <AccountsSection profile={profile} />
          </div>
        )}

        {profile?.gitHubUserName && (
          <div className="relative mx-auto mb-8 max-w-screen-lg px-4 sm:mb-10 lg:px-0">
            <GitHubCalendar
              username={profile?.gitHubUserName}
              blockSize={16}
              theme={
                currentTheme === 'dark'
                  ? GitHubCalendarDarkTheme
                  : GitHubCalendarLightTheme
              }
              hideColorLegend={isMobile ? true : false}
              hideMonthLabels={isMobile ? true : false}
            />
          </div>
        )}

        <div className="relative mx-auto max-w-screen-lg">
          <div className="no-scrollbar flex items-center justify-between overflow-y-scroll">
            <Menu tab={tab} setTab={setTab} profile={profile} />
            <div className="hidden px-4 md:block lg:px-0">
              <Social social={profile} />
            </div>
          </div>

          {tab == 0 && (
            <ProjectsSection profile={profile} myProfile={myProfile} />
          )}
          {tab == 1 && <SnippetsSection />}

          {tab == 2 && (
            <SparksSection profile={profile} myProfile={myProfile} />
          )}

          {tab == 3 && <ArticlesSection profile={profile} source={'DEV_TO'} />}

          {tab == 4 && (
            <ArticlesSection profile={profile} source={'HASH_NODE'} />
          )}

          {tab == 5 && <ArticlesSection profile={profile} source={'MEDIUM'} />}
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
          <div className="no-scrollbar relative z-20 flex h-screen w-full flex-col overflow-hidden overflow-y-scroll overscroll-contain">
            <div className="top-0 mx-auto w-full max-w-3xl bg-transparent">
              <EditProfile displayName={profile?.displayName} />
            </div>
          </div>
        </div>
      </ModalDialog>

      <ModalAlert
        show={createTeamPanel}
        setShow={setCreateTeamPanel}
        title="Let's setup your team"
        dimensions={'max-w-lg'}
        disabled
      >
        <CreateTeam
          user={myProfile}
          setCreateTeamPanel={setCreateTeamPanel}
          teams={null}
        />
      </ModalAlert>

      {profile.userId === myProfile?.userId && (
        <ModalAlert
          show={uploadVideoIntroPanel}
          setShow={setUploadVideoIntroPanel}
          title="Introduce yourself"
          dimensions={'sm:max-w-3xl'}
          disabled
        >
          <VideoIntro user={myProfile} />
        </ModalAlert>
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

import React, { useState } from 'react';
import ListTeams from 'components/modules/teams/ListTeams';
import FilterTeams from 'components/modules/teams/FilterTeams';
import { HiOutlineSortDescending } from 'react-icons/hi';
import Image from 'next/future/image';
import ModalDialog from 'components/common/modals/ModalDialog';
import Create from 'components/modules/teams/CreateTeam';
import Subscribe from 'components/modules/account/settings/subscriptions/Modal';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const images = [
  'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTl8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1561406636-b80293969660?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI5fHxwZXJzb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
];

const ImageSample = ({ image }) => {
  return (
    <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-black">
      <Image
        src={image}
        alt="Teams"
        className="h-full w-full object-cover object-center"
        width={200}
        height={200}
        layout="fill"
      />
    </div>
  );
};

const Main = ({ user }) => {
  const [createTeamPanel, setCreateTeamPanel] = useState(false);
  const [subscribePanel, setSubscribePanel] = useState(false);

  const teamsURL = `${process.env.BASEURL}/api/teams/getTeamsByUser?userId=${user?.userId}`;
  const { data: teams } = useSWR(teamsURL, fetcher);

  return (
    <>
      <>
        <div className="mt-4 ml-0 flex md:mt-12 lg:ml-14 2xl:ml-0">
          <div className="mx-auto w-full max-w-2xl overflow-hidden lg:max-w-3xl 2xl:max-w-4xl">
            <div className="mb-6 space-y-4 px-4 sm:px-0">
              <div className="mt-4 flex items-end justify-between sm:mt-0">
                <div className="flex items-center -space-x-2">
                  {images.map((image, index) => (
                    <ImageSample image={image} key={index} />
                  ))}
                </div>
                <div className="hidden items-center space-x-2 text-right sm:block">
                  <button
                    className="btn btn-primary"
                    onClick={() => setCreateTeamPanel(true)}
                  >
                    Create a team
                  </button>
                </div>
              </div>
              <div className="sm:w-3/5">
                <div className="relative w-min whitespace-nowrap">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Introducing Teams
                  </h2>
                  <div className="absolute -top-1 -right-10">
                    <span className="rounded-xl border border-green-700 py-0.5 px-1 text-[0.7em] text-green-600">
                      Beta
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-base-400 sm:w-4/5">
                Team profiles make strong connections with people looking to
                collaborate or find work by introducing them to the people and
                personalities in the team they would be working with day to day.
                Browse and discover teams building great tech and engineering
                cultures.
              </p>
              <div className="block sm:hidden">
                <button
                  className="btn-primary w-full"
                  onClick={() => setCreateTeamPanel(true)}
                >
                  Create a team
                </button>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between px-4 sm:px-0">
              <div className="flex items-center space-x-2">
                <HiOutlineSortDescending className="h-5 w-5 sm:h-7 sm:w-7" />
                <span>Browse profiles</span>
              </div>
              <div>
                <button
                  className="btn-ghost text-primary-500 text-sm"
                  onClick={() => setCreateTeamPanel(true)}
                >
                  <span className="hidden sm:block">
                    Are you hiring for your team?
                  </span>
                  <span className="block sm:hidden">Are you hiring?</span>
                </button>
              </div>
            </div>

            <ListTeams user={user} />
          </div>
        </div>
        <FilterTeams setCreateTeamPanel={setCreateTeamPanel} />
      </>

      <ModalDialog
        show={createTeamPanel}
        setShow={setCreateTeamPanel}
        title="Let's setup your team"
        dimensions={'max-w-lg'}
        disabled
      >
        <Create
          user={user}
          setCreateTeamPanel={setCreateTeamPanel}
          teams={teams}
        />
      </ModalDialog>

      <Subscribe
        user={user}
        show={subscribePanel}
        setShow={setSubscribePanel}
      />
    </>
  );
};

export default Main;

import React, { useState } from 'react';
import ListTeams from 'components/modules/teams/ListTeams';
import Image from 'next/future/image';
import ModalAlert from 'components/common/modals/ModalAlert';
import Create from 'components/modules/teams/CreateTeam';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import Link from 'next/link';
import Faq from './Faq';
import { useRouter } from 'next/router';

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

  const router = useRouter();

  const teamsURL = `${process.env.BASEURL}/api/teams/getTeamsByUser?userId=${user?.userId}`;
  const { data: teams } = useSWR(teamsURL, fetcher);

  return (
    <>
      <>
        <div className="mx-auto mb-20 w-full max-w-screen-2xl space-y-20 px-4 lg:px-0">
          <div className="mx-auto max-w-7xl pt-10 md:pt-14 lg:pt-24">
            <div className="relative mx-auto w-min whitespace-nowrap">
              <h1 className="font-manrope text-base-900 dark:text-base-200 flex justify-center bg-clip-text py-2 text-center text-5xl font-extrabold tracking-tighter md:text-7xl lg:text-7xl">
                Team Profiles
              </h1>
              <div className="absolute -right-6 -top-2 lg:-right-10 lg:top-1">
                <span className="bg-base-50 dark:bg-base-900 rounded-xl border border-green-500 px-1.5 py-0.5 text-xs text-green-500">
                  Beta
                </span>
              </div>
            </div>
            <div className="mx-auto mt-4 max-w-xl">
              <p className="text-base-400 dark:text-base-300 text-center text-xl font-light">
                Building something cool with your team? Create your team profile
                and show off what your team is building.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-4xl">
              <div className="flex items-center justify-center space-x-2">
                {user ? (
                  <button
                    className="btn btn-primary px-6 py-2.5"
                    onClick={() => setCreateTeamPanel(true)}
                  >
                    Create team
                  </button>
                ) : (
                  <Link
                    href={{
                      pathname: '/login',
                      query: {
                        destination: encodeURIComponent(
                          `${process.env.BASEURL}${router.asPath}`
                        ),
                      },
                    }}
                  >
                    <button className="btn btn-primary px-6 py-2.5">
                      Create team
                    </button>
                  </Link>
                )}

                <Link href="/for/teams">
                  <a href="#" className="btn btn-secondary px-6 py-2.5">
                    Learn more
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <ListTeams user={user} />

          <div className="relative space-y-10 text-center">
            <h4 className="z-20 text-2xl font-bold lg:text-3xl">
              Frequently asked questions
            </h4>
            <div className="relative mx-auto max-w-3xl">
              <Faq />
            </div>
          </div>
        </div>
      </>

      <ModalAlert
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
      </ModalAlert>
    </>
  );
};

export default Main;

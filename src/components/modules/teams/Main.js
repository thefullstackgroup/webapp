import React, { useState } from "react";
import ListTeams from "components/modules/teams/ListTeams";
import Image from "next/future/image";
import ModalAlert from "components/common/modals/ModalAlert";
import Create from "components/modules/teams/CreateTeam";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import Link from "next/link";
import Faq from "./Faq";

const images = [
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTl8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1561406636-b80293969660?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI5fHxwZXJzb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
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

  const teamsURL = `${process.env.BASEURL}/api/teams/getTeamsByUser?userId=${user?.userId}`;
  const { data: teams } = useSWR(teamsURL, fetcher);

  return (
    <>
      <>
        <div className="mx-auto mb-20 w-full max-w-screen-2xl space-y-20">
          <div className="mx-auto max-w-7xl px-4 pt-24 md:pt-14 lg:px-0">
            <h1 className="flex justify-center bg-gradient-to-r from-base-900 via-base-400 to-base-200 bg-clip-text py-2 text-center font-intertight text-6xl font-bold tracking-tight text-transparent dark:from-base-200 dark:via-base-300 dark:to-base-600 md:text-7xl">
              Team Profiles
            </h1>
            <div className="mx-auto mt-4 max-w-2xl">
              <h4 className="px-4 text-center text-lg text-base-400 dark:text-base-300 md:text-xl">
                Building something cool with your team? Create your team profile
                and show off what your team is building.
              </h4>
            </div>
            <div className="mx-auto mt-10 max-w-4xl">
              <div className="flex items-center justify-center space-x-4">
                {user ? (
                  <button
                    className="btn btn-primary py-2.5 px-6"
                    onClick={() => setCreateTeamPanel(true)}
                  >
                    Create team
                  </button>
                ) : (
                  <Link href="/signup">
                    <button className="btn btn-primary py-2.5 px-6">
                      Create team
                    </button>
                  </Link>
                )}

                <Link href="/for/teams">
                  <a href="#" className="btn btn-secondary py-2.5 px-6">
                    Learn more
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <ListTeams user={user} />

          <div className="relative space-y-10 text-center">
            <h4 className="z-20 text-3xl font-bold">
              Frequently asked questions
            </h4>
            <div className="relative mx-auto max-w-3xl px-4">
              <Faq />
            </div>
          </div>
        </div>
      </>

      <ModalAlert
        show={createTeamPanel}
        setShow={setCreateTeamPanel}
        title="Let's setup your team"
        dimensions={"max-w-lg"}
        disabled
      >
        <Create
          user={user}
          setCreateTeamPanel={setCreateTeamPanel}
          teams={teams}
        />
      </ModalAlert>

      {/* <Subscribe
        user={user}
        show={subscribePanel}
        setShow={setSubscribePanel}
      /> */}
    </>
  );
};

export default Main;

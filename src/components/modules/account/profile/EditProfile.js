import { useState } from 'react';
import useSWR from 'swr';
import About from 'components/modules/account/profile/About';
import Tech from 'components/modules/account/profile/Tech';
import Interests from 'components/modules/account/profile/Interests';
import Socials from 'components/modules/account/profile/Socials';
import fetcher from 'utils/fetcher';

const tabs = ['About', 'Tech', 'Interests', 'Socials'];

const EditProfile = ({ displayName }) => {
  const [nav, setNav] = useState(0);

  const url = `${process.env.BASEURL}/api/profile/user?userId=${displayName}`;
  const { data } = useSWR(url, fetcher);
  const user = data ? data : null;

  return (
    <>
      <div className="w-full overflow-hidden mx-auto sm:px-2">
        <div className="relative w-full pb-20">
          <div className="mt-4 md:mt-6 rounded-xl">
            <div className="relative flex justify-evenly space-x-1 mx-0">
              {tabs.map((tabButton, index) => (
                <button
                  className={
                    `w-full text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-md whitespace-nowrap font-medium ` +
                    (nav === index
                      ? `bg-tfsdark-600/70 text-white`
                      : `bg-tfsdark-700/70 text-slate-400 hover:text-white`)
                  }
                  key={index}
                  onClick={() => setNav(index)}
                >
                  <span className="text-sm">{tabButton}</span>
                </button>
              ))}
            </div>

            <div>
              {nav == 0 && <About user={user} />}
              {nav == 1 && <Tech user={user} />}
              {nav == 2 && <Interests user={user} />}
              {nav == 3 && <Socials user={user} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

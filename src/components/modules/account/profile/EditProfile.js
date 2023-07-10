import { useState } from 'react';
import useSWR from 'swr';
import About from 'components/modules/account/profile/About';
import Tech from 'components/modules/account/profile/Tech';
import Interests from 'components/modules/account/profile/Interests';
import Socials from 'components/modules/account/profile/Socials';
import fetcher from 'utils/fetcher';

const tabs = ['About', 'Stack', 'Interests', 'Socials'];

const EditProfile = ({ displayName }) => {
  const [nav, setNav] = useState(0);

  const url = `${process.env.BASEURL}/api/profile/me`;
  const { data: user } = useSWR(url, fetcher);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mx-auto w-full overflow-hidden">
        <div className="relative w-full py-2 pb-20">
          <div className="tabs">
            {tabs.map((tabButton, index) => (
              <button
                className={
                  nav === index ? `tab-item tab-item-active` : `tab-item`
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
    </>
  );
};

export default EditProfile;

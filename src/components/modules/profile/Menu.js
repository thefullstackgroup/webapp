import { FaDev, FaMedium } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';

const tabs = ['Projects', 'Snippets', 'Sparks'];

const Tabs = ({ tab, setTab, profile }) => {
  return (
    <div className="relative mx-4 flex w-full justify-between space-x-2 md:mx-0 md:justify-start">
      {tabs.map((tabButton, index) => (
        <button
          className={tab == index ? 'btn-pill-active' : 'btn-pill'}
          key={index}
          onClick={() => setTab(index)}
        >
          {tabButton}
        </button>
      ))}
      {profile?.bio?.devToAccount && profile?.bio?.devToAccount !== '' && (
        <button
          className={
            'flex items-center space-x-1 ' +
            (tab == 3 ? 'btn-pill-active' : 'btn-pill')
          }
          onClick={() => setTab(3)}
        >
          <FaDev className="mx-auto h-5 w-5" />
          <span>DEV</span>
        </button>
      )}
      {profile?.bio?.hashNodeAccount &&
        profile?.bio?.hashNodeAccount !== '' && (
          <button
            className={
              'flex items-center space-x-1 ' +
              (tab == 4 ? 'btn-pill-active' : 'btn-pill')
            }
            onClick={() => setTab(4)}
          >
            <SiHashnode className="mx-auto h-5 w-5" />
            <span>Hashnode</span>
          </button>
        )}
      {profile?.bio?.mediumAccount && profile?.bio?.mediumAccount !== '' && (
        <button
          className={
            'flex items-center space-x-1 ' +
            (tab == 5 ? 'btn-pill-active' : 'btn-pill')
          }
          onClick={() => setTab(5)}
        >
          <FaMedium className="mx-auto h-5 w-5" />
          <span>Medium</span>
        </button>
      )}
    </div>
  );
};

export default Tabs;

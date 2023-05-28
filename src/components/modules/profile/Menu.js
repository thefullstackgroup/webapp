import { FaDev, FaMedium } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';

const tabs = ['Projects', 'Snippets', 'Sparks'];

const Tabs = ({ tab, setTab, profile }) => {
  return (
    <div className="relative mx-4 flex w-full justify-between space-x-2 md:mx-0 md:justify-start">
      {tabs.map((tabButton, index) => (
        <button
          className={
            `w-full whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium sm:px-5 sm:py-2 md:w-auto ` +
            (tab === index
              ? `bg-base-500/70 text-white`
              : `bg-base-700/70 text-slate-400 hover:bg-base-700 hover:text-white`)
          }
          key={index}
          onClick={() => setTab(index)}
        >
          {tabButton}
        </button>
      ))}
      {profile?.bio?.devToAccount && profile?.bio?.devToAccount !== '' && (
        <button
          className={
            `sm:px-4.5 flex w-full items-center space-x-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium sm:py-1 md:w-auto ` +
            (tab === 3
              ? `bg-base-500/70 text-white`
              : `bg-base-700/70 text-slate-400 hover:bg-base-700 hover:text-white`)
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
              `sm:px-4.5 flex w-full items-center space-x-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium sm:py-1 md:w-auto ` +
              (tab === 4
                ? `bg-base-500/70 text-white`
                : `bg-base-700/70 text-slate-400 hover:bg-base-700 hover:text-white`)
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
            `sm:px-4.5 flex w-full items-center space-x-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium sm:py-1 md:w-auto ` +
            (tab === 5
              ? `bg-base-500/70 text-white`
              : `bg-base-700/70 text-slate-400 hover:bg-base-700 hover:text-white`)
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

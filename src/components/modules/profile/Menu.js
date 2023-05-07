import { FaDev, FaMedium } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';

const tabs = ['Projects', 'Snippets', 'Sparks'];

const Tabs = ({ tab, setTab, profile }) => {
  return (
    <div className="relative flex justify-between md:justify-start space-x-2 mx-4 md:mx-0 w-full">
      {tabs.map((tabButton, index) => (
        <button
          className={
            `text-sm px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg whitespace-nowrap font-medium w-full md:w-auto ` +
            (tab === index
              ? `bg-tfsdark-500/70 text-white`
              : `bg-tfsdark-700/70 text-slate-400 hover:text-white hover:bg-tfsdark-700`)
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
            `flex items-center space-x-1 text-sm px-3 py-1.5 sm:px-4.5 sm:py-1 rounded-lg whitespace-nowrap font-medium w-full md:w-auto ` +
            (tab === 3
              ? `bg-tfsdark-500/70 text-white`
              : `bg-tfsdark-700/70 text-slate-400 hover:text-white hover:bg-tfsdark-700`)
          }
          onClick={() => setTab(3)}
        >
          <FaDev className="h-5 w-5 mx-auto" />
          <span>DEV</span>
        </button>
      )}
      {profile?.bio?.hashNodeAccount && profile?.bio?.hashNodeAccount !== '' && (
        <button
          className={
            `flex items-center space-x-1 text-sm px-3 py-1.5 sm:px-4.5 sm:py-1 rounded-lg whitespace-nowrap font-medium w-full md:w-auto ` +
            (tab === 4
              ? `bg-tfsdark-500/70 text-white`
              : `bg-tfsdark-700/70 text-slate-400 hover:text-white hover:bg-tfsdark-700`)
          }
          onClick={() => setTab(4)}
        >
          <SiHashnode className="h-5 w-5 mx-auto" />
          <span>Hashnode</span>
        </button>
      )}
      {profile?.bio?.mediumAccount && profile?.bio?.mediumAccount !== '' && (
        <button
          className={
            `flex items-center space-x-1 text-sm px-3 py-1.5 sm:px-4.5 sm:py-1 rounded-lg whitespace-nowrap font-medium w-full md:w-auto ` +
            (tab === 5
              ? `bg-tfsdark-500/70 text-white`
              : `bg-tfsdark-700/70 text-slate-400 hover:text-white hover:bg-tfsdark-700`)
          }
          onClick={() => setTab(5)}
        >
          <FaMedium className="h-5 w-5 mx-auto" />
          <span>Medium</span>
        </button>
      )}
    </div>
  );
};

export default Tabs;

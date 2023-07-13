import { FaDev, FaMedium } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';

const tabs = ['Projects', 'Snippets', 'Sparks'];

const Tabs = ({ tab, setTab, profile }) => {
  return (
    <div className="tabs border-b border-base-200 dark:border-base-700 lg:border-b-0">
      {tabs.map((tabButton, index) => (
        <button
          className={tab == index ? 'tab-item tab-item-active' : 'tab-item'}
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
            (tab == 3 ? 'tab-item tab-item-active' : 'tab-item')
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
              (tab == 4 ? 'tab-item tab-item-active' : 'tab-item')
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
            (tab == 5 ? 'tab-item tab-item-active' : 'tab-item')
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

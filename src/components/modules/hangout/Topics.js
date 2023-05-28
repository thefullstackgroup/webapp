import React from 'react';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { IoArrowDownOutline } from 'react-icons/io5';
import * as Icons from 'react-icons/hi';
import { IoCodeSlashSharp } from 'react-icons/io5';

const topics = [
  {
    label: 'Sparks',
    type: 'spark',
    icon: 'HiOutlineLightningBolt',
  },
  {
    label: 'Braindumps',
    type: 'post',
    icon: 'HiOutlineMenu',
  },
  {
    label: 'Frameworks',
    type: 'frameworks',
    icon: 'HiOutlineTerminal',
  },
  {
    label: 'Utilities',
    type: 'utilities',
    icon: 'HiOutlineCubeTransparent',
  },
  {
    label: 'Articles',
    type: 'article',
    icon: 'HiOutlineDocumentText',
  },
  {
    label: 'Polls',
    type: 'poll',
    icon: 'HiOutlineChartBar',
  },
  {
    label: 'Tutorials',
    type: 'tutorials',
    icon: 'HiOutlinePresentationChartBar',
  },
  {
    label: 'Learning',
    type: 'learning',
    icon: 'HiOutlineAcademicCap',
  },
  {
    label: 'Career Advice',
    type: 'career_advice',
    icon: 'HiOutlineHand',
  },
  {
    label: 'Working Remote',
    type: 'working_remotely',
    icon: 'HiOutlineRss',
  },
  {
    label: 'My Desk Setup',
    type: 'desk_setup',
    icon: 'HiOutlineDesktopComputer',
  },
  {
    label: 'Design Tips',
    type: 'design_tips',
    icon: 'HiOutlineColorSwatch',
  },
  {
    label: 'Memes',
    type: 'meme',
    icon: 'HiOutlineEmojiHappy',
  },
  {
    label: 'Project Ideas',
    type: 'project_ideas',
    icon: 'HiOutlineLightBulb',
  },
  {
    label: 'Pair Up',
    type: 'collabs',
    icon: 'HiOutlineUsers',
  },
];

const Topics = ({ topic, setTopicSelected }) => {
  const Icon = (props) => {
    const { iconName } = props;

    const icon = React.createElement(Icons[iconName] || IoCodeSlashSharp, {
      className:
        'w-auto h-6 ' +
        (topic === props.selected ? 'text-white' : 'text-slate-300'),
    });
    return <span>{icon}</span>;
  };

  return (
    <div className="absolute right-0 top-24 hidden w-52 xl:block 2xl:right-20 2xl:w-64">
      <div className="fixed w-72 rounded-md py-4 px-6">
        <div className="mb-4 flex items-center space-x-2">
          <IoArrowDownOutline className="h-4 w-auto text-slate-100" />
          <span className="text-base font-bold text-slate-100">
            Browse by topic
          </span>
        </div>

        <ul className="no-scrollbar max-h-[78vh] overflow-scroll">
          {topics.map((item, index) => (
            <li key={index} className="mb-1">
              <button
                href="#"
                className={
                  'flex w-full items-center space-x-4 rounded-md py-1.5 px-2 text-left text-sm text-slate-300 hover:bg-base-600 hover:text-white ' +
                  (topic?.type === item.type && 'bg-base-600')
                }
                onClick={() => {
                  setTopicSelected(item);
                  sendSlackMessage(`Clicked on Hangout topic ${item?.label}`);
                }}
              >
                <Icon iconName={`${item.icon}`} selected={item.type} />
                <span className="relative">
                  {item.label}
                  {item.type === 'article' && (
                    <span className="absolute top-0 -right-3 h-2 w-2 rounded-full bg-red-500 px-1"></span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Topics;

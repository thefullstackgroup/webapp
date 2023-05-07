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
    <div className="absolute right-0 2xl:right-20 top-24 w-52 2xl:w-64 hidden xl:block">
      <div className="fixed w-72 py-4 px-6 rounded-md">
        <div className="flex space-x-2 items-center mb-4">
          <IoArrowDownOutline className="w-auto h-4 text-slate-100" />
          <span className="font-bold text-slate-100 text-base">
            Browse by topic
          </span>
        </div>

        <ul className="max-h-[78vh] overflow-scroll no-scrollbar">
          {topics.map((item, index) => (
            <li key={index} className="mb-1">
              <button
                href="#"
                className={
                  'flex items-center text-left space-x-4 text-sm hover:bg-tfsdark-600 w-full py-1.5 px-2 rounded-md text-slate-300 hover:text-white ' +
                  (topic?.type === item.type && 'bg-tfsdark-600')
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
                    <span className="absolute top-0 -right-3 w-2 h-2 rounded-full bg-red-500 px-1"></span>
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

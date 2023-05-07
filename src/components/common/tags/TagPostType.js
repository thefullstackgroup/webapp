import React from 'react';
import * as Icons from 'react-icons/hi';
import { IoCodeSlashSharp } from 'react-icons/io5';

const TagPostType = ({ postType, className }) => {
  let label = '';
  let icon = '';

  const Icon = (props) => {
    const { iconName } = props;

    const icon = React.createElement(Icons[iconName] || IoCodeSlashSharp, {
      className: 'w-auto h-4 text-slate-500',
    });
    return <span>{icon}</span>;
  };

  if (postType === 'POST') {
    label = 'Braindumps';
    icon = 'HiOutlineMenu';
  }
  if (postType === 'FRAMEWORKS') {
    label = 'Frameworks';
    icon = 'HiOutlineTerminal';
  }
  if (postType === 'UTILITIES') {
    label = 'Utilities';
    icon = 'HiOutlineCubeTransparent';
  }
  if (postType === 'TUTORIALS') {
    label = 'Tutorials';
    icon = 'HiOutlinePresentationChartBar';
  }
  if (postType === 'LEARNING') {
    label = 'Learning';
    icon = 'HiOutlineAcademicCap';
  }
  if (postType === 'CAREER_ADVICE') {
    label = 'Career Advice';
    icon = 'HiOutlineHand';
  }
  if (postType === 'WORKING_REMOTELY') {
    label = 'Working Remote';
    icon = 'HiOutlineRss';
  }
  if (postType === 'DESK_SETUP') {
    label = 'My Desk Setup';
    icon = 'HiOutlineDesktopComputer';
  }
  if (postType === 'DESIGN_TIPS') {
    label = 'Design Tips';
    icon = 'HiOutlineColorSwatch';
  }
  if (postType === 'GOT_THE_JOB') {
    label = 'Got the Job';
    icon = '';
  }
  if (postType === 'PROJECT_IDEAS') {
    label = 'Project Ideas';
    icon = 'HiOutlineLightBulb';
  }
  if (postType === 'COLLABS') {
    label = 'Pair up';
    icon = 'HiOutlineUsers';
  }
  if (postType === 'ADVICE') {
    label = 'Ask Community';
    icon = 'HiOutlineLightningBolt';
  }
  if (postType === 'VENT') {
    label = 'Tech Vent';
    icon = 'HiOutlineLightningBolt';
  }
  if (postType === 'MEME') {
    label = 'Funny';
    icon = 'HiOutlineEmojiHappy';
  }
  if (postType === 'SHOWSTARTUP') {
    label = 'Startup';
    icon = 'HiOutlineLightningBolt';
  }
  if (postType === 'POLL') {
    label = 'Poll';
    icon = 'HiOutlineChartBar';
  }
  if (postType === 'PROJECT') {
    label = 'Showcase';
    icon = 'HiOutlineLightningBolt';
  }
  if (postType === 'ARTICLE') {
    label = 'Article';
    icon = 'HiOutlineDocumentText';
  }

  return (
    <div
      className={`${className} text-xs font-normal text-slate-500 flex items-center space-x-1 -ml-0.5`}
    >
      <Icon iconName={`${icon}`} />
      <span>{label}</span>
    </div>
  );
};

export default TagPostType;

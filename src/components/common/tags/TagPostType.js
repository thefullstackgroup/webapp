import Icon from '../elements/Icon';

const TagPostType = ({ postType, className }) => {
  let label = '';
  let icon = 'FiCircle';

  if (postType === 'SPARK') {
    label = 'Spark';
    icon = 'FiZap';
  }

  if (postType === 'POST') {
    label = 'Braindumps';
    icon = 'FiCloud';
  }
  if (postType === 'FRAMEWORKS') {
    label = 'Frameworks';
    icon = 'FiMaximize';
  }
  if (postType === 'UTILITIES') {
    label = 'Utilities';
    icon = 'FiTerminal';
  }
  if (postType === 'TUTORIALS') {
    label = 'Tutorials';
    icon = 'FiYoutube';
  }
  if (postType === 'LEARNING') {
    label = 'Learning';
    icon = 'FiBookOpen';
  }
  if (postType === 'CAREER_ADVICE') {
    label = 'Career Advice';
    icon = 'FiBriefcase';
  }
  if (postType === 'WORKING_REMOTELY') {
    label = 'Working Remote';
    icon = 'FiCast';
  }
  if (postType === 'DESK_SETUP') {
    label = 'My Desk Setup';
    icon = 'FiMonitor';
  }
  if (postType === 'DESIGN_TIPS') {
    label = 'Design Tips';
    icon = 'FiDroplet';
  }
  if (postType === 'PROJECT_IDEAS') {
    label = 'Project Ideas';
    icon = 'FiLoader';
  }
  if (postType === 'COLLABS') {
    label = 'Pair up';
    icon = 'FiUsers';
  }
  if (postType === 'ADVICE') {
    label = 'Ask Community';
    icon = 'FiHelpCircle';
  }
  if (postType === 'VENT') {
    label = 'Tech Vent';
    icon = 'FiFrown';
  }
  if (postType === 'MEME') {
    label = 'Funny';
    icon = 'FiSmile';
  }
  if (postType === 'SHOWSTARTUP') {
    label = 'Startup';
    icon = 'FiCircle';
  }
  if (postType === 'POLL') {
    label = 'Poll';
    icon = 'FiPieChart';
  }
  if (postType === 'PROJECT') {
    label = 'Showcase';
    icon = 'FiBox';
  }
  if (postType === 'ARTICLE') {
    label = 'Article';
    icon = 'FiFileText';
  }

  return (
    <div
      className={`${className} flex items-center space-x-1 rounded-full border px-2 py-1 text-xs font-normal text-base-500 dark:border-base-700/70 dark:text-base-300`}
    >
      <Icon name={icon} className="h-3 w-3" />
      <span>{label}</span>
    </div>
  );
};

export default TagPostType;

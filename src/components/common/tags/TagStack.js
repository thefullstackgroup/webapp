import React from 'react';
import * as Icons from 'react-icons/si';
import { IoCodeSlashSharp } from 'react-icons/io5';

const TagStack = (props) => {
  const Icon = (props) => {
    const { iconName } = props;

    let iconKey = `Si${
      iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase()
    }`;

    if (iconName === 'Shell') {
      iconKey = `SiWindowsterminal`;
    }
    if (iconName === 'NodeJS') {
      iconKey = `SiNodedotjs`;
    }

    const icon = React.createElement(Icons[iconKey] || IoCodeSlashSharp, {
      className: props.style ? props.style : 'w-4 h-4 text-base-400 rounded',
    });
    if (Icons[iconKey] != undefined) return <span>{icon}</span>;
    else return null;
  };

  return props.iconOnly && Icons[`Si${props.iconName}`] !== 'undefined' ? (
    <Icon iconName={`${props.tech}`} style={props.style} />
  ) : (
    <div
      className={
        'group relative mr-1 mb-1 flex w-min items-center space-x-1 whitespace-nowrap rounded-md bg-base-200 px-2.5 py-1.5 text-base-700 dark:bg-base-700/80 dark:text-base-200  ' +
        (props.size ? 'text-' + props.size : 'text-sm')
      }
    >
      <Icon iconName={`${props.tech}`} />
      <span>{props.tech}</span>
    </div>
  );
};

export default TagStack;

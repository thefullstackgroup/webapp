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
      className: props.style ? props.style : 'w-4 h-4 text-slate-400 rounded',
    });
    if (Icons[iconKey] != undefined) return <span>{icon}</span>;
    else return null;
  };

  return props.iconOnly && Icons[`Si${props.iconName}`] !== 'undefined' ? (
    <Icon iconName={`${props.tech}`} style={props.style} />
  ) : (
    <div
      className={
        'group relative mr-1 mb-1 flex w-min items-center space-x-1 whitespace-nowrap rounded-lg bg-base-600/50 px-2.5 py-1.5 font-medium tracking-tight text-slate-400  ' +
        (props.size ? 'text-' + props.size : 'text-sm')
      }
    >
      <Icon iconName={`${props.tech}`} />
      <span>{props.tech}</span>
    </div>
  );
};

export default TagStack;

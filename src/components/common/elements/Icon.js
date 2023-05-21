import { createElement } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as SiIcons from 'react-icons/si';

const Icon = (props) => {
  const { name, pack, className } = props;
  let style = 'h-5 w-5';
  if (className) style = className;

  let icon = createElement(FiIcons[name], {
    className: style,
  });

  if (pack === 'Si') {
    icon = createElement(SiIcons[name], {
      className: style,
    });
  }

  return <div>{icon}</div>;
};

export default Icon;

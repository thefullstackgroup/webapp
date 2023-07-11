import { createElement } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as IoIcons from 'react-icons/io5';

const Icon = ({ name, pack = 'Fi', className }) => {
  let style = 'h-5 w-5';
  if (className) style = className;

  let icon = '';

  if (pack === 'Fi') {
    icon = createElement(FiIcons[name], {
      className: style,
    });
  }

  if (pack === 'Si') {
    icon = createElement(SiIcons[name], {
      className: style,
    });
  }

  if (pack === 'Fa') {
    icon = createElement(FaIcons[name], {
      className: style,
    });
  }

  if (pack === 'Io') {
    icon = createElement(IoIcons[name], {
      className: style,
    });
  }

  return icon;
};

export default Icon;

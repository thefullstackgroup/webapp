import { useTheme } from 'next-themes';
import Icon from '../elements/Icon';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const Mode = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mode, setMode] = useState('');

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    if (theme) setMode(currentTheme);
  }, [theme]);

  return (
    <button
      onClick={() => (mode === 'dark' ? setTheme('light') : setTheme('dark'))}
      className="nav-bar nav-bar-icon"
    >
      {mode === 'dark' ? (
        <FiSun className={'h-6 w-6'} />
      ) : (
        <FiMoon className={'h-6 w-6'} />
      )}
    </button>
  );
};

export default Mode;

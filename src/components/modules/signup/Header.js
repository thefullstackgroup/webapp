import { useTheme } from 'next-themes';
import Image from 'next/future/image';

const Header = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="mx-auto mb-2 flex max-w-2xl items-center space-x-3 px-4 sm:px-2">
      <Image
        src={
          currentTheme === 'dark'
            ? '/assets/icons/thefullstack-dark.webp'
            : '/assets/icons/thefullstack-light.webp'
        }
        className="h-6 w-6 object-contain"
        alt="The Full Stack"
        width={200}
        height={200}
      />
      <span className="font-medium">Get setup on The Full Stack</span>
    </div>
  );
};

export default Header;

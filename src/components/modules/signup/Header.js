import Image from 'next/future/image';

const Header = () => {
  return (
    <div className="flex items-center space-x-4 max-w-2xl mx-auto mb-2 px-4 sm:px-2">
      <Image
        src="/assets/icons/thefullstack.webp"
        className="object-contain w-6 h-6"
        alt="The Full Stack"
        width={200}
        height={200}
      />
      <span className="font-semibold text-sm">Get setup on The Full Stack</span>
    </div>
  );
};

export default Header;

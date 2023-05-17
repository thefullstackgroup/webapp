import Image from 'next/future/image';
import Link from 'next/link';

const links = [
  { url: '/for/developers', label: 'Browse' },
  { url: '/for/teams', label: 'Hangout' },
  { url: '/about/our-story', label: 'Teams' },
  { url: '/privacy-policy', label: 'Privacy' },
  { url: '/cookie-policy', label: 'Cookie Policy' },
  { url: '/code-of-conduct', label: 'Code of Conduct' },
  { url: `${process.env.BASEURL}/resources/contact/general`, label: 'Contact' },
];

const Header = () => {
  return (
    <>
      <header className="bg-white dark:bg-black">
        <div className="mx-auto flex max-w-screen-2xl items-center border py-2">
          <h2 className="h-10 w-10 py-1">
            <Image
              src="/assets/icons/thefullstack.webp"
              className="object-contain"
              alt="The Full Stack"
              width={200}
              height={200}
            />
          </h2>

          <ul className="flex items-center justify-center space-x-4 md:space-x-6">
            {links.map((link, index) => (
              <li className=" whitespace-nowrap" key={index}>
                <Link href={link.url} passHref>
                  <a
                    href="#"
                    className="text-xs text-gray-400 hover:text-white lg:text-sm"
                  >
                    {link.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;

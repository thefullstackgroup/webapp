import Link from 'next/link';
import CookieConsent from 'react-cookie-consent';
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const links = [
  { url: '/for/developers', label: 'For Developers' },
  { url: '/for/teams', label: 'For Teams' },
  { url: '/about/our-story', label: 'About' },
  { url: '/privacy-policy', label: 'Privacy' },
  { url: '/cookie-policy', label: 'Cookie Policy' },
  { url: '/code-of-conduct', label: 'Code of Conduct' },
  { url: `${process.env.BASEURL}/resources/contact/general`, label: 'Contact' },
];

const socials = [
  {
    url: 'https://www.linkedin.com/company/thefullstacknetwork',
    label: 'LinkedIn',
  },
  { url: 'https://instagram.com/thefullstacknetwork/', label: 'Instagram' },
  { url: 'https://twitter.com/thefullstacknet', label: 'Twitter' },
  { url: 'https://github.com/thefullstackgroup', label: 'GitHub' },
];

const Footer = () => {
  return (
    <>
      <footer className="relative dark:bg-black bg-tfsdark-900 dark:border-t dark:border-tfsdark-700">
        <div className="max-w-5xl mx-auto py-12 px-4 md:px-10 lg:py-16">
          <div className="w-full flex flex-col justify-center space-y-4">
            <ul className="space-x-4 md:space-x-6 flex flex-wrap items-center justify-center">
              {links.map((link, index) => (
                <li className=" whitespace-nowrap" key={index}>
                  <Link href={link.url} passHref>
                    <a
                      href="#"
                      className="text-xs lg:text-sm text-gray-400 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6 justify-center">
              {socials.map((social, index) => (
                <a
                  href={social.url}
                  className="text-slate-400 hover:text-white duration-200"
                  target="_blank"
                  rel="noreferrer"
                  title={social.label}
                  key={index}
                >
                  <span className="sr-only">{social.label}</span>
                  {social.label === 'LinkedIn' && (
                    <FaLinkedin className="h-6 w-6" />
                  )}
                  {social.label === 'Instagram' && (
                    <FaInstagram className="h-6 w-6" />
                  )}
                  {social.label === 'Twitter' && (
                    <FaTwitter className="h-6 w-6" />
                  )}
                  {social.label === 'GitHub' && (
                    <FaGithub className="h-6 w-6" />
                  )}
                </a>
              ))}
            </div>
            <p className="w-full mt-8 text-xs text-gray-400 md:mt-0 text-center">
              &copy; {new Date().getFullYear()} thefullstack.
            </p>
          </div>
        </div>
      </footer>
      <CookieConsent
        disableStyles={true}
        location="bottom"
        containerClasses="bg-gray-800 fixed bottom-0 z-50 w-full flex py-2 px-4 items-center justify-between"
        contentClasses="relative max-w-full text-white text-sm md:text-base"
        buttonClasses="inline-flex ml-10 px-6 py-2 border-2 border-white text-sm font-bold rounded-md duration-200 text-white bg-transparent hover:bg-gray-600 hover:border-white"
        buttonText="OK"
      >
        Please note we use cookies to improve your experience. If you are happy,
        click OK.
      </CookieConsent>
    </>
  );
};

export default Footer;

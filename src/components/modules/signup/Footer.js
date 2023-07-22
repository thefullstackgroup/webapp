import Link from 'next/link';

const Footer = () => {
  return (
    <div className="mt-6 mb-20 flex w-full flex-col justify-center space-y-4 text-center  text-sm text-base-400 md:flex-row md:space-y-0 md:space-x-10">
      <Link href="/" passHref>
        <a href="">Home</a>
      </Link>
      <Link href="/privacy" passHref>
        <a href="">Privacy Policy</a>
      </Link>
      <Link href="/cookie-policy" passHref>
        <a href="">Cookie Policy</a>
      </Link>
      <Link href="/code-of-conduct" passHref>
        <a href="">Code of Conduct</a>
      </Link>
      <a
        href={`${process.env.BASEURL}/resources/contact/general`}
        target="_blank"
        rel="noreferrer"
      >
        Need Help?
      </a>
    </div>
  );
};

export default Footer;

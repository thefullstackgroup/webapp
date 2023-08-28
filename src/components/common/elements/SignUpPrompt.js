import Link from 'next/link';
import Icon from './Icon';
import ModalAlert from '../modals/ModalAlert';
import { useRouter } from 'next/router';

const SignUpPrompt = ({ show, setShow }) => {
  const router = useRouter();
  return (
    <ModalAlert show={show} setShow={setShow} title="Join us">
      <div className="px-4">
        <div className="space-y-6 py-10 text-center lg:px-6">
          <h4 className="font-manrope text-2xl font-bold">
            Join us at The Full Stack
          </h4>
          <p className="text-sm">
            Join us and thousands of developers who have discovered a place to
            show off projects and grow a network.
          </p>
          <div className="items-centet flex justify-center space-x-2">
            <Link href="/signup">
              <a href="#" className="btn btn-primary">
                Sign up
              </a>
            </Link>
            <Link
              href={{
                pathname: '/login',
                query: {
                  destination: encodeURIComponent(
                    `${process.env.BASEURL}${router.asPath}`
                  ),
                },
              }}
            >
              <a href="#" className="btn btn-secondary">
                Login
              </a>
            </Link>
          </div>
        </div>
      </div>
    </ModalAlert>
  );
};

export default SignUpPrompt;

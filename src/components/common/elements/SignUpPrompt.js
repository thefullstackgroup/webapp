import Link from 'next/link';
import ModalAlert from '../modals/ModalAlert';

const SignUpPrompt = ({ show, setShow }) => {
  return (
    <ModalAlert show={show} setShow={setShow} title="">
      <div>
        <div className="space-y-6 px-6 py-8 text-center">
          <h4 className="text-xl font-semibold">Join us at The Full Stack</h4>
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
            <Link href="/login">
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

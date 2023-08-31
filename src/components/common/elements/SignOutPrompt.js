import ModalAlert from '../modals/ModalAlert';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuthUser } from 'next-firebase-auth';

const SignOutPrompt = ({ show, setShow }) => {
  const AuthUser = useAuthUser();
  const router = useRouter();

  const handleLogout = async () => {
    await AuthUser.signOut();
    await axios.get(`/api/auth/logout`);
    router.reload('/');
  };

  return (
    <ModalAlert show={show} setShow={setShow} title="Sign out?">
      <div>
        <div className="space-y-6 px-6 py-8 text-center">
          <h4 className="text-xl font-semibold">We will miss you</h4>
          <Image
            src="/assets/profile/user/user-not-exist.png"
            alt="User not found"
            className="mx-auto w-28"
            width={200}
            height={200}
          />
          <p>Don&apos;t forget to come back...</p>
          <div className="items-centet flex justify-center space-x-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleLogout();
              }}
            >
              Sign me out
            </button>
          </div>
        </div>
      </div>
    </ModalAlert>
  );
};

export default SignOutPrompt;

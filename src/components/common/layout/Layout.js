import { useState } from 'react';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import SignUpModal from 'components/modules/signup/Modal';

const Layout = ({
  user,
  children,
  headerFixed,
  hideFooter,
  fullWidth = false,
}) => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-base-200/50 dark:bg-black">
        <Header user={user} headerFixed={headerFixed} />
        <div className={!fullWidth && 'mx-auto max-w-screen-2xl px-4'}>
          {children}
        </div>
        <Footer hideFooter={hideFooter} />
      </main>

      {showSignupModal && (
        <SignUpModal show={showSignupModal} setShow={setShowSignupModal} />
      )}
    </>
  );
};

export default Layout;

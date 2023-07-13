import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import Drawer from 'components/common/layout/Drawer';
import CreatePostModal from 'components/modules/create/CreatePostModal';
import { useState } from 'react';
import SignOutPrompt from '../elements/SignOutPrompt';
import LoginModal from 'components/modules/auth/LoginModal';

const Layout = ({
  user,
  children,
  headerAutoHide,
  hideFooter,
  fullWidth = false,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <main className="bg-base-100 dark:bg-base-900 lg:min-h-screen">
        <Header
          user={user}
          headerAutoHide={headerAutoHide}
          setShowDrawer={setShowDrawer}
          setShowCreatePost={setShowCreatePost}
          setShowSignOut={setShowSignOut}
          setShowLogin={setShowLogin}
        />
        <div
          className={
            !fullWidth
              ? 'relative mx-auto max-w-screen-2xl lg:mt-0 lg:px-4'
              : 'px-0'
          }
        >
          {children}
        </div>
        <Footer hideFooter={hideFooter} />
      </main>

      <CreatePostModal
        user={user}
        show={showCreatePost}
        setShow={setShowCreatePost}
      />

      {user && (
        <SignOutPrompt
          user={user}
          show={showSignOut}
          setShow={setShowSignOut}
        />
      )}

      {!user && (
        <LoginModal user={user} show={showLogin} setShow={setShowLogin} />
      )}

      <Drawer
        user={user}
        show={showDrawer}
        setShow={setShowDrawer}
        setShowSignOut={setShowSignOut}
        setShowCreatePost={setShowCreatePost}
      />
    </>
  );
};

export default Layout;

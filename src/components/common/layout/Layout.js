import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import CreatePostModal from 'components/modules/create/CreatePostModal';
import { useState } from 'react';
import SignOutPrompt from '../elements/SignOutPrompt';

const Layout = ({
  user,
  children,
  headerAutoHide,
  hideFooter,
  fullWidth = false,
}) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  return (
    <>
      <main className="min-h-screen bg-base-100 dark:bg-base-900">
        <Header
          user={user}
          headerAutoHide={headerAutoHide}
          setShowCreatePost={setShowCreatePost}
          setShowSignOut={setShowSignOut}
        />
        <div className={!fullWidth ? 'mx-auto max-w-screen-2xl px-4' : ''}>
          {children}
        </div>
        <Footer hideFooter={hideFooter} />
      </main>

      <CreatePostModal
        user={user}
        show={showCreatePost}
        setShow={setShowCreatePost}
      />

      <SignOutPrompt user={user} show={showSignOut} setShow={setShowSignOut} />
    </>
  );
};

export default Layout;

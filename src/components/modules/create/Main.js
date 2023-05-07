import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Scratch from 'components/modules/create/Scratch';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import ModalAlert from 'components/common/modals/ModalAlert';
import Loader from 'components/common/elements/Loader';

const Main = ({ user }) => {
  const router = useRouter();
  let postId = router.query.ref;
  const [loading, setLoading] = useState(false);
  const [isDiscardPromptOpen, setIsDiscardPromptOpen] = useState(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  const [postType, setPostType] = useState('PROJECT');
  const [postData, setPostData] = useState(null);

  const getPost = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.BASEURL}/api/posts/getPostByRef?postId=${postId}`)
      .then((response) => {
        setPostData(response.data);
        setPostType(response.data.projectType);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  const deletePost = async () => {
    const data = {
      projectId: postId,
    };
    await axios.post(
      `${process.env.BASEURL}/api/projects/project/delete`,
      data
    );
    router.push(`/${user.displayName}`);
  };

  useEffect(() => {
    if (postId) getPost();
  }, [postId]);

  if (loading)
    return (
      <div className="bg-tfsdark-700 min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="bg-tfsdark-900/50 min-h-screen">
        <button
          className="fixed z-50 top-5 left-4 xl:left-auto md:right-4 text-slate-400"
          onClick={() => setIsDiscardPromptOpen(true)}
        >
          <IoClose className="h-7 w-7 md:h-8 md:w-8" />
        </button>

        {/* {postType === 'PROJECT' && ( */}
        <div className="relative max-w-screen-lg mx-auto rounded-md bg-tfsdark-700">
          <Scratch
            user={user}
            setPostType={setPostType}
            postData={postData}
            setIsDeletePromptOpen={setIsDeletePromptOpen}
          />
        </div>
        {/* )} */}
      </div>

      {isDiscardPromptOpen && (
        <ModalAlert show={isDiscardPromptOpen} setShow={setIsDiscardPromptOpen}>
          <div className="sm:flex sm:items-start justify-center">
            <div className="mt-3 sm:mt-0 text-center">
              <h3 className="text-xl font-bold text-slate-200">Quit?</h3>
              <div className="mt-2">
                <p className="text-sm text-slate-300">
                  Are you sure you want to quit?
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 flex space-x-2 justify-center">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setIsDiscardPromptOpen(false)}
            >
              No
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => router.back()}
            >
              Yes
            </button>
          </div>
        </ModalAlert>
      )}

      {isDeletePromptOpen && (
        <ModalAlert show={isDeletePromptOpen} setShow={setIsDeletePromptOpen}>
          <div>
            <div className="sm:flex sm:items-start justify-center">
              <div className="mt-3 sm:mt-0 text-center">
                <h3 className="text-xl font-bold text-slate-200">
                  Delete post?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-slate-300">
                    Are you sure you want to delete this post? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 flex space-x-2 justify-center">
              <button
                type="button"
                className="btn-primary bg-red-600/80 hover:bg-red-500"
                onClick={() => deletePost()}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsDeletePromptOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalAlert>
      )}
    </>
  );
};

export default Main;

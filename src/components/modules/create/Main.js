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
      <div className="flex min-h-screen items-center justify-center bg-base-700">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-black">
        <button
          className="fixed top-5 left-4 z-50 text-slate-400 md:right-4 xl:left-auto"
          onClick={() => setIsDiscardPromptOpen(true)}
        >
          <IoClose className="h-7 w-7 md:h-8 md:w-8" />
        </button>

        {/* {postType === 'PROJECT' && ( */}
        <div className="relative mx-auto max-w-screen-lg rounded-md bg-base-700">
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
          <div className="justify-center sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0">
              <h3 className="text-xl font-bold text-slate-200">Quit?</h3>
              <div className="mt-2">
                <p className="text-sm text-slate-300">
                  Are you sure you want to quit?
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center space-x-2 sm:mt-4">
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
            <div className="justify-center sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0">
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
            <div className="mt-5 flex justify-center space-x-2 sm:mt-4">
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

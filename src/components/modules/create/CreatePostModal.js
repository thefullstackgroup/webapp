import React, { useState } from 'react';
import ImportFromGitHub from 'components/modules/create/ImportFromGitHub';
import ModalAlert from 'components/common/modals/ModalAlert';
import Icon from 'components/common/elements/Icon';
import Link from 'next/link';

const CreatePostModal = ({ user, show, setShow }) => {
  const [gitHubImportSelected, setGitHubImportSelected] = useState(false);

  return (
    <>
      <ModalAlert show={show} setShow={setShow} title="Share Project" disabled>
        {gitHubImportSelected ? (
          <ImportFromGitHub />
        ) : (
          <div className="space-y-2 py-6">
            <p className="mx-3 mb-4 text-center font-manrope text-3xl font-extrabold">
              Show off your project
            </p>
            <p className="mx-6 mb-8 text-center text-sm">
              Import a project from GitHub or create your project from scratch.
            </p>

            <div className="space-y-4 py-6">
              <button
                className="btn btn-secondary btn-with-icon w-full justify-center py-3"
                onClick={() => setGitHubImportSelected(true)}
              >
                <Icon name="SiGithub" pack="Si" className="h-7 w-7" />
                <span className="">Import from GitHub</span>
              </button>
              <Link href="/post">
                <button className="btn btn-secondary btn-with-icon w-full justify-center py-3">
                  <Icon name="FiBox" className="h-7 w-7" />
                  <span className="">Create from scratch</span>
                </button>
              </Link>
            </div>
          </div>
        )}
      </ModalAlert>
    </>
  );
};

export default CreatePostModal;

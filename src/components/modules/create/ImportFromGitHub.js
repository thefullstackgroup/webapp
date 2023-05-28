import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { IoCodeOutline, IoLogoGithub } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';
import Loader from 'components/common/elements/Loader';

const ImportFromGitHub = ({ setProjectTypeSelected }) => {
  const router = useRouter();
  const [myProfile, setMyProfile] = useState(null);
  const [gitHubUsername, setGitHubUsername] = useState(null);
  const [invalidGitHubUsername, setInvalidGitHubUsername] = useState(false);
  const [gitHubLinked, setGitHubLinked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [gitHubRepos, setGitHubRepos] = useState(null);
  const [searchResultsRepos, setSearchResultsRepos] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [importProcessing, setImportProcessing] = useState(false);
  const [importRepoError, setImportRepoError] = useState(false);

  const getMyProfile = async () => {
    await axios
      .get(`${process.env.BASEURL}/api/profile/me`)
      .then((response) => {
        setMyProfile(response.data);
        if (response.data.hasGitHubLinked) {
          setGitHubLinked(true);
        }
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  const getGitHubRepos = async () => {
    await axios
      .get(`${process.env.BASEURL}/api/profile/github/repos`)
      .then((response) => {
        setGitHubRepos(response.data);
        setLoadingRepos(false);
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  const handleSubmitGitHubUsername = async () => {
    setInvalidGitHubUsername(false);
    const formData = {
      gitHubAccount: gitHubUsername,
    };

    await axios
      .post(
        `${process.env.BASEURL}/api/profile/bio/update`,
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status == 204) {
          setGitHubLinked(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setInvalidGitHubUsername(true);
      });
  };

  const handleImportGitHubRepo = async (repoUrl) => {
    setImportProcessing(true);
    await axios
      .get(
        `${process.env.BASEURL}/api/projects/project/import/?gitHubURL=${repoUrl}`
      )
      .then((response) => {
        router.push(`/post?ref=${response.data._id}`);
        setProjectTypeSelected(true);
        setImportProcessing(false);
      })
      .catch((error) => {
        console.log(error);
        setImportRepoError(true);
        setImportProcessing(false);
      });
  };

  useEffect(() => {
    if (gitHubLinked) {
      setTimeout(() => getGitHubRepos(), 3500);
    }
  }, [gitHubLinked]);

  useEffect(() => {
    if (gitHubRepos) {
      const filtered = gitHubRepos.filter((obj) => {
        if (obj.name.includes(searchTerm)) {
          return obj.name;
        }
      });

      if (!filtered.length > 0) setSearchResultsRepos('');
      setSearchResultsRepos(filtered);
    }
  }, [searchTerm]);

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <>
      {myProfile && !gitHubLinked && (
        <div className="space-y-4 py-4">
          <div>
            <div className="flex">
              <span className="mt-1 block rounded-l-md bg-base-600/50 py-3 px-3 text-base focus:outline-none">
                <IoLogoGithub className="h-6 w-6 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="What's your GitHub username?"
                value={gitHubUsername}
                onChange={(e) => setGitHubUsername(e.target.value)}
                className="text-input rounded-l-none"
              />
            </div>
            {invalidGitHubUsername && (
              <p className="mt-2 text-xs text-red-500">
                Sorry, that is an invalid GitHub username, try again.
              </p>
            )}
          </div>

          {gitHubUsername?.trim().length ? (
            <button
              className="btn-primary w-full text-lg"
              onClick={() => handleSubmitGitHubUsername()}
            >
              Next
            </button>
          ) : (
            <button className="btn-primary w-full text-lg" disabled>
              Next
            </button>
          )}
        </div>
      )}

      {gitHubLinked && (
        <>
          {loadingRepos && (
            <div className="flex h-80 w-full flex-col items-center justify-center space-y-2 text-sm">
              <Loader />
              <span>Fetching your public repos ...</span>
            </div>
          )}

          {!loadingRepos && (
            <div className="py-4">
              <input
                type="text"
                placeholder="Choose repo or search..."
                className="text-input mb-4"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="no-scrollbar flex h-96 flex-col space-y-2 overflow-y-scroll pb-8">
                {searchResultsRepos?.map((repo) => (
                  <button
                    key={repo.id}
                    className={
                      'flex items-start space-x-4 rounded-md border p-4 text-left ' +
                      (selectedRepo === repo.html_url
                        ? 'border-green-500 bg-green-600/10'
                        : 'border-base-600 bg-base-700/50 hover:border-base-300')
                    }
                    onClick={() => setSelectedRepo(repo.html_url)}
                  >
                    <div>
                      <IoCodeOutline className="h-8 w-8 text-base-400" />
                    </div>
                    <div className="flex w-4/5 flex-col">
                      <span className="font-medium">{repo.name}</span>
                      <span className="text-xs font-medium text-base-500">
                        {repo.full_name}
                      </span>
                      <span className="mt-1 text-sm text-base-300 line-clamp-3">
                        {repo.description}
                      </span>
                    </div>
                  </button>
                ))}

                {!searchResultsRepos &&
                  gitHubRepos?.map((repo) => (
                    <button
                      key={repo.id}
                      className={
                        'flex items-start space-x-4 rounded-md border p-4 text-left ' +
                        (selectedRepo === repo.html_url
                          ? 'border-green-500 bg-green-600/10'
                          : 'border-base-600 bg-base-600/50 hover:bg-base-600/80')
                      }
                      onClick={() => setSelectedRepo(repo.html_url)}
                    >
                      <div>
                        <IoCodeOutline className="h-8 w-8 text-base-400" />
                      </div>
                      <div className="flex w-4/5 flex-col">
                        <span className="font-medium">{repo.name}</span>
                        <span className="text-xs font-medium text-base-500">
                          {repo.full_name}
                        </span>
                        <span className="mt-1 text-sm text-base-300 line-clamp-3">
                          {repo.description}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
              {!importProcessing &&
                (selectedRepo ? (
                  <button
                    className="btn-primary mt-4 w-full text-lg"
                    onClick={() => handleImportGitHubRepo(selectedRepo)}
                  >
                    Import
                  </button>
                ) : (
                  <button className="btn-primary mt-4 w-full text-lg" disabled>
                    Import
                  </button>
                ))}

              {importProcessing && selectedRepo && (
                <button
                  className="btn-primary btn-with-icon mt-4 w-full justify-center text-lg"
                  disabled
                >
                  <CgSpinner className="animate-spin" />
                  <span className="text-base font-normal">Importing ...</span>
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ImportFromGitHub;

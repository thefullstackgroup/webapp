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
              <span className="mt-1 text-base block bg-tfsdark-600/50 rounded-l-md py-3 px-3 focus:outline-none">
                <IoLogoGithub className="w-6 h-6 text-gray-400" />
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
              <p className="text-red-500 text-xs mt-2">
                Sorry, that is an invalid GitHub username, try again.
              </p>
            )}
          </div>

          {gitHubUsername?.trim().length ? (
            <button
              className="btn-primary text-lg w-full"
              onClick={() => handleSubmitGitHubUsername()}
            >
              Next
            </button>
          ) : (
            <button className="btn-primary text-lg w-full" disabled>
              Next
            </button>
          )}
        </div>
      )}

      {gitHubLinked && (
        <>
          {loadingRepos && (
            <div className="w-full h-80 flex flex-col text-sm space-y-2 justify-center items-center">
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
              <div className="h-96 overflow-y-scroll flex flex-col space-y-2 pb-8 no-scrollbar">
                {searchResultsRepos?.map((repo) => (
                  <button
                    key={repo.id}
                    className={
                      'border rounded-md p-4 flex items-start space-x-4 text-left ' +
                      (selectedRepo === repo.html_url
                        ? 'bg-green-600/10 border-green-500'
                        : 'bg-tfsdark-700/50 hover:border-tfsdark-300 border-tfsdark-600')
                    }
                    onClick={() => setSelectedRepo(repo.html_url)}
                  >
                    <div>
                      <IoCodeOutline className="w-8 h-8 text-slate-400" />
                    </div>
                    <div className="w-4/5 flex flex-col">
                      <span className="font-medium">{repo.name}</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {repo.full_name}
                      </span>
                      <span className="mt-1 text-sm text-slate-300 line-clamp-3">
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
                        'border rounded-md p-4 flex items-start space-x-4 text-left ' +
                        (selectedRepo === repo.html_url
                          ? 'bg-green-600/10 border-green-500'
                          : 'bg-tfsdark-600/50 hover:bg-tfsdark-600/80 border-tfsdark-600')
                      }
                      onClick={() => setSelectedRepo(repo.html_url)}
                    >
                      <div>
                        <IoCodeOutline className="w-8 h-8 text-slate-400" />
                      </div>
                      <div className="w-4/5 flex flex-col">
                        <span className="font-medium">{repo.name}</span>
                        <span className="text-xs text-slate-500 font-medium">
                          {repo.full_name}
                        </span>
                        <span className="mt-1 text-sm text-slate-300 line-clamp-3">
                          {repo.description}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
              {!importProcessing &&
                (selectedRepo ? (
                  <button
                    className="mt-4 btn-primary text-lg w-full"
                    onClick={() => handleImportGitHubRepo(selectedRepo)}
                  >
                    Import
                  </button>
                ) : (
                  <button className="mt-4 btn-primary text-lg w-full" disabled>
                    Import
                  </button>
                ))}

              {importProcessing && selectedRepo && (
                <button
                  className="mt-4 btn-primary btn-with-icon justify-center text-lg w-full"
                  disabled
                >
                  <CgSpinner className="animate-spin" />
                  <span className="font-normal text-base">Importing ...</span>
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

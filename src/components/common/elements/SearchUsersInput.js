import { useRef, useState } from 'react';
import { useAuthUser } from 'next-firebase-auth';
import axios from 'axios';
import Avatar from 'components/common/elements/Avatar';
import { IoSearch } from 'react-icons/io5';
import Link from 'next/link';
import * as ga from 'lib/ga';
import Loader from 'components/common/elements/Loader';

const SearchUsersInput = () => {
  const AuthUser = useAuthUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLoadingResults, setShowLoadingResults] = useState(false);
  const searchTermRef = useRef(null);

  const handleSearch = async (event) => {
    const accessToken = await AuthUser.getIdToken();
    event.preventDefault();

    if (searchTermRef.current.value && searchTermRef.current.value.length > 1) {
      setShowLoadingResults(true);
      await axios
        .get(
          `${process.env.BASEURL}/api/search/profiles/search?term=${searchTermRef.current.value}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          setSearchResults(res.data);
          setShowSearchResults(true);
          ga.event({
            action: 'user_performed_user_search',
          });
        });
      setShowLoadingResults(false);
    }
  };

  return (
    <>
      <div className="w-full px-4 mx:mx-auto md:w-full md:flex items-center md:space-x-2 pb-4">
        <IoSearch className="hidden md:block h-6 w-6 text-white" />
        <input
          type="text"
          name="search"
          placeholder="Search people"
          className="text-input w-full mx-auto py-1.5"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e);
          }}
          ref={searchTermRef}
        />
      </div>
      <div>
        {showLoadingResults && (
          <div className="h-96 w-full flex flex-1 items-center justify-center">
            <Loader />
          </div>
        )}
        {!showLoadingResults && (
          <div className="rounded-lg bg-tfsdark-700">
            {!searchResults?.length > 0 && (
              <div className="h-96 flex flex-1 text-sm items-center justify-center">
                <p>No results found</p>
              </div>
            )}

            {searchResults?.length > 0 && (
              <ul className="overflow-hidden h-screen overflow-y-scroll overscroll-contain">
                {searchResults?.map((eng, index) => (
                  <li
                    className="hover:bg-tfsdark-600 px-4 text-left"
                    key={index}
                    onClick={() => setShowSearchResults(false)}
                  >
                    {eng?.displayName != null ? (
                      <Link
                        href={`${process.env.BASEURL}/${eng?.displayName}`}
                        passHref
                      >
                        <div className="outline-none relative py-3 flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <Avatar
                              image={eng?.profilePicUrl || eng?.profilePicURL}
                              href={`/${eng?.displayName}`}
                              dimensions="h-10 w-10"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <a href="#" className="focus:outline-none">
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              ></span>
                              <p className="text-sm font-medium text-slate-100">
                                {eng?.name || eng?.displayName}
                              </p>
                              <p className="text-sm text-slate-400 truncate">
                                {eng?.currentTitle}
                              </p>
                            </a>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="outline-none relative py-5 flex items-center space-x-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-100">
                            Sorry an unexpected error has occurred with this
                            search result.
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchUsersInput;

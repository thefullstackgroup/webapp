import { AuthAction, withAuthUserTokenSSR } from 'next-firebase-auth';
import { useEffect, useState } from 'react';
import Meta from 'components/common/partials/Metadata';
import SignUpModal from 'components/modules/signup/Modal';
import TechPill from 'components/common/tags/TagStack';
import {
  IoArrowDown,
  IoBrowsersSharp,
  IoCloseOutline,
  IoCloseSharp,
  IoCloudUploadOutline,
  IoCodeSlashSharp,
  IoColorPaletteOutline,
  IoLinkSharp,
  IoPhonePortraitOutline,
} from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import LayoutLoggedOut from 'components/common/layout/LayoutLoggedOut';
import ModalDialog from 'components/common/modals/ModalDialog';

const filterTypes = [
  {
    type: 'frontend',
    label: 'Frontend',
  },
  {
    type: 'backend',
    label: 'Backend',
  },
  {
    type: 'fullstack',
    label: 'Full Stack',
  },
  {
    type: 'ios',
    label: 'iOS',
  },
  {
    type: 'android',
    label: 'Android',
  },
];

const filterStacks = [
  {
    stack: 'react',
    label: 'React',
  },
  {
    stack: 'vue',
    label: 'VueJS',
  },
  {
    stack: 'php',
    label: 'PHP',
  },
  {
    stack: 'ruby',
    label: 'Ruby',
  },
  {
    stack: 'javascript',
    label: 'JavaScript',
  },
  {
    stack: 'java',
    label: 'Java',
  },
  {
    stack: 'css',
    label: 'CSS',
  },
  {
    stack: 'node',
    label: 'Node',
  },
  {
    stack: 'python',
    label: 'Python',
  },
];

const Card = ({ item }) => {
  return (
    <div className="col-span-1 mb-4 md:mb-0 border border-tfsdark-600 rounded-lg p-4">
      <div className="flex">
        <div className="hidden md:block w-2/12">
          <div className="bg-tfsdark-800 rounded-lg w-12 h-12 p-2.5">
            {item.type.toLowerCase() === 'mobileapp' && (
              <IoPhonePortraitOutline className="w-7 h-auto text-primary-500" />
            )}
            {item.type.toLowerCase() === 'webapp' && (
              <IoBrowsersSharp className="w-7 h-auto text-primary-500" />
            )}
            {(item.type.toLowerCase() === 'service' || item.type === 'api') && (
              <IoCloudUploadOutline className="w-7 h-auto text-primary-500" />
            )}
            {item.type.toLowerCase() === 'theme' && (
              <IoColorPaletteOutline className="w-7 h-auto text-primary-500" />
            )}
            {item.type.toLowerCase() === 'plugin' && (
              <IoLinkSharp className="w-7 h-auto text-primary-500" />
            )}
            {!item.type.trim().length > 0 && (
              <IoCodeSlashSharp className="w-7 h-auto text-primary-500" />
            )}
          </div>
        </div>
        <div className="w-10/12 space-y-1">
          <div className="font-bold text-lg">{item.title}</div>
          <div className="font-normal text-slate-400 text-sm line-clamp-3">
            {item.description}
          </div>
          <div className="">
            {item.tutorial && (
              <a
                href={item.tutorial}
                target="_blank"
                rel="noreferrer"
                className="text-primary-600 text-sm font-bold"
              >
                See tutorial &rarr;
              </a>
            )}
          </div>
          <div className="flex flex-row pt-2 flex-wrap">
            {item.stack?.map((value, index) => (
              <div key={index}>
                <TechPill tech={value} size={'xs'} key={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function GreatestPortfolio() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [filterSelected, setFilterSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const getData = () => {
    fetch(`${process.env.BASEURL}/api/projects/ideas`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        setData(result.data);
      });
  };

  const handleBrowseIdeas = () => {
    setTimeout(() => {
      const el = window.document.getElementById('ideas');
      const r = el.getBoundingClientRect();
      window.top.scroll({
        top: scrollY + r.top,
        behavior: 'smooth',
      });
    }, 200);
  };

  const handleSearch = (term) => {
    const result = data.filter(
      (item) =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.description.toLowerCase().includes(term.toLowerCase()) ||
        item.stack.includes(term.toLowerCase())
    );
    setFilteredData(result);
    setFilterSelected(null);
  };

  const handleFilter = (type, term) => {
    let result = '';
    if (type === 'role') {
      result = data.filter((item) => item.role.includes(term));
    } else {
      result = data.filter((item) => item.stack.includes(term));
    }
    setFilteredData(result);
    setFilterSelected(term);
    const path = window.location.hash;

    setTimeout(() => {
      const el = window.document.getElementById('ideas');
      const r = el.getBoundingClientRect();
      window.top.scroll({
        top: scrollY + r.top,
        behavior: 'smooth',
      });
    }, 200);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Meta
        title="Greatest Developer Portfolio Ever"
        description="Need ideas for what to build for your Developer portfolio?"
        keywords="developer portolfio showcase, developer, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
        openGraphImage="https://thefullstack.network/assets/landing/main/dev-portfolio-og.webp"
      />

      <LayoutLoggedOut setShowSignupModal={setShowSignupModal}>
        <div className="relative px-0 md:px-8 mb-28 max-w-screen-xl mx-auto">
          <div className="absolute top-20 -right-8 hidden lg:block h-auto w-6/12">
            <img
              src="/assets/landing/main/computer2.webp"
              alt="Greatest Developer Portfolio Ever"
              className="w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row max-w-7xl mx-4 md:mx-auto">
            <div className="lg:w-7/12 pt-10 md:pt-28 md:pr-14">
              <div>
                <h1 className="text-3xl tracking-tight font-bold font-intertight text-slate-100 md:text-6xl text-center md:text-left">
                  Greatest Developer Portfolio ...ever
                </h1>
              </div>
              <div className="mt-4 md:w-4/5">
                <h4 className="text-lg tracking-tight text-gray-400  md:text-2xl text-center md:text-left">
                  Here you will find project ideas you could build to add to
                  your developer portfolio depending on your skills.
                </h4>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => handleBrowseIdeas()}
                  className="btn-primary py-3 px-6"
                >
                  Explore ideas
                </button>
              </div>
              <div className="mt-4 lg:mt-10 mb-10 text-sm text-primary-500 font-semibold dark:hover:text-purple-400 cursor-pointer text-center lg:text-left">
                <a
                  href={`https://github.com/thefullstackgroup/greatest-developer-portfolio-ever`}
                  target="_blank"
                  rel="noreferrer"
                >
                  &rarr; Got an idea for a project?
                </a>
              </div>
            </div>
          </div>

          <div id="ideas" className="md:mt-10"></div>

          <div className="pt-10 md:flex md:space-x-4 max-w-7xl mx-4 md:mx-auto">
            <div className="hidden md:block md:w-3/12">
              <div className="sticky top-20 space-y-10">
                <div>
                  <div className="flex items-center space-x-1">
                    <IoArrowDown className="h-4" />
                    <span className="font-bold text-base">Filter by</span>
                  </div>
                  <ul className="my-4 ml-4 space-y-2 font-mono text-slate-400">
                    {filterTypes.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleFilter('role', item.type)}
                          className={
                            filterSelected === item.type
                              ? 'text-primary-500'
                              : 'hover:text-slate-100'
                          }
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center space-x-1">
                    <IoArrowDown className="h-4" />
                    <span className="font-bold text-base">Stack</span>
                  </div>
                  <ul className="my-4 ml-4 space-y-2 font-mono text-slate-400">
                    {filterStacks.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleFilter('stack', item.stack)}
                          className={
                            filterSelected === item.stack
                              ? 'text-primary-500'
                              : 'hover:text-slate-100'
                          }
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:w-9/12">
              <div className="w-full flex items-center rounded-md bg-tfsdark-700 px-4 mb-8">
                <FiSearch className="h-7 w-auto text-slate-600" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search for project ideas"
                  autoFocus
                  className="focus:placeholder-gray-400 placeholder-gray-400 text-lg md:text-xl py-3 px-4 w-full focus:ring-0 focus:border-transparent focus:outline-none bg-transparent border-0"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleSearch(e.target.value);
                  }}
                />
              </div>
              <h4 className="text-xl tracking-tight font-bold">
                Browse project ideas
              </h4>
              {filterSelected && (
                <div className="flex items-center mt-2 text-sm text-gray-400 space-x-2">
                  <span>Filtered by:</span>
                  <button
                    className="flex items-center space-x-1 w-min bg-tfsdark-800 text-slate-200 rounded-full py-1 px-2.5 text-sm font-medium"
                    onClick={() => {
                      setFilteredData([]);
                      setFilterSelected('');
                    }}
                  >
                    <span>{filterSelected}</span>
                    <IoCloseSharp className="w-4" />
                  </button>
                </div>
              )}
              {searchTerm.trim().length > 0 && (
                <div className="flex items-center mt-2 text-sm text-gray-400 space-x-2">
                  <span>Search results for the term:</span>
                  <button
                    className="flex items-center space-x-1 w-auto bg-tfsdark-800 text-slate-200 rounded-full py-1 px-2.5 text-sm font-medium"
                    onClick={() => {
                      setFilteredData([]);
                      setSearchTerm('');
                    }}
                  >
                    <span>{searchTerm}</span>
                    <IoCloseSharp className="w-4" />
                  </button>
                </div>
              )}
              <div className="mt-6 md:grid md:grid-cols-2 gap-8">
                {!filterSelected &&
                  !searchTerm &&
                  data.map((item, index) => <Card item={item} key={index} />)}
                {searchTerm &&
                  filteredData.map((item, index) => (
                    <Card item={item} key={index} />
                  ))}
                {filterSelected &&
                  !searchTerm &&
                  filteredData.map((item, index) => (
                    <Card item={item} key={index} />
                  ))}

                {data && !data.length > 0 && !filterSelected && (
                  <p>No project ideas found</p>
                )}
                {data && !filteredData.length > 0 && filterSelected && (
                  <p>No project ideas found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutLoggedOut>

      {showSignupModal && (
        <ModalDialog show={showSignupModal} setShow={setShowSignupModal}>
          <div className="pt-2">
            <button
              className="z-50 w-full text-white flex justify-end"
              onClick={() => setShowSignupModal(!showSignupModal)}
            >
              <IoCloseOutline className="h-8 w-8" />
            </button>
            <div className="w-full">
              <SignUpModal />
            </div>
            {/* </div> */}
          </div>
        </ModalDialog>
      )}
    </>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.RENDER,
})(async () => {
  return {
    props: {
      user: {},
    },
  };
});

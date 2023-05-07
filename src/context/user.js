import { createContext, useState } from 'react';

export const UserStateContext = createContext({});

export const UserStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userNumConnections, setUserNumConnections] = useState(0);
  const [userTotalLikes, setUserTotalLikes] = useState(0);
  const [userTotalViews, setUserTotalViews] = useState(0);
  const [recentMembers, setRecentMembers] = useState([]);
  const [featuredProject, setFeaturedProject] = useState([]);
  const [creatorCoinTotal, setCreatorCoinTotal] = useState(0);

  const value = {
    user,
    setUser,
    userNumConnections,
    setUserNumConnections,
    userTotalLikes,
    setUserTotalLikes,
    userTotalViews,
    setUserTotalViews,
    recentMembers,
    setRecentMembers,
    creatorCoinTotal,
    setCreatorCoinTotal,
    featuredProject,
    setFeaturedProject,
  };

  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  );
};

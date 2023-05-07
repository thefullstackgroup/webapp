import React from 'react';
import ProjectGallery from 'components/modules/explore/ProjectGallery';

const Feed = ({ user, range, sort, category, following, viewType, query }) => {
  const myTechStack =
    user?.userSkills?.skills
      .map(({ languageName }) => languageName)
      .join(',') || null;

  return (
    <div className="mb-8 pb-20">
      <ProjectGallery
        user={user}
        range={range}
        sort={sort}
        category={category}
        following={following}
        myTechStack={myTechStack}
        viewType={viewType}
        query={query}
      />
    </div>
  );
};

export default Feed;

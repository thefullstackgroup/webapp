import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

import { Mention } from 'primereact/mention';

const MentionInput = ({ userId, value, onChange, placeholder, name }) => {
  const [suggestions, setSuggestions] = useState([]);

  const connectionsURL = `${process.env.BASEURL}/api/connections/get?userId=${userId}`;
  const { data: userFollowings, isLoading } = useSWR(connectionsURL, fetcher);

  const mock = {
    received_pending: [],
    requested_pending: [
      {
        _id: '64e81f26151476289a6d9312',
        user_id: '3sIelWKe1jgoOIurh7y6hZSLB5r1',
        username: 'StefanFMeyer',
        picture:
          'https://terrabyte.fra1.digitaloceanspaces.com/avatars/3sIelWKe1jgoOIurh7y6hZSLB5r1/profile-3sIelWKe1jgoOIurh7y6hZSLB5r1-profilepic.jpg',
        title: 'Full Stack Developer',
      },
      {
        _id: '60af58b59ee6390fb10c78ea',
        user_id: 'github|70280594',
        username: 'PhilipBannonCTO',
        picture: 'https://avatars.githubusercontent.com/u/70280594?v=4',
        title: 'CTO & Co Founder @ thefullstack',
      },
    ],
    connections: [
      {
        _id: '64c5295b84e21538840497f1',
        user_id: 'IS8mj9rvP2ULOQSzErQG2VCnYIP2',
        username: 'leighbriody',
        picture:
          'https://lh3.googleusercontent.com/a/AGNmyxaVTH2scWGhsWT2DwMHDGB8Ixp66MkFyd6OD18tqQ=s96-c',
        title: 'Software Engineer',
      },
      {
        _id: '6102646565a5b419677b5a0c',
        user_id: 'google-oauth2|106215588282051825334',
        username: 'henrique',
        picture:
          'https://terrabyte.fra1.digitaloceanspaces.com/avatars/google-oauth2%7C106215588282051825334/profile-google-oauth2%7C106215588282051825334-HenriqueProfilePic.jpeg',
        title: 'Engineering @thefullstack',
      },
      {
        _id: '60a79b596e2983725e44a01d',
        user_id: 'google-oauth2|110889799112459409416',
        username: 'danoely',
        picture:
          'https://terrabyte.fra1.digitaloceanspaces.com/avatars/google-oauth2%7C110889799112459409416/profile-google-oauth2%7C110889799112459409416-noel.jpeg',
        title: 'Founder, builder, guitarist',
      },
      {
        _id: '60f5e181259f9c271e7e26ad',
        user_id: 'google-oauth2|113946506972373293584',
        username: 'jamie',
        picture:
          'https://terrabyte.fra1.digitaloceanspaces.com/avatars/google-oauth2%7C113946506972373293584/profile-google-oauth2%7C113946506972373293584-jamwe.png',
        title: 'Code Wrangler ',
      },
    ],
  }.connections.map((con) => {
    return { username: con.username, picture: con.picture, title: con.title };
  });

  const followings = userFollowings?.connections?.map((con) => {
    return { username: con.username, picture: con.picture, title: con.title };
  });

  const onSearch = (event) => {
    //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
    setTimeout(() => {
      const query = event.query;
      let suggestions;
      if (!mock) return;

      if (!query.trim().length) {
        suggestions = [...mock];
      } else {
        suggestions = mock?.filter((user) => {
          return user.username.toLowerCase().startsWith(query.toLowerCase());
        });
      }

      setSuggestions(suggestions);
    }, 250);
  };

  const itemTemplate = (suggestion) => {
    return (
      <>
        {isLoading ? (
          <div className="flex  h-14 w-full items-center justify-start p-2 text-black dark:text-white">
            Loading...
          </div>
        ) : (
          <div
            className={` dark:text-red  flex h-14 w-full items-center justify-start
        gap-2 rounded-md  bg-white p-1 text-black hover:cursor-pointer hover:bg-slate-200 hover:text-black dark:bg-black dark:hover:bg-slate-600 dark:hover:text-black`}
          >
            <Image
              src={suggestion.picture}
              alt="atr"
              width={50}
              height={50}
              quality={100}
              className="h-6 min-h-[1.5rem] w-8 min-w-[2rem] rounded-full "
            />
            <div
              className="flex h-4/5 w-full flex-col items-start justify-center gap-0 
          text-black hover:text-white dark:text-white dark:hover:text-black
      "
            >
              <p className="truncate text-sm font-bold  text-black dark:text-white">
                @{suggestion.username}
              </p>
              <p className="truncate text-xs text-black dark:text-white">
                {suggestion?.title}
              </p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <Mention
      pt={{
        root: 'w-full ',
        input:
          'w-full  bg-white text-black dark:bg-black dark:text-white w-full rounded-md focus-within:outline-none  ',
        items: 'w-56 ',
        panel:
          'max-w-[20rem] w-auto max-h-[15rem] ml-12 mt-2 rounded-md border border-slate-200 p-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-black ',
      }}
      name={name}
      autoHighlight
      placeholder={placeholder}
      autoResize
      value={value}
      onChange={(e) => onChange(e.target.value)}
      suggestions={isLoading ? [1] : suggestions}
      onSearch={onSearch}
      field="username"
      rows={5}
      cols={40}
      unstyled
      itemTemplate={itemTemplate}
    />
    // <div className="justify-content-center flex items-center">
    // </div>
    // <div className="box-border h-auto overflow-auto">
    // </div>
  );
};

export default MentionInput;

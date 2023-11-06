const MentionsSpan = ({ children }) => {
  const usernameRegex = /@([^[\]]+)/g;
  const parts = children.split(' ');

  const modifiedText = children.replace(usernameRegex, (match, username) => {
    // console.log('username: ', match);
    // Here, you can construct the <a> element wit the link to '/username'
    return <a href="/${username}">{username}</a>;
  });

  const elements = parts.map((part, index) => {
    if (part.match(usernameRegex)) {
      // This part contains a username, wrap it in an <a> element
      const username = part.replace(/\@|\[|\]/g, '');
      return (
        <a key={index} href={`/${username}`} target="_blank">
          {part.replace(/\[|\]/g, '')}
        </a>
      );
    } else {
      // This part does not contain a username, return it as is
      return <>{part}</>;
    }
  });

  return (
    <span>
      {elements.map((ele) => {
        return <>{ele} </>;
      })}
    </span>
  );
};
export default MentionsSpan;

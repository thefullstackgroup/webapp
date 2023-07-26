const UserProfile = () => {
  return <></>;
};

export default UserProfile;

export async function getServerSideProps({ res, req, query }) {
  res.writeHead(301, {
    Location: `${process.env.BASEURL}/${encodeURIComponent(query.userId)}`,
  });
  res.end();

  return {};
}

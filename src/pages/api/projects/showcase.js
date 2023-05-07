import axios from 'axios';

const handler = async (req, res) => {
  return axios
    .get(
      `${process.env.API_SEARCH_URL}/search/showcase?page=${
        req.query.page
      }&size=${req.query.size}&projectType=${
        req.query.projectType || ''
      }&orderBy=${req.query.sort}${
        req.query?.tech && req.query?.tech !== undefined
          ? '&techStack=' + req.query.tech
          : ''
      }${
        req.query?.category && req.query?.category !== undefined
          ? '&techCategories=' + req.query.category
          : ''
      }&lookingForCollabs=${req.query.lookingForCollabs || false}`
    )
    .then((response) => {
      res.status(response.status).json(response.data.content);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
};

export default handler;

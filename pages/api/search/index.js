import axios from 'axios';

export default async function handler(req, res) {
  const api_key = process.env.API_KEY;
  const { method } = req;
  let searchText = req.query.searchText;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchText}&page=1&include_adult=false`;
  if (!searchText) {
    const randomPage = Math.floor(Math.random() * (1 - 200 + 1) + 200);
    url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&page=${randomPage}&adult=false`;
  }

  if (method === 'GET') {
    try {
      const result = await axios.get(url);
      res.status(200).json(result.data.results);
    } catch (error) {
      console.log('Error ==> ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

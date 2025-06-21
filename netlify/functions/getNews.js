const fetch = require('node-fetch');

exports.handler = async function () {
  const API_KEY = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=Israel+Iran+attack&language=en&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const events = data.articles.map((a, i) => ({
      id: 'event-' + i,
      title: a.title,
      lat: 32 + i * 0.1, // demo coords
      lng: 53 + i * 0.1,
      date: a.publishedAt.split('T')[0],
      link: a.url
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(events)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

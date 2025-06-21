export default async function handler(req, res) {
  const API_KEY = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=Israel+Iran+conflict&language=en&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles || !Array.isArray(data.articles)) {
      console.error("No articles found or malformed response:", data);
      return res.status(200).json([]); // Return empty array so frontend doesn’t break
    }

    const knownCities = ['Tehran', 'Tel Aviv', 'Jerusalem', 'Isfahan', 'Damascus', 'Baghdad', 'Beirut'];

    const events = await Promise.all(
      data.articles.map(async (a, i) => {
        const match = knownCities.find(city =>
          a.title.includes(city) || (a.description && a.description.includes(city))
        );

        let coords = { lat: 32.0 + i * 0.1, lng: 53.0 + i * 0.1 }; // fallback
        if (match) {
          try {
            const geo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(match)}`);
            const result = await geo.json();
            if (result[0]) {
              coords = {
                lat: parseFloat(result[0].lat),
                lng: parseFloat(result[0].lon)
              };
            }
          } catch (geocodeErr) {
            console.error("Geocoding failed:", geocodeErr.message);
          }
        }

        return {
          id: 'event-' + i,
          title: a.title,
          date: a.publishedAt?.split('T')[0] || '',
          link: a.url,
          ...coords
        };
      })
    );

    res.status(200).json(events);
  } catch (err) {
    console.error("API Fetch failed:", err.message);
    res.status(200).json([]); // Don't crash frontend
  }
}

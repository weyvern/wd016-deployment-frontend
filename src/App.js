import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/countries`);
        setCountries(data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError(error.message);
        }
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      }
    };
    !error && getCountries();
  }, [error]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      {countries.map(country => (
        <div key={country.id}>{country.name}</div>
      ))}
    </div>
  );
};

export default App;

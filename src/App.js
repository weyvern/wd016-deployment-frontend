import { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
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
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path='/'>
          {countries.map(country => (
            <div key={country.id}>{country.name}</div>
          ))}
        </Route>
        <Route exact path='/about'>
          <h1>About us</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default App;

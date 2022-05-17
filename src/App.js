import { Container } from 'react-bootstrap';

import { Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home/Home';
import Table from './components/pages/Table/Table';
import NotFound from './components/pages/NotFound/NotFound';

import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';

import { fetchTables } from './redux/tablesRedux';
import { fetchStatuses } from './redux/statusesRedux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const App = () => {

  // wlaczyc stan, dodac settables w fetch i zmienic fetch w tablesRedux

  const [tables, setTables] = useState(); // dlaczego to dziala? setTables w fetchTables i useSelector w Tables.js
  const [loading, setLoading] = useState(false); // loading tez cos nie bardzo, setLoading w fetchTables

  const dispatch = useDispatch();

  // useEffect(() => dispatch(fetchTables()), [dispatch]);
  // useEffect(() => dispatch(fetchTables(setTables)), [dispatch]);
  useEffect(() => dispatch(fetchTables(setTables, setLoading)), [dispatch]);
  useEffect(() => dispatch(fetchStatuses()), [dispatch]);

  return (
    <div>
      <Container>
        <Header />
        { (loading) && <h1>Loading...</h1> }
        { (!loading) &&
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/table/:id" element={<Table />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        }
        <Footer />
      </Container>
    </div>
  );
}

export default App;

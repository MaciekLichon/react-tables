import { Container } from 'react-bootstrap';

import { Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home/Home';
import Table from './components/pages/Table/Table';
import NotFound from './components/pages/NotFound/NotFound';

import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';

import { fetchTables } from './redux/tablesRedux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <div>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<Table />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
}

export default App;

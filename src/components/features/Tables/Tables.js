import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { Card } from 'react-bootstrap';

const Tables = () => {

  const tables = useSelector(getAllTables);
  console.log(tables);

  return (
    <>
      {tables.map(table =>(
        <Card key={table.id} className="d-flex flex-row justify-content-between align-items-center border-0 border-bottom py-1">
          <Card.Body className="d-flex flex-row gap-4 align-items-center px-0">
            <h3 className="m-0">Table {table.id}</h3>
            <p className="m-0">
              <span className="fw-bold">Status: </span>
              {table.status}
            </p>
          </Card.Body>
          <Card.Link as={NavLink} to={`/table/${table.id}`} className="btn btn-primary">Show more</Card.Link>
        </Card>
      ))}
    </>
  );
};

export default Tables;

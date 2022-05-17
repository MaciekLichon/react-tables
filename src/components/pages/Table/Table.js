import shortid from 'shortid';

import { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { getTableById, editTableRequest } from '../../../redux/tablesRedux';
import { getAllStatuses } from '../../../redux/statusesRedux';

import { Form, Button } from 'react-bootstrap';

const Table = () => {

  const { id } = useParams();
  const tableData = useSelector(state => getTableById(state, id));
  const statusesList = useSelector(getAllStatuses);

  const [status, setStatus] = useState(tableData.status);
  const [peopleAmount, setPeopleAmount] = useState(tableData.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(tableData.maxPeopleAmount);
  const [bill, setBill] = useState(tableData.bill);

  const handleStatusChange = e => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    if (selectedStatus === "Busy") {
      setBill("0");
    } else if (selectedStatus === "Cleaning" || selectedStatus === "Free") {
      setPeopleAmount("0");
    }
  };

  const handleMaxPeopleChange = e => {
    const newMaxPeople = e.target.value;
    setMaxPeopleAmount(newMaxPeople);
    if (newMaxPeople < peopleAmount) {
      setPeopleAmount(newMaxPeople);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editTableRequest({ id, status, peopleAmount, maxPeopleAmount, bill }));
    navigate('/');
  };

  if(!tableData) return <Navigate to="/" />
    return (
      <>
        <h1 className="mb-4">Table {tableData.id}</h1>

        <Form onSubmit={handleSubmit}>

          <Form.Group className="d-flex align-items-center gap-4 col-5 mb-4">
            <Form.Label className="fw-bold m-0">Status: </Form.Label>
            <Form.Select
              value={status}
              onChange={handleStatusChange}
            >
              {statusesList.map(status => (
                <option
                  key={shortid()}
                  value={status}
                  onChange={handleStatusChange}>
                  {status}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="d-flex align-items-center gap-4 col-5 mb-4">
            <Form.Label className="fw-bold m-0">People: </Form.Label>
            <div className="d-flex align-items-center gap-1 col-6">
              <Form.Control
                className="w-50"
                type="number"
                min="0"
                max={maxPeopleAmount}
                value={peopleAmount}
                onChange={e => setPeopleAmount(e.target.value)}
              />
              <p className="m-0">/</p>
              <Form.Control
                className="w-50"
                type="number"
                min="0"
                max="10"
                value={maxPeopleAmount}
                onChange={handleMaxPeopleChange}
              />
            </div>
          </Form.Group>

          { (status === "Busy") &&
          <Form.Group className="d-flex align-items-center gap-5 col-4 mb-4">
            <Form.Label className="fw-bold m-0">Bill: </Form.Label>
            <div className="d-flex align-items-center gap-1">
              <p className="m-0">$</p>
              <Form.Control
                className="w-50"
                type="text"
                value={bill}
                onChange={e => setBill(e.target.value)}
              />
            </div>
          </Form.Group> }

          <Button variant="primary" type="submit">
            Update
          </Button>

        </Form>
      </>
    );
};

export default Table;

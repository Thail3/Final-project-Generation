import React from "react";
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { BiRun } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import './CardComponent.css'

function CardComponent(props) {
  const { id, name, date, duration, type, description, status } = props.activity
  return (
    <div class="m-4">
      <Card key={id}  style={{ width: '36rem', height: '100%' }}>
        <Card.Header>
          <div class="d-flex justify-content-center">
            <div class="m-2"><BiRun className="card-font-size-header" /></div>
            <div class="m-2"><Card.Title><div  className="card-font-size-header">{name}</div> </Card.Title></div>
          </div>
        </Card.Header>
        <Card.Body class="p-3">
          <Card.Text>
          <div class="d-flex justify-content-between">
            <div className="card-font-size-body"><b>Date: </b><span>{date}</span></div>

            <div className="card-font-size-body">
              <b>Duration: </b><span>{duration}</span>
            </div>
          </div>
          <div className="card-font-size-body">
            <b>Type: </b><span>{type}</span>
          </div>
          <div className="card-font-size-body">
            <b>Description: </b>
            {description}
          </div>
        </Card.Text>
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <Form.Check
                type="switch"
                id="custom-switch"
                label={status}
                className="card-font-size-body"
              />
            </div>
            <div class="d-flex justify-content-end"  className="card-font-size-body">
              <Button variant="primary m-1">Edit</Button>
              <Button variant="danger m-1">Delete</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CardComponent;

import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { BiRun } from "react-icons/bi";
import Form from "react-bootstrap/Form";

function CardComponent(props) {
  return (
    <div class="m-4">
      <Card style={{ width: "24rem" }}>
        <Card.Header>
          <div class="d-flex justify-content-center">
            <div class="m-2">
              <BiRun />
            </div>
            <div class="m-2">
              <Card.Title>Title Name</Card.Title>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {" "}
          <Card.Text>
            <div class="d-flex justify-content-between">
              <div>
                <b>Date: </b>
                <span>27/07/2022</span>
              </div>

              <div>
                <b>Duration: </b>
                <span>2 hours</span>
              </div>
            </div>
            <div>
              <b>Type: </b>
              <span>Running</span>
            </div>
            <div>
              <b>Description: </b>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </Card.Text>
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <Form.Check type="switch" id="custom-switch" label="Status" />
            </div>
            <div class="d-flex justify-content-end">
              <Button variant="primary m-1">Edit</Button>
              <Button variant="danger m-1">Delete</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardComponent;

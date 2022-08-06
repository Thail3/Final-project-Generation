import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { BiRun } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import "./CardComponent.css";
import { useGlobalContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

function CardComponent({
  id,
  title,
  date,
  duration,
  type,
  description,
  status,
}) {
  const {
    deleteActivity,
    statusActivity,
    setStatusActivity,
    updateActivity,
    setActivityData,
  } = useGlobalContext();

  console.log(statusActivity);

  const navigate = useNavigate();

  const handleClickEdit = () => {
    setActivityData(title, type, date, duration, description);
    navigate(`/form/${id}`);
  };

  const handleClickDelete = (e) => {
    e.preventDefault();
    deleteActivity(id);
  };

  const handleclickChangeStatus = () => {
    console.log(id);
    const oldStatus = statusActivity.get(id);
    statusActivity.set(id, !oldStatus);
    // setStatusActivity(new Map(JSON.parse(JSON.stringify([...statusActivity]))));
    setStatusActivity(new Map(statusActivity));
  };

  return (
    <div className="m-4">
      <Card
        className="card-component"
        key={id}
        style={{ width: "36rem", height: "100%" }}
      >
        <Card.Header>
          <div className="card-component-title d-flex justify-content-center">
            <div className="m-2">
              <BiRun className="card-font-size-header" />
            </div>
            <div className="m-2">
              <Card.Title>
                <div className="card-font-size-header">{title}</div>{" "}
              </Card.Title>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="card-component-detail p-3" style={{ zIndex: 1 }}>
          <div className="card-component-detail-date">
            <div className=" d-flex justify-content-between">
              <div className="card-font-size-body">
                <b>Date: </b>
                <span>{date.slice(0, 10)}</span>
              </div>

              <div className="card-font-size-body">
                <b>Duration: </b>
                <span>{duration} Minutes</span>
              </div>
            </div>

            <div className="card-font-size-body">
              <b>Type: </b>
              <span>{type}</span>
            </div>
            <div className="card-font-size-body">
              <b>Description: </b>
              <span>{description}</span>
            </div>
          </div>

          <div className="card-component-bottom d-flex justify-content-between">
            {statusActivity.get(id) ? (
              <>
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="switch"
                    id={id}
                    label={status}
                    className="card-font-size-body"
                    onClick={handleclickChangeStatus}
                  />
                  <p
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    Success
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="switch"
                    // id="custom-switch"
                    id={id}
                    label={status}
                    className="card-font-size-body"
                    onClick={handleclickChangeStatus}
                  />
                </div>
              </>
            )}
            <div className="d-flex justify-content-end card-font-size-body">
              <Button
                variant="primary m-1"
                type="button"
                onClick={handleClickEdit}
              >
                Edit
              </Button>
              <Button
                variant="danger m-1"
                type="button"
                onClick={handleClickDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardComponent;

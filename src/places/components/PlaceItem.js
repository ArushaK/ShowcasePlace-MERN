import React, { useContext, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import "./PlaceItem.css";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";

function PlaceItem(props) {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);
  const showDeleteWarning = () => {
    setShowConfirm(true);
  };
  const cancelDelete = () => {
    setShowConfirm(false);
  };
  const confirmDelete = () => {
    setShowConfirm(false);
    console.log("DELETING...");
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirm}
        onCancel={cancelDelete}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDelete}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDelete}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>

      <li className="place-item">
        <Card>
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarning}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}

export default PlaceItem;

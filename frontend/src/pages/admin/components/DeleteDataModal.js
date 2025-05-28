import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

const DeleteDataModal = ({ data, onDelete }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        onDelete(data.id);
        handleClose();
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow} >Delete</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Role</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to delete this data?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteDataModal;
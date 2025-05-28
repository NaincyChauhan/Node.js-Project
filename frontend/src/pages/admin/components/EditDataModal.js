import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

const EditDataModal = ({ data, onDelete, route }) => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");
    const [editFormData, setEditFormData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Edit Role
    const handleEditChange = (e, roleId) => {
        setEditFormData({
            ...editFormData,
            [roleId]: {
                ...editFormData[roleId],
                [e.target.name]: e.target.value
            }
        });
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const response = await update(editFormData[roleId], data.id, 'role');
        if (response.status === 'Error') {
            setErrors(response.errors);
        } else {
            setMessage(response.message);
            await fetchRoles(); // Refresh roles list
        }
        handleClose();
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow} >Edit</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {route}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <form onSubmit={(e) => handleEditSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor={`editName-${role.id}`} className="form-label">Role Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`editName-${role.id}`}
                                    name="name"
                                    defaultValue={role.name}
                                    onChange={(e) => handleEditChange(e, role.id)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </form>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditDataModal;
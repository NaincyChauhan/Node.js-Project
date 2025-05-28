import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { create } from "../../../api/admin/crud";

const CreateDataModal = ({ fetchData, route }) => {
    const [formData, setFormData] = useState({ name: '' });
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setMessage("");

        const response = await create(formData, route);
        if (response.status === 'error') {
            const fieldErrors = {};
            if (Array.isArray(response.errors)) {
                response.errors.forEach(err => {
                    fieldErrors[err.field] = err.msg;
                })
            }
            setErrors(fieldErrors);
        } else {
            setMessage(response.msg);
            setErrors({});
            setFormData({ name: "" });
            fetchData();
        }
    }
    return (
        <>
            <Button variant="success" onClick={handleShow} >Create Role</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create {route}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {message && <p style={{ color: 'green' }}>{message}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" value={formData.name} onChange={handleChange} className="form-control" id="name" name="name" placeholder="Role Name" aria-label="Name" />
                            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateDataModal;
import { useEffect, useState } from "react";
import { create, destroy, update, views } from "../../../api/admin/crud";
import { Modal, Button } from 'react-bootstrap';
import DeleteDataModal from "../components/DeleteDataModal";
import CreateDataModal from "../components/CreateDataModal";

const RolesPage = () => {
    const [formData, setFormData] = useState({ name: '' });
    const [roles, setRoles] = useState([]);
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");
    const [editFormData, setEditFormData] = useState({});

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

    const handleEditSubmit = async (e, roleId) => {
        e.preventDefault();

        const response = await update(editFormData[roleId], roleId, 'role');
        if (response.status === 'Error') {
            setErrors(response.errors);
        } else {
            setMessage(response.message);
            await fetchRoles(); // Refresh roles list
        }
    }

    // Delete role
    const handleDelete = async (roleId) => {
        const response = await destroy(roleId, 'role');
        if (response.status === 'Error') {
            setErrors(response.errors);
        } else {
            setMessage(response.msg);
            await fetchRoles(); // Refresh roles list
        }
    }

    const fetchRoles = async () => {
        const res = await views('role');

        if (res.status === 'Error') {
            setErrors(res.errors);
        } else {
            setRoles(res.roles);
        }
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    return <>
        <div className="container mt-4">
            {/* Create Role button */}
            <CreateDataModal fetchData={fetchRoles} route={'role'} />

            {/* Roles Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roles ? (
                            roles.map((role, idx) => (
                                <tr key={idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td>{role.name}</td>
                                    <td>
                                        <div>
                                            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target={"#editRoleModal" + role.id}>Edit</button>
                                            <DeleteDataModal data={role} onDelete={handleDelete} />
                                        </div>

                                        {/* <!-- Edit role Modal --> */}
                                        <div className="modal fade" id={"editRoleModal" + role.id} tabIndex="-1" aria-labelledby={"editRoleModal" + role.id + "Label"}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id={"editRoleModal" + role.id + "Label"}>Edit Role</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div>
                                                            <form onSubmit={(e) => handleEditSubmit(e, role.id)}>
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
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <> Roles not found.</>
                        )
                    }
                </tbody>
            </table>
        </div>
    </>;
}

export default RolesPage;
import { useEffect, useState } from "react";
import { create, destroy, update, views } from "../../../api/admin/crud";

const RolesPage = () => {
    const [formData, setFormData] = useState({ title: '' });
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
        console.log("running here")
        const response = await destroy( roleId, 'role');
        if (response.status === 'Error') {
            setErrors(response.errors);
        } else {
            setMessage(response.message);
            await fetchRoles(); // Refresh roles list
        }
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setMessage("");

        const response = await create(formData, 'role');

        if (response.status === 'Error') {
            setErrors(response.errors);
        } else {
            setMessage(response.message);
        }
    }

    const fetchRoles = async () => {
        const res = await views('role');

        if (res.status === 'Error') {
            setErrors(res.errors);
        } else {
            setMessage(res.message);
            setRoles(res.roles);
        }
    }

    useEffect(() => {

        fetchRoles();
    }, []);

    return <>
        <div className="container mt-4">
            {/* Create Role button */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createRoleModal">
                Create Role
            </button>

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
                                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteRoleModal" + role.id}>Delete</button>
                                        </div>

                                        {/* <!-- Edit role Modal --> */}
                                        <div className="modal fade" id={"editRoleModal" + role.id} tabIndex="-1" aria-labelledby={"editRoleModal" + role.id + "Label"} aria-hidden="true">
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

                                        {/* <!-- Delete role Modal --> */}
                                        <div className="modal fade" id={"deleteRoleModal" + role.id} tabIndex="-1" aria-labelledby={"deleteRoleModalLabel" + role.id} aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id={"deleteRoleModalLabel" + role.id}>Delete Role</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        Are you sure, you want to delete this role
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary"  onClick={() => handleDelete(role.id)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <> {console.log("running this11")} Roles not found.</>
                        )
                    }

                </tbody>
            </table>

            {/* Create Role modal */}
            <div className="modal fade" id="createRoleModal" tabIndex="-1" aria-labelledby="createRoleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="createRoleModalLabel">Create Role</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                errors.map((err, idx) => (
                                    <p key={idx} style={{ color: 'red' }}>{err.msg}</p>
                                ))
                            }
                            {message && <p style={{ color: 'green' }}>{message}</p>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" onChange={handleChange} className="form-control" id="name" name="name" placeholder="Role Name" aria-label="Name" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default RolesPage;
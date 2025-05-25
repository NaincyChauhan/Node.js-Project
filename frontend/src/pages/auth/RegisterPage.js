import React, {useState} from 'react';
import { register } from "../../api/auth";
import { useNavigate } from 'react-router-dom';
import { storeToken } from '../../auth/token';
import { login as loginReducer } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setMessage("");
        
        const response = await register(formData);

        if(response.status === "success"){
            const user = response.user;
            setMessage(response.msg);
            storeToken(user.token)
            dispatch(loginReducer({name: user.name, email: user.email}))
            navigate('/');
        }else{
            setErrors(response.errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {
                errors.map((err, idx) => (
                    <p key={idx} style={{ color: 'red'}}>{err.msg || JSON.stringify(err)}</p>
                ))
            }
            {message && <p style={{ color: 'green'}}>{message}</p>}

            <input name='name' placeholder='Name' type='text' onChange={handleChange} />
            <input name='email' placeholder='Email' type='email' onChange={handleChange} />
            <input name='password' placeholder='Password' type='password' onChange={handleChange} />
            <button type='submit'>Register</button>
        </form>
    );
}
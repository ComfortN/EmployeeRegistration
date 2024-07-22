import React, {useState, useEffect} from 'react'
import './AddEmployee.css'

export default function AddEmployee({addEmployee, updateEmployee, isEditing, onDelete, currentEmployee, setIsEditing, viewOnly, setViewOnly}) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        image: '',
        position: '',
        id: ''
    });
    const [errors, setErrors] = useState({})
    const [imagePreview, setImagePreview] = useState('');
    
        useEffect(() => {
            if (isEditing && currentEmployee) {
                setEmployee(currentEmployee);
            if (currentEmployee) {
                setImagePreview(URL.createObjectURL(currentEmployee.image) );
        } else {
            setImagePreview('default-avatar.png');
        }
    }
    }, [isEditing, currentEmployee]);
    

    const validate = () => {
        const errors = {};
        const phoneRegex = /^(?:\+27|0)\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!employee.name.trim()) errors.name = 'Name is required';
        if (!emailRegex.test(employee.email)) errors.email = 'Invalid email address';
        if (!phoneRegex.test(employee.phone)) errors.phone = 'Phone number must start with +27 or 0 and be 10 digits long';
        if (!employee.position.trim()) errors.position = 'Position is required';
        if (!employee.id.trim()) errors.id = 'ID is required';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files[0]) {
            const file = files[0];
            setEmployee({ ...employee, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            if (isEditing) {
                updateEmployee(employee);
                setIsEditing(false);
            } else {
                addEmployee(employee);
            }
            setEmployee({
                name: '',
                email: '',
                phone: '',
                image: '',
                position: '',
                id: ''
            });
            setImagePreview('');
        }
    };


return (
    <form onSubmit={handleSubmit} className='form-container'>
        <div className="image-container">
                <img src={imagePreview} alt="Profile Preview" />
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    disabled={viewOnly}
                    required ={!isEditing && !currentEmployee}
                />
            </div>
        {/* <input type="file" name="image" onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })} required /> */}
        <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" required disabled={viewOnly} />
        {errors.name && <p className="error">{errors.name}</p>}
        <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" required disabled={viewOnly}  />
        {errors.email && <p className="error">{errors.email}</p>}
        <input type="tel" name="phone" value={employee.phone} onChange={handleChange} placeholder="Phone" required disabled={viewOnly} />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <input type="text" name="position" value={employee.position} onChange={handleChange} placeholder="Position" required disabled={viewOnly}  />
        {errors.position && <p className="error">{errors.position}</p>}
        <input type="text" name="id" value={employee.id} onChange={handleChange} placeholder="ID" required disabled={viewOnly} />
        {errors.id && <p className="error">{errors.id}</p>}
        {!viewOnly && (
            <>
                <button type="submit">{isEditing ? 'Update' : 'Add'} Employee</button>
                {isEditing && <button type="button" onClick={() => onDelete(employee)}>Delete</button>}
            </>
        )}
        {viewOnly && (
            <button type='button' onClick={() => setViewOnly(false)}>Edit</button>
        )}
    </form>
    );
}

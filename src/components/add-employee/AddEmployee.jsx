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
    const [imagePreview, setImagePreview] = useState('');
    
        useEffect(() => {
        if (isEditing && currentEmployee) {
        setEmployee(currentEmployee);
        if (currentEmployee) {
            setImagePreview(URL.createObjectURL(currentEmployee.image));
        }
    }
    }, [isEditing, currentEmployee]);
    
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //         setEmployee({ ...employee, [name]: value });
    // };


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
    };
return (
    <form onSubmit={handleSubmit} className='form-container'>
        <div className="image-container">
                <img src={imagePreview} alt="Profile Preview" />
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    required
                />
            </div>
        {/* <input type="file" name="image" onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })} required /> */}
        <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
        <input type="tel" name="phone" value={employee.phone} onChange={handleChange} placeholder="Phone" required />
        
        <input type="text" name="position" value={employee.position} onChange={handleChange} placeholder="Position" required />
        <input type="text" name="id" value={employee.id} onChange={handleChange} placeholder="ID" required />
       
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
)
}

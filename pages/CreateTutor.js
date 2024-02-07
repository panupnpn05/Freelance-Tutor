import { useState } from 'react';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    fullname: '',
    email: '',
    password: '',
    gender: '',
    classes: '',
    description: '',
    teach_style: '',
    cost: 0,
    dob: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profileImage: file,
    }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/create_tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Phone Number:
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </label>
      <br />
      <label>
        Full Name:
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <br />
      <label>
        Gender:
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
      </label>
      <br />
      <label>
        Classes:
        <input type="text" name="classes" value={formData.classes} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description:
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </label>
      <br />
      <label>
        Teach Style:
        <input type="text" name="teach_style" value={formData.teach_style} onChange={handleChange} />
      </label>
      <br />
      <label>
        Cost:
        <input type="number" name="cost" value={formData.cost} onChange={handleChange} />
      </label>
      <br />
       <label>
        Profile Image:
        <input type="file" name="profileImage" accept="image/*" onChange={handleImageChange} />
      </label>
      <br />

      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;

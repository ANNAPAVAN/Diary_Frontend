import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pwd: '',
    image: '',
  });

  const [pwdbtn, setPwdbtn] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/register`, formData);
      if (response.data.status === "existed") {
        alert("Existed User !!......");
        return;
      }
      if (response.data.status === 'success') {
        alert('Registration successful');
      } else if (response.data.status === 'failure') {
        alert('Registration Failure');
      }
    } catch (error) {
      alert('Registration Failure');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePwdVisibility = () => {
    setPwdbtn((prevState) => !prevState);
  };

  return (
    <div className='rc'>
      <div className="registration-container">
        <h1 className="registration-heading">REGISTRATION FORM</h1>
        <form onSubmit={handleSubmit} className="registration-form">
          <table className="registration-table">
            <tbody>
              <tr>
                <td>UserName</td>
                <td>
                  <input type="text" name="name" onChange={handleChange} className="registration-input" />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input type="text" name="email" onChange={handleChange} className="registration-input" />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  <input type={pwdbtn ? "text" : "password"} name="pwd" onChange={handleChange} className="registration-input" />
                  <button type="button" className="pwd-toggle-btn" onClick={togglePwdVisibility}>
                    {pwdbtn ? "Hide" : "Show"}
                  </button>
                </td>
              </tr>
              {/* <tr>
                <td>Image</td>
                <td>
                  <input type="file" name="image" onChange={handleImageChange} accept="image/*" className="registration-input" />
                  <img src={formData.image} alt="" className="registration-preview-image" />
                </td>
              </tr> */}
              <tr>
                <td colSpan="2">
                  <button type="submit" className="registration-submit-btn" disabled={!formData.name || !formData.email || !formData.pwd}>
                    {!formData.name || !formData.email || !formData.pwd ? "All fields are required" : "Register"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default Register;

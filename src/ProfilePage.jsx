import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { FaUserCircle, FaCamera } from 'react-icons/fa';
import Navbar from './Navbar';

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    userName: '',
    f_name: '',
    l_name: '',
    email: '',
    mobile: '',
    country: '',
    city_Name: '',
    gender: '',
    DateOfBirth: '',
    age: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    image: { secure_url: '' }
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userToken = localStorage.getItem("UserToken");
        const response = await axios.get('https://lessa-ochre.vercel.app/user/getUser', {
          headers: {
            Authorization: `secretary__ ${userToken}` // Replace `token` with your actual token
          }
        });
        if (response.data.message === 'Done') {
          setProfileData(response.data.user);
          setProfileImage(response.data.user.image.secure_url);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSaveProfile();
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      const userToken = localStorage.getItem("UserToken");
      const formData = new FormData();
      formData.append('userName', profileData.userName);
      formData.append('email', profileData.email);
      formData.append('mobile', profileData.mobile);
      formData.append('gender', profileData.gender);
      formData.append('DateOfBirth', profileData.DateOfBirth);
      formData.append('age', profileData.age);
      formData.append('city_Name', profileData.city_Name);
      formData.append('country', profileData.country);
      formData.append('l_name', profileData.l_name);
      formData.append('f_name', profileData.f_name);
      if (fileInputRef.current && fileInputRef.current.files[0]) {
        formData.append('profile', fileInputRef.current.files[0]);
      }

      const response = await axios.patch('https://lessa-ochre.vercel.app/user/updateProfile', formData, {
        headers: {
          Authorization: `secretary__ ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message === 'Done') {
        setProfileData(response.data.getUser);
        console.log(response.data.getUser)
        alert('Profile updated successfully!');
      }
    } catch (error) { 
      if (error.response.data.message ==="Validation Error") {
        alert(error.response.data.Errors[0][0].message);
      } else {
        alert(error.response.data.message);
      }
      console.error('Error updating profile:', error);
      
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  const handleChangePassword = async () => {
    try {
      const userToken = localStorage.getItem("UserToken");
      const response = await axios.post('https://lessa-ochre.vercel.app/user/changePassword', {
        oldPassword: profileData.oldPassword,
        newPassword: profileData.newPassword,
        confirmPassword: profileData.confirmPassword
      }, {
        headers: {
          Authorization: `secretary__ ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.message === 'Done') {
        setProfileData(response.data.resetedUser);
        console.log(response.data.resetedUser)
        alert('Password changed successfully!');
      }
    } catch (error) { 
      if (error.response.data.message ==="Validation Error") {
        alert(error.response.data.Errors[0][0].message);
      } else {
        alert(error.response.data.message);
      }
      console.error('Error changing password:', error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <div className="profile-image-container">
                  {profileImage ? ( 
                    <div style={{ width: '100%' , display:'flex' , justifyContent:'center' }}> 
                        <div className='imgprofile'>  <img src={profileImage} alt="avatar" style={{ width: '100%' , height:'100%' }} /> 
                        </div>
                    </div>
                    
                  ) : (
                    <FaUserCircle size={150} className="placeholder-icon" />
                  )}

                  <FaCamera className="camera-icon" onClick={handleIconClick} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                </div>
                <h5 className="my-3">{`${profileData.f_name} ${profileData.l_name}`}</h5> 
                <p className='changing'>You Can Change Your Password From Edit Profile</p>
                <button type="button" className="btn  mt-3 edit-profile-btn" onClick={handleEditToggle}>
                  {isEditing ? 'Save Profile' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">UserName</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="userName"
                        value={profileData.userName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData.userName}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">First Name</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="f_name"
                        value={profileData.f_name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData.f_name}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Last Name</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="l_name"
                        value={profileData.l_name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData.l_name}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData.email}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="mobile"
                        value={profileData.mobile}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData.mobile}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Country</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={profileData.country}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData.country}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">City</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="city_Name"
                        value={profileData.city_Name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData.city_Name}</p>
                    )}

                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Gender</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <select
                        className="form-control"
                        name="gender"
                        value={profileData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    ) : (
                      <p className="text-muted mb-0">{profileData.gender}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Date of Birth</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="date"
                        className="form-control"
                        name="DateOfBirth"
                        value={profileData.DateOfBirth}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData.DateOfBirth}</p>
                    )}

                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Age</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="number"
                        className="form-control"
                        name="age"
                        value={profileData.age}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData.age}</p>
                    )}

                  </div>
                </div>
                <hr />
                {isEditing && (
                  <>

                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Old Password</p>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="password"
                          className="form-control"
                          name="oldPassword"
                          value={profileData.oldPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">New Password</p>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="password"
                          className="form-control"
                          name="newPassword"
                          value={profileData.newPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Confirm New Password</p>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          value={profileData.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12 text-center">
                        <button type="button" className="btn btn-primary" onClick={handleChangePassword}>
                          Change Password
                        </button>
                      </div>
                    </div>

                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

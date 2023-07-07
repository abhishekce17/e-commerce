"use client"
import styles from "@/Styles/AccountSetting.module.css"
import { useState } from "react";

const page = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '********',
        phone: '1234567890',
        address: { house_no : "123 mail city", area : "mankhurd", landmark : "sudarshan dairy", city : "Mumbai", state:"maharashtra" ,pincode:"400043" },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
          const addressField = name.split('.')[1];
          setFormData({
            ...formData,
            address: {
              ...formData.address,
              [addressField]: value,
            },
          });
        } else {
          setFormData({ ...formData, [name]: value });
        }
        console.log(formData)
      };
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Perform save logic here
        // You can access the updated form data in the formData state
        // Send the updated data to your backend API or handle it accordingly
        // Display success or error message based on the response
        setIsEditing(false);
    };

    return (
        <>
            <h3>Account Settings</h3>
            <div className={styles.account_settings_page}>
                <div className={styles.form}>
                    <div>

                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>


                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div>

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div>

                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />

                    </div>
                    <div>
                        <label htmlFor="address">Flat, House no., Building, Company, Apartment:</label>
                        <input
                            id="address"
                            name="address.house_no"
                            value={formData.address.house_no}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        <label htmlFor="address">Area, Street, Sector, Village:</label>
                        <input
                            id="address"
                            name="address.area"
                            value={formData.address.area}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        <label htmlFor="address">Landmark:</label>
                        <input
                            id="address"
                            name="address.landmark"
                            value={formData.address.landmark}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        <label htmlFor="address">City:</label>
                        <input
                            id="address"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        <label htmlFor="address">State:</label>
                        <input
                            id="address"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        <label htmlFor="address">pincode:</label>
                        <input
                            id="address"
                            name="address.pincode"
                            value={formData.address.pincode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                {isEditing ? (
                    <button className={styles.action} onClick={handleSaveClick}>Save</button>
                ) : (
                    <button className={styles.action} onClick={handleEditClick}>Edit</button>
                )}
            </div>
        </>
    );
};

export default page;
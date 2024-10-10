"use client"
import { useState } from "react";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/features/user-details/userSlice";
import { updateUserInfo } from "@/actions/updateUserInfo";
import { notify } from "@/utils/notify";

export default function Page() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.userData);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(data.userData.Personal);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.') || name.startsWith('contact.')) {
            const objectField = name.split('.')[1];
            const objectKey = name.split(".")[0]
            setFormData({
                ...formData,
                [objectKey]: {
                    ...formData[objectKey],
                    [objectField]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleEditClick = () => {
        setIsEditing(true);
    };


    const handleChnagePassword = () => {

    }


    const handleSaveClick = async () => {
        notify("saving...", "loading");
        const response = await updateUserInfo({ newData: formData });
        if (response.status === 200) {
            dispatch(setUserData({ Personal: formData }));
        }
        notify(response.message, response.status === 200 ? "success" : "error");
        setIsEditing(false);
    };

    return (
        <div className="w-full" >
            <h3>Account Settings</h3>
            <div className="text-lg leading-8">
                <div className="flex flex-col w-full border-b border-primary-light mb-4" >
                    <label className="font-semibold text-base text-gray-700 " htmlFor="email">Email:
                    </label>
                    <input
                        className=" disabled:outline-none outline outline-primary-light rounded px-2 outline-1"
                        type="email"
                        id="email"
                        name="contact.email"
                        value={formData.contact.email}
                        // onChange={handleInputChange}
                        disabled
                    />
                </div>
                <div className="sm:flex gap-2 mb-4" >
                    <div className="flex flex-col w-full border-b border-primary-light" >

                        <label className="font-semibold text-base text-gray-700 " htmlFor="fullName">Name:</label>
                        <input
                            className=" disabled:outline-none outline outline-primary-light rounded px-2 outline-1"
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />

                    </div>
                    <div className="flex flex-col w-full border-b border-primary-light" >
                        <label className="font-semibold text-base text-gray-700 " htmlFor="phone">Phone Number:</label>
                        <input
                            className=" disabled:outline-none outline outline-primary-light rounded px-2 outline-1"
                            type="text"
                            id="phone"
                            name="contact.phoneNo"
                            value={formData.contact.phoneNo}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                </div>
                <div className="flex flex-col w-full border-b border-primary-light mb-4" >
                    <label className="font-semibold text-base text-gray-700 " htmlFor="address">Flat, House no., Building, Company, Apartment:</label>
                    <input
                        className=" disabled:outline-none outline outline-primary-light rounded px-2 outline-1 mb-2"
                        id="address"
                        name="address.house_no"
                        value={formData.address?.house_no}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                    <label className="font-semibold text-base text-gray-700 " htmlFor="address">Area, Street, Sector, Village:</label>
                    <input
                        className=" disabled:outline-none outline outline-primary-light rounded px-2 outline-1 mb-2"
                        id="address"
                        name="address.area"
                        value={formData.address?.area}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                    <label className="font-semibold text-base text-gray-700 " htmlFor="address">Landmark:</label>
                    <input
                        className=" disabled:outline-none outline outline-primary-light rounded px-2 outline-1 mb-2"
                        id="address"
                        name="address.landmark"
                        value={formData.address?.landmark}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                    <label className="font-semibold text-base text-gray-700 " htmlFor="address">City:</label>
                    <input
                        className=" disabled:outline-none outline outline-primary-light rounded px-2 outline-1 mb-2"
                        id="address"
                        name="address.city"
                        value={formData.address?.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                    <label className="font-semibold text-base text-gray-700 " htmlFor="address">State:</label>
                    <input
                        className=" disabled:outline-none outline outline-primary-light rounded px-2 outline-1 mb-2"
                        id="address"
                        name="address.state"
                        value={formData.address?.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                    <label className="font-semibold text-base text-gray-700 " htmlFor="address">pincode:</label>
                    <input
                        className=" disabled:outline-none outline outline-primary-light rounded px-2 outline-1 mb-2"
                        id="address"
                        name="address.pincode"
                        value={formData.address?.pincode}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-[15%]" >

                {isEditing ? (
                    <PrimaryButton className="w-full" onClick={handleSaveClick} label="Save" />
                ) : (
                    <PrimaryButton className="w-full" onClick={handleEditClick} label="Edit" />
                )}
                <PrimaryButton className="w-full" onClick={handleChnagePassword} label="Change Password" />
            </div>
        </div>
    );
};

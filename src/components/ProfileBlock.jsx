import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MdClose, MdEdit } from 'react-icons/md';
import { setProfile } from '../store/slices/ProfileSlice';
import { setFile } from '../store/slices/FileSlice';

function Profile() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { profile, file } = useSelector(state => ({ profile: state.profile, file: state.file }));

    const handleFile = (e) => dispatch(setFile(URL.createObjectURL(e.target.files[0])));
    const handleProfile = (e) => dispatch(setProfile({ name: e.target.name, value: e.target.value }));

    return (
        <>
            <div className="mb-8">
                {/* Profile Image*/}
                <div className="text-center mb-6">
                    <img src={file} className="w-32 h-32 rounded-lg object-cover mx-auto" alt="Profile" />
                </div>
                
                {/* Name and Title*/}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-black mb-2">{profile.name || "Your Name"}</h1>
                    <p className="text-lg text-black mb-3">{profile.position || "Your Position"}</p>
                    <p className="text-black max-w-md mx-auto">{profile.tagline || "Describe yourself"}</p>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-200 border rounded">
                        <img src="/images/location.svg" alt="Location" width="20" height="20" className="mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="text-sm font-medium">{profile.location || "Add your location"}</p>
                    </div>
                    <div className="text-center bg-gray-200 p-4 border rounded">
                        <img src="/images/email.svg" alt="Email" width="20" height="20" className="mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-sm font-medium">{profile.email || "your.email@example.com"}</p>
                    </div>
                </div>

                {/* Social Links*/}
                <div className="flex justify-center space-x-4 mb-6">
                    {[
                        { icon: "/images/linkedin (2).svg", label: "LinkedIn" },
                        { icon: "/images/github.svg", label: "GitHub" },
                        { icon: "/images/portfolio.svg", label: "Portfolio" },
                        { icon: "/images/contact.svg", label: "Contact" }
                    ].map((link, index) => (
                        <div key={index} className="text-center">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2">
                                <img src={link.icon} alt={link.label} width="20" height="20" />
                            </div>
                            <p className="text-xs text-gray-600">{link.label}</p>
                        </div>
                    ))}
                </div>

                {/* Edit Button */}
                <div className="text-center">
                    <button 
                        onClick={() => setShow(true)} 
                        className="bg-gray-800 text-white px-6 py-2 rounded-lg"
                    >
                        <MdEdit size={16} className="inline mr-2" />
                        Edit Profile
                    </button>
                </div>
            </div>
            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-5 w-full max-w-lg max-h-[90vh] overflow-auto">
                        <div className="flex justify-between items-center mb-4 sm:mb-5">
                            <h3 className="text-lg font-semibold">Profile Details</h3>
                            <MdClose size={24} className="cursor-pointer hover:text-gray-600" onClick={() => setShow(false)} />
                        </div>

                        <div className="space-y-3">
                            {[
                                { name: "name", placeholder: "Your Name", type: "text" },
                                { name: "location", placeholder: "City, Country", type: "text" },
                                { name: "position", placeholder: "Your Position", type: "text" },
                                { name: "tagline", placeholder: "Describe yourself in one line", type: "text" },
                                { name: "email", placeholder: "Email Address", type: "email" },
                                { name: "contact", placeholder: "Contact Number", type: "number" },
                                { name: "github", placeholder: "GitHub Profile", type: "text" },
                                { name: "linkedin", placeholder: "LinkedIn Profile", type: "text" },
                                { name: "website", placeholder: "Your Portfolio Website", type: "text" }
                            ].map((field) => (
                                <input
                                    key={field.name}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={profile[field.name] || ""}
                                    onChange={handleProfile}
                                    className="w-full p-2 border rounded"
                                />
                            ))}
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                                <input type="file" onChange={handleFile} className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                        </div>

                        <div className="flex justify-end mt-5">
                            <button className="bg-black text-white px-4 py-2 rounded" onClick={() => setShow(false)}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Profile
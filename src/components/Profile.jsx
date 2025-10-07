import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { setProfile } from '../store/slices/ProfileSlice';
import { setFile } from '../store/slices/FileSlice';

function Profile() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile)
    const file = useSelector(state => state.file)

    const handleFile = (e) => {
        dispatch(setFile(URL.createObjectURL(e.target.files[0])));
    }

    const handleProfile = (e) => {
        dispatch(setProfile({ name: e.target.name, value: e.target.value }))
    }


    const socialLinks = [
        { icon: "/images/linkedin (2).svg", label: "LinkedIn", value: profile.linkedin },
        { icon: "/images/github.svg", label: "GitHub", value: profile.github },
        { icon: "/images/portfolio.svg", label: "Portfolio", value: profile.website },
        { icon: "/images/email.svg", label: "Email", value: profile.email },
        { icon: "/images/contact.svg", label: "Contact", value: profile.contact }
    ];

    return (
        <>
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="relative">
                        <img 
                            src={file} 
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg" 
                            alt="Profile" 
                        />
                        <div className="absolute -bottom-2 -right-2 bg-indigo-600 rounded-full p-2">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{profile.name || "Your Name"}</h2>
                        <p className="text-lg text-gray-600 mb-2">{profile.position || "Your Position"}</p>
                        <p className="text-gray-500 text-sm">{profile.tagline || "Add a tagline to describe yourself"}</p>
                    </div>
                </div>
                <button 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2" 
                    onClick={() => setShow(true)}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit Profile</span>
                </button>
            </div>
            
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <img src="/images/location.svg" alt="Location" width="16" height="16" />
                        </div>
                        <span className="text-sm">{profile.location || "Add your location"}</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((link, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer group">
                            <img src={link.icon} alt={link.label} width="20" height="20" className="group-hover:scale-110 transition-transform duration-200" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">{link.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-5 w-11/12 max-w-lg max-h-screen overflow-auto">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-lg font-semibold">Profile Details</h3>
                            <MdClose size={30} className="cursor-pointer" onClick={() => setShow(false)} />
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
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ))}
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                                <input 
                                    type="file" 
                                    onChange={handleFile}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-5">
                            <button className="bg-blacktext-white px-4 py-2 rounded" onClick={() => setShow(false)}>
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
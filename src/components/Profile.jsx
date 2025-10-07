import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MdClose, MdEdit } from 'react-icons/md';
import PropTypes from 'prop-types';
import { setProfile } from '../store/slices/ProfileSlice';
import { setFile } from '../store/slices/FileSlice';

// Constants moved outside component to prevent recreation on each render
const SOCIAL_LINKS = [
    { icon: "/images/linkedin (2).svg", label: "LinkedIn" },
    { icon: "/images/github.svg", label: "GitHub" },
    { icon: "/images/portfolio.svg", label: "Portfolio" },
    { icon: "/images/email.svg", label: "Email" },
    { icon: "/images/contact.svg", label: "Contact" }
];

const FORM_FIELDS = [
    { name: "name", placeholder: "Your Name", type: "text" },
    { name: "location", placeholder: "City, Country", type: "text" },
    { name: "position", placeholder: "Your Position", type: "text" },
    { name: "tagline", placeholder: "Describe yourself in one line", type: "text" },
    { name: "email", placeholder: "Email Address", type: "email" },
    { name: "contact", placeholder: "Contact Number", type: "number" },
    { name: "github", placeholder: "GitHub Profile", type: "text" },
    { name: "linkedin", placeholder: "LinkedIn Profile", type: "text" },
    { name: "website", placeholder: "Your Portfolio Website", type: "text" }
];

function Profile() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile)
    const file = useSelector(state => state.file)

    const handleFile = (e) => dispatch(setFile(URL.createObjectURL(e.target.files[0])));
    const handleProfile = (e) => dispatch(setProfile({ name: e.target.name, value: e.target.value }));

    return (
        <>
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="relative">
                        <img src={file} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white" alt="Profile" />
                       
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{profile.name || "Your Name"}</h2>
                        <p className="text-lg text-gray-600 mb-2">{profile.position || "Your Position"}</p>
                        <p className="text-gray-500 text-sm">{profile.tagline || "Add a tagline to describe yourself"}</p>
                    </div>
                </div>
                {/* Edit moved next to Contact in the links row below */}
            </div>
            
            {/* Contact Information */}
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2 text-gray-700">
                    <img src="/images/location.svg" alt="Location" width="16" height="16" />
                    <span className="text-sm">{profile.location || "Add your location"}</span>
                </div>
                
                {SOCIAL_LINKS.map((link, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 hover:bg-gray-100 rounded cursor-pointer">
                        <img src={link.icon} alt={link.label} width="16" height="16" />
                        <span className="text-sm text-gray-700">{link.label}</span>
                    </div>
                ))}
                <button type="button" onClick={() => setShow(true)} className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                    <MdEdit size={20} />
                    <span className="text-sm">Edit</span>
                </button>
            </div>
            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-5 w-11/12 max-w-lg max-h-screen overflow-auto">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-lg font-semibold">Profile Details</h3>
                            <MdClose size={30} className="cursor-pointer" onClick={() => setShow(false)} />
                        </div>

                        <div className="space-y-3">
                            {FORM_FIELDS.map((field) => (
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

Profile.propTypes = {
    // dont receive props
};

export default Profile
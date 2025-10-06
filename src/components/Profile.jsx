import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MdEdit, MdClose } from 'react-icons/md';
import { BsGithub, BsLinkedin, BsGlobe } from 'react-icons/bs';
import { HiLocationMarker, HiOfficeBuilding, HiOutlineMail, HiPhone } from 'react-icons/hi';
import { setProfile } from '../store/slices/ProfileSlice';
import { setFile } from '../store/slices/FileSlice';

function Profile() {

    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState(false);
    const [profileName, setProfileName] = useState("");
    const [profileURL, setProfileURL] = useState("");
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile)
    const file = useSelector(state => state.file)

    function handleFile(e) {
        dispatch(setFile(URL.createObjectURL(e.target.files[0])));
    }

    const handleProfile = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(setProfile({ name, value }))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAlertHide = () => {
        setProfileName("");
        setProfileURL("");
        setAlert(false)
    };
    const handleAlertShow = (Profile, Link) => {
        setProfileName(Profile);
        setProfileURL(Link);
        setAlert(true)
    };


    return (

        <>
            <div className="flex justify-center">
                <div className="flex justify-between items-center w-full max-w-4xl relative">
                    <img src={file} className="h-36 w-36 relative -top-16 border-4 border-white object-cover rounded-full" alt="Profile"></img>
                    <MdEdit size={30} className="rounded p-2 text-gray-600 hover:text-blue-500 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer" onClick={handleShow} />
                </div>
            </div>
            <div className="flex justify-center mt-2">
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-2xl font-semibold text-gray-800">{profile.name}</h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <HiLocationMarker size={20} className="text-gray-600" />
                                <p className="text-gray-700">{profile.location}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <HiOfficeBuilding size={20} className="text-gray-600" />
                                <p className="text-gray-700">{profile.position}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-600 px-2">{profile.tagline}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200" onClick={() => handleAlertShow("LinkedIn Profile", profile.linkedin)}>
                            <BsLinkedin size={20} className="text-blue-600" />
                            <span className="text-gray-700">LinkedIn</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200" onClick={() => handleAlertShow("GitHub Profile", profile.github)}>
                            <BsGithub size={20} className="text-gray-800" />
                            <span className="text-gray-700">GitHub</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200" onClick={() => handleAlertShow("Portfolio", profile.website)}>
                            <BsGlobe size={20} className="text-green-600" />
                            <span className="text-gray-700">Portfolio</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200" onClick={() => handleAlertShow("Email Address", profile.email)}>
                            <HiOutlineMail size={20} className="text-red-600" />
                            <span className="text-gray-700">Email</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200" onClick={() => handleAlertShow("Contact Number", profile.contact)}>
                            <HiPhone size={20} className="text-purple-600" />
                            <span className="text-gray-700">Contact</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Profile Edit Modal */}
            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">Profile Details</h3>
                            <MdClose size={24} className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={handleClose} />
                        </div>
                        <div className="p-6">
                            <form className="space-y-4">
                                <div>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Your Name" 
                                        value={profile.name} 
                                        onChange={handleProfile}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        name="location" 
                                        placeholder="City, Country" 
                                        value={profile.location} 
                                        onChange={handleProfile}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        name="position" 
                                        placeholder="Your Position" 
                                        value={profile.position} 
                                        onChange={handleProfile}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        name="tagline" 
                                        placeholder="Describe yourself in one line" 
                                        value={profile.tagline} 
                                        onChange={handleProfile}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Email Address" 
                                        value={profile.email} 
                                        onChange={handleProfile}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="number" 
                                        name="contact" 
                                        placeholder="Contact Number" 
                                        value={profile.contact} 
                                        onChange={handleProfile}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        name="github" 
                                        placeholder="GitHub Profile" 
                                        value={profile.github} 
                                        onChange={handleProfile}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        name="linkedin" 
                                        placeholder="LinkedIn Profile" 
                                        value={profile.linkedin} 
                                        onChange={handleProfile}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        name="website" 
                                        placeholder="Your Portfolio Website" 
                                        value={profile.website} 
                                        onChange={handleProfile}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                                    <input 
                                        type="file" 
                                        onChange={handleFile}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end p-6 border-t">
                            <button 
                                type="button" 
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                onClick={handleClose}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Alert Modal */}
            {alert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">{profileName}</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700">{profileURL}</p>
                        </div>
                        <div className="flex justify-end p-6 border-t">
                            <button 
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                                onClick={handleAlertHide}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Profile
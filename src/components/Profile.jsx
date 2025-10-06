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
                <div className="w-full md:w-8/12 flex justify-between img-column">
                    <img src={file} className="profile-image" alt="..."></img>
                    <MdEdit size={30} className="rounded edit" onClick={handleShow} />
                </div>
            </div>
            <div className="flex justify-center mt-2">
                <div className="w-full md:w-8/12 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div>
                            <h4>{profile.name}</h4>
                        </div>
                        <div className="flex justify-start">
                            <HiLocationMarker size={30} className="p-1" /><p className="p-1 m-0">{profile.location}</p>
                            <HiOfficeBuilding size={30} className="p-1" /><p className="p-1 m-0">{profile.position}</p>
                        </div>
                        <div>
                            <p className="px-2">{profile.tagline}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <p className="p-1 m-0" onClick={() => handleAlertShow("LinkedIn Profile", profile.linkedin)}><BsLinkedin size={30} className="p-1" />LinkedIn</p>
                        <p className="p-1 m-0" onClick={() => handleAlertShow("GitHub Profile", profile.github)}><BsGithub size={30} className="p-1" />GitHub</p>
                        <p className="p-1 m-0" onClick={() => handleAlertShow("Portfolio", profile.website)}><BsGlobe size={30} className="p-1" />Portfolio</p>
                        <p className="p-1 m-0" onClick={() => handleAlertShow("Email Address", profile.email)}><HiOutlineMail size={30} className="p-1" />Email</p>
                        <p className="p-1 m-0" onClick={() => handleAlertShow("Contact Number", profile.contact)}><HiPhone size={30} className="p-1" />Contact Number</p>
                    </div>
                </div>
            </div>

            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded shadow-lg w-11/12 md:w-2/3 max-w-2xl">
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h3 className="font-semibold">Profile Details</h3>
                            <MdClose size={30} className="rounded edit" onClick={handleClose} />
                        </div>
                        <div className="p-4">
                            <form>
                                <div className="mb-3">
                                    <input type="text" name="name" placeholder="Your Name" value={profile.name} onChange={handleProfile} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="location" placeholder="City, Country" value={profile.location} onChange={handleProfile} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="position" placeholder="Your Position" value={profile.position} onChange={handleProfile} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="tagline" placeholder="Describe yourself in one line" value={profile.tagline} onChange={handleProfile} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <input type="email" name="email" placeholder="Email Address" value={profile.email} onChange={handleProfile} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <input type="number" name="contact" placeholder="Contact Number" value={profile.contact} onChange={handleProfile} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="github" placeholder="GitHub Profile" value={profile.github} onChange={handleProfile} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={profile.linkedin} onChange={handleProfile} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="website" placeholder="Your Portfolio Website" value={profile.website} onChange={handleProfile} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-1">Profile Picture</label>
                                    <input type="file" onChange={handleFile} className="w-full text-sm" />
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end gap-2 border-t px-4 py-2">
                            <button type="submit" className="rounded edit px-2" onClick={handleClose}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {alert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded shadow-lg w-96">
                        <div className="border-b px-4 py-2">
                            <h3 className="font-semibold">{profileName}</h3>
                        </div>
                        <div className="p-4">{profileURL}</div>
                        <div className="border-t px-4 py-2 text-right">
                            <button className="rounded edit px-2" onClick={handleAlertHide}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Profile
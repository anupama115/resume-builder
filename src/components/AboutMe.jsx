import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline, MdEdit, MdClose } from 'react-icons/md';
import { setAboutMe } from '../store/slices/AboutMeSlice';

function AboutMe() {

    const [show, setShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [validated, setValidated] = useState(false);
    // Retrieve the 'about' data from the Redux store
    const about = useSelector(state => state.aboutMe)
    const dispatch = useDispatch();

    const handleAbout = (e) => {
        const valid = e.currentTarget;
        if (!valid.checkValidity()) {
            setValidated(true);
            setIsEdit(false)
        }
        else {
            setIsEdit(true)
        }
        dispatch(setAboutMe(e.target.value))
    }

    const handleClose = () => {
        setShow(false);
        setValidated(false);
    }
    const handleShow = () => setShow(true);

    return (
        <div className="flex justify-center mt-2">
            <div className="w-full md:w-8/12">
                <div className="flex justify-between items-center bg-gray-100 rounded px-3 py-2">
                    <h5 className="m-0">About Me</h5>
                    {!isEdit && <MdAddCircleOutline size={30} className="rounded edit cursor-pointer" onClick={handleShow} />}
                    {isEdit && <MdEdit size={30} className="rounded edit cursor-pointer" onClick={handleShow} />}
                </div>
                <div className="mt-2">
                    {
                        about &&
                        <p className="py-2 break-words">
                            {about}
                        </p>
                    }
                </div>
            </div>

            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded shadow-lg w-11/12 md:w-2/3 max-w-2xl">
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h3 className="font-semibold">About Me</h3>
                            <MdClose size={30} className="rounded edit cursor-pointer" onClick={handleClose} />
                        </div>
                        <div className="p-4">
                            <form noValidate>
                                <div className="mb-3">
                                    <textarea required rows={6} placeholder="Write about yourself" value={about} onChange={handleAbout} className="w-full border rounded p-2" />
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end gap-2 border-t px-4 py-2">
                            <button type="button" className="rounded edit px-2 cursor-pointer" onClick={handleClose}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AboutMe;
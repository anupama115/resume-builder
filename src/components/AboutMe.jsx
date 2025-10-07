import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdEdit, MdClose, MdAddCircleOutline } from 'react-icons/md';
import { setAboutMe } from '../store/slices/AboutMeSlice';

function AboutMe() {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const about = useSelector(state => state.aboutMe);
    const dispatch = useDispatch();

    const handleShow = () => {
        setText(about || "");
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleSave = () => {
        dispatch(setAboutMe(text));
        setShow(false);
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">About Me</h3>
                    <button
                        onClick={handleShow}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                        <MdAddCircleOutline size={20} />
                        Add
                    </button>
                </div>

               
            </div>

            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={handleClose}></div>
                    <div className="relative bg-white rounded shadow-lg w-11/12 md:w-2/3 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b p-3">
                            <h3 className="text-lg font-semibold">About Me</h3>
                            <MdClose size={30} className="rounded edit cursor-pointer" onClick={handleClose} />
                        </div>
                        <div className="p-4">
                            <div className="mb-3">
                                <label className="block text-sm font-medium">About</label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Write about yourself..."
                                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={6}
                                />
                            </div>
                            <button type="button" onClick={handleSave} className="rounded px-3 py-2 bg-black text-white">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AboutMe;
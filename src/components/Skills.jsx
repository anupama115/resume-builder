import { useState, useEffect } from 'react'
import { MdAddCircleOutline, MdEdit, MdClose, MdOutlineCancel } from 'react-icons/md';
import { ImCheckmark, ImCross } from 'react-icons/im'
import { useSelector, useDispatch } from 'react-redux';
import { addSkill, removeSkill } from '../store/slices/SkillSlice';

function Skills() {
    const [input, setInput] = useState("")
    const [show, setShow] = useState(false);
    const [Alert, setAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [validated, setValidated] = useState(false);

    const skills = useSelector(state => state.skills)
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
        setValidated(false);
    }
    const handleShow = () => setShow(true);

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleSkills = (e) => {
        e.preventDefault();
        const valid = e.currentTarget;
        if (!valid.checkValidity()) {
            setValidated(true);
        }
        else {
            setIsEdit(true);
            dispatch(addSkill(input))
            // setSkills([...skills, input]);
            setInput("");
        }
    }

    const handleAlertClose = () => setAlert(false);
    const handleAlert = (id) => {
        setDeleteId(id)
        setAlert(true);
    }
    const handleDelete = (id) => {
        dispatch(removeSkill(id))
        setAlert(false);
    }
    useEffect(() => {
        if (skills.length === 0) {
            setIsEdit(false);
        }
    }, [skills])

    return (
        <div className="flex justify-center mt-4">
            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-center bg-gray-800 rounded-lg text-white p-4 mb-4">
                    <h5 className="text-lg font-semibold m-0">Skills</h5>
                    {!isEdit && <MdAddCircleOutline size={30} className="text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-200" onClick={handleShow} />}
                    {isEdit && <MdEdit size={30} className="text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-200" onClick={handleShow} />}
                </div>
                <div className="w-full">
                    <div className="border-b border-gray-200 pt-4 pb-4">
                        <div className="flex flex-wrap gap-2">
                            {skills.map((items, id) => {
                                return (
                                    <span key={id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                        {items}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {/* Skills Modal */}
                {show && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center p-6 border-b">
                                <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
                                <MdClose size={24} className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={handleClose} />
                            </div>
                            <div className="p-6">
                                <form noValidate onSubmit={handleSkills} className="flex items-start gap-3 mb-4">
                                    <div className="flex-1">
                                        <input 
                                            required 
                                            type="text" 
                                            placeholder="Enter Skill" 
                                            value={input} 
                                            onChange={handleInput}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                    >
                                        Add Skill
                                    </button>
                                </form>
                                <hr className="my-4" />
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((items, id) => {
                                        return (
                                            <div key={id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                                {items}
                                                <MdOutlineCancel 
                                                    size={16} 
                                                    className="ml-2 text-red-500 hover:text-red-600 cursor-pointer transition-colors duration-200" 
                                                    onClick={() => { handleAlert(id) }} 
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {Alert && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4">
                            <div className="p-6 text-center">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">Are you sure?</h4>
                                <div className="flex justify-center space-x-4">
                                    <ImCheckmark size={30} className="text-green-500 hover:text-green-600 cursor-pointer transition-colors duration-200" onClick={() => { handleDelete(deleteId) }} />
                                    <ImCross size={25} className="text-red-500 hover:text-red-600 cursor-pointer transition-colors duration-200" onClick={handleAlertClose} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Skills;
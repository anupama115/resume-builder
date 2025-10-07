import { useState } from 'react'
import { MdAddCircleOutline, MdClose, MdOutlineCancel } from 'react-icons/md';
import { ImCheckmark, ImCross } from 'react-icons/im'
import { useSelector, useDispatch } from 'react-redux';
import { addSkill, removeSkill } from '../store/slices/SkillSlice';

function Skills() {
    const [input, setInput] = useState("")
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [validated, setValidated] = useState(false);

    const skills = useSelector(state => state.skills)
    const dispatch = useDispatch();

    const handleSkills = (e) => {
        e.preventDefault();
        if (!input.trim()) {
            setValidated(true);
            return;
        }
        dispatch(addSkill(input.trim()));
        setInput("");
        setValidated(false);
    }

    const handleDelete = (id) => {
        dispatch(removeSkill(id));
        setAlert(false);
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Skills</h3>
                    <button
                        onClick={() => setShow(true)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                        <MdAddCircleOutline size={20} />
                        Add
                    </button>
                </div>
                <div className="mt-2 border-b pt-3">
                    <div className="flex flex-wrap">
                        {skills.map((item, id) => (
                            <p className="technology rounded" key={id}>{item}</p>
                        ))}
                    </div>
                </div>
            </div>

            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => { setShow(false); setValidated(false); }}></div>
                    <div className="relative bg-white rounded shadow-lg w-11/12 md:w-2/3 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b p-3">
                            <h3 className="text-lg font-semibold">Skills</h3>
                            <MdClose size={30} className="rounded edit cursor-pointer" onClick={() => { setShow(false); setValidated(false); }} />
                        </div>
                        <div className="p-4">
                            <form onSubmit={handleSkills}>
                                <div className="flex items-start mb-3 gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Enter Skill" 
                                        value={input} 
                                        onChange={(e) => setInput(e.target.value)} 
                                        className="flex-1 border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    />
                                    <button type="submit" className="rounded px-3 py-2 bg-black text-white">
                                        Save
                                    </button>
                                </div>
                                {validated && (
                                    <p className="mt-2 text-sm text-red-600">Please enter a skill.</p>
                                )}
                                <hr />
                                <div className="flex flex-wrap mt-3">
                                    {skills.map((item, id) => (
                                        <p key={id} className="technology rounded">
                                            {item} 
                                            <MdOutlineCancel 
                                                className="delete rounded ml-1" 
                                                onClick={() => { setDeleteId(id); setAlert(true); }} 
                                            />
                                        </p>
                                    ))}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {alert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center text-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setAlert(false)}></div>
                    <div className="relative bg-white rounded shadow-lg w-11/12 sm:w-96 p-6">
                        <h4 className="text-lg font-semibold mb-4">Are you sure?</h4>
                        <div className="flex items-center justify-center gap-6">
                            <ImCheckmark size={30} className="rounded edit cursor-pointer" onClick={() => handleDelete(deleteId)} />
                            <ImCross size={25} className="rounded edit cursor-pointer" onClick={() => setAlert(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Skills;
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
        <div className="flex justify-center mt-2">
            <div className="w-full md:w-8/12">
                <div className="flex justify-between items-center bg-gray-100 rounded px-3 py-2">
                    <h5 className="m-0">Skills</h5>
                    {!isEdit && <MdAddCircleOutline size={30} className="rounded edit cursor-pointer" onClick={handleShow} />}
                    {isEdit && <MdEdit size={30} className="rounded edit cursor-pointer" onClick={handleShow} />}
                </div>
                <div className="mt-2 border-b pt-3">
                    <div className="flex flex-wrap">
                        {
                            skills.map((items, id) => {
                                return (
                                    <p className="technology rounded" key={id}>{items}</p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded shadow-lg w-11/12 md:w-2/3 max-w-2xl">
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h3 className="font-semibold">Skills</h3>
                            <MdClose size={30} className="rounded edit cursor-pointer" onClick={handleClose} />
                        </div>
                        <div className="p-4">
                            <form noValidate className="flex items-start mb-2" onSubmit={handleSkills}>
                                <div className="flex-1">
                                    <input required type="text" placeholder="Enter Skill" value={input} onChange={handleInput} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <button type="submit" className="rounded edit cursor-pointer m-0 mx-2">
                                    Add Skill
                                </button>
                            </form>
                            <hr />
                            <div className="flex flex-wrap">
                                {
                                    skills.map((items, id) => {
                                        return (
                                            <p key={id} className="technology rounded ">{items} &nbsp; <MdOutlineCancel className="delete rounded" onClick={() => { handleAlert(id) }} /></p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {Alert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded shadow-lg w-80 text-center p-4">
                        <h4>Are you sure ?</h4>
                        <div className="flex justify-center gap-4 mt-2">
                            <ImCheckmark size={30} className="rounded edit cursor-pointer" onClick={() => { handleDelete(deleteId) }} />
                            <ImCross size={25} className="rounded edit cursor-pointer" onClick={handleAlertClose} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Skills;
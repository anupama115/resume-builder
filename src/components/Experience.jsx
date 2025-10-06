import { useState } from 'react'
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
import { HiOfficeBuilding } from 'react-icons/hi';
import { ImCheckmark, ImCross } from 'react-icons/im'
import { useSelector, useDispatch } from 'react-redux';
import { addExperience, editExperience, removeExperience } from '../store/slices/ExperienceSlice';
import Months from './Date/Month';
import Years from './Date/Years';

function Experience() {

    const [show, setShow] = useState(false);
    const [Alert, setAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({
        id: "",
        title: "",
        company: "",
        isWorking: false,
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        location: "",
        description: "",
        isEdit: false
    });

    const experienceList = useSelector(state => state.experience)
    const dispatch = useDispatch();

    const handleClose = () => {
        setValidated(false);
        setShow(false);
        setForm({
            id: "",
            title: "",
            company: "",
            isWorking: false,
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            location: "",
            description: "",
            isEdit: false
        })
    }
    const handleShow = () => setShow(true);
    const handleAlertClose = () => setAlert(false);
    const handleAlert = (id) => {
        setDeleteId(id)
        setAlert(true);
    }


    const handleForm = (e) => {
        setForm((old) => {
            return {
                ...old,
                [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
            }
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const valid = event.currentTarget;
        if (!valid.checkValidity()) {
            setValidated(true);
        }
        else {
            if (form.isEdit) {
                dispatch(editExperience(form));
            }
            else {
                dispatch(addExperience(form))
            }
            setShow(false);
            setForm({
                id: "",
                title: "",
                company: "",
                isWorking: false,
                startMonth: "",
                startYear: "",
                endMonth: "",
                endYear: "",
                location: "",
                description: "",
                isEdit: false
            })
        }

    }

    const handleEdit = (id) => {
        const form = experienceList[id];
        form.isEdit = true;
        form.id = id
        setForm(form)
        setShow(true);
    }

    const handleDelete = (id) => {
        dispatch(removeExperience(id));
        setAlert(false);
    }

    return (
        <div className="flex justify-center mt-2">
            <div className="w-full md:w-8/12">
                <div className="flex justify-between items-center bg-gray-100 rounded px-3 py-2">
                    <h5 className="m-0">Experience</h5>
                    <MdAddCircleOutline size={30} className="rounded edit cursor-pointer" onClick={handleShow} />
                </div>
                <div className="mt-2">
                    {experienceList &&
                        experienceList.map((item, id) => {
                            return (
                                <div className="border-b pt-3" key={id}>
                                    <div className="flex justify-start">
                                        <HiOfficeBuilding size={50} className="rounded color-blue bg-grey shadow-sm p-1" />
                                        <div className="px-3">
                                            <h5 className="m-0">{item.title}</h5>
                                            <p className="text-gray-500 m-0">{item.company} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - " + item.endMonth + " " + item.endYear}`}</p>
                                            <p className="text-gray-500 m-0">{item.location}</p>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className="ml-auto flex flex-wrap justify-end gap-2">
                                            <MdEdit size={30} className="rounded edit cursor-pointer" onClick={() => { handleEdit(id) }} />
                                            <MdDelete size={30} className="rounded edit cursor-pointer" onClick={() => { handleAlert(id) }} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded shadow-lg w-11/12 md:w-2/3 max-w-2xl max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h3 className="font-semibold">Experience</h3>
                            <MdClose size={30} className="rounded edit cursor-pointer" onClick={handleClose} />
                        </div>
                        <div className="p-4">
                            <form noValidate onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="block mb-1">Title</label>
                                    <input required type="text" placeholder="Ex: React Developer" name="title" value={form.title} onChange={handleForm} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-1">Company Name</label>
                                    <input required type="text" placeholder="Ex: Amazon" name="company" value={form.company} onChange={handleForm} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <label className="inline-flex items-center gap-2">
                                        <input type="checkbox" name="isWorking" checked={form.isWorking} onChange={handleForm} />
                                        <span>I am currently working in this role</span>
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-1">Start Month - Year</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <select title={form.startMonth} name="startMonth" value={form.startMonth} onChange={handleForm} className="w-full border rounded p-2 text-sm">
                                                    <Months />
                                                </select>
                                                <select title={form.startYear} name="startYear" value={form.startYear} onChange={handleForm} className="w-full border rounded p-2 text-sm">
                                                    <Years />
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-1">End Month - Year</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <select title={form.endMonth} name="endMonth" value={form.endMonth} onChange={handleForm} disabled={form.isWorking} className="w-full border rounded p-2 text-sm">
                                                    <Months />
                                                </select>
                                                <select title={form.endYear} name="endYear" value={form.endYear} onChange={handleForm} disabled={form.isWorking} className="w-full border rounded p-2 text-sm">
                                                    <Years />
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-1">Location</label>
                                    <input required type="text" placeholder="Ex: Pune, India" name="location" value={form.location} onChange={handleForm} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-1">Description</label>
                                    <input required type="text" placeholder="Ex: Worked as a Front-End Developer" name="description" value={form.description} onChange={handleForm} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <button type="submit" className="rounded edit px-2">
                                    Save Changes
                                </button>
                            </form>
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

export default Experience
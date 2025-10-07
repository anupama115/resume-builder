import { useState } from 'react'
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
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
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        const missingRequired = !form.title || !form.company || !form.location || !form.description;
        const missingStart = !form.startMonth || !form.startYear;
        const missingEnd = !form.isWorking && (!form.endMonth || !form.endYear);
        if (missingRequired || missingStart || missingEnd) {
            setValidated(true);
            return;
        }
        if (form.isEdit) {
            dispatch(editExperience(form));
        } else {
            dispatch(addExperience(form));
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

    const handleEdit = (id) => {
        const selected = experienceList[id];
        const cloned = {
            ...selected,
            isEdit: true,
            id: id
        };
        setForm(cloned);
        setShow(true);
    }

    const handleDelete = (id) => {
        dispatch(removeExperience(id));
        setAlert(false);
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Experience</h3>
                    <button
                        onClick={handleShow}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                        <MdAddCircleOutline size={20} />
                        Add
                    </button>
                </div>

                <div>
                    {experienceList &&
                        experienceList.map((item, id) => {
                            return (
                                <div className="border-b pt-3 pb-3 flex flex-wrap" key={id}>
                                    <div className="w-full md:w-10/12 flex justify-start">
                                        <div className="px-3">
                                            <h5 className="m-0">{item.title}</h5>
                                            <p className="text-muted m-0">{item.company} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - " + item.endMonth + " " + item.endYear}`}</p>
                                            <p className="text-muted m-0">{item.location}</p>
                                            <p className="mt-1">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-2/12 flex flex-wrap justify-end gap-2">
                                        <MdEdit size={24} className="rounded edit cursor-pointer" onClick={() => { handleEdit(id) }} />
                                        <MdDelete size={24} className="rounded edit cursor-pointer" onClick={() => { handleAlert(id) }} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={handleClose}></div>
                    <div className="relative bg-white rounded shadow-lg w-11/12 md:w-2/3 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b p-3">
                            <h3 className="text-lg font-semibold">Experience</h3>
                            <MdClose size={30} className="rounded edit cursor-pointer" onClick={handleClose} />
                        </div>
                        <div className="p-4">
                            <form noValidate onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Title</label>
                                    <input required type="text" placeholder="Ex: React Developer" name="title" value={form.title} onChange={handleForm} className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Company Name</label>
                                    <input required type="text" placeholder="Ex: Amazon" name="company" value={form.company} onChange={handleForm} className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="mb-3">
                                    <label className="inline-flex items-center gap-2 text-sm">
                                        <input type="checkbox" name="isWorking" checked={form.isWorking} onChange={handleForm} className="h-4 w-4" />
                                        I am currently working in this role
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <div className="mb-1">
                                                <label className="block text-sm font-medium">Start Month - Year</label>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <select title={form.startMonth} name="startMonth" value={form.startMonth} onChange={handleForm} className="form-select mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <Months />
                                                </select>
                                                <select title={form.startYear} name="startYear" value={form.startYear} onChange={handleForm} className="form-select mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <Years />
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-1">
                                                <label className="block text-sm font-medium">End Month - Year</label>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <select title={form.endMonth} name="endMonth" value={form.endMonth} onChange={handleForm} disabled={form.isWorking} className="form-select mt-1 block w-full rounded border border-gray-300 p-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <Months />
                                                </select>
                                                <select title={form.endYear} name="endYear" value={form.endYear} onChange={handleForm} disabled={form.isWorking} className="form-select mt-1 block w-full rounded border border-gray-300 p-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <Years />
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Location</label>
                                    <input required type="text" placeholder="Ex: Pune, India" name="location" value={form.location} onChange={handleForm} className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Description</label>
                                    <input required type="text" placeholder="Ex: Worked as a Front-End Developer" name="description" value={form.description} onChange={handleForm} className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <button type="button" onClick={handleSubmit} className="rounded px-3 py-2 bg-black text-white">
                                    Save Changes
                                </button>
                                {validated && (
                                    <p className="mt-2 text-sm text-red-600">Please fill all required fields.</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {Alert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center text-center">
                    <div className="absolute inset-0 bg-black/50" onClick={handleAlertClose}></div>
                    <div className="relative bg-white rounded shadow-lg w-11/12 sm:w-96 p-6">
                        <h4 className="text-lg font-semibold mb-4">Are you sure ?</h4>
                        <div className="flex items-center justify-center gap-6">
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
import { useState } from 'react'
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
import { ImCheckmark, ImCross } from 'react-icons/im'
import { useSelector, useDispatch } from 'react-redux';
import Years from './Date/Years';
import { addEducation, editEducation, removeEducation } from '../store/slices/EducationSlice';

function Education() {

  const [show, setShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [validated, setValidated] = useState(false);

  const educationList = useSelector(state => state.education)
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: "",
    institute: "",
    degree: "",
    grade: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: "",
    isEdit: false
  });

  const handleClose = () => {
    setValidated(false);
    setShow(false);
    setForm({
      id: "",
      institute: "",
      degree: "",
      grade: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
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
    const missingRequired = !form.institute || !form.degree || !form.fieldOfStudy || !form.grade;
    const missingYears = !form.startYear || !form.endYear;
    if (missingRequired || missingYears) {
      setValidated(true);
      return;
    }
    if (form.isEdit) {
      dispatch(editEducation(form));
    } else {
      dispatch(addEducation(form));
    }
    setShow(false);
    setForm({
      id: "",
      institute: "",
      degree: "",
      grade: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      isEdit: false
    })
  }

  const handleEdit = (id) => {
    const current = educationList[id];
    setForm({ ...current, isEdit: true, id });
    setShow(true);
  }

  const handleDelete = (id) => {
    dispatch(removeEducation(id));
    setAlert(false);
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Education</h3>
          <button
            onClick={handleShow}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <MdAddCircleOutline size={20} />
            Add
          </button>
        </div>

        <div>
          {educationList &&
            educationList.map((item, id) => {
              return (
                <div className="border-b pt-3 pb-3 flex flex-wrap" key={id}>
                  <div className="w-full md:w-10/12 flex justify-start">
                    <div className="px-3">
                      <h5 className="m-0">{item.institute}</h5>
                      <p className="text-muted m-0">{item.degree} • {item.fieldOfStudy}</p>
                      <p className="text-muted m-0">{item.startYear} - {item.endYear} • Grade: {item.grade}</p>
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
              <h3 className="text-lg font-semibold">Education</h3>
              <MdClose size={30} className="rounded edit cursor-pointer" onClick={handleClose} />
            </div>
            <div className="p-4">
              <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block text-sm font-medium">School / College</label>
                  <input required type="text" placeholder="Ex: Government Engineering College" name="institute" value={form.institute} onChange={handleForm} className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium">Degree</label>
                  <input required type="text" placeholder="Ex: Bachelor of Engineering" name="degree" value={form.degree} onChange={handleForm} className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium">Field of study</label>
                  <input required type="text" placeholder="Ex: Computer Engineering" name="fieldOfStudy" value={form.fieldOfStudy} onChange={handleForm} className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="mb-1">
                        <label className="block text-sm font-medium">Start - Year</label>
                      </div>
                      <select title={form.startYear} name="startYear" value={form.startYear} onChange={handleForm} className="form-select mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Years />
                      </select>
                    </div>
                    <div>
                      <div className="mb-1">
                        <label className="block text-sm font-medium">End - Year</label>
                      </div>
                      <select title={form.endYear} name="endYear" value={form.endYear} onChange={handleForm} className="form-select mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Years />
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium">Grade</label>
                  <input required type="text" placeholder="Ex: 8.5/10 CGPA" name="grade" value={form.grade} onChange={handleForm} className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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

export default Education;
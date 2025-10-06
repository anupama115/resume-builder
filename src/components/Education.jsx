import { useState } from 'react'
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
import { GiGraduateCap } from 'react-icons/gi';
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
    const x = event.currentTarget;
    if (!x.checkValidity()) {
      setValidated(true);
    }
    else {
      if (form.isEdit) {
        dispatch(editEducation(form))
      }
      else {
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

  }

  const handleEdit = (id) => {
    const form = educationList[id];
    form.isEdit = true;
    form.id = id
    setForm(form)
    setShow(true);
  }

  const handleDelete = (id) => {
    dispatch(removeEducation(id));
    setAlert(false);
  }

  return (
    <div className="flex justify-center mt-2">
      <div className="w-full md:w-8/12">
        <div className="flex justify-between items-center bg-gray-100 rounded px-3 py-2">
          <h5 className="m-0">Education</h5>
          <MdAddCircleOutline size={30} className="rounded edit cursor-pointer" onClick={handleShow} />
        </div>
        <div className="mt-2">
          {educationList &&
            educationList.map((item, id) => {
              return (
                <div className="border-b pt-3" key={id}>
                  <div className="flex justify-start">
                    <GiGraduateCap size={50} className="rounded color-blue bg-grey p-1 shadow-sm" />
                    <div className="px-3">
                      <h5 className="m-0">{item.institute}</h5>
                      <p className="text-gray-500 m-0">{item.degree} • {item.fieldOfStudy}</p>
                      <p className="text-gray-500">{item.startYear} - {item.endYear} • Grade: {item.grade}</p>
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
              <h3 className="font-semibold">Education</h3>
              <MdClose size={30} className="rounded edit" onClick={handleClose} />
            </div>
            <div className="p-4">
              <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block mb-1">School / College</label>
                  <input required type="text" name="institute" placeholder="Ex: Government Engineering College" value={form.institute} onChange={handleForm} className="w-full border rounded p-2 text-sm" />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Degree</label>
                  <input required type="text" name="degree" placeholder="Ex: Bachelor of Engineering" value={form.degree} onChange={handleForm} className="w-full border rounded p-2 text-sm" />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Field of study</label>
                  <input required type="text" name="fieldOfStudy" placeholder="Ex: Computer Engineering" value={form.fieldOfStudy} onChange={handleForm} className="w-full border rounded p-2 text-sm" />
                </div>
                <div className="mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Start - Year</label>
                      <select title={form.startYear} name="startYear" value={form.startYear} onChange={handleForm} className="w-full border rounded p-2 text-sm">
                        <Years />
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1">End - Year</label>
                      <select title={form.endYear} name="endYear" value={form.endYear} onChange={handleForm} disabled={form.isWorking} className="w-full border rounded p-2 text-sm">
                        <Years />
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Grade</label>
                  <input required type="text" name="grade" placeholder="Ex: 8.5/10 CGPA" value={form.grade} onChange={handleForm} className="w-full border rounded p-2 text-sm" />
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
              <ImCheckmark size={30} className="rounded edit" onClick={() => { handleDelete(deleteId) }} />
              <ImCross size={25} className="rounded edit" onClick={handleAlertClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Education;
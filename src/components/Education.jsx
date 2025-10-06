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


  const educationList = useSelector(state => state.education)
  const dispatch = useDispatch();

  const handleClose = () => {
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
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center bg-gray-800 rounded-lg text-white p-4 mb-4">
          <h5 className="text-lg font-semibold m-0">Education</h5>
          <MdAddCircleOutline size={30} className="text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-200" onClick={handleShow} />
        </div>
        <div className="w-full">
          {educationList &&
            educationList.map((item, id) => {
              return (
                <div className="border-b border-gray-200 pt-4 pb-4" key={id}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-green-100 p-3 rounded-lg shadow-sm">
                        <GiGraduateCap size={24} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg font-semibold text-gray-800 m-0">{item.institute}</h5>
                        <p className="text-gray-600 m-0 text-sm">{item.degree} • {item.fieldOfStudy}</p>
                        <p className="text-gray-600 text-sm">{item.startYear} - {item.endYear} • Grade: {item.grade}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <MdEdit size={20} className="text-gray-500 hover:text-blue-500 cursor-pointer transition-colors duration-200" onClick={() => { handleEdit(id) }} />
                      <MdDelete size={20} className="text-gray-500 hover:text-red-500 cursor-pointer transition-colors duration-200" onClick={() => { handleAlert(id) }} />
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {/* Education Modal */}
        {show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                <MdClose size={24} className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={handleClose} />
              </div>
              <div className="p-6">
                <form noValidate onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School / College</label>
                    <input 
                      required 
                      type="text" 
                      name="institute" 
                      placeholder="Ex: Government Engineering College" 
                      value={form.institute} 
                      onChange={handleForm}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                    <input 
                      required 
                      type="text" 
                      name="degree" 
                      placeholder="Ex: Bachelor of Engineering" 
                      value={form.degree} 
                      onChange={handleForm}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Field of study</label>
                    <input 
                      required 
                      type="text" 
                      name="fieldOfStudy" 
                      placeholder="Ex: Computer Engineering" 
                      value={form.fieldOfStudy} 
                      onChange={handleForm}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
                      <select name="startYear" value={form.startYear} onChange={handleForm} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Years />
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
                      <select name="endYear" value={form.endYear} onChange={handleForm} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Years />
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                    <input 
                      required 
                      type="text" 
                      name="grade" 
                      placeholder="Ex: 8.5/10 CGPA" 
                      value={form.grade} 
                      onChange={handleForm}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
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

export default Education;
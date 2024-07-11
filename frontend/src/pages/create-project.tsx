import { Button, MenuItem, Select, TextField } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { RxCalendar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "rsuite";
import { AuthState } from "../app/store";
import headerBg from '../assets/Header-bg.svg';
import logo from '../assets/Logo.svg';
import { addProject } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  title: '',
  reason: '',
  type: '',
  division: '',
  category: '',
  priority: '',
  dept: '',
  startDate: '',
  endDate: '',
  location: '',
  status: 'Registered'
};

const AddProject: FC = function () {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const {user, isError, isSuccess, message } = useSelector((state: AuthState) => state.auth);
  const [formData, setFormData] = useState<any>(initialFormData);

  const handleFormChange = function (event: any) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    if(isSuccess) {
      setFormData(initialFormData);
    }
  }, [isError, isSuccess, message]);

  const handleFormSubmission: FormEventHandler = function (event) {
    event.preventDefault();
    dispatch(addProject(formData));
  }

  useEffect(() => {
    if(!user) {
      navigator('/login');
    }
  }, [user, navigator]);

  return (
    <section
      style={{
        backgroundImage: `url(${headerBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPositionY: '-4%',
        backgroundAttachment: 'fixed',
        width: "100%",
      }}
      className='px-4'
    >
      <form onSubmit={handleFormSubmission}>
        <div className="flex justify-between items-center w-1/2 my-5 py-2 pl-1" >
          <p className="text-[22px] font-semibold text-white">Create Project</p>
          <img
            width={60}
            height={60}
            src={`${logo}`}
            alt="brand logo"
          />
        </div>

        <div className="w-full bg-white text-base shadow-md mt-10 rounded-lg p-5 flex flex-col gap-7">
          <div className="flex justify-between items-center">
            <TextField
              placeholder="Enter Project Theme"
              multiline
              rows={2}
              sx={{
                width: '55%', '& fieldset': {
                  borderWidth: '2px',
                },
              }}
              name="title"
              value={formData.title}
              onChange={handleFormChange}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: lightBlue[900] }}
              className="text-gray-200 px-8 rounded-3xl text-base font-thin shadow-none hover:shadow-none"
            >
              Save Project
            </Button>
          </div>
          <div className="flex w-full gap-10">
            <div className="flex flex-col">
              <label htmlFor="reason" className="text-sm text-slate-500">Reason</label>
              <Select
                className="w-[350px]"
                name="reason"
                value={formData.reason}
                onChange={handleFormChange}
                inputProps={{ className: 'border-2 border-solid border-gray-300 py-2' }}
              >
                {['Business', 'Dealership', 'Transport'].map((item, index: number) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="reason" className="text-sm text-slate-500">Type</label>
              <Select
                className="w-[350px] border-none"
                name="type"
                value={formData.type}
                onChange={handleFormChange}
                inputProps={{ className: 'border-2 border-solid border-gray-300 py-2' }}
              >
                {['External', 'Internal', 'Vendor'].map((item, index: number) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="reason" className="text-sm text-slate-500">Division</label>
              <Select
                className="w-[350px]"
                name="division"
                value={formData.division}
                onChange={handleFormChange}
                inputProps={{ className: 'border-2 border-solid border-gray-300 py-2' }}
              >
                {['Compressor', 'Filters', 'Glass', 'Pumps', 'Water Heater'].map((item, index: number) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
              </Select>

            </div>
          </div>

          <div className="flex w-full gap-10">
            <div className="flex flex-col">
              <label htmlFor="reason" className="text-sm text-slate-500">Category</label>
              <Select
                className="w-[350px]"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                inputProps={{ className: 'border-2 border-solid border-gray-300 py-2' }}
              >
                {['Quality A', 'Quality B', 'Quality C', 'Quality D'].map((item, index: number) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="reason" className="text-sm text-slate-500">Priority</label>
              <Select
                className="w-[350px]"
                name="priority"
                value={formData.priority}
                onChange={handleFormChange}
                inputProps={{ className: 'border-2 border-solid border-gray-300 py-2' }}
              >
                {['High', 'Medium', 'Low'].map((item, index: number) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
              </Select>

            </div>

            <div className="flex flex-col">
              <label htmlFor="reason" className="text-sm text-slate-500">Department</label>
              <Select
                className="w-[350px]"
                name="dept"
                value={formData.dept}
                onChange={handleFormChange}
                inputProps={{ className: 'border-2 border-solid border-gray-300 py-2' }}
              >
                {['Finance', 'Maintenance', 'Quality', 'Stores', 'Strategy'].map((item, index: number) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
              </Select>

            </div>
          </div>

          <div className="flex w-full gap-10">
            <div className="flex flex-col">
              <label htmlFor="reason" className="text-sm text-slate-500">Start Date as per Project Plan</label>
              <div className="w-[350px]">
                <DatePicker
                  block
                  oneTap
                  caretAs={() => <RxCalendar size={20} />}
                  format="dd-MM-yyyy"
                  placeholder="D Month, Y"
                  value={formData.startDate}
                  onChange={(event: any) => {
                    setFormData({ ...formData, 'startDate': event })
                  }}
                />

              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="reason" className="text-sm text-slate-500">End Date as per Project Plan</label>
              <div className="w-[350px]">
                <DatePicker
                  block
                  oneTap
                  caretAs={() => <RxCalendar size={20} />}
                  format="dd-MM-yyyy"
                  placeholder="D Month, Y"

                  value={formData.endDate}
                  onChange={(event: any) => {
                    setFormData({ ...formData, 'endDate': event })
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="reason" className="text-sm text-slate-500">Location</label>
              <Select
                className="w-[350px]"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                inputProps={{ className: 'border-2 border-solid border-gray-300 py-2' }}
              >
                {['Bangalore', 'Delhi', 'Gurugram', 'Mumbai', 'Pune'].map((item, index: number) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
              </Select>

              <p className="py-5">
                <span>Status: </span>
                <strong>Registered</strong>
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddProject;
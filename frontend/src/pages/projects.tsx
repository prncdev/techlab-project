import { FC, useEffect } from "react";
import logo from '../assets/Logo.svg';
import headerBg from '../assets/Header-bg.svg';
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { AuthState } from "../app/store";
import { useNavigate } from "react-router-dom";

const Projects: FC = function () {
  const navigator = useNavigate();
  const { user } = useSelector((state: AuthState) => state.auth);

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
        height: "100%",
      }}
      className='px-4'
    >
      <div className="flex justify-between items-center w-1/2 my-5 py-2 pl-1" >
        <p className="text-[22px] font-semibold text-white">Project Listing</p>
        <img
          width={55}
          height={55}
          src={`${logo}`}
          alt="brand logo"
        />
      </div>
      {/* Status cards will be here */}
      {/* <div className="h-full bg-slate-800 absolute bottom-1/2 -translate-y-1/2">
      </div> */}
        <Pagination />
    </section>
  );
}

export default Projects;
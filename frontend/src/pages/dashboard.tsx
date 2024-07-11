import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../app/store';
import headerBg from '../assets/Header-bg.svg';
import logo from '../assets/Logo.svg';
import BarChart from '../components/BarChart';
import StatusCard from '../components/StatusCard';
import { ProjectType } from '../components/Pagination';
const Dashboard: FC = function () {
  const navigator = useNavigate();
  const {user, projectList } = useSelector((state: AuthState) => state.auth);

  let running = 0;
  let close = 0;
  let cancel = 0;
  let delay = 0;

  projectList.forEach(({ status, endDate }: ProjectType, index: number) => {
    if(status === 'Running') {
      running += 1;
    } else if(status === 'Closed') {
      close += 1;
    } else if(status === 'Cancelled') {
      cancel += 1;
    } else if(new Date(endDate) > new Date()) {
      delay += 1;
    }
  });

  const status = [
    {
      title: "Total Projects",
      value: projectList.length
    },
    {
      title: "Closed",
      value: close
    },
    {
      title: "Running",
      value: running
    },
    {
      title: "Closure Delay",
      value: delay
    },
    {
      title: "Cancelled",
      value: cancel
    },
  ];


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
        height: 145
      }}
      className='px-4'
    >
      <div className="flex justify-between items-center w-1/2 my-5 py-2 pl-1" >
        <p className="text-[22px] font-semibold text-white">Dashboard</p>
        <img
          width={55}
          height={55}
          src={`${logo}`}
          alt="brand logo"
        />
      </div>
      {/* Status cards will be here */}
      <div className="flex items-center gap-6">
        {status.length && status.map(({ title, value }, index: number) => (
          <StatusCard
            key={index}
            title={title}
            count={value}
          />
        ))}
      </div>
      <p className="text-[22px] pt-4">Department wise - Total Vs Closed</p>
      <BarChart
        // total={projectList.length} closed={close}
      />
    </section>
  );
}

export default Dashboard;
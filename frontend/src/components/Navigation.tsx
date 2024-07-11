import { Tooltip } from '@mui/material';
import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItems } from '../constants';

import logoutLogo from '../assets/Logout.svg';
const Navigation: FC = function () {
  const location = useLocation();
  const [isSelected, setIsSelected] = useState(location.pathname);

  return (
    <nav className='h-full w-14 flex items-end justify-center bg-white'>
      <div className="w-full h-3/4 flex flex-col justify-between items-center py-6">
        <ul className='flex flex-col items-center gap-9 w-full py-3 px-4'>
          {NavItems.map(({ title, path, active, inActive }, index: number) => {
            if (NavItems.length - 1 === index) {
              return (
                <>
                  <li>
                    <hr className='border-gray-300 border w-8' />
                  </li>
                  <Tooltip title={title}>
                    <Link to={path}>
                      <li
                        key={index}
                        className={`${isSelected === path ? 'before-pseudo-indicator' : ''} cursor-pointer`}
                        onClick={() => setIsSelected(path)}
                      >
                        <img
                          src={`${isSelected === path ? active : inActive}`}
                          alt={title}
                          className='w-7 h-7'
                        />
                      </li>
                    </Link>
                  </Tooltip>
                </>
              )
            }
            return (
              <Tooltip title={title}>
                <Link to={path}>
                  <li
                    key={index}
                    className={`${isSelected === path ? 'before-pseudo-indicator' : ''} cursor-pointer`}
                    onClick={() => setIsSelected(path)}
                  >
                    <img
                      src={`${isSelected === path ? active : inActive}`}
                      alt={title}
                      className='w-7 h-7'
                    />
                  </li>
                </Link>
              </Tooltip>
            )
          })}
        </ul>

        <ul>
          <Tooltip title="Logout">
            <li
              className="cursor-pointer"
              onClick={() => {
                localStorage.removeItem('userToken');
                window.location.reload();
              }}
            >
              <img
                src={logoutLogo}
                alt={'logout'}
                className='w-7 h-7'
              />
            </li>
          </Tooltip>
        </ul>
      </div>
    </nav >
  )
}

export default Navigation;
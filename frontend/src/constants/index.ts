import dashboardActive from '../assets/Dashboard-active.svg';
import dashboardInActive from '../assets/Dashboard.svg';
import projectListActive from '../assets/Project-list-active.svg';
import projectListInActive from '../assets/Project-list.svg';
import createProjectActive from '../assets/create-project-active.svg';
import createProjectInActive from '../assets/create-project.svg';

export const NavItems = [
  {
    title: 'Dashboard',
    path: '/',
    active: dashboardActive,
    inActive: dashboardInActive
  },
  {
    title: 'Projects',
    path: '/projects',
    active: projectListActive,
    inActive: projectListInActive,
  },
  {
    title: 'Add a project',
    path: '/create-project',
    active: createProjectActive,
    inActive: createProjectInActive,
  }
];
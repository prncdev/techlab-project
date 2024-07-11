import axios from 'axios';
import { UserDetail } from '../constants/interfaces';
import { loginEndPoint, dashboardEndPoint, userMe, updateEndPoint } from '../constants/endpoints';

// Log in user.
const login = async function(user: UserDetail) {
  const response = await axios.post(loginEndPoint, user);
  if (response.status === 200) {
    const data = await response.data;
    const user = {
      name: data.name,
      token: data.token
    }
    localStorage.setItem('userToken', JSON.stringify(user));
  }
  return response.data;
}

// Get project list.
const fetchProject = async function() {
  const sessionToken: string | null = localStorage.getItem('userToken');
  const user = sessionToken ? JSON.parse(sessionToken) : null;

  if (!user) return null;

  try {
    const headers = { Authorization: `Bearer ${user.token}` };
    const response = await axios.get(dashboardEndPoint, { headers });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return null;
  }
};

const updateStatus = async function(id: string, formData: any) {
  const sessionToken: string | null = localStorage.getItem('userToken');
  const user = sessionToken ? JSON.parse(sessionToken) : null;

  if (!user) return null;
  try {
    console.log(`${updateEndPoint}${id}`);
    const headers = { Authorization: `Bearer ${user.token}` };
    const response = await axios.put(`${updateEndPoint}${id}`, formData, { headers });
    return response.data;
  } catch (error: any) {
    return null;
  }
}


// Add a project.
const createProject = async function(formData: any) {
  const sessionToken: string | null = localStorage.getItem('userToken');
  const user = sessionToken ? JSON.parse(sessionToken) : null;

  if (!user) return null;
  try {
    const headers = { Authorization: `Bearer ${user.token}` };
    const response = await axios.post(dashboardEndPoint, formData, { headers });
    return response.data;
  } catch (error: any) {
    return null;
  }
};

const me = async function(token: string | null) {
  if (!token) return null;

  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(userMe, { headers });

    if (response.status === 403 || response.status === 401) {
      localStorage.removeItem('userToken');
    }

    return response.data;
  } catch (error: any) {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      localStorage.removeItem('userToken');
    }
    return null;
  }
};

const authService = {
  me,
  login,
  updateStatus,
  fetchProject,
  createProject,
};

export default authService;
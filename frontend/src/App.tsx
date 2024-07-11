import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Navigation from './components/Navigation';
import Projects from './pages/projects';
import AddProject from './pages/create-project';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from './app/store';
import { getProject, reset } from './auth/authSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const {user, projectList, message, isSuccess, isLoading } = useSelector((state: AuthState) => state.auth);

  useEffect(() => {
    if(user) {
      if(projectList.length === 0) {
        dispatch(getProject());
        console.dir('fetched', projectList);
      }
      dispatch(reset());
    }
  }, [user, message, projectList, dispatch]);
  return (
    <BrowserRouter>
      <main className="App w-full h-screen overflow-hidden bg-[#f3f5f7] flex">
        { user && <Navigation /> }
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/create-project' element={<AddProject />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

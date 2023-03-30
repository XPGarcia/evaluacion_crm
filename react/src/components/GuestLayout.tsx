import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import Loader from './Loader';
import SnackbarError from './SnackbarError';

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) return <Navigate to="/" />;

  return (
    <>
      <Loader />
      <div className="w-full h-screen flex justify-center items-center">
        <Outlet />
      </div>
      <SnackbarError />
    </>
  );
}

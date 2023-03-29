import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) return <Navigate to="/" />;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
}

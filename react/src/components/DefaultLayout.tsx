import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { AuthService } from '../services/auth.service';
import Loader from './Loader';

export default function DefaultLayout() {
  const { user, token, setUser, setToken, setIsLoading } = useStateContext();

  if (!token) return <Navigate to="/login" />;

  const logout = () => {
    if (!user) return;

    setIsLoading(true);
    AuthService.logout({ email: user?.email })
      .then(() => {})
      .catch((e) => console.log(e))
      .finally(() => {
        setUser(null);
        setToken(null);
        <Navigate to="/login" />;
        setIsLoading(false);
      });
  };

  return (
    <>
      <Loader />
      <div className="container mx-auto px-6 md:px-0 py-10 md:py-14">
        <Outlet />
        <button
          className="fixed right-10 bottom-14 bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
}

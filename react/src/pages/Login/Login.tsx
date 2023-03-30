import { ChangeEvent, FormEvent, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { AuthService } from '../../services/auth.service';

export default function Login() {
  const { setUser, setToken, setIsLoading, openErrorSnackbar } =
    useStateContext();

  const [email, _setEmail] = useState('');
  const [password, _setPassword] = useState('');

  const setEmail = (e: ChangeEvent<HTMLInputElement>) => {
    _setEmail(e.target.value);
  };

  const setPassword = (e: ChangeEvent<HTMLInputElement>) => {
    _setPassword(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      autorizador: import.meta.env.VITE_AUTORIZADOR_EMAIL,
      email: email,
      password: password,
      environment: 'dev',
    };

    setIsLoading(true);
    AuthService.login(payload)
      .then(({ token }) => {
        setUser({ email });
        setToken(token);
      })
      .catch((e) => {
        console.log(e);
        openErrorSnackbar();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col items-center p-6 w-full sm:w-80">
      <h3 className="uppercase text-2xl font-bold text-purple-950">Login</h3>
      <form className="flex flex-col w-full mt-5" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={setEmail}
          className="w-full p-2 pl-4 bg-gray-200 text-gray-700 my-2 border-2 border-gray-200 focus:border-gray-500 focus:outline-none rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={setPassword}
          className="w-full p-2 pl-4 bg-gray-200 text-gray-700 my-2 border-2 border-gray-200 focus:border-gray-500 focus:outline-none rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-800 text-white uppercase mt-6 py-2 font-semibold text-sm rounded shadow"
        >
          Login
        </button>
      </form>
    </div>
  );
}

import { useStateContext } from '../contexts/ContextProvider';

export default function Loader() {
  const { isLoading } = useStateContext();

  if (!isLoading) return <></>;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-white">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-purple-400"></div>
    </div>
  );
}

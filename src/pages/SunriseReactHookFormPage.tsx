import { Outlet } from "react-router-dom";

const SunriseReactHookFormPage = () => {
  return (
    <div className="p-4 bg-orange-600">
      <div className="bg-white p-3">
        <h1 className="text-2xl font-bold mb-2 text-cyan-50 bg-orange-600 w-fit p-1 absolute right-8 ">
          Personal Account Opening Form
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default SunriseReactHookFormPage;

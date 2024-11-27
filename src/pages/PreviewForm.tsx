import { Link, useNavigate } from "react-router-dom";
import { person, useSunriseFormContext } from "../contexts/FormContext";

const PreviewForm = () => {
  const { formData, updateFormData } = useSunriseFormContext();
  const navigate = useNavigate();

  return (
    <div>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <div className="flex justify-between items-center">
        <Link
          to={"/react-hook-form/section-c"}
          className="m-4 p-2 border border-red-500 bg-slate-600 text-cyan-50 cursor-pointer rounded-md"
        >
          Back
        </Link>
        <button
          className="m-4 p-2 border border-red-500 bg-slate-600 text-cyan-50 cursor-pointer rounded-md"
          onClick={() => {
            alert("Form submitted sucessfully.");
            updateFormData(person);
            navigate("/react-hook-form");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PreviewForm;

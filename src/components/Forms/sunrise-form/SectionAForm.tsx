import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { IPerson, useSunriseFormContext } from "../../../contexts/FormContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SectionA } from "../../../validators/sunrise-form/SectionA";

const resolver = classValidatorResolver(SectionA);

const SectionAForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPerson>({ resolver });

  const { formData } = useSunriseFormContext();
  const { updateFormData } = useSunriseFormContext();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IPerson> = (data) => {
    updateFormData(data);
    navigate("/react-hook-form/section-b");
  };

  return (
    <>
      <div className="p-1 mb-1 bg-orange-600 w-36">
        <h1 className="text-2xl font-bold text-cyan-50  ">Section A</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex w-full">
            <label className="font-bold p-2 bg-orange-600 border rounded  w-1/5">
              Full Name(IN BLOCK)Mr./Ms:
            </label>
            <div className="flex items-center">
              <div className="flex flex-col mx-2 my-0">
                <input
                  className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                  type="text"
                  placeholder="fullname"
                  {...register("fullName")}
                  defaultValue={formData.fullName}
                />
                {errors.fullName && (
                  <span className="text-red-500">
                    {errors.fullName.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <label className="font-bold p-2 bg-orange-600 border rounded w-1/5">
              Date of Birth:
            </label>
            <div className="flex items-center">
              <div className="flex flex-col mx-2 my-0">
                <input
                  className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                  type="date"
                  defaultValue={`${formData.dob}`}
                  {...register("dob")}
                />
                {errors.dob && (
                  <span className="text-red-500">{errors.dob.message}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <div className="font-bold flex flex-col bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
              <p>Citizenship Certificate:</p>
              <p>Passport:</p>
              <p>Other Identification:</p>
            </div>
            <div className="flex flex-col gap-2  flex-grow justify-center items-start">
              <div className="flex justify-between items-start gap-10 w-full">
                <div className="flex w-1/4 justify-start items-center">
                  <label className="font-bold">Citizenship No:</label>
                  <div className="flex flex-col mx-2 my-0">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.citizenship.id}
                      placeholder="citizenship id"
                      {...register("citizenship.id")}
                    />
                    {errors.citizenship?.id?.message && (
                      <span className="text-red-500">
                        {errors.citizenship.id.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4 justify-start items-center">
                  <label className="font-bold">Issued By:</label>
                  <div className="flex flex-col mx-2 my-0 ">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.citizenship.issuedBy}
                      {...register("citizenship.issuedBy")}
                    />
                    {errors.citizenship?.issuedBy && (
                      <span className="text-red-500">
                        {errors.citizenship.issuedBy.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4 justify-start items-center">
                  <label className="font-bold">Issued Date:</label>
                  <div className="flex flex-col mx-2 my-0">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="date"
                      defaultValue={`${formData.citizenship.issuedDate}`}
                      {...register("citizenship.issuedDate")}
                    />
                    {errors.citizenship?.issuedDate && (
                      <span className="text-red-500">
                        {errors.citizenship.issuedDate.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start gap-10 w-full">
                <div className="flex w-1/4">
                  <label className="font-bold">Passport No:</label>
                  <div className="flex flex-col mx-2 my-0">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.passport.id}
                      {...register("passport.id")}
                    />
                    {errors.passport?.id && (
                      <span className="text-red-500">
                        {errors.passport.id.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4">
                  <label className="font-bold">Issued By:</label>
                  <div className="flex flex-col mx-2 my-0">
                    <input
                      type="text"
                      defaultValue={formData.passport.issuedBy}
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      {...register("passport.issuedBy")}
                    />
                    {errors.passport?.issuedBy && (
                      <span className="text-red-500">
                        {errors.passport.issuedBy.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4">
                  <label className="font-bold">Issued Date:</label>
                  <div className="flex flex-col mx-2 my-0">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="date"
                      defaultValue={`${formData.passport.issuedDate}`}
                      {...register("passport.issuedDate")}
                    />
                    {errors.passport?.issuedDate && (
                      <span className="text-red-500">
                        {errors.passport.issuedDate.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center w-1/4 mx-2 my-0">
                  <label className="font-bold">Type of ID:</label>
                  <div className="flex flex-col mx-2 my-0">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.otherDocument?.type}
                      {...register("otherDocument.type")}
                    />
                    {errors.otherDocument?.type && (
                      <span className="text-red-500">
                        {errors.otherDocument.type.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center w-1/4 mx-2 my-0">
                  <label className="font-bold">ID NO:</label>
                  <div className="flex flex-col mx-2 my-0">
                    <input
                      className=" inline-block border border-solid border-[#ccc] rounded w-[100%] h-fit"
                      type="text"
                      defaultValue={formData.otherDocument?.id}
                      {...register("otherDocument.id")}
                    />
                    {errors.otherDocument?.id && (
                      <span className="text-red-500">
                        {errors.otherDocument.id.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center w-1/4">
                  <label className="font-bold">Issuing Office:</label>
                  <div className="flex flex-col mx-2 my-0">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.otherDocument?.issuingOffice}
                      {...register("otherDocument.issuingOffice")}
                    />
                    {errors.otherDocument?.issuingOffice && (
                      <span className="text-red-500">
                        {errors.otherDocument.issuingOffice.message}{" "}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <div className="flex flex-col font-bold bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
              <p>Current Address</p>
            </div>
            <div className="flex flex-col gap-3 justify-around flex-grow">
              <div className="flex justify-between items-center gap-10 w-full">
                <div className="flex w-1/4">
                  <label className="font-bold">Province:</label>
                  <div className="flex flex-col">
                    <input
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.current.province}
                      {...register("current.province")}
                    />
                    {errors.current?.province && (
                      <span className="text-red-500">
                        {errors.current.province.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4">
                  <label className="font-bold">District:</label>
                  <div className="flex flex-col">
                    <input
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.current.district}
                      {...register("current.district")}
                    />
                    {errors.current?.district && (
                      <span className="text-red-500">
                        {errors.current.district.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4">
                  <label className="font-bold">Municipality/RM:</label>
                  <div className="flex flex-col">
                    <input
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.current.municipality}
                      {...register("current.municipality")}
                    />
                    {errors.current?.municipality && (
                      <span className="text-red-500">
                        {errors.current.municipality.message}{" "}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-10 w-full">
                <div className="flex w-1/4">
                  <label className="font-bold">Village/Tole:</label>
                  <div className="flex flex-col">
                    <input
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.current.village}
                      {...register("current.village")}
                    />
                    {errors.current?.village && (
                      <span className="text-red-500">
                        {errors.current.village.message}{" "}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4">
                  <label className="font-bold">House No:</label>
                  <div className="flex flex-col">
                    <input
                      className="h-fit mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.current.houseNo}
                      {...register("current.houseNo")}
                    />
                    {errors.current?.houseNo && (
                      <span className="text-red-500">
                        {errors.current.houseNo.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4">
                  <label className="font-bold">Ward NO:</label>
                  <div className="flex flex-col">
                    <input
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.current.wardNo}
                      {...register("current.wardNo")}
                    />
                    {errors.current?.wardNo && (
                      <span className="text-red-500">
                        {errors.current.wardNo.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col font-bold bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
              <p>Contact Details</p>
            </div>
            <div>
              <div className="flex flex-col gap-3 justify-around flex-grow">
                <div className="flex justify-between items-center gap-10">
                  <div className="flex w-1/4 justify-start items-center">
                    <label className="font-bold">Phone No:</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        defaultValue={formData.contact.phoneNo}
                        {...register("contact.phoneNo")}
                      />
                      {errors.contact?.phoneNo && (
                        <span className="text-red-500">
                          {errors.contact.phoneNo.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/4 justify-start items-center">
                    <label className="font-bold">Mobile No:</label>
                    <div className="flex flex-col mx-2 my-0">
                      <div className="flex flex-col">
                        <input
                          className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                          type="text"
                          defaultValue={formData.contact.mobileNo}
                          {...register("contact.mobileNo")}
                        />
                        {errors.contact?.mobileNo && (
                          <span className="text-red-500">
                            {errors.contact.mobileNo.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-1/4 justify-start items-center">
                    <label className="font-bold">Email:</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="email"
                        defaultValue={formData.contact.email}
                        {...register("contact.email")}
                      />
                      {errors.contact?.email && (
                        <span className="text-red-500">
                          {errors.contact.email.message}{" "}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 ">
            <div className="flex flex-col font-bold bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
              <p>Family Details:</p>
            </div>
            <div className="flex flex-col gap-3 justify-around flex-grow">
              <div className="flex justify-between items-start gap-10">
                <div className="flex w-1/4 justify-start items-center">
                  <label className="font-bold">Father's Name:</label>
                  <div className="flex flex-col mx-2 my-0">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.fatherName}
                      {...register("fatherName")}
                    />
                    {errors.fatherName && (
                      <span className="text-red-500">
                        {errors.fatherName.message}{" "}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4 justify-start items-center">
                  <label className="font-bold">GrandFather's Name:</label>
                  <div className="flex flex-col mx-2 my-0">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.grandFatherName}
                      {...register("grandFatherName")}
                    />
                    {errors.grandFatherName && (
                      <span className="text-red-500">
                        {errors.grandFatherName.message}{" "}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4 justify-start items-center">
                  <label className="font-bold">Spouse's Name:</label>
                  <div className="flex flex-col mx-2 my-0">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.spouseName}
                      {...register("spouseName")}
                    />
                    {errors.spouseName && (
                      <span className="text-red-500">
                        {errors.spouseName.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col font-bold bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
              <p>Employer Details</p>
            </div>
            <div className="flex flex-col gap-3 justify-around flex-grow">
              <div className="flex justify-between items-start gap-10">
                <div className="flex w-1/4 justify-start items-center">
                  <label className="font-bold">Name and address:</label>
                  <div className="flex flex-col">
                    <input
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.organizationName}
                    />
                    {errors.organizationName && (
                      <span className="text-red-500">
                        {errors.organizationName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4 justify-center items-center">
                  <label className="font-bold">Designation:</label>
                  <div className="flex flex-col">
                    <input
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      defaultValue={formData.designation}
                      {...register("designation")}
                    />
                    {errors.designation && (
                      <span className="text-red-500">
                        {errors.designation.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/4 justify-center items-center">
                  <label className="font-bold">
                    Projected Annual Income(Rs.):
                  </label>
                  <input
                    className="h-fit mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                    type="text"
                    defaultValue={formData.annualIncome}
                    {...register("annualIncome", {
                      valueAsNumber: true,
                    })}
                  />
                  {errors.annualIncome && (
                    <span className="text-red-500">
                      {errors.annualIncome.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start ">
              <div>
                <label className="font-bold">Account With other bank's:</label>
                <input
                  type="checkbox"
                  defaultChecked={formData.hasAccWithOtherBank}
                  {...register("hasAccWithOtherBank")}
                />
              </div>
              <div>
                <label className="font-bold">
                  Have you been convicted for any criminal offense in the past:
                </label>
                <input
                  type="checkbox"
                  defaultChecked={formData.hasConvictedCrime}
                  {...register("hasConvictedCrime")}
                />
              </div>
              <div>
                <label className="font-bold">
                  Bank account with Laxmi sunrise Bank:
                </label>
                <input
                  type="checkbox"
                  defaultChecked={formData.hasExistingAccount}
                  {...register("hasExistingAccount")}
                />
              </div>
              <div className="flex justify-center items-center">
                <label className="font-bold">If You Have(A/C No):</label>
                <input
                  className="h-fit mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                  type="text"
                  defaultValue={formData.acNo}
                  {...register("acNo")}
                />
                {errors.acNo && (
                  <span className="text-red-500">{errors.acNo.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="m-4 p-2 border border-red-500 bg-slate-600 text-cyan-50 cursor-pointer rounded-md"
            type="button"
            onClick={() => navigate("/react-hook-form")}
          >
            Back
          </button>
          <button
            className="m-4 p-2 border border-red-500 bg-slate-600 text-cyan-50 cursor-pointer rounded-md"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default SectionAForm;

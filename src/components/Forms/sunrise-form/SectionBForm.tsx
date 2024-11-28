import { useState } from "react";
import { IPerson, useSunriseFormContext } from "../../../contexts/FormContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SectionB } from "../../../validators/sunrise-form/SectionB";

const resolver = classValidatorResolver(SectionB);

const SectionBForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPerson>({ resolver });

  const { formData } = useSunriseFormContext();
  const { updateFormData } = useSunriseFormContext();

  const navigate = useNavigate();

  const [isSourceOfIncome, setIsSourceOfIncome] = useState(true);

  const [isTenant, setIsTenant] = useState(formData.isTenant);
  const [isOtherIncome, setIsOtherIncome] = useState(
    formData.sourceOfIncome.isOther
  );
  const [isPoliticallyEngaged, setIsPoliticallyEngaged] = useState(
    formData.politicalOverview.isPoliticallyEngaged
  );
  const [isAmericanNationality, setIsAmericanNationality] = useState(
    formData.nationality.isAmerican
  );
  const [hasBeneficial, setHasBeneficial] = useState(
    formData.benificialOwner.hasBenificial
  );

  const onSubmit: SubmitHandler<IPerson> = (data) => {
    let refinedData: IPerson = data;
    const {
      isBusiness,
      isSalary,
      isROI,
      isInheritance,
      isRemittance,
      isOther,
    } = data.sourceOfIncome;

    if (
      !(
        isBusiness ||
        isSalary ||
        isROI ||
        isInheritance ||
        isRemittance ||
        isOther
      )
    ) {
      setIsSourceOfIncome(false);
      return;
    } else {
      setIsSourceOfIncome(true);
    }

    if (isOtherIncome) {
      if (!data.sourceOfIncome.other) {
        return;
      }
    } else {
      setIsOtherIncome(false);
    }

    if (!data.sourceOfIncome.isOther) {
      refinedData = {
        ...refinedData,
        sourceOfIncome: {
          ...data.sourceOfIncome,
          other: "",
        },
      };
    }

    if (!isTenant) {
      refinedData = {
        ...refinedData,
        landLord: {
          ...data.landLord,
          fullName: "",
          phoneNo: "",
          district: "",
          municipality: "",
          village: "",
          houseNo: "",
          wardNo: "",
        },
      };
    }
    if (!data.politicalOverview.isPoliticallyEngaged) {
      refinedData = {
        ...refinedData,
        politicalOverview: {
          ...data.politicalOverview,
          description: "",
        },
      };
    }
    if (!data.nationality.isAmerican) {
      refinedData = {
        ...refinedData,
        nationality: {
          ...data.nationality,
          description: "",
        },
      };
    }
    if (!data.benificialOwner.hasBenificial) {
      refinedData = {
        ...refinedData,
        benificialOwner: {
          ...data.benificialOwner,
          description: "",
        },
      };
    }

    updateFormData(refinedData);
    navigate("/react-hook-form/section-c");
  };

  return (
    <>
      <div className="p-1 mb-1 bg-orange-600 w-36">
        <h1 className="text-2xl font-bold text-cyan-50  ">Section B</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex w-full">
            <label className="font-bold p-2 bg-orange-600 border rounded  w-1/5">
              Permanent Account Number (If Obtained):
            </label>
            <div className="flex items-center">
              <div className="flex flex-col mx-2 my-0">
                <input
                  className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                  type="text"
                  placeholder="pan no."
                  {...register("panNo")}
                  defaultValue={formData.panNo}
                />
                {errors.panNo && (
                  <span className="text-red-500">{errors.panNo.message}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <div className="font-bold flex flex-col bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
              <p>Source of Income:</p>
            </div>
            <div className="flex flex-col gap-2  flex-grow justify-center items-start">
              <div className="flex justify-between items-start gap-10 w-full">
                <div className="flex w-1/4 justify-start items-center">
                  <div className="flex mx-2 my-0 gap-1">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="checkbox"
                      defaultChecked={formData?.sourceOfIncome?.isBusiness}
                      {...register("sourceOfIncome.isBusiness")}
                    />
                    <label className="font-bold">Business</label>
                  </div>
                </div>
                <div className="flex w-1/4 justify-start items-center">
                  <div className="flex mx-2 my-0 gap-1">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="checkbox"
                      defaultChecked={formData?.sourceOfIncome?.isSalary}
                      {...register("sourceOfIncome.isSalary")}
                    />
                  </div>
                  <label className="font-bold">Salary</label>
                </div>
                <div className="flex w-1/4 justify-start items-center">
                  <div className="flex mx-2 my-0 gap-1 justify-start items-center">
                    <input
                      className=" h-fit inline-block border border-solid border-[#ccc] rounded"
                      type="checkbox"
                      defaultChecked={formData?.sourceOfIncome?.isROI}
                      {...register("sourceOfIncome.isROI")}
                    />
                  </div>
                  <label className="font-bold h-fit">
                    Return on Investment
                  </label>
                </div>
              </div>
              <div className="flex justify-between items-start gap-10 w-full">
                <div className="flex w-1/4 justify-start items-center">
                  <div className="flex mx-2 my-0 gap-1 justify-start items-center">
                    <input
                      className=" h-fit inline-block border border-solid border-[#ccc] rounded"
                      type="checkbox"
                      defaultChecked={formData?.sourceOfIncome?.isInheritance}
                      {...register("sourceOfIncome.isInheritance")}
                    />
                  </div>
                  <label className="font-bold h-fit">Inheritance</label>
                </div>
                <div className="flex w-1/4 justify-start items-center">
                  <div className="flex mx-2 my-0 gap-1 justify-start items-center">
                    <input
                      className=" h-fit inline-block border border-solid border-[#ccc] rounded"
                      type="checkbox"
                      defaultChecked={formData?.sourceOfIncome?.isRemittance}
                      {...register("sourceOfIncome.isRemittance")}
                    />
                  </div>
                  <label className="font-bold h-fit">
                    Remittance(mention country)
                  </label>
                </div>
                <div className="flex w-1/4 justify-start items-center">
                  <div className="flex mx-2 my-0 justify-start items-center">
                    <input
                      className=" h-fit inline-block border border-solid border-[#ccc] rounded"
                      type="checkbox"
                      defaultChecked={formData?.sourceOfIncome?.isOther}
                      {...register("sourceOfIncome.isOther")}
                      onChange={() => setIsOtherIncome(!isOtherIncome)}
                    />
                  </div>
                  <label className="font-bold h-fit">
                    Other(Please specify)
                  </label>
                </div>
              </div>
              {!isSourceOfIncome && (
                <span className="text-red-500">
                  Please select at least one source of income
                </span>
              )}

              <div className="flex  items-center gap-10 w-full">
                <div className="flex  justify-start items-center">
                  <label className="font-bold h-fit ml-2">Other:</label>
                  <div className="flex flex-col mx-2 my-0 gap-1 justify-start items-center">
                    <textarea
                      rows={1}
                      cols={60}
                      className=" h-fit inline-block border border-solid border-[#ccc] rounded"
                      defaultValue={formData?.sourceOfIncome?.other}
                      {...register("sourceOfIncome.other")}
                    />
                    {isOtherIncome && (
                      <span className="text-red-500">
                        Please give a valid source of income.
                      </span>
                    )}
                    {errors.sourceOfIncome?.other && (
                      <span className="text-red-500">
                        {errors.sourceOfIncome.other.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-start items-center">
                  <label className="font-bold h-fit">
                    Projected Annual Transaction(Rs.):
                  </label>
                  <div className="flex mx-2 my-0 gap-1 justify-start items-center">
                    <input
                      className=" h-fit inline-block border border-solid border-[#ccc] rounded"
                      type="text"
                      defaultValue={
                        formData?.sourceOfIncome?.projectedAnnualTransaction
                      }
                      {...register(
                        "sourceOfIncome.projectedAnnualTransaction",
                        {
                          valueAsNumber: true,
                        }
                      )}
                    />
                    {errors.sourceOfIncome?.projectedAnnualTransaction && (
                      <span className="text-red-500">
                        {
                          errors.sourceOfIncome.projectedAnnualTransaction
                            .message
                        }
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <div className="font-bold flex flex-col bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
              <p>Incase of Renatal Residence:</p>
            </div>
            <div className="flex flex-col gap-2  flex-grow justify-center items-start ">
              <div className="flex items-start gap-20 w-full ml-2">
                <div className="flex justify-start items-center">
                  <label className="font-bold">Are you a tenent ? </label>
                  <div className="flex mx-2 my-0 gap-1">
                    <input
                      className="inline-block border border-solid border-[#ccc] rounded "
                      type="checkbox"
                      {...register("isTenant")}
                      onChange={() => setIsTenant(!isTenant)}
                      checked={isTenant}
                    />
                  </div>
                </div>
              </div>
              {isTenant && (
                <>
                  <div className="flex items-start gap-20 w-full ml-2">
                    <div className="flex justify-start items-center">
                      <label className="font-bold">LandLord's Full Name</label>
                      <div className="flex flex-col mx-2 my-0 gap-1">
                        <input
                          className="inline-block border border-solid border-[#ccc] rounded "
                          type="text"
                          defaultValue={formData?.landLord?.fullName}
                          {...register("landLord.fullName")}
                        />
                        {errors.landLord?.fullName && (
                          <span className="text-red-500">
                            {errors.landLord.fullName.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex  justify-start items-center">
                      <label className="font-bold">Phone No:</label>
                      <div className="flex flex-col mx-2 my-0 gap-1">
                        <input
                          className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                          type="text"
                          defaultValue={formData?.landLord?.phoneNo}
                          {...register("landLord.phoneNo")}
                        />
                        {errors.landLord?.phoneNo && (
                          <span className="text-red-500">
                            {errors.landLord.phoneNo.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-44 w-full ml-2">
                    <div className="flex justify-start items-center">
                      <label className="font-bold">District</label>
                      <div className="flex flex-col mx-2 my-0 gap-1">
                        <input
                          className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                          type="text"
                          defaultValue={formData?.landLord?.district}
                          {...register("landLord.district")}
                        />
                        {errors.landLord?.district && (
                          <span className="text-red-500">
                            {errors.landLord.district.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex  justify-start items-center ml-2">
                      <label className="font-bold">Municipality:</label>
                      <div className="flex flex-col mx-2 my-0 gap-1">
                        <input
                          className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                          type="text"
                          defaultValue={formData?.landLord?.municipality}
                          {...register("landLord.municipality")}
                        />
                        {errors.landLord?.municipality && (
                          <span className="text-red-500">
                            {errors.landLord.municipality.message}{" "}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-10 w-full">
                    <div className="flex w-1/4 ml-2">
                      <label className="font-bold">Village/Tole:</label>
                      <div className="flex flex-col">
                        <input
                          className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                          type="text"
                          defaultValue={formData?.landLord?.village}
                          {...register("landLord.village")}
                        />
                        {errors.landLord?.village && (
                          <span className="text-red-500">
                            {errors.landLord.village.message}{" "}
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
                          defaultValue={formData?.landLord?.houseNo}
                          {...register("landLord.houseNo")}
                        />
                      </div>
                    </div>
                    <div className="flex w-1/4">
                      <label className="font-bold">Ward NO:</label>
                      <div className="flex flex-col">
                        <input
                          className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                          type="text"
                          defaultValue={formData?.landLord?.wardNo}
                          {...register("landLord.wardNo")}
                        />
                        {errors.landLord?.wardNo && (
                          <span className="text-red-500">
                            {errors.landLord.wardNo.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="font-bold">
                  Is the Account holder or Mandate of the account or my/our
                  family is politically exposed person ?
                </label>
                <input
                  type="checkbox"
                  defaultChecked={
                    formData?.politicalOverview?.isPoliticallyEngaged
                  }
                  {...register("politicalOverview.isPoliticallyEngaged")}
                  onChange={() =>
                    setIsPoliticallyEngaged(!isPoliticallyEngaged)
                  }
                />
              </div>
              {isPoliticallyEngaged && (
                <div className="flex">
                  <label htmlFor="" className="font-bold">
                    If yes please specify
                  </label>
                  <div className="flex flex-col">
                    <textarea
                      rows={1}
                      cols={120}
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      defaultValue={formData?.politicalOverview?.description}
                      {...register("politicalOverview.description", {
                        required: true,
                        minLength: 1,
                      })}
                    />
                    {errors.politicalOverview?.description && (
                      <span className="text-red-500">
                        {errors.politicalOverview.description.message}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="font-bold">
                  Is the account holder American resident/citizen/Green card
                  holder ?
                </label>
                <input
                  type="checkbox"
                  defaultChecked={formData?.nationality?.isAmerican}
                  {...register("nationality.isAmerican")}
                  onChange={() =>
                    setIsAmericanNationality(!isAmericanNationality)
                  }
                />
              </div>
              {isAmericanNationality && (
                <div className="flex">
                  <label htmlFor="" className="font-bold">
                    If yes please specify
                  </label>
                  <div className="flex flex-col">
                    <textarea
                      rows={1}
                      cols={120}
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      defaultValue={formData?.nationality?.description}
                      {...register("nationality.description")}
                    />
                    {errors.nationality?.description && (
                      <span className="text-red-500">
                        {errors.nationality.description.message}{" "}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="font-bold">
                  Is there anyone who is your beneficial owneer ?
                </label>
                <input
                  type="checkbox"
                  defaultChecked={formData?.benificialOwner?.hasBenificial}
                  {...register("benificialOwner.hasBenificial")}
                  onChange={() => setHasBeneficial(!hasBeneficial)}
                />
              </div>
              {hasBeneficial && (
                <div className="flex">
                  <label htmlFor="" className="font-bold">
                    If yes please specify
                  </label>
                  <div className="flex flex-col">
                    <textarea
                      rows={1}
                      cols={120}
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      defaultValue={formData?.benificialOwner?.description}
                      {...register("benificialOwner.description")}
                    />
                    {errors.benificialOwner?.description && (
                      <span className="text-red-500">
                        {errors.benificialOwner.description.message}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
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

export default SectionBForm;

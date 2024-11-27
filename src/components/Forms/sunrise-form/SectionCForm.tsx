import { useState } from "react";
import { IPerson, useSunriseFormContext } from "../../../contexts/FormContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const convertToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const SectionCForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPerson>();

  const { formData, updateFormData } = useSunriseFormContext();

  const [isAccountOperation, setIsAccountOperation] = useState(true);

  const [isOperationOther, setOperationIsOther] = useState(
    formData.accountOperation.isOther
  );
  const [mapImage, setMapImage] = useState<string>(formData.images.mapImage);
  const [images, setImages] = useState<{
    rightThumb: string;
    leftThumb: string;
    signature: string;
  }>({
    rightThumb: formData.images.rightThumb,
    leftThumb: formData.images.leftThumb,
    signature: formData.images.signature,
  });
  const [hasNominee, setHasNominee] = useState<boolean>(formData.hasNominee);
  const [isNomineeMinor, setIsNomineeMinor] = useState<boolean>(
    formData.nominee.isMinor
  );
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IPerson> = (data) => {
    let refinedData: IPerson = data;
    const { isSelf, isJoint, isAnyone, isOther } = data.accountOperation;
    if (!(isSelf || isJoint || isAnyone || isOther)) {
      setIsAccountOperation(false);
      return;
    } else {
      setIsAccountOperation(true);
    }

    if (!mapImage) return;
    if (!images.leftThumb) return;
    if (!images.rightThumb) return;
    if (!images.signature) return;

    if (!data.accountOperation.isOther) {
      refinedData = {
        ...refinedData,
        accountOperation: {
          ...refinedData.accountOperation,
          other: "",
        },
      };
    }
    if (!hasNominee) {
      refinedData = {
        ...refinedData,
        nominee: {
          acNo: "",
          fullName: "",
          parentName: "",
          relationship: "",
          nationality: "",
          citizenshipNo: "",
          dob: null,
          permanentAddress: "",
          correspondenceAddress: "",
          phoneNo: "",
          officeNo: "",
          mobileNo: "",
          isMinor: false,
        },
      };
    }
    refinedData = {
      ...refinedData,
      hasNominee,
      nominee: {
        ...refinedData.nominee,
        isMinor: isNomineeMinor,
      },
      images: {
        ...refinedData.images,
        mapImage: mapImage,
        rightThumb: images.rightThumb,
        leftThumb: images.leftThumb,
        signature: images.signature,
      },
    };

    updateFormData(refinedData);
    navigate("/form-preview");
  };
  const handleMapUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = (await convertToBase64(e.target.files[0])) as string;
      setMapImage(base64);
    }
  };

  const handleThumbImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "rightThumb") {
      if (e.target.files && e.target.files[0]) {
        const base64 = (await convertToBase64(e.target.files[0])) as string;
        setImages((prevImages) => ({
          ...prevImages,
          rightThumb: base64,
        }));
      }
    }

    if (e.target.name === "leftThumb") {
      if (e.target.files && e.target.files[0]) {
        const base64 = (await convertToBase64(e.target.files[0])) as string;
        setImages((prevImages) => ({
          ...prevImages,
          leftThumb: base64,
        }));
      }
    }
    if (e.target.name === "signature") {
      if (e.target.files && e.target.files[0]) {
        const base64 = (await convertToBase64(e.target.files[0])) as string;
        setImages((prevImages) => ({
          ...prevImages,
          signature: base64,
        }));
      }
    }
  };

  return (
    <>
      <div className="p-1 mb-1 bg-orange-600 w-36">
        <h1 className="text-2xl font-bold text-cyan-50  ">Section C</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="flex flex-col gap-2">
          <div className="flex w-full">
            <label className="font-bold p-2 bg-orange-600 border rounded  w-1/5">
              Please upload a map of your residence from the main road:
            </label>

            <div className="flex items-center">
              <div className="flex flex-col mx-2 my-0">
                <input
                  className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                  type="file"
                  onChange={handleMapUpload}
                />

                {mapImage && (
                  <>
                    <div>
                      <img alt="not found" width={"100px"} src={mapImage} />
                    </div>
                    <button onClick={() => setMapImage("")}>remove</button>
                  </>
                )}
                {!mapImage && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full gap-2">
            <label className="font-bold p-2 bg-orange-600 border rounded  w-1/5">
              Account Operation:
            </label>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center">
                <div className="flex flex-col mx-2 my-0">
                  <input
                    className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                    type="checkbox"
                    {...register("accountOperation.isSelf")}
                    defaultChecked={formData?.accountOperation?.isSelf}
                  />
                </div>
                <label className="font-bold">Self</label>
              </div>
              <div className="flex items-center">
                <div className="flex flex-col mx-2 my-0">
                  <input
                    className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                    type="checkbox"
                    {...register("accountOperation.isJoint")}
                    defaultChecked={formData?.accountOperation?.isJoint}
                  />
                </div>
                <label className="font-bold">Joint</label>
              </div>
              <div className="flex items-center">
                <div className="flex flex-col mx-2 my-0">
                  <input
                    className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                    type="checkbox"
                    {...register("accountOperation.isAnyone")}
                    defaultChecked={formData?.accountOperation?.isAnyone}
                  />
                </div>
                <label className="font-bold">Any one</label>
              </div>
              <div className="flex items-center">
                <div className="flex flex-col mx-2 my-0">
                  <input
                    className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                    type="checkbox"
                    {...register("accountOperation.isOther")}
                    defaultChecked={isOperationOther}
                    onClick={() => setOperationIsOther(!isOperationOther)}
                  />
                  {errors.panNo && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <label className="font-bold">Other(Please Specify)</label>
                {isOperationOther && (
                  <div className="flex items-center ml-2">
                    <textarea
                      rows={1}
                      cols={80}
                      className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      {...register("accountOperation.other", {
                        required: true,
                        minLength: 2,
                      })}
                      defaultValue={formData?.accountOperation?.other}
                    />
                    {errors.accountOperation?.other && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                )}
              </div>
              {!isAccountOperation && (
                <span className="text-red-500">
                  Please select at least one Account Operation.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-2 gap-2">
          <h3 className="font-bold p-2 bg-orange-600 border rounded  w-1/5">
            Nominee Details
          </h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <label className="font-bold">
                Would you like to add Nomineee ?
              </label>
              <input
                className="inline-block border border-solid border-[#ccc] rounded"
                type="checkbox"
                onChange={() => {
                  if (hasNominee && isNomineeMinor) {
                    setHasNominee(!hasNominee);
                    setIsNomineeMinor(false);
                  } else {
                    setHasNominee(!hasNominee);
                  }
                }}
                checked={hasNominee}
              />
            </div>
          </div>

          {hasNominee && (
            <>
              <p>
                I maintaining account number
                <input
                  className="inline-block border border-solid border-[#ccc] rounded"
                  type="text"
                  id=""
                  placeholder="su12323356"
                  {...register("nominee.acNo", {
                    required: true,
                  })}
                  defaultValue={formData?.nominee?.acNo}
                />
                with your Bank, nominate the following named to be entitled for
                the balance of the account in the event of my death.
              </p>
              <div className="flex flex-col gap-2 border border-solid border-orange-300 border-xl p-2 ">
                <div className="flex gap-2 items-center">
                  <div className="flex ">
                    <label className="font-bold">Name:Mr/Ms./Minor</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="fullname"
                        {...register("nominee.fullName", {
                          required: true,
                          minLength: 3,
                          maxLength: 50,
                        })}
                        defaultValue={formData?.nominee?.fullName}
                      />
                      {errors.nominee?.fullName && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Relationship:</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="relationship"
                        {...register("nominee.relationship", {
                          required: true,
                          minLength: 3,
                          maxLength: 20,
                        })}
                        defaultValue={formData?.nominee?.relationship}
                      />
                      {errors.nominee?.relationship && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex ">
                    <label className="font-bold">Father/Mother's Name:</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="fullname"
                        {...register("nominee.fullName", {
                          required: true,
                          minLength: 3,
                          maxLength: 50,
                        })}
                        defaultValue={formData?.nominee?.fullName}
                      />
                      {errors.nominee?.fullName && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex ">
                    <label className="font-bold">Nationality</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="nationality"
                        {...register("nominee.nationality", {
                          required: true,
                          minLength: 3,
                          maxLength: 50,
                        })}
                        defaultValue={formData?.nominee?.nationality}
                      />
                      {errors.nominee?.fullName && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Citizenship No</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="Citizenship Number"
                        {...register("nominee.citizenshipNo", {
                          required: true,
                          minLength: 3,
                          maxLength: 20,
                        })}
                        defaultValue={formData?.nominee?.citizenshipNo}
                      />
                      {errors.nominee?.citizenshipNo && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Date of Birth</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="date"
                        placeholder="Citizenship Number"
                        {...register("nominee.dob", {
                          required: true,
                        })}
                        defaultValue={`${formData?.nominee?.dob}`}
                      />
                      {errors.nominee?.dob && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex ">
                    <label className="font-bold">Permanent Address</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="permanent address"
                        {...register("nominee.permanentAddress", {
                          required: true,
                          minLength: 3,
                          maxLength: 50,
                        })}
                        defaultValue={formData?.nominee?.permanentAddress}
                      />
                      {errors.nominee?.permanentAddress && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Correspondence Address</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="correspondence Address"
                        {...register("nominee.correspondenceAddress", {
                          required: true,
                          minLength: 3,
                          maxLength: 20,
                        })}
                        defaultValue={formData?.nominee?.correspondenceAddress}
                      />
                      {errors.nominee?.correspondenceAddress && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex ">
                    <label className="font-bold">Residence Tel No.</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="telephone number"
                        {...register("nominee.phoneNo", {
                          minLength: 3,
                          maxLength: 50,
                        })}
                        defaultValue={formData?.nominee?.phoneNo}
                      />
                      {errors.nominee?.phoneNo && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Office Tel No.</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="office tel no."
                        {...register("nominee.officeNo", {
                          minLength: 3,
                          maxLength: 20,
                        })}
                        defaultValue={formData?.nominee?.officeNo}
                      />
                      {errors.nominee?.officeNo && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Mobile No.</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="mobile no."
                        {...register("nominee.mobileNo", {
                          required: true,
                          minLength: 3,
                          maxLength: 20,
                        })}
                        defaultValue={formData?.nominee?.mobileNo}
                      />
                      {errors.nominee?.mobileNo && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <label className="font-bold">If Nominee is a Minor ?</label>
                  <input
                    className="inline-block border border-solid border-[#ccc] rounded"
                    type="checkbox"
                    onChange={() => {
                      if (hasNominee) {
                        setIsNomineeMinor(!isNomineeMinor);
                      }
                    }}
                    checked={isNomineeMinor}
                  />
                </div>
              </div>
            </>
          )}

          {isNomineeMinor && (
            <>
              <p>
                If the nominee is still a minor at the time of my death, the
                following named shall be entitled to the balance of the account
                on behalf of the nominee.
              </p>
              <div className="flex flex-col gap-2 border border-solid border-orange-300 border-xl p-2 ">
                <div className="flex gap-2 items-center">
                  <div className="flex ">
                    <label className="font-bold">Name:Mr/Ms./Minor</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="fullname"
                        {...register("nominee.fullName", {
                          required: true,
                          minLength: 3,
                          maxLength: 50,
                        })}
                        defaultValue={formData?.nominee?.fullName}
                      />
                      {errors.nominee?.fullName && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Relationship:</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="relationship"
                        {...register("nominee.relationship", {
                          required: true,
                          minLength: 3,
                          maxLength: 20,
                        })}
                        defaultValue={formData?.nominee?.relationship}
                      />
                      {errors.nominee?.relationship && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex ">
                    <label className="font-bold">Father/Mother's Name:</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="fullname"
                        {...register("nominee.fullName", {
                          required: true,
                          minLength: 3,
                          maxLength: 50,
                        })}
                        defaultValue={formData?.nominee?.fullName}
                      />
                      {errors.nominee?.fullName && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex ">
                    <label className="font-bold">Nationality</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="nationality"
                        {...register("nominee.nationality", {
                          required: true,
                          minLength: 3,
                          maxLength: 50,
                        })}
                        defaultValue={formData?.nominee?.nationality}
                      />
                      {errors.nominee?.fullName && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Citizenship No</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="Citizenship Number"
                        {...register("nominee.citizenshipNo", {
                          required: true,
                          minLength: 3,
                          maxLength: 20,
                        })}
                        defaultValue={formData?.nominee?.citizenshipNo}
                      />
                      {errors.nominee?.citizenshipNo && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Date of Birth</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="date"
                        placeholder="Citizenship Number"
                        {...register("nominee.dob", {
                          required: true,
                        })}
                        defaultValue={`${formData?.nominee?.dob}`}
                      />
                      {errors.nominee?.dob && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex ">
                    <label className="font-bold">Permanent Address</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="permanent address"
                        {...register("nominee.permanentAddress", {
                          required: true,
                          minLength: 3,
                          maxLength: 50,
                        })}
                        defaultValue={formData?.nominee?.permanentAddress}
                      />
                      {errors.nominee?.permanentAddress && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Correspondence Address</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="correspondence Address"
                        {...register("nominee.correspondenceAddress", {
                          required: true,
                          minLength: 3,
                          maxLength: 20,
                        })}
                        defaultValue={formData?.nominee?.correspondenceAddress}
                      />
                      {errors.nominee?.correspondenceAddress && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex ">
                    <label className="font-bold">Residence Tel No.</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="telephone number"
                        {...register("nominee.phoneNo", {
                          minLength: 3,
                          maxLength: 50,
                        })}
                        defaultValue={formData?.nominee?.phoneNo}
                      />
                      {errors.nominee?.phoneNo && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Office Tel No.</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="office tel no."
                        {...register("nominee.officeNo", {
                          minLength: 3,
                          maxLength: 20,
                        })}
                        defaultValue={formData?.nominee?.officeNo}
                      />
                      {errors.nominee?.officeNo && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <label className="font-bold">Mobile No.</label>
                    <div className="flex flex-col mx-2 my-0">
                      <input
                        className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        placeholder="mobile no."
                        {...register("nominee.mobileNo", {
                          required: true,
                          minLength: 3,
                          maxLength: 20,
                        })}
                        defaultValue={formData?.nominee?.mobileNo}
                      />
                      {errors.nominee?.mobileNo && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex mt-4">
          <div className="flex w-full">
            <label className="font-bold p-2 bg-orange-600 border rounded  w-1/5">
              Please upload thub image and signature:
            </label>
            <div className="flex items-center">
              <div className="flex flex-col mx-2 my-0">
                <input
                  className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                  name="rightThumb"
                  type="file"
                  onChange={handleThumbImageUpload}
                />

                {images.rightThumb && (
                  <>
                    <div>
                      <img
                        alt="not found"
                        width={"100px"}
                        src={images.rightThumb}
                      />
                    </div>
                    <button
                      onClick={() =>
                        setImages((prev) => ({ ...prev, rightThumb: "" }))
                      }
                    >
                      remove
                    </button>
                  </>
                )}
                {!images.rightThumb && (
                  <span className="text-red-500">This field is required</span>
                )}
                <label className="font-bold">Right</label>
              </div>

              <div className="flex flex-col mx-2 my-0">
                <input
                  className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                  name="leftThumb"
                  type="file"
                  onChange={handleThumbImageUpload}
                />

                {images.leftThumb && (
                  <>
                    <div>
                      <img
                        alt="not found"
                        width={"100px"}
                        src={images.leftThumb}
                      />
                    </div>
                    <button
                      onClick={() =>
                        setImages((prev) => ({ ...prev, leftThumb: "" }))
                      }
                    >
                      remove
                    </button>
                  </>
                )}
                {!images.leftThumb && (
                  <span className="text-red-500">This field is required</span>
                )}
                <label className="font-bold">Left</label>
              </div>

              <div className="flex flex-col mx-2 my-0">
                <input
                  className="inline-block border border-solid border-[#ccc] rounded w-[100%]"
                  name="signature"
                  type="file"
                  onChange={handleThumbImageUpload}
                />

                {images.signature && (
                  <>
                    <div>
                      <img
                        alt="not found"
                        width={"100px"}
                        src={images.signature}
                      />
                    </div>
                    <button
                      onClick={() =>
                        setImages((prev) => ({ ...prev, signature: "" }))
                      }
                    >
                      remove
                    </button>
                  </>
                )}
                {!images.signature && (
                  <span className="text-red-500">This field is required</span>
                )}
                <label className="font-bold">
                  Applicant's Authrized Signature
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            className="m-4 p-2 border border-red-500 bg-slate-600 text-cyan-50 cursor-pointer rounded-md"
            type="button"
            onClick={() => navigate("/react-hook-form/section-b")}
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

export default SectionCForm;

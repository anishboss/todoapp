import { useState } from "react";

type DocumentType = "citizenship" | "passport";

interface IPerson {
  fullName: string;
  dob: Date | null;
  citizenship: {
    id: string;
    issuedBy: string;
    issuedDate: Date | null;
  };
  passport: {
    id: string;
    issuedBy: string;
    issuedDate: Date | null;
  };
  document: {
    id: string;
    type: DocumentType;
    issuingOffice: string;
  };
  permanent: {
    province: string;
    district: string;
    municipality: string;
    village: string;
    houseNo: string;
    wardNo: string;
  };
  current: {
    province: string;
    district: string;
    municipality: string;
    village: string;
    houseNo: string;
    wardNo: string;
  };
  contact: {
    phoneNo: string;
    mobileNo: string;
    email: string;
  };
  fatherName: string;
  grandFatherName: string;
  spouseName: string;
  education: string;
  organizationName: string;
  designation: string;
  annualIncome: string;
  hasAccWithOtherBank: boolean;
  hasConvictedCrime: boolean;
  hasExistingAccount: boolean;
  acNo: string;
}

interface IPersonErrors {
  fullName: string;
  dob: string;
  citizenship: {
    id: string;
    issuedBy: string;
    issuedDate: string;
  };
  passport: {
    id: string;
    issuedBy: string;
    issuedDate: string;
  };
  document: {
    id: string;
    type: string;
    issuingOffice: string;
  };
  permanent: {
    province: string;
    district: string;
    municipality: string;
    village: string;
    houseNo: string;
    wardNo: string;
  };
  current: {
    province: string;
    district: string;
    municipality: string;
    village: string;
    houseNo: string;
    wardNo: string;
  };
  contact: {
    phoneNo: string;
    mobileNo: string;
    email: string;
  };
  fatherName: string;
  grandFatherName: string;
  spouseName: string;
  education: string;
  organizationName: string;
  designation: string;
  annualIncome: string;
  hasAccWithOtherBank: boolean;
  hasConvictedCrime: boolean;
  hasExistingAccount: boolean;
  acNo: string;
}
const SunriseFormPage = () => {
  const [person, setPerson] = useState<IPerson>({
    fullName: "",
    dob: null,
    citizenship: {
      id: "",
      issuedBy: "",
      issuedDate: null,
    },
    passport: {
      id: "",
      issuedBy: "",
      issuedDate: null,
    },
    document: {
      type: "citizenship",
      id: "",
      issuingOffice: "",
    },
    permanent: {
      province: "",
      district: "",
      municipality: "",
      village: "",
      houseNo: "",
      wardNo: "",
    },
    current: {
      province: "",
      district: "",
      municipality: "",
      village: "",
      houseNo: "",
      wardNo: "",
    },
    contact: {
      phoneNo: "",
      mobileNo: "",
      email: "",
    },
    fatherName: "",
    grandFatherName: "",
    spouseName: "",
    education: "",
    organizationName: "",
    designation: "",
    annualIncome: "0",
    hasAccWithOtherBank: false,
    hasConvictedCrime: false,
    hasExistingAccount: false,
    acNo: "",
  });

  const [errors, setErrors] = useState<IPersonErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm(person);
    console.log("person", person);
    setErrors(newErrors);
    console.log("errors", newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    alert(JSON.stringify(person));
    console.log("newErrors", newErrors);
    console.log("form submitted");
  };

  const validateForm = (data: IPerson) => {
    const errors = {} as IPersonErrors;

    if (!data.fullName.trim()) {
      errors.fullName = "Fullname is required";
    } else if (data.fullName.length < 3) {
      errors.fullName = "FullName must be at least 3 characters long";
    }
    console.log("dob", data.dob);
    if (!data.dob) {
      errors.dob = "Date Of Birth is required." as unknown as string;
    }
    console.log("data.ciis", typeof data.citizenship.id, data.citizenship.id);

    if (data.document.type === "citizenship") {
      console.log("iaminsitde", !data.citizenship.id);

      if (!data.citizenship.id.trim()) {
        errors.citizenship = {
          ...errors.citizenship,
          id: "Citizenship No. is required",
        };
      }
      if (!data.citizenship.issuedBy.trim()) {
        errors.citizenship = {
          ...errors.citizenship,
          issuedBy: "Citizenship IssuedBy is required",
        };
      }
      if (!data.citizenship.issuedDate) {
        errors.citizenship = {
          ...errors.citizenship,
          issuedDate: "Citizenship Issued Date is required",
        };
      }
    }
    if (data.document.type === "passport") {
      if (!data.passport.id.trim()) {
        errors.passport = {
          ...errors.passport,
          id: "Passport No. is required",
        };
      }
      if (!data.passport.issuedBy.trim()) {
        errors.passport = {
          ...errors.passport,
          issuedBy: "Passport IssuedBy is required",
        };
      }
      if (!data.passport.issuedDate) {
        errors.passport = {
          ...errors.passport,
          issuedDate: "Passport Issued Date is required",
        };
      }
    }
    if (!data.document.issuingOffice.trim()) {
      errors.document = {
        ...errors.document,
        issuingOffice: "Issuing Office is required.",
      };
    }

    if (!data.current.province.trim()) {
      errors.current = {
        ...errors.current,
        province: "Provience is required.",
      };
    }
    if (!data.current.district.trim()) {
      errors.current = {
        ...errors.current,
        district: "District is required.",
      };
    }
    if (!data.current.municipality.trim()) {
      errors.current = {
        ...errors.current,
        municipality: "Municipality is required.",
      };
    }
    if (!data.current.village.trim()) {
      errors.current = {
        ...errors.current,
        village: "Village is required.",
      };
    }
    if (!data.current.wardNo.trim()) {
      errors.current = {
        ...errors.current,
        wardNo: "Ward No. is required.",
      };
    }

    if (!data.contact.phoneNo.trim()) {
      errors.contact = {
        ...errors.contact,
        phoneNo: "Phone no. is required",
      };
    }
    if (!data.contact.mobileNo.trim()) {
      errors.contact = {
        ...errors.contact,
        mobileNo: "Mobile no. is required",
      };
    }

    if (!data.contact.email.trim()) {
      errors.contact.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.contact.email)) {
      errors.contact.email = "Email is invalid";
    }

    if (!data.fatherName.trim()) {
      errors.fatherName = "Father's name is required.";
    }

    if (!data.grandFatherName.trim()) {
      errors.grandFatherName = "GrandFather's name is required.";
    }

    // if (!data.education.trim()) {
    //   errors.education = "Education is required.";
    // }

    return errors;
  };

  return (
    <div className="p-4 bg-orange-600">
      <div className="bg-white p-3">
        <div className="relative h-10 cursor-default">
          <h1 className="text-2xl font-bold mb-2 text-cyan-50 bg-orange-600 w-fit p-1 absolute right-0 ">
            Personal Account Opening Form
          </h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-2">
            <div className="flex w-full">
              <label className="p-2 bg-orange-600 border rounded  w-1/5">
                Full Name(IN BLOCK)Mr./Ms:
              </label>
              <div className="flex items-center">
                <div className="flex flex-col">
                  <input
                    className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                    name="fullname"
                    type="text"
                    placeholder="fullname"
                    onChange={(e) => {
                      setPerson({ ...person, fullName: e.target.value });
                      console.log("e", e.target.value);
                    }}
                    value={person.fullName}
                  />
                  {errors.fullName && (
                    <span style={{ color: "red" }}>{errors.fullName}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center w-full">
              <label className="p-2 bg-orange-600 border rounded w-1/5">
                Date of Birth:
              </label>
              <div className="flex flex-col">
                <input
                  className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                  type="date"
                  onChange={(e) => {
                    setPerson({ ...person, dob: new Date(e.target.value) });
                  }}
                />
                {errors.dob && (
                  <span style={{ color: "red" }}>
                    {errors.dob as unknown as string}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <div className="flex flex-col bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
                <p>Citizenship Certificate:</p>
                <p>Passport:</p>
                <p>Other Identification:</p>
              </div>
              <div className="flex flex-col gap-3 justify-around flex-grow">
                <div className="flex justify-between items-start gap-10">
                  <div className="flex w-1/4 justify-start items-center">
                    <label>Citizenship No:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="number"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            citizenship: {
                              ...person.citizenship,
                              id: e.target.value,
                            },
                          });
                        }}
                        value={person.citizenship.id}
                      />
                      {errors?.citizenship?.id && (
                        <span style={{ color: "red" }}>
                          {errors?.citizenship?.id}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/4 justify-start items-center">
                    <label>Issued By:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            citizenship: {
                              ...person.citizenship,
                              issuedBy: e.target.value,
                            },
                          });
                        }}
                        value={person.citizenship.issuedBy}
                      />
                      {errors?.citizenship?.issuedBy && (
                        <span style={{ color: "red" }}>
                          {errors?.citizenship?.issuedBy}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/4 justify-start items-center">
                    <label>Issued Date:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="date"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            citizenship: {
                              ...person.citizenship,
                              issuedDate: new Date(e.target.value),
                            },
                          });
                        }}
                      />
                      {errors?.citizenship?.issuedDate && (
                        <span style={{ color: "red" }}>
                          {errors?.citizenship?.issuedDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start gap-10 w-full">
                  <div className="flex w-1/4">
                    <label>Passport No:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="number"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            passport: {
                              ...person.passport,
                              id: e.target.value,
                            },
                          });
                        }}
                        value={person.passport.id}
                      />
                      {errors?.passport?.id && (
                        <span style={{ color: "red" }}>
                          {errors?.passport?.id}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/4">
                    <label>Issued By:</label>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            passport: {
                              ...person.passport,
                              issuedBy: e.target.value,
                            },
                          });
                        }}
                        value={person.passport.issuedBy}
                      />
                      {errors?.passport?.issuedBy && (
                        <span style={{ color: "red" }}>
                          {errors?.passport?.issuedBy}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/4">
                    <label>Issued Date:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="date"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            passport: {
                              ...person.passport,
                              issuedDate: new Date(e.target.value),
                            },
                          });
                        }}
                      />
                      {errors?.passport?.issuedDate && (
                        <span style={{ color: "red" }}>
                          {errors?.passport?.issuedDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start w-full">
                  <div className="flex items-center w-1/4">
                    <label>Type of ID:</label>
                    <select
                      className=" h-fit mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      name="idType"
                      id="idType"
                      onChange={(e) => {
                        setPerson({
                          ...person,
                          document: {
                            ...person.document,
                            type: e.target.value as DocumentType,
                          },
                        });
                      }}
                    >
                      <option value="citizenship">Citizenship</option>
                      <option value="passport">Passport</option>
                    </select>
                  </div>
                  <div className="flex items-center w-1/4">
                    <label>ID NO:</label>
                    <input
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%] h-fit"
                      type="number"
                    />
                  </div>
                  <div className="flex items-center w-1/4">
                    <label>Issuing Office:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            document: {
                              ...person.document,
                              issuingOffice: e.target.value,
                            },
                          });
                        }}
                      />
                      {errors?.document?.issuingOffice && (
                        <span style={{ color: "red" }}>
                          {errors?.document?.issuingOffice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <div className="flex flex-col bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
                <p>Current Address</p>
              </div>
              <div className="flex flex-col gap-3 justify-around flex-grow">
                <div className="flex justify-between items-center gap-10 w-full">
                  <div className="flex w-1/4">
                    <label>Province:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            current: {
                              ...person.current,
                              province: e.target.value,
                            },
                          });
                        }}
                        value={person.current.province}
                      />
                      {errors?.current?.province && (
                        <span style={{ color: "red" }}>
                          {errors?.current?.province}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/4">
                    <label>District:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            current: {
                              ...person.current,
                              district: e.target.value,
                            },
                          });
                        }}
                        value={person.current.district}
                      />
                      {errors?.current?.district && (
                        <span style={{ color: "red" }}>
                          {errors?.current?.district}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/4">
                    <label>Municipality/RM:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            current: {
                              ...person.current,
                              municipality: e.target.value,
                            },
                          });
                        }}
                        value={person.current.municipality}
                      />
                      {errors?.current?.municipality && (
                        <span style={{ color: "red" }}>
                          {errors?.current?.municipality}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-10 w-full">
                  <div className="flex w-1/4">
                    <label>Village/Tole:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            current: {
                              ...person.current,
                              village: e.target.value,
                            },
                          });
                        }}
                        value={person.current.village}
                      />
                      {errors?.current?.village && (
                        <span style={{ color: "red" }}>
                          {errors?.current?.village}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/4">
                    <label>House No:</label>
                    <input
                      className="h-fit mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                    />
                  </div>
                  <div className="flex w-1/4">
                    <label>Ward NO:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            current: {
                              ...person.current,
                              wardNo: e.target.value,
                            },
                          });
                        }}
                        value={person.current.wardNo}
                      />
                      {errors?.current?.wardNo && (
                        <span style={{ color: "red" }}>
                          {errors?.current?.wardNo}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full justify-start items-center">
              <div className="flex flex-col bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
                Contact Details
              </div>
              <div>
                <div className="flex flex-col gap-3 justify-around flex-grow">
                  <div className="flex justify-between items-center gap-10 w-full">
                    <div className="flex w-1/4 justify-start items-center">
                      <label>Phone No:</label>
                      <div className="flex flex-col ">
                        <input
                          className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                          type="text"
                          onChange={(e) => {
                            setPerson({
                              ...person,
                              contact: {
                                ...person.contact,
                                phoneNo: e.target.value,
                              },
                            });
                          }}
                          value={person.contact.phoneNo}
                        />
                        {errors?.contact?.phoneNo && (
                          <span style={{ color: "red" }}>
                            {errors?.contact?.phoneNo}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex w-1/4 justify-start items-center">
                      <label>Mobile No:</label>
                      <div className="flex flex-col">
                        <input
                          type="text"
                          onChange={(e) => {
                            setPerson({
                              ...person,
                              contact: {
                                ...person.contact,
                                mobileNo: e.target.value,
                              },
                            });
                          }}
                          value={person.contact.mobileNo}
                        />
                        {errors?.contact?.mobileNo && (
                          <span style={{ color: "red" }}>
                            {errors?.contact?.mobileNo}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex w-1/4 justify-start items-center">
                      <label>Email:</label>
                      <div className="flex flex-col">
                        <input
                          type="email"
                          onChange={(e) => {
                            setPerson({
                              ...person,
                              contact: {
                                ...person.contact,
                                email: e.target.value,
                              },
                            });
                          }}
                          value={person.contact.email}
                        />
                        {errors?.contact?.email && (
                          <span style={{ color: "red" }}>
                            {errors?.contact?.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 ">
              <div className="flex flex-col bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
                <p>Family Details:</p>
              </div>
              <div className="flex flex-col gap-3 justify-around flex-grow">
                <div className="flex justify-between items-start gap-10">
                  <div className="flex w-1/4 justify-start items-center">
                    <label>Father's Name:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            fatherName: e.target.value,
                          });
                        }}
                        value={person.fatherName}
                      />
                      {errors.fatherName && (
                        <span style={{ color: "red" }}>
                          {errors.fatherName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/4 justify-start items-center">
                    <label>GrandFather's Name:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            grandFatherName: e.target.value,
                          });
                        }}
                        value={person.grandFatherName}
                      />
                      {errors.grandFatherName && (
                        <span style={{ color: "red" }}>
                          {errors.grandFatherName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/4 justify-start items-center">
                    <label>Spouse's Name:</label>
                    <div className="flex flex-col">
                      <input
                        className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                        type="text"
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            spouseName: e.target.value,
                          });
                        }}
                        value={person.spouseName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start ">
                <div>
                  <label>Spouse/s's Name balal:</label>
                  <input type="text" />
                </div>
                <div className="flex">
                  <label>Education:</label>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      onChange={(e) => {
                        setPerson({
                          ...person,
                          education: e.target.value,
                        });
                      }}
                      value={person.education}
                    />
                    {errors.education && (
                      <span style={{ color: "red" }}>{errors.education}</span>
                    )}
                  </div>
                </div>
              </div>
            </div> */}

            <div className="flex gap-3">
              <div className="flex flex-col bg-orange-600 p-2 border rounded gap-5 w-1/5 justify-center items-start">
                <p>Employer Details</p>
              </div>
              <div className="flex flex-col gap-3 justify-around flex-grow">
                <div className="flex justify-between items-start gap-10">
                  <div className="flex w-1/4 justify-start items-center">
                    <label>Name and address:</label>
                    <input
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      onChange={(e) => {
                        setPerson({
                          ...person,
                          organizationName: e.target.value,
                        });
                      }}
                      value={person.organizationName}
                    />
                  </div>
                  <div className="flex w-1/4 justify-center items-center">
                    <label>Designation:</label>
                    <input
                      className="mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="text"
                      onChange={(e) => {
                        setPerson({
                          ...person,
                          designation: e.target.value,
                        });
                      }}
                      value={person.designation}
                    />
                  </div>
                  <div className="flex w-1/4 justify-center items-center">
                    <label>Projected Annual Income(Rs.):</label>
                    <input
                      className="h-fit mx-2 my-0 inline-block border border-solid border-[#ccc] rounded w-[100%]"
                      type="number"
                      onChange={(e) => {
                        setPerson({
                          ...person,
                          annualIncome: e.target.value,
                        });
                      }}
                      value={person.annualIncome}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start ">
                <div>
                  <label>Account With other bank's:</label>
                  <input type="checkbox" />
                </div>
                <div>
                  <label>
                    Have you been convicted for any criminal offense in the
                    past:
                  </label>
                  <input type="checkbox" />
                </div>
                <div>
                  <label>Bank account with Laxmi sunrise Bank:</label>
                  <input type="checkbox" />
                </div>
                <div>
                  <label>If You Have(A/C No):</label>
                  <input type="number" />
                </div>
              </div>
            </div>
          </div>
          <button
            className="m-4 p-2 border border-red-500 bg-slate-600 text-cyan-50 cursor-pointer rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SunriseFormPage;

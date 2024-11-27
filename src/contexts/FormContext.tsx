import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage.util";

export interface IPerson {
  isSectionAComplete: boolean;
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
  otherDocument?: {
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
  annualIncome: number;
  hasAccWithOtherBank: boolean;
  hasConvictedCrime: boolean;
  hasExistingAccount: boolean;
  acNo?: string;
  panNo?: string;
  sourceOfIncome: {
    isAtLeastOne: boolean;
    isBusiness: boolean;
    isSalary: boolean;
    isROI: boolean;
    isInheritance: boolean;
    isRemittance: boolean;
    isOther: boolean;
    other: string;
    projectedAnnualTransaction: string;
  };
  isTenant: boolean;
  landLord?: {
    fullName: string;
    phoneNo: string;
    district: string;
    municipality: string;
    village?: string;
    houseNo?: string;
    wardNo?: string;
  };

  politicalOverview: {
    isPoliticallyEngaged: boolean;
    description: string;
  };
  nationality: {
    isAmerican: boolean;
    description: string;
  };
  benificialOwner: {
    hasBenificial: boolean;
    description: string;
  };
  images: {
    mapImage: string;
    rightThumb: string;
    leftThumb: string;
    signature: string;
  };
  accountOperation: {
    isSelf: boolean;
    isJoint: boolean;
    isAnyone: boolean;
    isOther: boolean;
    other: string;
  };
  hasNominee: boolean;
  nominee: {
    isMinor: boolean;
    acNo: string;
    fullName: string;
    relationship: string;
    parentName: string;
    nationality: string;
    citizenshipNo: string;
    dob: Date | null;
    permanentAddress: string;
    correspondenceAddress: string;
    phoneNo: string;
    mobileNo: string;
    officeNo: string;
  };
}

export const person: IPerson = {
  isSectionAComplete: false,
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
  otherDocument: {
    type: "",
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
  annualIncome: 0,
  hasAccWithOtherBank: false,
  hasConvictedCrime: false,
  hasExistingAccount: false,
  acNo: "",
  panNo: "",
  sourceOfIncome: {
    isAtLeastOne: false,
    isBusiness: false,
    isSalary: false,
    isROI: false,
    isInheritance: false,
    isRemittance: false,
    isOther: false,
    other: "",
    projectedAnnualTransaction: "",
  },
  isTenant: false,
  landLord: {
    fullName: "",
    phoneNo: "",
    district: "",
    municipality: "",
  },
  politicalOverview: {
    isPoliticallyEngaged: false,
    description: "",
  },
  nationality: {
    isAmerican: false,
    description: "",
  },
  benificialOwner: {
    hasBenificial: false,
    description: "",
  },
  images: {
    mapImage: "",
    rightThumb: "",
    leftThumb: "",
    signature: "",
  },
  accountOperation: {
    isSelf: false,
    isJoint: false,
    isAnyone: false,
    isOther: false,
    other: "",
  },
  hasNominee: false,
  nominee: {
    isMinor: false,
    acNo: "",
    fullName: "",
    relationship: "",
    parentName: "",
    nationality: "",
    citizenshipNo: "",
    dob: null,
    permanentAddress: "",
    correspondenceAddress: "",
    phoneNo: "",
    mobileNo: "",
    officeNo: "",
  },
};

interface ISunriseFormContext {
  formData: IPerson;
  updateFormData: (updatedData: IPerson) => void;
}

const SunriseFormContext = createContext<ISunriseFormContext>({
  formData: person,
  updateFormData: () => ({}),
});

export const useSunriseFormContext = () => {
  return useContext(SunriseFormContext);
};

export const SunriseFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<IPerson>(() => {
    const savedData = getLocalStorage("formData");
    return savedData || person;
  });

  useEffect(() => {
    setLocalStorage("formData", formData);
  }, [formData]);

  const updateFormData = (updatedData: IPerson) => {
    setFormData((prevData) => ({ ...prevData, ...updatedData }));
  };

  return (
    <SunriseFormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </SunriseFormContext.Provider>
  );
};

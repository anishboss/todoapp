import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDateString,
  IsMobilePhone,
  IsOptional,
  Length,
  ValidateIf,
  ValidateNested,
} from "class-validator";

class Nominee {
  @IsOptional()
  isMinor: boolean;
  @Length(10, 10)
  acNo: string;
  @Length(2, 30)
  fullName: string;
  @Length(2, 30)
  relationship: string;
  @Length(2, 30)
  parentName: string;
  @Length(2, 30)
  nationality: string;
  @Length(2, 30)
  citizenshipNo: string;
  @IsDateString()
  dob: Date;
  @Length(2, 30)
  permanentAddress: string;
  @Length(2, 30)
  correspondenceAddress: string;
  @IsOptional()
  phoneNo: string;
  @IsMobilePhone()
  mobileNo: string;
  @IsOptional()
  officeNo: string;
}

export class SectionC {
  @IsBoolean()
  @IsOptional()
  hasNominee: boolean;

  @IsOptional()
  @ValidateIf((o) => o.hasNominee)
  @ValidateNested()
  @Type(() => Nominee)
  nominee: Nominee;
}

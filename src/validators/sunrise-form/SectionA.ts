import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";

class Citizenship {
  @Length(2, 10)
  id: string;

  @Length(2, 10)
  issuedBy: string;

  @IsDateString()
  issuedDate: Date;
}

class Passport {
  @Length(2, 10)
  id: string;

  @Length(2, 10)
  issuedBy: string;

  @IsDateString()
  issuedDate: Date;
}

class OtherDocument {
  @Length(2, 10)
  id: string;

  @Length(2, 10)
  type: string;

  @Length(2, 10)
  issuingOffice: string;
}

class Address {
  @Length(2, 20)
  province: string;
  @Length(2, 20)
  district: string;
  @Length(2, 20)
  municipality: string;
  @Length(2, 20)
  village: string;
  @IsOptional()
  houseNo: string;
  @Length(2, 20)
  wardNo: string;
}

class Contact {
  @IsMobilePhone()
  phoneNo: string;

  @IsOptional()
  mobileNo: string;

  @IsEmail()
  email: string;
}

export class SectionA {
  @Length(2, 30)
  fullName: string;

  @IsDateString()
  dob: Date;

  @ValidateNested()
  @Type(() => Citizenship)
  citizenship: Citizenship;

  @ValidateNested()
  @Type(() => Passport)
  passport: Passport;

  @ValidateNested()
  @Type(() => OtherDocument)
  otherDocument!: OtherDocument;

  @ValidateNested()
  @Type(() => Address)
  current: Address;

  @ValidateNested()
  @Type(() => Contact)
  contact: Contact;

  @Length(2, 30)
  fatherName: string;

  @Length(2, 30)
  grandFatherName: string;

  @IsOptional()
  spouseName: string;

  @IsString()
  @IsOptional()
  organizationName: string;

  @IsString()
  @IsOptional()
  designation?: string;

  @IsNumber()
  annualIncome: number;

  @IsBoolean()
  @IsOptional()
  hasAccWithOtherBank?: boolean;

  @IsBoolean()
  @IsOptional()
  hasConvictedCrime?: boolean;

  @IsBoolean()
  @IsOptional()
  hasExistingAccount?: boolean;

  @IsOptional()
  acNo?: string;
}

import { Type } from "class-transformer";
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from "class-validator";

class SourceOfIncome {
  @IsBoolean()
  @IsOptional()
  isBusiness?: boolean;

  @IsBoolean()
  @IsOptional()
  isSalary?: boolean;

  @IsBoolean()
  @IsOptional()
  isROI?: boolean;

  @IsBoolean()
  @IsOptional()
  isInheritance?: boolean;

  @IsBoolean()
  @IsOptional()
  isRemittance?: boolean;

  @IsBoolean()
  @IsOptional()
  isOther?: boolean;

  @IsString()
  @IsOptional()
  other?: string;

  @IsNumber()
  projectedAnnualTransaction: number;
}

class Landlord {
  @Length(2, 30)
  fullName: string;

  @IsPhoneNumber()
  phoneNo: string;

  @Length(2, 30)
  district: string;

  @Length(2, 30)
  municipality: string;

  @IsString()
  @IsOptional()
  village?: string;

  @IsString()
  @IsOptional()
  houseNo?: string;

  @Length(1, 4)
  wardNo: string;
}

class PoliticalOverview {
  @IsBoolean()
  isPoliticallyEngaged: boolean;

  @Length(2, 100)
  description: string;
}

class Nationality {
  @IsBoolean()
  isAmerican: boolean;

  @Length(2, 100)
  description: string;
}

class BenificialOwner {
  @IsBoolean()
  hasBenificial: boolean;

  @Length(2, 100)
  description: string;
}

export class SectionB {
  @MaxLength(9)
  @IsOptional()
  panNo?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SourceOfIncome)
  sourceOfIncome?: SourceOfIncome;

  @IsBoolean()
  @IsOptional()
  isTenant?: boolean;

  @IsOptional()
  @ValidateIf((o) => o.isTenant)
  @ValidateNested()
  @Type(() => Landlord)
  landLord?: Landlord;

  @IsOptional()
  @ValidateIf((o) => o.politicalOverview.isPoliticallyEngaged)
  @ValidateNested()
  @Type(() => PoliticalOverview)
  politicalOverview?: PoliticalOverview;

  @IsOptional()
  @ValidateIf((o) => o.nationality.isAmerican)
  @ValidateNested()
  @Type(() => Nationality)
  nationality?: Nationality;

  @IsOptional()
  @ValidateIf((o) => o.benificialOwner.hasBenificial)
  @ValidateNested()
  @Type(() => BenificialOwner)
  benificialOwner?: BenificialOwner;
}

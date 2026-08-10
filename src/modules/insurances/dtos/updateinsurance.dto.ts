import { PartialType } from "@nestjs/mapped-types";
import { CreateInsuranceDto } from "./createInsurance.dto";
import { IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { InsuranceStatus } from "@/common/enum/insurances.enum";

export class UpdateInsuranceDto extends PartialType(CreateInsuranceDto) {
    @IsNotEmpty()
    @Type(() => Date)
    endDate?: Date

    @IsNotEmpty()
    status?: InsuranceStatus
}
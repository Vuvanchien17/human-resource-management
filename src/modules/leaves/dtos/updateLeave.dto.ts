import { PartialType } from "@nestjs/mapped-types";
import { CreateLeaveDto } from "./createLeave.dto";

export class UpdateLeaveDto extends PartialType(CreateLeaveDto) { }
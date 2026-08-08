import { PartialType } from "@nestjs/mapped-types";
import { CreateEducationsDto } from "./createEducations.dto";

export class UpdateEducationDto extends PartialType(CreateEducationsDto) { }
import { RESPONSE_MESSGAE } from "@/common/constants/auth.const";
import { SetMetadata } from "@nestjs/common";


export const ResponseMessage = (message: string) => SetMetadata(RESPONSE_MESSGAE, message);
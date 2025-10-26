import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log(metadata);
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException("Must be ObjectId");
    }
    return value;
  }
}

import { Expose } from "class-transformer";
import { BaseDto } from "./base.dto";

export class TodoDto extends BaseDto{
    @Expose()
    tittle: string;
    @Expose()
    completed?: boolean;

    @Expose()
    user_id: number;
}
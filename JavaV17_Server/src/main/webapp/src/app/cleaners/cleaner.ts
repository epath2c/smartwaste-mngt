import { Shift } from "../shifts/shift";

export class Cleaner {
    id?: number;
    name!: string;
    email!: string;
    phoneNumber!: string;
    shiftIds?: number[]; 
    shifts?: Shift[];
    isEdit?: boolean
}

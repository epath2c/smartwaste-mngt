import { Cleaner } from "../cleaners/cleaner";

export class Trashbins {
    binId?: number;
    name!: string;
    height!: number;
    createdDate!: string;
    threshold?: number;
    currentFillPercentage?: number;  // current fill percentage
    cleanerIds?: number[]; 
    //cleaners?: Cleaner[]; 
    location?: {
      address?: string;
      latitude?: number;
      longitude?: number;
}}

import { SelectModel } from "./selectservice.model";

export interface SelectService{
    data : SelectModel[];
    status : string;
    message : string;
}
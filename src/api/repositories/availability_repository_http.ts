import { http } from "../http";
import {CreateAvailabilityRequestDTO} from "../types/availability_dto.ts";

export class AvailabilityRepositoryHttp {
    async createAvailability(data: CreateAvailabilityRequestDTO) {
        try {
            const response = await http.post('/avaiabilty', data);
            console.log("Post availability response: ", response.data)
            return response.data;
        } catch (error: any) {
            throw new Error(error)
        }
    }

}
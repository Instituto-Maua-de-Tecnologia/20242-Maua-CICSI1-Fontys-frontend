import { http } from "../http";
import {CreateAvailabilityRequestDTO} from "../types/availability_dto.ts";

export class AvailabilityRepositoryHttp {
    async createAvailability(data: CreateAvailabilityRequestDTO) {
        try {
            const response = await http.post('/avaiabilty', data);
            return response.data;
        } catch (error: any) {
            console.log("Error create availability respository: ", error)
            console.log("Error create availability respository message: ", error.message)
            throw new Error(error)
        }
    }

    async updateAvailability(data: CreateAvailabilityRequestDTO) {
        try {
            const response = await http.put('/avaiabilty', data);
            return response.data;
        } catch (error: any) {
            console.log("Error update availability respository: ", error)
            console.log("Error update availability respository message: ", error.message)
            throw new Error(error)
        }
    }

    async getAvailabilityByUser(userId: string) {
        try {
            const response = await http.get(`/avaiabilty/userId=${userId}`);
            console.log("Get availability response: ", response.data)
            return response.data;
        } catch (error: any) {
            console.log("Error get availability respository: ", error)
            console.log("Error get availability respository message: ", error.message)
            throw new Error(error)
        }
    }

}
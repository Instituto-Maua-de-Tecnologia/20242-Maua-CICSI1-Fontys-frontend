import { http } from "../http";
import {Schedule} from "@/api/types/schedule_dto.ts";

export class ScheduleRepositoryHttp {
    async generateSchedule(semester_number: string) {
        console.log("Generating schedule: ")
        try {
            const response = await http.get(`/schedule?semester_number=${semester_number}`);
            console.log("Generating schedule: " ,response)
            return response.data;
        } catch (error: any) {
            console.log("Error generate schedule respository: ", error)
            console.log("Error generate schedule respository message: ", error.message)
            throw new Error(error)
        }
    }
    async publishSchedule(data: Schedule[]) {
        try {
            const response = await http.post('/schedule', data);
            return response.data;
        } catch (error: any) {
            console.log("Error publish schedule respository: ", error)
            console.log("Error publish schedule respository message: ", error.message)
            throw new Error(error)
        }
    }

    async getSchedule() {
        try {
            const response = await http.get(`/schedule`);
            console.log("Get schedule response: ", response.data)
            return response.data;
        } catch (error: any) {
            console.log("Error get schedule respository: ", error)
            console.log("Error get schedule respository message: ", error.message)
            throw new Error(error)
        }
    }

    async generateWithAI(semester_number: string) {
        try {
            const response = await http.get(`/schedule/ai?${semester_number}`);
            return response.data;
        } catch (error: any) {
            console.log("Error generate with AI schedule respository: ", error)
            console.log("Error generate with AI schedule respository message: ", error.message)
            throw new Error(error)
        }
    }

}
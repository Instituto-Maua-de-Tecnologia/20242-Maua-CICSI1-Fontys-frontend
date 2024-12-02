import { createContext, PropsWithChildren } from "react"
import {ScheduleRepositoryHttp} from "@/api/repositories/schedule_repository_http.ts";
import {Schedule} from "@/api/types/schedule_dto.ts";

type ScheduleContextType = {
    generateSchedule: (semester_number: string) => Promise<Schedule[]>;
    publishSchedule: (data: Schedule[]) => Promise<object>;
    getSchedule: () => Promise<Schedule[]>;
    generateWithAI: (semester_number: string) => Promise<Schedule[]>;
}

const defaultScheduleContext = {
    generateSchedule: async (_semester_number: string) => {
        return []
    },
    publishSchedule: async (_data: Schedule[]) => {
        return {
            message: ''
        }
    },
    getSchedule: async () => {
        return []
    },
    generateWithAI: async (_semester_number: string) => {
        return []
    }
}

export const ScheduleContext = createContext<ScheduleContextType>(defaultScheduleContext)

export default function ScheduleContextProvider({ children }: PropsWithChildren) {
    const scheduleRepository = new ScheduleRepositoryHttp()

    async function generateSchedule(semester_number: string) {
        try {
            const response = await scheduleRepository.generateSchedule(semester_number)
            console.log("Generating schedule: " ,response)
            return response
        } catch (error: any) {
            console.log("Error generate schedule context: ", error)
            throw new Error(error)
        }
    }

    async function publishSchedule(data: Schedule[]) {
        try {
            const response = await scheduleRepository.publishSchedule(data)
            return response
        } catch (error: any) {
            console.log("Error publish schedule context: ", error)
            throw new Error(error)
        }
    }

    async function getSchedule() {
        try {
            const response = await scheduleRepository.getSchedule()
            return response
        } catch (error: any) {
            console.log("Error get schedule context: ", error)
            throw new Error(error)
        }
    }

    async function generateWithAI(semester_number: string) {
        try {
            const response = await scheduleRepository.generateWithAI(semester_number)
            return response
        } catch (error: any) {
            console.log("Error generate with AI schedule context: ", error)
            throw new Error(error)
        }
    }

    return (
        <ScheduleContext.Provider value={{ generateSchedule, publishSchedule, getSchedule, generateWithAI }}>
            {children}
        </ScheduleContext.Provider>
    )
}
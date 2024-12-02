import { createContext, PropsWithChildren } from "react"
import {ScheduleRepositoryHttp} from "@/api/repositories/schedule_repository_http.ts";
import {Schedule} from "@/api/types/schedule_dto.ts";

type ScheduleContextType = {
    generateSchedule: () => Promise<Schedule[]>;
    publishSchedule: (data: Schedule[]) => Promise<object>;
    getSchedule: () => Promise<Schedule[]>;
    generateWithAI: () => Promise<Schedule[]>;
}

const defaultScheduleContext = {
    generateSchedule: async () => {
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
    generateWithAI: async () => {
        return []
    }
}

export const ScheduleContext = createContext<ScheduleContextType>(defaultScheduleContext)

export default function ScheduleContextProvider({ children }: PropsWithChildren) {
    const scheduleRepository = new ScheduleRepositoryHttp()

    async function generateSchedule() {
        try {
            const response = await scheduleRepository.generateSchedule()
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

    async function generateWithAI() {
        try {
            const response = await scheduleRepository.generateWithAI()
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
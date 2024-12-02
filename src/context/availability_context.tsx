import {
    CreateAvailabilityRequestDTO,
    CreateAvailabilityResponseDTO
} from "@/api/types/availability_dto.ts"
import { createContext, PropsWithChildren } from "react"
import {AvailabilityRepositoryHttp} from "@/api/repositories/availability_repository_http.ts";

type AvailabilityContextType = {
    createAvailability: (data: CreateAvailabilityRequestDTO) => Promise<CreateAvailabilityResponseDTO>;
    updateAvailability: (data: CreateAvailabilityRequestDTO) => Promise<CreateAvailabilityResponseDTO>;
    getAvailabilityByUser: (userId: string) => Promise<CreateAvailabilityRequestDTO>;
}

const defaultAvailabilityContext = {
    createAvailability: async (_data: CreateAvailabilityRequestDTO) => {
        return {
            message: ''
        }
    },
    updateAvailability: async (_data: CreateAvailabilityRequestDTO) => {
        return {
            message: ''
        }
    },
    getAvailabilityByUser: async (_userId: string) => {
        return {
            availabilities: [{
                slot_id: '',
                value: 'Negociated',
            }],
            user_id: ''
        }
    }

}

export const AvailabilityContext = createContext<AvailabilityContextType>(defaultAvailabilityContext)

export default function AvailabilityContextProvider({ children }: PropsWithChildren) {
    const availabilityRepository = new AvailabilityRepositoryHttp()

    async function createAvailability(data: CreateAvailabilityRequestDTO) {
        try {
            const response = await availabilityRepository.createAvailability(data)
            return response
        } catch (error: any) {
            console.log("Error create availability context: ", error)
            throw new Error(error)
        }
    }

    async function updateAvailability(data: CreateAvailabilityRequestDTO) {
        try {
            const response = await availabilityRepository.updateAvailability(data)
            return response
        } catch (error: any) {
            console.log("Error update availability context: ", error)
            throw new Error(error)
        }
    }

    async function getAvailabilityByUser(userId: string) {
        try {
            const response = await availabilityRepository.getAvailabilityByUser(userId)
            return response
        } catch (error: any) {
            console.log("Error get availability context: ", error)
            throw new Error(error)
        }
    }

    return (
        <AvailabilityContext.Provider value={{ createAvailability, updateAvailability, getAvailabilityByUser}}>
            {children}
        </AvailabilityContext.Provider>
    )
}
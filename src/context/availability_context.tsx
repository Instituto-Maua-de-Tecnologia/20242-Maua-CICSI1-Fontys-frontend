import {
    CreateAvailabilityRequestDTO,
    CreateAvailabilityResponseDTO
} from "@/api/types/availability_dto.ts"
import { createContext, PropsWithChildren } from "react"
import {AvailabilityRepositoryHttp} from "@/api/repositories/availability_repository_http.ts";

type AvailabilityContextType = {
    createAvailability: (data: CreateAvailabilityRequestDTO) => Promise<CreateAvailabilityResponseDTO>;
}

const defaultAvailabilityContext = {
    createAvailability: async (_data: CreateAvailabilityRequestDTO) => {
        return {
            message: ''
        }
    },
}

export const AvailabilityContext = createContext<AvailabilityContextType>(defaultAvailabilityContext)

export default function AvailabilityContextProvider({ children }: PropsWithChildren) {
    const availabilityRepository = new AvailabilityRepositoryHttp()

    async function createAvailability(data: CreateAvailabilityRequestDTO) {
        try {
            const response = await availabilityRepository.createAvailability(data)
            return response
        } catch (error: any) {
            throw new Error(error)
        }
    }

    return (
        <AvailabilityContext.Provider value={{ createAvailability }}>
            {children}
        </AvailabilityContext.Provider>
    )
}
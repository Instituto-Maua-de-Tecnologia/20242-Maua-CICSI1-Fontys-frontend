import { UserRepositoryHttp } from "@/api/repositories/user_repository_http"
import {createUserResponseDTO, uploadExcelResponseDTO, User} from "@/api/types/user_dto"
import { createContext, PropsWithChildren } from "react"

type UserContextType = {
    getProfessors: () => Promise<User[]>;
    uploadExcel: (data: File) => Promise<uploadExcelResponseDTO>;
    createUser: (name: string) => Promise<createUserResponseDTO>
}

const defaultUserContext = {
    getProfessors: async () => {
        return [{
            user_id: '',
            microsoft_id: '',
            name: '',
            type: '',
            status: ''
        }]
    },
    uploadExcel: async (_data: File) => {
        return {
            data: {
                professores: []
            }
        }
    },
    createUser: async (_name: string) => {
        return {
            message: '',
            user_id: ''
        }
    }
}

export const UserContext = createContext<UserContextType>(defaultUserContext)

export default function UserContextProvider({ children }: PropsWithChildren) {
    const userRepository = new UserRepositoryHttp()

    async function getProfessors() {
        try {
            const response = await userRepository.getProfessors()
            return response
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async function uploadExcel(data: File){
        try {
            const response = await userRepository.uploadExcel(data)
            return response as uploadExcelResponseDTO
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async function createUser(name: string){
        try {
            const response = await userRepository.createUser(name)
            return response as createUserResponseDTO
        } catch (error: any) {
            throw new Error(error)
        }
    }

    return (
        <UserContext.Provider value={{ getProfessors, uploadExcel, createUser }}>
            {children}
        </UserContext.Provider>
    )
}
import { UserRepositoryHttp } from "@/api/repositories/user_repository_http"
import { User } from "@/api/types/user_dto"
import { createContext, PropsWithChildren } from "react"

type UserContextType = {
    getProfessors: () => Promise<User[]>;
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

    return (
        <UserContext.Provider value={{ getProfessors }}>
            {children}
        </UserContext.Provider>
    )
}
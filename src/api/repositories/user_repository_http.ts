import { http } from "../http";
// import {  } from "../types/user_dto";

export class UserRepositoryHttp {

    async getProfessors() {
        try {
            const response = await http.get('/users');
            console.log("Get professors response: ", response.data)
            return response.data;
        } catch (error: any) {
            throw new Error(error)
        }
    }

}
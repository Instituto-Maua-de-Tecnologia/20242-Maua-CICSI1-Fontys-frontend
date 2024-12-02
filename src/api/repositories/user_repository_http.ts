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

    async uploadExcel(data: File){
        const formData = new FormData();
        formData.append('file', data);
        try {
            const response = await http.post('/upload_excel', formData);
            console.log("uploadExcel response: ", response.data)
            return response.data;
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async createUser(name: string){
        try {
            const response = await http.post('/users', { "name": name});
            return response.data;
        } catch (error: any) {
            console.log("Create user respository error: ", error)
            throw new Error(error)
        }
    }

}
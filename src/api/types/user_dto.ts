export type User = {
    user_id: string;
    microsoft_id: string;
    name: string;
    type: string;
    status: string;
}

export type uploadExcelResponseDTO = {
    "data": {
        "professores": string[]
    }
    // "professores": string[]
}

export type createUserResponseDTO = {
    message: string,
    user_id: string
}
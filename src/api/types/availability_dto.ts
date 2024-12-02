export interface AvailabilitySlot {
    "slot_id": string,
    "value": "Possible" | "Impossible" | "Negociated" | "Done",
}

export interface CreateAvailabilityRequestDTO {
    "availabilities": AvailabilitySlot[]
    "user_id": string,
}

export interface CreateAvailabilityResponseDTO {
    "message": string,
}
export type Schedule = {
    user_id: string,
    name: string,
    subject_code: string,
    slot_id: string,
    day_of_week: string,
    time: string,
    availability_value: string,
    subject_name: string,
    course_id: string,
    semester_number: bigint
}

export type SchedulePost ={
    user_id: string,
    course_id: string
    slot_id: string,
    subject_code: string,
    semester_number: bigint
}

export type ScheduleDTO = {
    schedule: SchedulePost[]
}

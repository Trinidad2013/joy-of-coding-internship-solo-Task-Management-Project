import {z} from "zod"

const TaskSchema = z.object({
    title: z.string().min(1, "Title is required.").max(255),
    description: z.string().min(1, "Description is required."),
    dueDay: z.string().refine(
        (val) => !isNaN(Date.parse(val)), 
        { message: "Invalid date format. Please provide a valid date." }
      ), // Ensuring it's a valid date
})

export default TaskSchema;
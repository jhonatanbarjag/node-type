import {z} from 'zod';

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title is required', // mensaje de error si no es un strings
    }),
    description: z.string({
        required_error: 'Description must be a string', // mensaje de error si no es un string
    }),
    date: z.string().datetime().optional()// fecha en formato ISO 8601 es optional
    
})
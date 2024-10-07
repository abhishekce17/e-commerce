import z from "zod"

const registerSchema = z.object({
    "name": z.string().min(3, "Username should be at least 3 characters long"),
    "username": z.string().min(3, "Username should be at least 3 characters long"),
    "email": z.string().email("Invalid Email"),
    "password": z.string().min(6, "Password should be at least 6 characters long")
});

const loginSchema = z.object({
    "email": z.string().email("Invalid Email"),
    "password": z.string()
});

export { registerSchema, loginSchema };
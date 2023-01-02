import joi from "joi";

export const authSchema = joi.object({
    username: joi.string().max(30).required(),
    password: joi.string().min(4).required(),
});
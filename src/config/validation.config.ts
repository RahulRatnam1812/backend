import { checkSchema, validationResult } from "express-validator";
export const validate = (schema: any) => {
    const validations = checkSchema(schema);

    return async (req: any, res: any, next: any) => {
        await Promise.all(validations.map(v => v.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.validationError(errors.array());
        }

        next();
    };
};
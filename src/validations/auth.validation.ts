import User from "../models/user";

export const validateCreateUser = {
    username: {
        notEmpty: {
            errorMessage: "user name is required"
        },
        trim: true
    },
    password: {
        notEmpty: {
            errorMessage: "password is required"
        },
        trim: true
    },
    firstName: {
        notEmpty: {
            errorMessage: "first name is required"
        },
        trim: true
    },
    lastName: {
        notEmpty: {
            errorMessage: "last name is required"
        },
        trim: true
    },
    email: {
        notEmpty: {
            errorMessage: "email is required",
            bail: true
        },
        isEmail: {
            errorMessage: "email is not valid",
            bail: true
        },
        trim: true,
        custom: {
            options: async (value: string) => {
                const user = await User.findOne({ where: { email: value.toLowerCase().trim() } })
                if (user) {
                    throw new Error("email already exists");
                }
                return true;
            }
        }

    }
}  
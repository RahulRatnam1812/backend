"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customResponseHandler = void 0;
const customResponseHandler = (req, res, next) => {
    res.successResponse = (message, data) => {
        return res.status(200).json({
            message: message,
            status: 'success',
            success: true,
            data: data
        });
    };
    res.errorResponse = (status, message, error) => {
        console.log("error", error);
        return res.status(status).json({
            message: message,
            status: 'failed',
            success: false
        });
    };
};
exports.customResponseHandler = customResponseHandler;

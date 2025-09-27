"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.customResponseHandler = void 0;
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
    next();
};
exports.customResponseHandler = customResponseHandler;
const notFound = (req, res, next) => {
    res.status(404).json({
        status: "failed",
        success: false,
        message: "Route not found",
    });
    next();
};
exports.notFound = notFound;

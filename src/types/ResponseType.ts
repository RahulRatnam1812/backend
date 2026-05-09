import { Response } from 'express'
export interface customResponse extends Response {
    successResponse?: (message: string, data: any, status?: number, query?: string) => void;
    errorResponse?: (message?: string, error?: any, status?: number) => void;
    validationError?: (errors: any[], message?: string, status?: number) => void;
}

export interface AuthResponse {
    userId: number;
    firstName: string;
    lastName: string;
    uniqueId: string;
}
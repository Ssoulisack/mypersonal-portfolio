import { NextResponse } from "next/server";
import {
  ErrMsgInternalServerError,
  ErrMsgUnauthorized,
  ErrMsgBadRequest,
  ErrMsgInvalidAccessToken,
  ErrMsgParamIdIsRequired,
  ErrMsgForbidden,
} from "./errorMessage";

/**
 * AppError class - Similar to Go's AppError struct
 */
export class AppError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.name = "AppError";
  }
}

/**
 * Create a new error with custom status code and message
 */
export const NewError = (code: number, errMsg: string): AppError => {
  return new AppError(code, errMsg);
};

/**
 * Error Bad Request (400)
 */
export const ErrorBadRequest = (errorMessage: string): AppError => {
  return new AppError(400, errorMessage);
};

/**
 * Error Unprocessable Entity (422)
 */
export const ErrorUnprocessableEntity = (errorMessage: string): AppError => {
  return new AppError(422, errorMessage);
};

/**
 * Error Expectation Failed (417)
 */
export const ErrorExpectationFailed = (errorMessage: string): AppError => {
  return new AppError(417, errorMessage);
};

/**
 * Error Not Found (404)
 */
export const ErrorNotFound = (errorMessage: string): AppError => {
  return new AppError(404, errorMessage);
};

/**
 * Create error response from error object
 * Handles both AppError and generic Error types
 */
export const NewErrorResponses = (err: unknown): NextResponse => {
  let code: number;
  let message: string;

  if (err instanceof AppError) {
    code = err.status;
    message = err.message;
  } else if (err instanceof Error) {
    code = 422; // StatusUnprocessableEntity
    message = err.message;
  } else {
    code = 500;
    message = "Unknown error occurred";
  }

  return NextResponse.json(
    {
      status: false,
      error: message,
    },
    { status: code }
  );
};

/**
 * Create app error with custom status code from error object
 */
export const NewAppErrorStatusMessage = (statusCode: number, err: Error): AppError => {
  return new AppError(statusCode, err.message);
};

/**
 * Create error response with custom message (422)
 */
export const NewErrorMessageResponse = (message: string | object): NextResponse => {
  return NextResponse.json(
    {
      status: false,
      error: message,
    },
    { status: 422 }
  );
};

/**
 * Internal Server Error response (500)
 */
export const NewErrorErrMsgInternalServerError = (): NextResponse => {
  return NextResponse.json(
    {
      status: false,
      error: ErrMsgInternalServerError,
    },
    { status: 500 }
  );
};

/**
 * Unauthorized response (401)
 */
export const NewErrorErrMsgUnauthorized = (): NextResponse => {
  return NextResponse.json(
    {
      status: false,
      error: ErrMsgUnauthorized,
    },
    { status: 401 }
  );
};

/**
 * Invalid access token response (401)
 */
export const NewErrorErrMsgUnauthorizedErrMsgInvalidToken = (): NextResponse => {
  return NextResponse.json(
    {
      status: false,
      error: ErrMsgInvalidAccessToken,
    },
    { status: 401 }
  );
};

/**
 * Bad Request response (400)
 */
export const NewErrorBadRequest = (): NextResponse => {
  return NextResponse.json(
    {
      status: false,
      error: ErrMsgBadRequest,
    },
    { status: 400 }
  );
};

/**
 * ID parameter is required error (400)
 */
export const NewErrorIDISRequired = (): NextResponse => {
  return NextResponse.json(
    {
      status: false,
      error: ErrMsgParamIdIsRequired,
    },
    { status: 400 }
  );
};

/**
 * Role not allowed to access resource (403)
 */
export const NewErrorForbidden = (): NextResponse => {
  return NextResponse.json(
    {
      status: false,
      error: ErrMsgForbidden,
    },
    { status: 403 }
  );
};

/**
 * Success response with data (200)
 */
export const NewSuccessResponse = (data: any): NextResponse => {
  return NextResponse.json(
    {
      status: true,
      data: data,
    },
    { status: 200 }
  );
};

/**
 * Success response with message as data (200)
 */
export const NewSuccessMessageResponse = (message: string | object): NextResponse => {
  return NextResponse.json(
    {
      status: true,
      data: message,
    },
    { status: 200 }
  );
};

/**
 * Unauthorized error response (401)
 */
export const NewErrorUnauthorized = (): NextResponse => {
  return NextResponse.json(
    {
      error: "Unauthorized",
      status: false,
    },
    { status: 401 }
  );
};

// Legacy exports for backward compatibility (can be removed if not needed)
export const NewErrorResponse = (error: any, status: number): NextResponse => {
  return NextResponse.json(
    {
      success: false,
      error: error,
    },
    { status }
  );
};

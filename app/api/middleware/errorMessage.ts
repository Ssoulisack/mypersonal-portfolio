export const ErrorMessage = {
  DATABASE_ERROR: "Failed to fetch data from the database",
  VALIDATION_ERROR: "Validation failed",
  NOT_FOUND: "Not found",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  BAD_REQUEST: "Bad request",
  INTERNAL_SERVER_ERROR: "Internal server error",
  SERVICE_UNAVAILABLE: "Service unavailable",
  GATEWAY_TIMEOUT: "Gateway timeout",
  REQUEST_TIMEOUT: "Request timeout",
  TOO_MANY_REQUESTS: "Too many requests",
  UNKNOWN_ERROR: "Unknown error",
};

// Additional error messages for consistency
export const ErrMsgInternalServerError = ErrorMessage.INTERNAL_SERVER_ERROR;
export const ErrMsgUnauthorized = ErrorMessage.UNAUTHORIZED;
export const ErrMsgBadRequest = ErrorMessage.BAD_REQUEST;
export const ErrMsgInvalidAccessToken = "Invalid access token";
export const ErrMsgParamIdIsRequired = "Parameter ID is required";
export const ErrMsgForbidden = ErrorMessage.FORBIDDEN;
// exceptions/AppError.ts

export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class AppError extends Error {
  statusCode: HttpCode;
  errors?: {
    code: string;
    message: string;
  }[];
  stack?: any;
  mysqlCode?: any;
  mysqlErrorCode?: any;

  constructor(
    statusCode: number,
    message: string,
    errors?: {
      code: string;
      message: string;
      msg?: any;
    }[],
    mysqlCode?: any,
    mysqlErrorCode?: any
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.mysqlCode = mysqlCode;
    this.mysqlErrorCode = mysqlErrorCode;
    if (errors) {
      if (errors[0].msg) {
        const newErrors: {
          code: string;
          message: string;
        }[] = [];

        for (const error of errors) {
          newErrors.push(error.msg);
        }

        this.errors = newErrors;
      }
    }

    Error.captureStackTrace(this);
  }
}

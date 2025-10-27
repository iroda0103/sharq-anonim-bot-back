class InvalidPropertyError extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError);
    }
  }
}

class BadRequestError extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}

class ConflictError extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConflictError);
    }
  }
}

class UnauthorizedError extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }
  }
}

class NotFoundError extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}

class ForbiddenError extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }
  }
}

module.exports = {
  InvalidPropertyError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
  ForbiddenError,
  BadRequestError
};

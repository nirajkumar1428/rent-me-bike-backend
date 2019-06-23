"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpStatus = _interopRequireDefault(require("http-status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.

    Error.captureStackTrace(this, this.constructor.name);
  }

}
/**
 * Class representing an API error.
 * @extends ExtendableError
 */


class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message, status = _httpStatus.default.INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic);
  }

}

var _default = APIError;
exports.default = _default;
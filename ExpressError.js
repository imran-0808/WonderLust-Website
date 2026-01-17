//can be handled the error to create a separate class
class expressError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}

module.exports = expressError;
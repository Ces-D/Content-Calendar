class DatabaseError {
    constructor(message) {
        this.value = "DatabaseError";
        this.message = message;
        this.statusCode = 500;
    }
}

class RequestError {
    constructor(message) {
        this.value = "RequestError";
        this.message = message;
        this.statusCode = 400;
    }
}

class AuthorizationError {
    constructor(message) {
        this.value = "AuthorizationError";
        this.message = message;
        this.statusCode = 401;
    }
}

module.exports = { DatabaseError, RequestError, AuthorizationError };

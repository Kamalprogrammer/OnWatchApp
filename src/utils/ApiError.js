class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong at API ",
        errors = [],
        //errors ko bundle mei dedenge
        statck = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack

        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


// API errors ko generalise karna 

export { ApiError }
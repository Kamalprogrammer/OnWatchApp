class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong at API ",
        errors = [],
        statck = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (statck) {
            this.stack = statck

        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


// API errors ko generalise karna 

export { ApiError }
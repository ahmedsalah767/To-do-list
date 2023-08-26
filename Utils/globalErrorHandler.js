class appError extends Error {
    constructor(message, statusCode){
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error'
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
        console.log(this.status,this.statusCode,this.message)
    }

}
module.exports =appError
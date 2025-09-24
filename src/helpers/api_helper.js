const successResponse = (res, data, message = 'Success',code) => {
    return res.status(200).json({
        code,
        status: 'success',
        message,
        data
    })
}

const errorResponse = (res, error, message = 'Error', statusCode = 500) => {
    return res.status(statusCode).json({
        status: 'error',
        message,
        error
    })
}

module.exports = {
    successResponse,
    errorResponse
};
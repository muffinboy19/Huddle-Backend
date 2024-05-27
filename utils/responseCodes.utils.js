function response_400(res, message){
    return res.status(400).json({
        status:'error',
        error: message,
        message: "Bad Request",
    })
}

function response_200(res, message, data) {
    return res.status(200).json({
        status: 'Inserted',
        message,
        data
    });
}

module.exports = {
    response_400,
    response_200,
}
const JsonResponseService = (msg, data = [], statusCode = 200) =>
{
    return {message: msg, data: data, status: statusCode}
}

module.exports = JsonResponseService
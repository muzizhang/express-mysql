exports.createResult = function(success, data, code) {
    var result = {}
    result.success = success
    result.data = data
    result.code = code
    return result
};

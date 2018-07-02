var utility = {};

utility.success = (response, data) => {
    return response.status(200).send(data);
}
utility.error = (response, error) => {
    return response.status(400).send({ "message": "Error", "data": error });
}
utility.invalidData = (response) => {
    return response.status(400).send({ "message": "Invalid data" });
}
utility.badRequest = (response) => {
    return response.status(400).send({ "message": "Bad Request" });
}
utility.noDataFound = (response) => {
    return response.status(200).send({ "message": "No Data Found", "data": [] });
}

module.exports = utility;
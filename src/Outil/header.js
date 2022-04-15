exports.loged = (method, body, notJSON) => {
    return {
        method: method,
        headers: notJSON ?
            {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token") +
                    " " +
                    localStorage.getItem("userID"),
            } : {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token") +
                    " " +
                    localStorage.getItem("userID"),
            },
        body: body ?
            (notJSON?
            (body) : (JSON.stringify(body))
            ): (undefined)
    }
}
exports.disconnected = (value) => {
    return {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    }
}
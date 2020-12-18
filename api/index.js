const userApi = require("./users");

function api(app) {
    app.use("/api/user", userApi);
}

module.exports = api;

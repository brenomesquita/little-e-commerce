
const { SERVER_PORT, MYSQL_PORT } = process.env
const Config = {};

Config.configure = function(app, routers) {
    app.set('port', SERVER_PORT);
    app.use('/', routers);
};

export default Config;
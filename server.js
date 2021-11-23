import os from 'os';
import cluster from 'cluster';
import http from 'http';
import app from './app/main/app.js';
const port = app.get('port');
const host = app.get('host');

const processId = process.pid;

if (cluster.isPrimary) {
    const number_of_cpus = os.cpus().length;
   
    console.log(`Master ${process.pid} is running`);
    console.log(`Forking Server for ${number_of_cpus} CPUs\n`);
    // Create a Worker Process for each Available CPU
    for (let index = 0; index < number_of_cpus; index++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.process.pid} died`);
            cluster.fork();
        }
    });
} else {
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`App runing at. Port: ${port}, Host: ${host}, processId: ${processId}`)
    });
}













//const config = (app, routers) => {
//    app.set('port', port);
    //app.use(cors({
    //    exposedHeaders: ['Content-Disposition']
    //}));
    //app.use(bodyParser.json({
    //    limit: '500mb'
    //}));
    //app.use(bodyParser.urlencoded({
    //    limit: '500mb',
    //    extended: true
    //}));
    //app.use('/', routers.v1);
//
    //routers.v1.use(middle.verifyAccessToken);
    //routers.v1.use(middle.verifyKYCBlocked);
    //app.use(middleware.errorHandler);
    //app.use(middle.throw404);
//
    //app.use(middle.logError);
    //app.use(middle.handleError);
//};
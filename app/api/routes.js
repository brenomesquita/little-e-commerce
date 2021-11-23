import express from 'express';
const Router = express.Router();

/* health check */
Router.route('/health').get((_req, res) => {
    res.status(200).send()
});

export default Router;
module.exports = (err, req, res, next) => {
    const log = require('npmlog')
    log.error('FATAL', '%j', err);
    res.locals.message = err.message;
    res.status(err.status || 500);
    res.send(err);
}

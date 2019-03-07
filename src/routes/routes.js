var express = require('express');
var apiModule = require(__serverroot + '/src/api');

var apiRouter = express.Router();

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
const errorFn = function (response, message) {
    response.status(500).json({
                  message: message
              });
}
apiRouter.get('/resources',async function(req,res,next) {
    var response = await apiModule.getSystemResource(req.query).catch(err => {
              errorFn(res, err);
          });
    if (response != null) {
        res.json(response);
    }
});


module.exports.basePath = "/";
module.exports.routerInst = apiRouter;
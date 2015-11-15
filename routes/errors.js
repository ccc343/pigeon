exports.render500 = function(req, res, err) {
  console.error('['+ (new Date()).toUTCString() +'] error:');
  console.error(err.stack);
  res.status(500);
  res.set('Content-Type', 'text/plain');
  if (process.env.NODE_ENV === 'production') {
    return res.send('Something isn\'t right. Please come back later.');
  } else {
    return res.send(err.stack);
  }
}

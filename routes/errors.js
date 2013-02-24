exports.fourOhFour = function(req,res){
	res.send('No access. Mad 404z yo.', 404);
	console.log(req.connection.remoteAddress);
};
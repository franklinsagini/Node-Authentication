var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeauth');
var bcrypt = require('bcrypt');
var db = mongoose.connection;

//User schema
var UserSchema = mongoose.Schema({
	username:{
		type: String,
		index: true
	},
	password:{
		type:String, required: true, bcrypt: true
		},
	email:{
		type:String
	},
	profileimage:{
		type:String
	}

});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.comparePassword = function(candidatePassword,hash,callback){
	bcrypt.compare(candidatePassword,hash,function(err,isMatch){
		if (err) return callback(err,null);
		callback(null,isMatch); 
	});
}

module.exports.getUserByUsername = function(username,callback){
	var query = {username:username};
	User.findOne(query,callback);
}

module.exports.getUserById = function(id,callback){
	User.findById(id,callback);
}
module.exports.createUser = function(newUser,callback){
	bcrypt.hash(newUser.password, 10,function(err,hash){
		if (err) throw err;
		// Set hashed password
		newUser.password = hash;
		// Create User
		newUser.save(callback);
	});
	
}
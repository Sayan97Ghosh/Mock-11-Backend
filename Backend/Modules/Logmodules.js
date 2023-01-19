const mongoose = require('mongoose');
const authschema = ({
    email:String,
    password:String,
   
})

const AuthsModel = mongoose.model("user",authschema);

module.exports = {AuthsModel};
const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models/Cart');
require('../models');

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        
        await User.create({
            firstName:"testuser",
            lastName:"testuser",
            email:"test@user.com",
            password:"user123",
            phone:"21654231521"
        })

        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();
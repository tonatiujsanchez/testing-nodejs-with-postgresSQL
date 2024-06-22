require('../models')
const sequelize = require('../utils/connection');

const testMigrate = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("DB reseted 🚀");
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

testMigrate();
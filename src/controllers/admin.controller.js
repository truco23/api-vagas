const adminModel = require('../models/admin.model');
let api          = {};

api.list = async (req, res) => {

    try {
        const admins = await adminModel.find({});

        if(admins) {
            console.log('############# Vagas listadas ###############');
            res.json(admins);
            return;
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({fail: error.message });
    }
    
}

module.exports = api;
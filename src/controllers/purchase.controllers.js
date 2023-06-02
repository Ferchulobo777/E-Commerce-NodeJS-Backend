const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');

const getAll = catchError(async(req, res) => {
    return res.json()
});

const create = catchError(async(req,res) => {

})

module.exports = {
    getAll,
    create
}
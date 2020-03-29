const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/afterauthenticate', function(req,res){
    res.json({
        "User":"user1"
    })
});

module.exports = router;
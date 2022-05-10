"use strict";Object.defineProperty(exports, "__esModule", {value: true});const validator = (schema) => async (req, res, next ) =>{
  
    try {        
        await schema.validate(req.body);        
        return next();
    } catch (error) {
        return res.status(400).json({error});
    }

}

exports. default = validator;
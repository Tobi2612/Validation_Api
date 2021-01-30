const Joi = require("joi");

const validation = data =>{
    const schema = Joi.object().keys({
        rule: Joi.object().keys ({
        field: Joi.string()
                    .required(),
        condition: Joi.string()
                    .required(),
        condition_value: Joi.number()
                    .required()}),
    
        data: Joi.object().keys ({            
        name: Joi.string()
                    .required(),
        crew: Joi.string()
                    .required(),
        age: Joi.number()
                    .required(),
        position: Joi.string()
                    .required(),
        missions: Joi.number()
                    .required() })
    
    });  return schema.validate(data);
};
module.exports.validation = validation;
const  express = require("express");
const bodyParser = require("body-parser");
const {validation} = require("./middleware/validate.js")
const port = process.env.PORT || 3000

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.get("/",(req,res)=>{
    const info =  {
        "message": "My Rule-Validation API",
        "status": "success",
        "data": {
          "name": "Oluwatobi Oyewole-Said",
          "github": "@Tobi2612",
          "email": "tobisaid007@gmail.com",
          "mobile": "08097362363",
          
        }
      }
      res.send(info);
})

app.post("/validate-rule",(req,res)=>{

    const {error} = validation(req.body);

    if (error){
        console.log(req.body);
        return res.status(400).json({message:error.details[0].message +'.'})
    }
  
     const body = req.body;
       const conditionValidation = ['eq','neq','gt','gte','contains,']
         if(!conditionValidation.includes(body.rule.condition)){
             return res.status(400).json({condito:'not a valid function.'})
         }    

         if (body.rule.condition == 'eq' ){
            const temp = body.rule.field
            if (body.rule.condition_value == body.data[temp]){
            return res.status(200).json({"message": `field ${temp} successfully validated.`,
                                        "status": "success",
                                        "data": {
                                            "validation": {
                                              "error": false,
                                              "field": `${temp}`,
                                              "field_value": body.rule.field,
                                              "condition": body.rule.condition,
                                              "condition_value": body.rule.condition_value,
                                            }
                                          }
                                })
            }else{
                return res.status(400).json({"message": `field ${temp} failed validation..`,
                "status": "error",
                "data": {
                    "validation": {
                      "error": true,
                      "field": `${temp}`,
                      "field_value": body.data[temp],
                      "condition": body.rule.condition,
                      "condition_value": body.rule.condition_value,
                    }
                  }
        })
            }
        }

        if (body.rule.condition == 'neq' ){
            const temp = body.rule.field
            if (body.rule.condition_value != body.data[temp]){
            return res.status(200).json({"message": `field ${temp} successfully validated.`,
                                        "status": "success",
                                        "data": {
                                            "validation": {
                                              "error": false,
                                              "field": `${temp}`,
                                              "field_value": body.rule.field,
                                              "condition": body.rule.condition,
                                              "condition_value": body.rule.condition_value,
                                            }
                                          }
                                })
            }else{
                return res.status(400).json({"message": `field ${temp} failed validation..`,
                "status": "error",
                "data": {
                    "validation": {
                      "error": true,
                      "field": `${temp}`,
                      "field_value": body.data[temp],
                      "condition": body.rule.condition,
                      "condition_value": body.rule.condition_value,
                    }
                  }
        })
            }
        }

        if (body.rule.condition == 'gt' ){
            const temp = body.rule.field
            if (body.rule.condition_value > body.data[temp]){
            return res.status(200).json({"message": `field ${temp} successfully validated.`,
                                        "status": "success",
                                        "data": {
                                            "validation": {
                                              "error": false,
                                              "field": `${temp}`,
                                              "field_value": body.rule.field,
                                              "condition": body.rule.condition,
                                              "condition_value": body.rule.condition_value,
                                            }
                                          }
                                })
            }else{
                return res.status(400).json({"message": `field ${temp} failed validation..`,
                "status": "error",
                "data": {
                    "validation": {
                      "error": true,
                      "field": `${temp}`,
                      "field_value": body.data[temp],
                      "condition": body.rule.condition,
                      "condition_value": body.rule.condition_value,
                    }
                  }
        })
            }
        }

        if (body.rule.condition == 'gte' ){
        const temp = body.rule.field
        if (body.rule.condition_value == body.data[temp]){
        return res.status(200).json({"message": `field ${temp} successfully validated.`,
                                    "status": "success",
                                    "data": {
                                        "validation": {
                                          "error": false,
                                          "field": `${temp}`,
                                          "field_value": body.rule.field,
                                          "condition": body.rule.condition,
                                          "condition_value": body.rule.condition_value,
                                        }
                                      }
                            })
        }else{
            return res.status(400).json({"message": `field ${temp} failed validation..`,
            "status": "error",
            "data": {
                "validation": {
                  "error": true,
                  "field": `${temp}`,
                  "field_value": body.data[temp],
                  "condition": body.rule.condition,
                  "condition_value": body.rule.condition_value,
                }
              }
    })
        }
    }



    
})


app.listen(port,() => {
    console.log(`Server running at port `+port);
  });
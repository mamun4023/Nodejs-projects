const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
     user : {
         type : mongoose.Schema.ObjectId,
         ref : 'users'
     },
     handle : {
         type : String,
     },

     company : {
         type : String
     },
     website : {
         type : String
     },
     location : {
         type: String,
         
     },
     status : {
         type : String,
        
     },
     skills : {
         type : [String],
         
     },
     bio : {
         type : String
     },
     githubusername : {
         type : String
     },

     experience : [
         {
             title : {
                 type : String,
                 
             },
             company : {
                 type : String,
                 
             },
             location : {
                 type : String 
             },
             from : {
                 type : Date,
                 required : true 
             },
             to : {
                 type : Date 
             },
             current : {
                 type : Boolean,
                 default : false
             },
             description : {
                 type : String 
             }
         }
     ],
 
     education : [
        {
            school : {
                type : String,
                
            },
            degree : {
                type : String,
                
            },
            fieldOfStudy : {
                type : String, 
            },
            from : {
                type : Date,
            },
            to : {
                type : Date 
            },
            current : {
                type : Boolean,
                default : false
            },
            description : {
                type : String 
            }
        }
    ], 
    social : {
        youtube : {
            type : String
        },
        twitter : {
            type : String
        },
        facebook : {
            type : String
        },
        linkedin : {
            type : String
        },
        instagram : {
            type : String
        }
    },
    date : {
        type : Date,
        default : Date.now
    }     

});


const profileModel = mongoose.model('profileModel', profileSchema);

module.exports = profileModel;





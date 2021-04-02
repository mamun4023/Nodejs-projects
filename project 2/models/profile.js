const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
     user : {
         type : mongoose.Schema.ObjectId,
         ref : 'users'
     },
     handle : {
         type : String,
         required : true,
         max : 30
     },

     company : {
         type : String
     },
     website : {
         type : String
     },
     location : {
         type: String,
         required : true
     },
     status : {
         type : String,
         required : true
     },
     skills : {
         type : [String],
         required : true
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
                 required: true
             },
             company : {
                 type : String,
                 required : true 
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
            schoool : {
                type : String,
                required: true
            },
            degree : {
                type : String,
                required : true 
            },
            fieldOfStudy : {
                type : String, 
                required : true
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





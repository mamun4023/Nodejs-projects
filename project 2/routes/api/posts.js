const express = require('express');
const router = express.Router();
const passport = require('passport');

// load model
const postModel = require('../../models/posts');
const profileModel = require('../../models/profile');



router.post('/', (req, res)=> {
    const {text} = req.body;

    const newPost = new postModel({
        text
    })

      newPost.save()
        .then((post)=>{
            res.send(post)
        })
   
})

// find all the post
router.get('/', (req, res)=> {
    postModel.find()
        .sort({dat : -1})
        .then(posts=> res.json(posts))
        .catch(err=> res.status(404))
});


// find single post
router.get('/:id', (req, res)=> {
    postModel.findOne({_id: req.params.id})
    .then(post=> res.json(post))
    .catch(err=> res.status(404).json({msg : "no post found"}))
})



// delete post

router.delete('/:id', (req, res)=> {
    // find profile 
    profileModel.findOne({_id : req.user.id})
        .then(profile=> {
            // find post from the profile
             postModel.findById(req.params.id)
                .then(post=> {
                    // check for post owner
                    if(post.user.toString() !==  req.user.id){
                        return res.status(401).json({msg : "user not authorized"});
                    }

                    //delete
                    postModel.remove()
                        .then(res.json({msg : "success"}))
                })
                .catch(err => res.status(404).json({msg : "post not found"}))
        
            

        })
})


router.get('/', (req, res)=> {
    res.json({msg : "from posts route "})
})
  
  

  




module.exports = router;
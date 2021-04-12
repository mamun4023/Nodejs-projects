const express = require('express');
const router = express.Router();
const passport = require('passport');

// load model
const postModel = require('../../models/posts');
const profileModel = require('../../models/profile');

// load validation model 
const validatePostInput =  require('../../validator/posts');




//  retrieve all the data
router.get('/', (req, res)=> {
    postModel.find()
        .sort({ date : -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsfound : "No posts found"}));
});


// fetch  specific data 
router.get("/:id", (req, res)=> {
    postModel.findById(req.params.id)
        .then(post=> res.json(post))
        .catch(err=> res.status(404).json({nopostsfound : "no post found with that id"}) )
})


// create post route
router.post('/', (req,res)=>{
    const {errors, isValid} = validatePostInput(req.body);

    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const newPost = new postModel({
        text : req.body.text,
        name : req.body.name,
        avatar : req.body.avatar,
        user : req.user.id
    })

    newPost.save()
        .then((post)=> res.json(post))
});





// delete post route

router.delete("/:id", (req, res)=> {
    profileModel.findOne({user: req.user.id})
        .then(profile=> {
            postModel.findById(req.params.id)
                .then(post=>{
                    //check for post owner
                    if(post.user.toString() !== req.user.id){
                        return res.status(401).json({nopostsfound : "user ot authorized"})
                    }

                    // deleter post
                   post.remove().then(()=> res.json({success: true}))
                })
                .catch(err=> res.status(404).json({postnotfound : "no post found"}))
        })
});




// like post

router.post('/like/:id', (req,res)=> {
    profileModel.findOne({user : req.user.id})
        .then(profile => {
            postModel.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length>0){
                        return res.status(400).json({alreadyliked : "user already lined this post"})
                    }
                    post.likes.unshift({user : req.user.id});
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({postnotfound : "no post found"}))
        })
})




// unlike the post

router.post('/unlike/:id', (req,res)=> {
    profileModel.findOne({user: req.user.id}).then(profile => {
        postModel.findById(req.params.id).then(post => {
            if(post.likes.filter(like=> like.user.toString()=== req.body.id).length === 0){
                return res.status(400).json({notliked : "you have not yet liked this post"})
            }

            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

            // splice out of array
            post.likes.splice(removeIndex, 1);
            post.save().then(post=> res.json(post))
        })
        .catch(err => res.status(404).json({postnotfound : "no post found"}))
    })
})



// comment post

router.post("/comment/:id", (req, res)=> {
    const {errors, isValid} = validatePostInput(req.body);

    if(!isValid) return res.status(400).json(errors);


    postModel.findById(req.params.id).then(post => {
        const newComment = {
            text : req.body.text,
            name : req.body.name,
            avatar : req.body.avatar,
            user : req.user.id
        };
        post.newComments.unshift(newComment);
        // save
        post.save().then(post => res.json(post));
    })
    .catch(err=> res.status(404).json({postnotfound : "no post found"}))
})


router.delete('/comment/:id/:comment_id', (req, res)=> {
    postModel.findById(req.params.id)
        .then(post=> {
            // cheack to se if comment exitst
            if(post.comments.filter(comment => comment._id.toString()===req.params.comment_id).length ===0){
                return res.status(404).json({commentnotexist: "Comment does not exist"});
            }

            const removeIndex = post.comments.map(item=> item_id.toString()).indexOf(req.params.comment_id);

            // splice comment out of array

            post.comments.splice(removeIndex, 1);
            post.save().then(post=> res.json(post));
            
        })
        .catch(err => res.status(404).json({postnotfound : "no post found"}))
})
  

module.exports = router;
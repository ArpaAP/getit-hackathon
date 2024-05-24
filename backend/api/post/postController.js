const express = require('express');
const router = express.Router();
const postService = require('./postService');

const createPost = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        console.log(`create Post - title: ${title}, description: ${description}`);
        await postService.create(title, description);
        res.status(200).json({title, description});
    } catch (err) {
        res.status(404);
        next(err);
    }
}

const getPost = async (req, res, next)  => {
    try {
        const id = parseInt(req.params.id);
        console.log(`getPost - postId: ${id}`);
        const post = await postService.getOne(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404);
        next(err);
    }
}

const getPosts = async (req, res, next)  => {
    try {
        console.log(`getPosts `);
        const posts = await postService.getAll();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404);
        next(err);
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { postId, title, description } = req.body;
        console.log(`updatePost - postId: ${postId}, title: ${title}, description: ${description}`);
        await postService.updatePost(postId, title, description);
        res.status(200).json({postId, title, description});
    } catch (err) {
        res.status(404);
        next(err);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const id = parseInt(req.body.postId);
        console.log(`deletePost - postId: ${id}`);
        await postService.deletePost(id);
        res.status(200).json({id});
    } catch (err) {
        res.status(404);
        next(err);
    }
}


router.get('/getOne/:id', getPost);
router.get('/getAll', getPosts);
router.post('/postCreate', createPost);
router.post('/postUpdate', updatePost);
router.post('/postDelete', deletePost)
module.exports = router;
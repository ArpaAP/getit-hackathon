const { where } = require('sequelize');
const { Post } = require('../../models');

const create = async (title, description) => {
    try {
        const post = await Post.create({
            title: title,
            description: description
        });
    } catch (err) {
        console.error('postService.create error');
        throw err;
    }
};

const getOne = async (postId) => {
    try {
        const post = await Post.findOne({
            where: {
                postId: postId
            }
        });
        console.log(post);
        return post;
    } catch (err) {
        console.error('postService.getOne error');
        throw err;
    }
}

const getAll = async () => {
    try {
        const posts = await Post.findAll();
        console.log(posts);
        return posts;
    } catch (err) {
        console.error('postService.getAll error');
        throw err;
    }
}

const updatePost = async (postId, title, description) => {
    try {
        const post = await Post.findOne({
            where: {
                postId: postId
            }
        });
        post.title = title;
        post.description = description;
        await post.save();
    } catch (err) {
        console.error('postService.updatePost error');
        throw err;
    }
}

const deletePost = async (postId) => {
    try {
        const post = await Post.findOne({
            where: {
                postId: postId
            }
        });
        await post.destroy();
    } catch (err) {
        console.error('postService.deletePost error');
        throw err;
    }
}


module.exports = { create, getOne, getAll, updatePost, deletePost };
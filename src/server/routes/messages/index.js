import postController from './post.js';

export default [
  '/messages',
  {
    POST: postController,
  }
];

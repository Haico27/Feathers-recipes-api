'use strict';

module.exports = function(options) {
  return function(hook) {
    return hook.app.service('recipes').get(hook.id)
    .then((recipe) => {
      if (recipe.authorId !== hook.params.user._id) {
        console.log('Is not author, can only like/unlike');

        const action = hook.data.like ? '$addToSet' : '$pull' ;
        let data = {};
        data[action] = { likedBy: hook.params.user._id };
        hook.data = data;
        console.log(hook);
      }
    })
  }
}

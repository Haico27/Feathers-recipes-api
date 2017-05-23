'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const common = require('feathers-hooks-common');

const populateLikes = common.populate('likes', { service: 'users', field: 'likedBy' })

//before hook: assign authorId to the _id of the currently logged in user.
const assignAuthor = function(options) {
  return function(hook) {
    //The authenticated user
    const user = hook.params.user;
    hook.data.authorId = user._id;
  }
}

const makeLikeable = require('./hooks/make-likeable')

//after hook: look up the user with the matching authorId in the users service
//and add is as 'author'
const populateAuthor = common.populate('author', { service: 'users', field: 'authorId' })

module.exports = {
  before: {
    all: [  ],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      assignAuthor()
    ],
    update: [
      authenticate('jwt'),
      makeLikeable(),
    ],
    patch: [
      authenticate('jwt'),
      makeLikeable(),
      ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      populateAuthor,
      populateLikes
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

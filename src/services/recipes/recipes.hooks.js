'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const common = require('feathers-hooks-common');

//before hook: assign authorId to the _id of the currently logged in user.
const assignAuthor = function(options) {
  return function(hook) {
    //The authenticated user
    const user = hook.params.user;
    hook.data.authorId = user._id;
  }
}

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
    update: [ authenticate('jwt') ],
    patch: [ authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      populateAuthor
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

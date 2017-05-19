// after hook

function cleanup(user, currentUser) {
  // √ in case the user is not the current user
  if (!!currentUser && (user._id.toString() === currentUser._id.toString())) return user

  // √ we only return `_id` and `name`
  const { _id, name } = user
  return { _id, name }
}

function isAuthenticating(hook) {
  return !!hook.data && (hook.data.email === hook.result.email);
}

function isEmailQuery(hook, user) {
  return !!hook.params.query &&
    !!hook.params.query &&
    (hook.params.query.email === user.email)
}

module.exports = function(hook) {
  console.log('Running Cleanup Hook...')


  const currentUser = hook.params.user

  // √ for methods: find and get
  if (hook.method === 'find') {

    hook.result.data = hook.result.data.map((user) => {
       // 2 lines below are needed for auth/local requests
      if (isAuthenticating(hook)) return user
      if (isEmailQuery(hook, user)) return user
      console.log(cleanup(user, currentUser))
      return cleanup(user, currentUser)
    })
  } else {
    if (isAuthenticating(hook)) return hook // needed for auth/local requests
    hook.result = cleanup(hook.result, currentUser)
  }
  console.log(currentUser)
  console.log('End of the Cleanup Hook')

}

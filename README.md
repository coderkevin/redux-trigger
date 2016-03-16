# redux-trigger

Redux State Triggers

## What is it?

redux-trigger is a Redux middleware which allows delayed dispatching of an action
based on a trigger state in the Redux store. Here's how it works:

1. Dispatch a trigger (with action and state matcher function)
2. The matcher function will be run every time the state is updated
3. When the matcher function returns true, the trigger's action is dispatched

## Why do it this way?

There are many ways to handle asynchronous state changes within redux, just
look at the related project list below. However, for many of these, promises are
resolved at action dispatch time, or in the middlewares. This is okay for simple,
discrete cases, but what about those cases where the same state can be reached
in different ways?

Promise flow: A -> B, B -> C, C -> D

But what if B can be reached in another way? Then you have:

Alternative promise flow: X -> B, B -> C, C -> D

Now you have to duplicate the promise chain for each possibility.

One of the primary principles of Redux is that the [state is the single source
of truth.](https://github.com/rackt/redux/blob/master/docs/introduction/ThreePrinciples.md#single-source-of-truth)
Why then, shouldn't we trigger our asynchronous state based on that
single source of truth for the application?

redux-triggers allows you to set a trigger for a desired state, and then
dispatch the action when the app's state it meets your desired criteria.

## Need a better example?

What's the primary example of logging in or signing up for an application? It's populating the user data, right? However, many applications want other side effects to happen upon login as well.

For example, say you want to always fetch some API data from GitHub for each user upon login. You could set a promise chain as follows:

```Enter Credentials -> Login -> Populate User Data -> Fetch GitHub Data -> Display Data```

However, what about those users who just registered for your site? Now you need another promise chain for that:

```Fill out signup -> Submit -> (User Data already populated) -> Fetch GitHub Data -> Display Data```

Now, what if you want to allow logins via Facebook? Yet another promise chain:

```Click "Login with Facebook" -> Facebook API Login -> Populate User Data -> Fetch GitHub Data -> Display Data```

And sometime in the future, someone will want another API login, like Google, LinkedIn, etc. Let's just hope the developer who implements it knows that they need to implement a similar promise chain!

### A better way

If we drive our application logic from our single source of truth (the Redux state tree), now we can focus on the data we have, and not care how we got it.

So, if we have a redux-trigger that monitors the redux state tree, we can break up the promise chains above. In this instance our trigger would act as such:

```
Matcher: When a GitHub User ID exists, and there's no corresponding GitHub data
Action: Fetch GitHub Data for given User
```

So now, when a user logs in or signs up:

```Enter Credentials -> Login -> Populate User Data```

```Fill out signup -> Submit -> (User Data already populated)```

```Click "Login with Facebook" -> Facebook API Login -> Populate User Data```

They can handle their primary purpose of populating user data, and any time that data is populated, the trigger fires and the GitHub data populates as a result.


## Related Projects

[redux-thunk](https://github.com/gaearon/redux-thunk)

[redux-promise](https://github.com/acdlite/redux-promise)

[redux-rx](https://github.com/acdlite/redux-rx)

[redux-effects](https://github.com/redux-effects/redux-effects)

[redux-saga](https://github.com/yelouafi/redux-saga)

[redux-watch](https://github.com/jprichardson/redux-watch)

[redux-batched-subscribe](https://github.com/tappleby/redux-batched-subscribe)

[redux-debounced](https://github.com/ryanseddon/redux-debounced)



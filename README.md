# redux-trigger

Redux State Triggers

## What is it?

redux-trigger is a Redux middleware which allows delayed dispatching of an action
based on a trigger state in the Redux store. Here's how it works:

1. Dispatch a trigger (with action and state comparator function)
2. The comparator function will be run every time the state is updated
3. When the comparator function returns true, the trigger's action is dispatched

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

## Related Projects

[redux-thunk](https://github.com/gaearon/redux-thunk)

[redux-promise](https://github.com/acdlite/redux-promise)

[redux-rx](https://github.com/acdlite/redux-rx)

[redux-effects](https://github.com/redux-effects/redux-effects)

[redux-saga](https://github.com/yelouafi/redux-saga)

[redux-watch](https://github.com/jprichardson/redux-watch)

[redux-batched-subscribe](https://github.com/tappleby/redux-batched-subscribe)

[redux-debounced](https://github.com/ryanseddon/redux-debounced)



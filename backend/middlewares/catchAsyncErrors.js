//Global error handlers that is going to be catch async errors.

export default (controllerFunction) => (req, res, next) =>
  Promise.resolve(controllerFunction(req, res, next).catch(next));
{
}

//The selected code is an export of a default function that creates a middleware for handling asynchronous errors in a Node.js application. This middleware is commonly known as "catchAsyncErrors".

// Here's a breakdown of the code:

// 1. The function `catchAsyncErrors` takes another function `controllerFunction` as an argument. This `controllerFunction` represents the controller function that needs to be wrapped with error handling.

// 2. Inside `catchAsyncErrors`, a new function is returned. This returned function is the actual middleware that will be used in your Express.js application. It takes `req`, `res`, and `next` as parameters, which are standard parameters for Express.js middleware functions.

// 3. Inside the returned middleware function, `Promise.resolve` is used to wrap the execution of `controllerFunction`. This is done because `controllerFunction` might return a Promise, and `Promise.resolve` ensures that the returned value is always a Promise.

// 4. The `.catch(next)` method is then chained to the Promise. This means that if an error occurs during the execution of `controllerFunction`, the error will be caught and passed to the next middleware in the chain. This is done by calling `next(error)`, where `error` is the caught error.

// By using this middleware, you can ensure that any asynchronous errors that occur within your controller functions will be properly handled and sent back to the client in a standardized format.

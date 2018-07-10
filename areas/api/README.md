## API

This area contains all our API endpoints, model layer and most of the business logic.

Each entity in the system for example, **users**, **workflows**, **challenges** etc. has its directory.

`models.js` file here, reaches out to all of the defined models and exposes them from a single place, so that if another *area* needs `user-model` we could simple do something like this from an external area `require('../api/model');` instead of fully qualified path to the actual model definition file.

`routes.js` inside each entity simply maps a route to the respective model's static or instance method. In case, lets say, *challenges* route has to call some method which is on *worfklow* model, we'll create a wrapper method, at least, *challenges* model so that *challenge* route **always** maps to a method of *challenges* model, and nothing else.

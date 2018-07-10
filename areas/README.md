## Areas

An **area** can be thought of as a functional (non-generic) layer in the application, which
may or may not depend on other areas.

Completely independent areas could be moved to their own processes as a micro-service, like *scheduling*, *analytics*, and may be even separate repos.

At this point, areas are allowed to look and behave completely different from sibling areas.

`index.js` file exports all the exported stuff from all the underlying area.

`manager.js` or `areas-manager.js` file here will be responsible for applying
all areas to the express application object, for example where in the pipeline should different areas have effect.

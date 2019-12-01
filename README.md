# 42-matcha

[WIP] Meet and chat with amazing people in your area with this open source web app.

*This application was made for learning purposes at the 42 Paris School.*

## Starting guide
### Requirements
- `docker`

Start the app
``` bash
docker-compose up
```

### Development environment
Requires `NodesJS >=10.16` and `MongoDB` (can be started in `docker`)

``` bash
# /web
yarn # Install dependencies
yarn serve # Hot reload API
yarn lint # Lint with autofix
```

## Implementation

### Client
The client is a web app rendered with VueJS.

We manage the app state with `VueX`, `vue-router` to simulate the routes, `axios` for the external API calls. We use the `bootstrap` library combined with custom `scss` files for styling the app.

### Server
The [API Documentation is available here](https://stoplight.io/p/docs/gh/jterrazz/42-matcha).

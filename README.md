# application-blueprint

application-blueprint is a very lightweight dependency injection framework for Node.js applications. It makes it very easy to unit test, due to the very simple constructor injection pattern.

[![Build Status](https://img.shields.io/travis/anton-johansson/application-blueprint.svg)](https://travis-ci.org/anton-johansson/application-blueprint)
[![Coverage](https://img.shields.io/codecov/c/github/anton-johansson/application-blueprint.svg)](https://codecov.io/github/anton-johansson/application-blueprint)
![Dependencies](https://img.shields.io/david/anton-johansson/application-blueprint.svg)

[![NPM](https://nodei.co/npm/application-blueprint.png?downloads=true)](https://nodei.co/npm/application-blueprint/)


## Configuration format

The `create(base, configurationFile);` function below reads a blueprint configuration file. The format looks something like this:

```js
module.exports =
[
  { external: "http" },
  "./components/handler",
  { path: './components/service', name: "coolService" },
  { path: './components/simpleExecutor', name: "executors", mapbinder: "executor1" },
  { path: './components/advancedExecutor', name: "executors", mapbinder: "executor2" }
]
```

As you can see, you can use simple strings in the configuration. Simple strings are equivalent to using `{ path: '...' }`.

You can register external modules using the `external` keyword. application-blueprint will simply require that module and register it in the container.

The name of the modules can be left out. If not specified, it will be derived from other fields. For example, for `{ path: './components/service' }`, it will use `service` as the name of the module. Everything after the last slash is used, if one exists. For external modules, it will use whatever you enter in the `external` part, which is usually what you want. For mapbinders and multibinders, you usually want to specify the name of the module. Otherwise, you would have to name all service files that you want to bind together exactly the same.

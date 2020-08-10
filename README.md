[![Build Status](https://travis-ci.org/sitewhere/sitewhere-admin-ui.svg?branch=master)](https://travis-ci.org/sitewhere/sitewhere-admin-ui)

---

# SiteWhere Administrative User Interface

The SiteWhere Administrative UI is an [Electron](https://electronjs.org/) application that
provides management features for remote SiteWhere instances. This version is intended for use
with SiteWhere 3.0 and is _not_ compatible with the 2.x product versions due to significant
architectural changes between major versions. 

Note that this is intended as a management tool and not as the basis for bespoke applications 
running on SiteWhere. This application builds on various other libraries including:

* [SiteWhere REST API/model](https://www.npmjs.com/package/sitewhere-rest-api) - Library for interacting 
  with SiteWhere servers via REST APIs. 
* [SiteWhere IDE Components](https://www.npmjs.com/package/sitewhere-ide-components) - Library based on
  Vue/Vuetify and supporting the core IDE for SiteWhere products.
* [SiteWhere Admin UI Plugins](https://www.npmjs.com/package/sitewhere-admin-ui-plugins) - Library containing
  configuration plugins for the microservices provided out-of-the-box in SiteWhere 3.0.

## Requirements for building

- Node v11
- NPM 6.x
- Yarn 1.22.x

## Build and run the application

```console
yarn install
yarn run electron:serve
```

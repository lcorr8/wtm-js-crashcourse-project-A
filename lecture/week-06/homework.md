# Week 6 HW - Testing
- :white_check_mark: implement ava, nyc, supertest npm packages to e2e test your api
- try to get 100% line coverage...currently about 80%
    - CRUD interview
    - complex routes
    - brownie points: refactor application, interview and notification tests to use actual instances instead of ids, after auto populate refactoring.

## Leftover tasks to improve app:

1. implement better error handling (HOL) [Wes Bos async + await in Js Talk (around min 12:15)](https://www.youtube.com/watch?v=DwQJ_NPQWWo)
2. resume functionality:
    - read and implement in model [How to store images to MongoDB with Node.js](https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d) for resume functionalityadd resume to model
    - add resume to application (add new or select existing) service and route
    - find an upload picture library for mobile
3. refactor: use library to auto populate `$ npm i mongoose-autopopulate`, cap it at 1-2 levels
4. implement creation date on models, to be able to sort by desc/asc order when searching for jobs. [mongoose -  Query.prototype.sort()](https://mongoosejs.com/docs/api.html#query_Query-sort)

## Tasks from Testing Lecture:
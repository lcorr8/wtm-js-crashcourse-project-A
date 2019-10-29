# Week 2 HW
- :white_check_mark: rewrite classes for readability. ex: class Person {} 
- :white_check_mark: implement module pattern. move classes into their own files, export them, and require them where they are needed.
    - remove circular references
        - job: applications interviews,
        - jobseeker: applications, interviews, notifications
    - make sure database saves more than one entry without rewriting the same entry && you dont get an array within an array.
- :white_check_mark: initialize npm so you can use packages, 
    - - `$ npm init`
    - make sure you select the right license for your open source project.
- :white_check_mark: and use at least one package from somebody else
 
    - add a package to your project ex:  `npm i chalk`
- :white_check_mark: add linting
- :white_check_mark: fix suggestions from week 1
    - use of const over var and if the variable should not be a constant use let

# Revision suggestions

1. include package-lock.json file
2. update variable names to be more understandable/explicit. (use full names)
3. implement `moment.js` or use `Date`
4. oh yeah…i guess i was thinking i’ll only give them 3 options so they don’t go back and forth a million times trying to schedule something. use array in a single attribute for interview time options
5. update `apply` to `submitApplication`
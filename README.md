# Spreetail Interview

Before proceeding make sure you have Node Version 14 or greater installed
### How to run project
1) Run with tsc-node
    - Install dependancies 
        - `yarn`
    - Start Project with yarn
        - `yarn start`
2) Build and run
    - Build index.js file
        - `yarn build`
    - Execute with node
        - `node index.js`
3) Testing the app
    - Uses [jest](https://jestjs.io/) for testing
    - To run tests simple run the test command
        - `yarn test`
    - Add any new tests to the tests folder
    

### Commands
  - **ADD**: Adds a member to a collection for a given key. Displays an error if the member already exists for the key.
  - **REMOVE**: Removes a member from a key.  If the last member is removed from the key, the key is removed from the dictionary. If the key or member does not exist, displays an error.
  - **MEMBERS**: Returns the collection of strings for the given key. Error if not exists
  - **CLEAR**: Removes all keys and all members from the dictionary
  - **EXIT**: Exits Commandline App
  - **REMOVEALL**: Removes all members for a key and removes the key from the dictionary. Returns an error if the key does not exist.
  - **KEYS**: Returns all the keys
  - **KEYEXISTS**: Returns whether a key exists or not
  - **MEMBEREXISTS**: Returns whether a member exists within a key
  - **ALLMEMBERS**: Returns all the members in the dictionary
  - **ITEMS**: Returns all keys in the dictionary and all of their members.
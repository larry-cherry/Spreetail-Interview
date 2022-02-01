type Member = string[]


type MultiValueDictionary = {
  [key: string]: Member
}

let multiValueDictionary: MultiValueDictionary = {}

process.stdin.setEncoding('utf8');

enum COMMANDS {
  ADD = 'ADD', // Adds a member to a collection for a given key. Displays an error if the member already exists for the key.
  REMOVE = 'REMOVE', // Removes a member from a key.  If the last member is removed from the key, the key is removed from the dictionary. If the key or member does not exist, displays an error.
  MEMBERS = 'MEMBERS', // Returns the collection of strings for the given key. Error if not exists
  CLEAR = 'CLEAR', // Removes all keys and all members from the dictionary
  EXIT = 'EXIT', // Exits Commandline App
  REMOVEALL = 'REMOVEALL', // Removes all members for a key and removes the key from the dictionary. Returns an error if the key does not exist.
  KEYEXISTS = 'KEYEXISTS', // Returns whether a key exists or not
  MEMBEREXISTS = 'MEMBEREXISTS', // Returns whether a member exists within a key
  ALLMEMBERS = 'ALLMEMBERS', // Returns all the members in the dictionary
  ITEMS = 'ITEMS' // Returns all keys in the dictionary and all of their members.
}

let debug = false;
// console.log('args', process.argv)

process.stdin.on('data', function(data: Buffer) {
    const input = data.toString().trim();
    try {
      inputParser(input);
    } catch (error) {
      console.log(error);
    }
});

export function inputParser(input: string) {
  const inputArray  = input.split(' ');
  if(debug){
    console.log('inputArray', inputArray);
  }
  const [cmd, key] = inputArray;
  const val = inputArray.slice(2, inputArray.length).join(' ');
  const allMemeberKeys = Object.keys(multiValueDictionary);
  switch(cmd){
    case COMMANDS.ADD:
      console.log('adding')
      if(key !== undefined && val !== undefined){
        if (key in multiValueDictionary){
          if(multiValueDictionary[key].includes(val)){
            throw new Error(`ERROR, ${val} already exists for ${key}`)
          } else {
            multiValueDictionary[key].push(val);
          }
        } else {
          multiValueDictionary[key] = [val];
        }
      }
      break;
    case COMMANDS.MEMBERS:
      if(key in multiValueDictionary){
        for(const member of multiValueDictionary[key]){
          console.log(member);
        }
      } else {
        throw new Error(`${key} does not exist`);
      }
      break;
    case COMMANDS.MEMBEREXISTS:
      if(key in multiValueDictionary){
        console.log(multiValueDictionary[key].includes(val));
      }
      break;
    case COMMANDS.ALLMEMBERS:
      let allmemebers: string[] = [];
      // const allMemeberKeys = Object.keys(multiValueDictionary);
      for(const memberKey of allMemeberKeys){
        multiValueDictionary[memberKey].forEach(memberVal => {
          console.log(memberVal)
        })
      }
      break;
    case COMMANDS.KEYEXISTS:
      if(key in multiValueDictionary){
        console.log(true);
      } else {
        console.log(false);
      }
    case COMMANDS.REMOVE:
      if(key in multiValueDictionary){
        const newMembers = multiValueDictionary[key].filter(member => member != val);
        if(newMembers.length > 0){
          multiValueDictionary[key] = newMembers;
        } else {
          delete multiValueDictionary[key];
        }
      }
      break;
    case COMMANDS.REMOVEALL:
      if(key in multiValueDictionary){
        multiValueDictionary[key] = []
      } else {
        throw new Error(`${key} does not exist`);
      }
      break;
    case COMMANDS.ITEMS:
      for(const memberKey of allMemeberKeys){
        console.log('key', memberKey);
        multiValueDictionary[memberKey].forEach(memberVal => {
          console.log(memberVal)
        })
      }
      break;
    case COMMANDS.EXIT:
      process.exit(0);
    case COMMANDS.CLEAR:
      multiValueDictionary={}
      break;
  }
}


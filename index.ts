type Member = Set<string>


type MultiValueDictionary = {
  [key: string]: Member
}

process.stdin.setEncoding('utf8');

enum COMMANDS {
  ADD = 'ADD', // Adds a member to a collection for a given key. Displays an error if the member already exists for the key.
  REMOVE = 'REMOVE', // Removes a member from a key.  If the last member is removed from the key, the key is removed from the dictionary. If the key or member does not exist, displays an error.
  MEMBERS = 'MEMBERS', // Returns the collection of strings for the given key. Error if not exists
  CLEAR = 'CLEAR', // Removes all keys and all members from the dictionary
  EXIT = 'EXIT', // Exits Commandline App
  REMOVEALL = 'REMOVEALL', // Removes all members for a key and removes the key from the dictionary. Returns an error if the key does not exist.
  KEYS = 'KEYS',
  KEYEXISTS = 'KEYEXISTS', // Returns whether a key exists or not
  MEMBEREXISTS = 'MEMBEREXISTS', // Returns whether a member exists within a key
  ALLMEMBERS = 'ALLMEMBERS', // Returns all the members in the dictionary
  ITEMS = 'ITEMS' // Returns all keys in the dictionary and all of their members.
}

type stringOrUndefined = string | undefined;

class Spreetail {
  multiValueDictionary: MultiValueDictionary;
  consoleOutput = false
  constructor(){
    this.multiValueDictionary = {}
  }

  commandparser(cmd: stringOrUndefined, key: stringOrUndefined, member: stringOrUndefined){
    switch(cmd){
      case COMMANDS.ADD:
        if(typeof key === 'string' && typeof member === 'string'){
          this.add(key, member);
        }
        break;
      case COMMANDS.REMOVE:
        if(typeof key === 'string' && typeof member === 'string'){
          this.remove(key, member);
        }
        break;
      case COMMANDS.MEMBERS:
        if(typeof key === 'string'){
          this.members(key);
        }
        break;
      case COMMANDS.CLEAR:
        this.clear();
        break;
      case COMMANDS.REMOVEALL:
        if(typeof key === 'string'){
          this.removeall(key)
        };
        break;
      case COMMANDS.KEYS:
        this.keys();
        break;
      case COMMANDS.KEYEXISTS:
        if(typeof key === 'string'){
          this.printToConsole(this.keyexists(key))
        }
        break;
      case COMMANDS.MEMBEREXISTS:
        if(typeof key === 'string' && typeof member === 'string'){
          this.printToConsole(this.membersexists(key, member))
        }
        break;
      case COMMANDS.ALLMEMBERS:
        this.allmembers();
        break;
      case COMMANDS.ITEMS:
        this.items();
        break;
      case COMMANDS.EXIT:
        process.exit(0)
    }
  }
  add(key: string, member: string){
    if(!this.keyexists(key)){
      this.multiValueDictionary[key] = new Set();
      this.multiValueDictionary[key].add(member);
      this.printToConsole('Added')
    } else {
      if(!this.membersexists(key, member)){
        this.multiValueDictionary[key].add(member);
        this.printToConsole('Added')
      } else {
        this.printToConsole('ERROR, member already exists for key')
      }
    }
  }
  remove(key: string, member: string){
    if(this.keyexists(key)){
      if(this.membersexists(key, member)){
        this.multiValueDictionary[key].delete(member);
        this.printToConsole('Removed');
      } else {
        this.printToConsole('ERROR, member does not exist');
      } 
      if(this.multiValueDictionary[key].size == 0){
        this.removeall(key);
      }
    } else {
      this.printToConsole('ERROR, key does not exist');
    }
  }
  members(key: string){
    if(this.keyexists(key)){
      const members = this.multiValueDictionary[key]
      let i = 1;
      for(const member of members){
        this.printToConsole(`${i}) ${member}`)
        i++;
      }
      return this.multiValueDictionary[key];
    } else {
      this.printToConsole('ERROR, key does not exist.');
    }
  }
  clear(){
    this.multiValueDictionary = {}
    this.printToConsole('Cleared');
  }
  removeall(key: string){
    if(this.keyexists(key)){
      delete this.multiValueDictionary[key];
      this.printToConsole('Removed')
    } else {
      this.printToConsole('ERROR, key does not exist')
    }
  }
  keys(){
    const keys = Object.keys(this.multiValueDictionary);
    if(keys.length === 0){
      this.printToConsole('empty set');
    } else {
      let i = 1;
      for(const key of keys){
        this.printToConsole(`${i}) ${key}`);
        i++;
      }
    }
    return keys
  }
  keyexists(key: string): boolean {
    if(key in this.multiValueDictionary){
      return true;
    }
    // this.printToConsole(result);
    return false;
  }
  membersexists(key: string, member: string): boolean {
    if(this.keyexists(key)){
      return this.multiValueDictionary[key].has(member);
    }
    return false;
  }
  allmembers(){
    const keys = Object.keys(this.multiValueDictionary);
    const members: string[] = [];
    let i = 1;
    for(const key of keys){
      for(const member of this.multiValueDictionary[key]){
        members.push(member);
        this.printToConsole(`${i}) ${member}`);
        i++;
      }
    }
    if(members.length === 0){
      this.printToConsole('(empty set)')
    }
    return members;
  }
  items(): void{
    const keys = Object.keys(this.multiValueDictionary);
    let i = 1;
    for(const key of keys){
      for(const member of this.multiValueDictionary[key]){
        this.printToConsole(`${i}) ${key}: ${member}`);
        i++;
      }
    }
    if(keys.length === 0){
      this.printToConsole('(empty set)')
    }
  }
  printToConsole(msg: any){
    if(this.consoleOutput) {
      console.log(msg);
    }
  }
} 

let debug = false;


type inputParserReturn = {
  cmd: stringOrUndefined,
  key: stringOrUndefined,
  member: stringOrUndefined
}

function inputParser(input: string): inputParserReturn{
  const inputArray  = input.split(' ');
  if(debug){
    console.log('inputArray', inputArray);
  }
  const [cmd, key] = inputArray;
  const member = inputArray.slice(2, inputArray.length).join(' ');
  return {
    cmd,
    key,
    member
  } 
}


if (require.main === module) {
  let spreetail = new Spreetail();
  spreetail.consoleOutput = true
  process.stdin.on('data', function(data: Buffer) {
    const input = data.toString().trim();
    if(spreetail !== null){
      try {
        const {cmd, key, member} = inputParser(input);
        spreetail.commandparser(cmd, key, member);
      } catch (error) {
        console.log(error);
      }
    }
});
}

export {
  Spreetail,
  inputParser
}
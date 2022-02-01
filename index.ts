type Member = string[]


type MultiValueDictionary = {
  [key: string]: Member
}

let multiValueDictionary: MultiValueDictionary = {}

process.stdin.setEncoding('utf8');

enum COMMANDS {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  MEMBERS = 'MEMBERS',
  CLEAR = 'CLEAR',
  EXIT = 'EXIT',
}

let debug = false;
// console.log('args', process.argv)

process.stdin.on('data', function(data: Buffer) {
    const input = data.toString().trim();
    inputParser(input);
});

export function inputParser(input: string) {
  const inputArray  = input.split(' ', 3);
  if(debug){
    console.log('inputArray', inputArray);
  }
  const [cmd, key, val] = inputArray;
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
      }
      break;
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
    case COMMANDS.EXIT:
      process.exit(0);
    case COMMANDS.CLEAR:
      multiValueDictionary={}
      break;
  }
}


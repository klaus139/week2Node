const myFish = ['angel', 'clown', 'mandarin', 'surgeon']

console.log('my fish before:', JSON.stringify(myFish))

const shifted = myFish.shift();

console.log('my fish after', myFish)

console.log('removed element', shifted)
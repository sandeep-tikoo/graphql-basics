
import myCurrentLocation, {getGreeting, message, name} from './myModule'
// import myCurrentLocation from './myModule'
import myaddition, {mySubtract} from './math'

console.log(message + ' |To| ' + name + ' |From| ' + myCurrentLocation)
console.log(getGreeting('Jessica'))
console.log(myaddition(8989,1010))
console.log(mySubtract(108,8))

import { firstname } from "./Utils/fistname.js";
// import { firstname as fname } from "./Utils/fistname.js";
import { lastname } from "./Utils/lastnam.js";
import Person, { Person2 } from "./Utils/Person.js";        // for export default we can import as any name

// for export default we can import without curlly bracket also we can import with any name.
//  for export without default we have import with curlly bracket we same name.

console.log(firstname + " " + lastname);

const PersonDetails = new Person("Jayesh", "Gangurde", 27);

console.log(PersonDetails);
PersonDetails.info();






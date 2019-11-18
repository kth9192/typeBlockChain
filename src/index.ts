interface human {
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: "kim",
  age: 28,
  gender: "male"
};

const sayHi = (person: human): string => {
  return `hello ${person.name} , you are ${person.age} , and ${person.gender}`;
};

console.log(sayHi(person));

export {};

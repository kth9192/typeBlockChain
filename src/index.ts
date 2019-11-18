class Human {
  public name: string;
  public age: number;
  public gender: string;

  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const taehoon = new Human("kim", 28, "male");

const sayHi = (person: Human): string => {
  return `hello ${person.name} , you are ${person.age} , and ${person.gender}`;
};

console.log(sayHi(taehoon));

export {};

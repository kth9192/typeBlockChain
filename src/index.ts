const sayHi = (name: string, age: number, gender: string): string => {
  return `hello ${name} , you are ${age} , and ${gender}!`;
};

console.log(sayHi("kim", 28, "male"));

export {};

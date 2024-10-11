class Greeting {
    sayHello() {
        return "Hello, ";
    }
}

const greeting = new Greeting();
console.log(greeting.sayHello() + "World!");
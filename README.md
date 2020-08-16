<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h1 align="center">ReactJS NextJS TDD</h1>

  <p align="center">
    This is a simple project to demonstrate how to design ReactJS apps with test-driven development.
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Introduction](#introduction)
* [How to write testable code](#how-to-write-testable-code)
* [What is unit test?](#what-is-unit-test)
* [What is integration test?](#what-is-integration-test)
* [Organizing test files](#organizing-test-files)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)


## Introduction

TDD stands for Test Driven Development. The process is simple:

* Before you write implementation code, write some tests that proves that the implementation works or fails. Watch the test fail before moving to the next step (this is how we know that a passing test is not a false positive — how we test our tests).

* Write the implementation code and watch the test pass.

* Refactor if needed. You should feel confident refactoring your code now that you have a test to tell you if you’ve broken something.

There are 3 major kinds of tests, all equally important. Functional/E2E tests, integration tests, and unit tests.

* Unit tests must test isolated components.
* Functional/E2E & integration test components must be integrated.
* All tests must be isolated from other tests. Tests should have no shared mutable state.

## How to write testable code

TDD tends to have a simplifying effect on code, not a complicating effect. If you find that your code gets harder to read or maintain when you make it more testable, or you have to bloat your code with dependency injection boilerplate, you’re doing TDD wrong.

Writing more testable code should simplify your code. It should require fewer lines of code and more readable, flexible, maintainable constructions. Dependency injection has the opposite effect.

The process of learning effective TDD is the process of learning how to build more modular applications. The essence of all software development is the process of breaking a large problem down into smaller, independent pieces (decomposition) and composing the solutions together to form an application that solves the large problem (composition).

Using composition allows you to design applications where code can be tested easily without using techniques like mocking. Dividing parts of your applications into independent atomic units allows you to write scalable, maintainable and testable code.

When decomposition succeeds, it’s possible to use a generic composition utility to compose the
pieces back together. Examples:

* Function composition, e.g., lodash/fp/compose
* Component composition e.g., composing higher-order components with function composition
* State store/model composition e.g., Redux combineReducers67
* Object or factory composition e.g., mixins or functional mixins
* Process composition e.g., transducers
* Promise or monadic composition e.g., asyncPipe() , Kleisli composition with composeM() ,composeK() , etc...
* etc...

**Follow below steps to decompose large applications into independent atomic units:**
* Divide your problem (application feature) into small simple steps.

* Convert steps into very small independent pure functions. Remember that these functions will act as independent atomic units of your application which can be tested easily without mocking. These functions must be pure which means they must not access anything (such as - value, functions, objects etc.) outside their scope. They must not directly change value of an object (instead you can clone these objects and return cloned modified object). Each of these functions must do only one thing.

* Combine these small independent functions together to solve your problem. In functional programming **compose()** utility is used to solve complex problems by divding them into small functions and composing them together to finally solve any complex problem. The process is called function composition.

* Test these independent atomic units (functions) using unit tests and test those composed functions using integration tests.

**Function composition** is the process of applying a function to the return value of another function. In other words, you create a pipeline of functions, then pass a value to the pipeline, and the value will go through each function like a stage in an assembly line, transforming the value in some way before it’s passed to the next function in the pipeline. Eventually, the last function in the pipeline returns the final value.

## What is unit test?

Unit tests test individual units (modules, functions, classes) in isolation from the rest of the program. 

Unit tests should focus on behaviors that are mostly pure:

* Given the same inputs, always return the same output
* Have no side-effects

Obviously, some parts of your code will have side-effects. Some parts of your program exist for the purpose of communicating with some API over the network, writing to disk, drawing to the screen, or logging to the console. For components with side-effects, it’s usually better to forget about unit tests, and instead rely on functional or integration tests.

* Use pure functions as the atomic unit of composition, as opposed to classes, imperative procedures, or mutating functions.

* Isolate side-effects from the rest of your program logic. That means don’t mix logic with I/O (including network I/O, rendering UI, logging, etc...).

* Remove dependent logic from imperative compositions so that they can become declarative compositions which don’t need their own unit tests. If there’s no logic, there’s nothing meaningful to unit test.

That means that the code you use to set up network requests and request handlers won’t need unit tests. Use integration tests for those, instead.
Don’t unit test I/O. I/O is for integrations. Use integration tests, instead. It’s perfectly OK to mock and fake for integration tests.

## What is integration test?

Integration tests ensure that various units work together correctly. 

Because integration tests test collaborative integrations between units, it’s perfectly OK to fake servers, network protocols, network messages, and so on in order to reproduce all the various conditions you’ll encounter during communication with other units, potentially distributed across clusters of CPUs or separate machines on a network. 

Sometimes you’ll want to test how your unit will communicate with a 3rd party API, and sometimes those API’s are prohibitively expensive to test for real. You can record real workflow transactions against the real services and replay them from a fake server to test how well your unit integrates with a third party service actually running in a separate network process. Often this is the best way to test things like “did we see the correct message headers?” 

There are lots of useful integration testing tools that throttle network bandwidth, introduce network lag, produce network errors, and otherwise test lots of other conditions that are impossible to test using unit tests which mock away the communication layer.

In this project for mocking network requests, we are using [Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter) which allows us to intercept and check if API request is correct and response is handled correctly. **Axios Mock Adapter** library is used along with [Axios](https://github.com/axios/axios) which is simple to use library to make HTTP requests in both NodeJS and browser.

## Organizing test files

Organizing test files are important in order to make things easier. Create **__tests__** directory in your project root directory. Inside **__tests__** directory create two sub-directories - **specs** and **unit** where **specs** directory will contain integration test files with extension - **.spec.js** and **unit** directory will contain unit test files with extension - **.test.js**

## Built With
This project is designed with technologies listed below - 
* [Next.JS](https://nextjs.org)
* [React](https://reactjs.org)
* [Jest](https://jestjs.io)


<!-- GETTING STARTED -->
## Getting Started

First you need to install **NodeJS** and **npm** on your computer.
Then to get started with this project, you just need to clone or download this repository on your computer.


### Installation

1. Clone the repo
```sh
git clone https://github.com/amit08255/reactjs-nextjs-tdd.git
```
2. Install NPM packages
```sh
npm install
```



<!-- USAGE EXAMPLES -->
## Usage

To run the project type below command in terminal (starts development server) -
```sh
npm run dev
```

To build the project and start production server use below commands -
```sh
npm run build
```

```sh
npm start
```

## Available actions

* **npm run lint** - Run linting with EsLint.
* **npm run transpile** - Transpile code with babel.
* **npm run dev** - Start development server.
* **npm run build** - Generate production build of project.
* **npm start** - Start production server after building.
* **npm run test** - Run tests with jest.
* **npm run test:watch** - Run jest in watch mode to auto run test on file change.
* **npmr run test:debug** - Run jest in debug mode to step through code in chrome debug tool. Go to [chrome://inspect](chrome://inspect) in Chrome and click inspect under remote target to open Chrome inspect tool for debug.


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Amit Kumar - [@amit08255](https://twitter.com/amit08255) - amitcute3@gmail.com

Project Link: [https://github.com/amit08255/reactjs-nextjs-tdd](https://github.com/amit08255/reactjs-nextjs-tdd)


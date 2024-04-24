# 🛎️ Overlook Hotel

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

Frontend hotel room booking application

![Kapture 2024-04-23 at 17 09 54](https://github.com/KojinKuro/overlook-hotel/assets/11234292/45e5120b-7680-4f67-a7ec-f5a432a46de6)

## 🔗 Live Demo

[👉 Live Deployment 👈](https://kojinkuro.github.io/overlook-hotel/)

**Note:** This website requires a [backend server](https://github.com/turingschool-examples/overlook-api) to be running for it to properly work. The [instructions](#instructions) below will help you get running!

## 🌟 Overview

This is a frontend application for booking hotel rooms for the Overlook Hotel with a design inspired by the [airbnb website](https://www.airbnb.com/). You can login, look up rooms, book rooms you like, and canceling them if you change your mind. This is all done through network requests to a database; none of the data lives locally. This website was created to practice the skills learned over the course of my 2nd term at Turing School of Software & Design: test driven development, functional programming, using the fetch API for network requests, accessible design, and iterator methods.

## ✨ Features

- Login authentication
- Check available rooms on different days and filter parameters
- Can book rooms / cancel future bookings
- View the amount of money you spent at the hotel
- View all past bookings
- Accessible design

## ⚙️ Installation & Setup

### Requirements

Running this application requires:

- Git - version control software you can [install here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- NPM - package manager that is [part of Node.js](https://nodejs.org/en)

### Instructions

1. Follow the instructions in [this repo](https://github.com/turingschool-examples/overlook-api) to pull down and get the backend API server running.
2. Run the following commands in your terminal

```shell
git clone git@github.com:KojinKuro/overlook-hotel.git
cd overlook-hotel
npm install
npm run start
```

The server will now be running on `localhost:8080`

To login to the site use the following credients
```
username: customer50 (where 50 is the ID of the user)
password: overlook2021
```

### Testing

The code includes a full test suite used for testing the core functionality of the application. If you would like to run the test suite, use the following command in the terminal after installing the required node packages:

```shell
npm run test
```

## 📚 Context

This project was created in week 12 of Turing School of Software & Design by one programmer (me!). This project took around 70 hours to complete (including design time). It was built according to the following [spec sheet](https://frontend.turing.edu/projects/module-2/overlook.html). No design comp was given so this website was loosely built off the [airbnb website](https://www.airbnb.com/).

## 🧠 Learning Goals

While doing this, I felt confident in all the Javascript related tasks (testing, adding core functionality, DOM manipulation) and network requests. The part that I feel less confident about is following Functional Programming and adding CSS. I realize that I do not have deep enough understanding of Functional Programming. A future goal is coming back to this project and refactoring it with more FP paradigms. I feel the same way about CSS. While I understand it on a conceptual level, I still feel that doing anything "cool" is difficult for me.

Something interesting I noticed was my React learning have seeping into this application. When organizing my domManipulating files, I organized it like Components in React. Through doing this project, I have grown to understand why frameworks and libraries like React, Angular, and Vue are important. A future goal might be to refactor this as a React app.

## 🤝 Credits

Images from [Unsplash](https://unsplash.com/) and [Irasutoya](https://www.irasutoya.com/)

Code & Design by [Charles Kwang](https://github.com/KojinKuro)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) for more details.

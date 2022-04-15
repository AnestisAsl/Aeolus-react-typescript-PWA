# Aeolus-react-typescript

## Description<br>

Aeolus is a fullstack weather PWA using the **Metaweather API**(link bellow). It implements a full functional login system to personalise the experience. For the purpose above, its backend created using ExpressJS, MongoDB as its database and **JWT.js** for authentication purposes. As for its frontend a combination of ReactJS with **TypeScript** gets the job done. The tech stack i used, comes somewhat under the MERN stack. Aeolus can be classified as **PWA**, is installable(as you can see the installation button on the top of the page),responsive and offers offline experiences(even offline data). To complete the PWA experience the data are also provided at a **barcode** form.
![lighthouseSS](https://user-images.githubusercontent.com/25753991/162470257-4f96d26c-fc53-4e2a-858b-a90729ae3331.jpg)

## Metaweather API
https://www.metaweather.com/api/

## Frontend<br>

## Technologies Used<br>

* React JS
* TypeScript
* JWT.js 
* bwip-js
* Framer Motion
* react-router V5 for routing 
* axios for backend and api calls
* SASS
* Chart.js 
* react-icons

## Instalation<br>

Create a react app with typescript template using node.js

```
react npx create react app --typescript

```
Install dependencies
(You may need to use '@types/{name of the library}' cause TS)

```
npm install   react-chartjs-2 chart.js react-icons react-router-dom@5 axios react-jwt @types/bwip-js

```


## Backend<br>

An Express.js on top of node.js provides the main backend framework. MongoDB is used to store user infrormation and mongoose helps for the object modeling.

## Technologies Used<br>

* Express JS
* MongoDB
* mongoose
* cors to make calls to our own backend server from *only* our frontend, since frontend and backend are in different ports.
* bcrypt for hashing passwords
* dotenv

## Instalation<br>

```
npm install --save express bcrypt cors mongoose dotenv

```

## Testing<br>

Not completed section, currently working on.

* jest
* jest-dom
* react-testing-library


```
npm install --save-dev @testing-library/react jest @types/jest

```

## Actions before running it : <br>
### .png files are not provided<br>

Create a folder with name "aeolus icons". Inside put the .png files in different sizes, name them "size".png (check manifest.json). 

### .env file<br>

Create a .env file in the backend folder and inside it store your jwt password.
JWT_PASSWORD={your password}






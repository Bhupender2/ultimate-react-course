import React from "react";
import ReactDOM from "react-dom/client";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];


function App() {
  return <div>
   <Header/>
    <Menu/>
    <Footer />
  </div>;
}
function Header(){
  return <h1>Fast React Pizza Co.</h1>
}

function Menu(){
return <div>
  <h2>Our Menu</h2>
  <Pizza/>
  <Pizza/>
  <Pizza/>
  <Pizza/>
</div>
}

function Footer(){
  //without jsx we need to use react.createElement
 //return React.createElement('footer', null , 'We are Currently Open')

 const hour = new Date().getHours();
 const openHour= 10;
 const closeHour=22;
const isOpen=hour>=openHour && hour<=closeHour
console.log(isOpen)
 
 // with jsx
 return <footer>{new Date().toLocaleTimeString()}. We are Currently Open !!</footer>
}

function Pizza(){
  return<div>
     <h2>Pizza</h2>
     <p>Tomato, mozarella, spinach, and ricotta cheese</p>
    <img src="pizzas/spinaci.jpg" alt="food"/>  
  </div>
}

// now all we need to do is to render this in the dom so need to create root element fo this

//react v18 ---this is how we render the our app in react v18

const root = ReactDOM.createRoot(document.getElementById("root")); // we are selecting "root " element here so that react can render our application inside this div

//stictmode will render our app twice to check if there is any bugs during development and check if we are using outdated parts of the API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// react v17
// ReactDOM.render(<App /> , document.getElementById("root") )

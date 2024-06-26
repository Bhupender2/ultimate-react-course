import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;

  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>
     
      {/* rendering list using map function because inside div/ul we need jsx so we use map instead of forEach we will get new array using map and then react knows how to render it*/}
      {numPizzas > 0 ? (
       <> {/* using react fragment here we are using short form coz we dont want any key right now */}
       <p>Authentic Italian cuisine . 6 creative dishes to choose from . All from  our ston oven , all organic , all delicious</p>
       <ul className="pizzas">
          {pizzas.map((pizza) => {
            return <Pizza pizzaObj={pizza} key={pizza.name} />; // here we are passing a prop here
          })}
        </ul>
       </>
      ) : (
        <p> we are still working on our menu please come back later :)</p>
      )}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        price={23}
        photoName="pizzas/spinaci.jpg"
      />
      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mozarella, mushrooms, and onion"
        price={12} // entering JS mode when you want to pass something that is not a string (it can be anthing object , arrays `)
        photoName="pizzas/funghi.jpg"
      /> */}
    </main>
  );
}
function Pizza({pizzaObj}) { // here also we have destructe the props
  console.log(pizzaObj);

  // if (pizzaObj.soldOut) return null;
  return (
    <li className={`pizza ${pizzaObj.soldOut?"sold-out":""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>                       
        <h3>{pizzaObj.name}</h3>
        <p> {pizzaObj.ingredients}</p>

        {/* second way of doing it */ }

       {/* {
        pizzaObj.soldOut?<span>SOLD OUT</span> :<span>{pizzaObj.price}</span>
       } */}


        {/* First way of doing dynamically changing the css classes*/}
         <span>{ pizzaObj.soldOut?"SOLD OUT":pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  //without jsx we need to use react.createElement
  //return React.createElement('footer', null , 'We are Currently Open')

  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  // with jsx
  return (
    <footer className="footer">
      {isOpen ? (
        <Order  closeHour={closeHour} openHour={openHour}/>
      ) : (
        <p>
          we happily invite you to visit use between {openHour} to {closeHour}
        </p>
      )}
      {/* we use conditional rendering here using && operator*/}
    </footer>
  );
}

function Order({closeHour, openHour}) { // here we destructing the props here
  return (
    <div className="order">
      <p>we are Currently open!! from:{closeHour}:00 to {openHour}:00 </p>
      <button className="btn">Order</button>
    </div>
  );
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

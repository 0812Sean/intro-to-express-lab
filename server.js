// 1.1. Be Polite, Greet the User
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/greetings/:username', (req, res, next) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}!`);
});

app.listen(PORT, () => {
    console.log((`listening on port ${PORT}`))
});

// 2.Rolling the Dice
app.get('/roll/:number', (req, res, next) => {
    const number = req.params.number;
    const parsedNumber = parseInt(number);

    if (isNaN(parsedNumber)) {
        res.send('You must specify a number.');
    } else {
        const rolledNumber = Math.floor(Math.random() * (parsedNumber + 1));
        res.send(`You rolled a ${rolledNumber}.`);
    }
});

// 3.I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res, next) => {
    const index = req.params.index;
    const item = collectibles[index];

    if (item) {
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    } else {
        res.send('This item is not yet in stock. Check back soon!');
    }
});

// 4. Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res, next) => {
    const { min_price, max_price, type } = req.query;
    let filteredShoes = shoes;

    if (min_price) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(min_price));
    }
    if (max_price) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(max_price));
    }
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }

    res.send(filteredShoes);
});

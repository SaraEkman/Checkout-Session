const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const fetchUsers = require("../utils/fetchUsers.js");
const initStripe = require("../stripe");

const stripe = initStripe();
const register = async (req, res) => {
    const { name, email, password, address } = req.body;
    
    const users = await fetchUsers();
    const userAlreadyExists = users.find(u => u.email === email);

    if (userAlreadyExists) {
        return res.status(400).json({ error: "User already exists" });
    }

    const customer = await stripe.customers.create({
        name: name,
        email: email,
        address: address
    });

    console.log("customer", customer);
   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        customerId: customer.id,
        name: name,
        email: email,
        password: hashedPassword,
        address: address
    };
    users.push(newUser);
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

    res.status(200).json({ message: "User created", name: name});
};

const login = async (req, res) => {
    const { email, password } = req.body;

    console.log("req.body", req.body);

    const users = await fetchUsers();
    const userExists = users.find(u => u.email === email);
    console.log(userExists);

    if (!userExists || !await bcrypt.compare(password, userExists.password)) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    req.session.user = userExists;

    const customer = await stripe.customers.retrieve(userExists.customerId);
    res.status(200).json({ name: userExists.name, email: userExists.email, customerId: customer.id, address: customer.address});

};

const logout = (req, res) => {
    req.session = null;
    res.status(200).json({ message: "Logged out" });
};

const authorize = (req, res) => {
    console.log(req.session);
    if (!req.session.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    res.status(200).json({ name: req.session.user.name, email: req.session.user.email, customerId: req.session.user.customerId, address: req.session.user.address});
};

module.exports = { register, login, logout, authorize };
const fetchUsers = require("../utils/fetchUsers");
const initStripe = require("../stripe");

const getUsers = async (req, res) => {

    const users = await fetchUsers();

    if (!users || users.length <= 0) {
        return res.status(400).json({ error: "No users found" });
    }

    res.status(200).json(users);
};

const getCustomers = async (req, res) => {
    const stripe = initStripe();
    const customers = await stripe.customers.list({
        limit: 10,
    });

    res.status(200).json(customers);
};

module.exports = { getUsers, getCustomers };
const initStripe = require("../stripe");
const fs = require("fs").promises;

const createCheckoutSession = async (req, res) => {

    const cart = req.body;

    const stripe = initStripe();

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: cart.map(item => {
            return {
                price: item.product,
                quantity: item.quantity
            };
        }),
        success_url: "http://localhost:3000/confirmation",
        cancel_url: "http://localhost:3000",
    });

    console.log(cart);

    res.status(200).json({ url: session.url, sessionId: session.id });

};

const verifySession = async (req, res) => {
    const stripe = initStripe();

    console.log("Nu kommer jag hit");

    const sessionId = req.body.sessionId;
    console.log(sessionId);

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session);

    if (session.payment_status === "paid") {
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
        console.log(lineItems);


        const order = {
            orderNumber: Math.floor(Math.random() * 100000000),
            customerName: session.customer_details.name,
            products: lineItems.data,
            total: session.amount_total,
            date: new Date()
        };

        console.log("orddddddddddddddddder", order);

        const orders = JSON.parse(await fs.readFile("./data/orders.json"));
        orders.push(order);
        await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4));

        res.status(200).json({ verified: true });
    }

};

const fetchAllProducts = async (req, res) => {
    const stripe = initStripe();
    const products = await stripe.products.list({ expand: ['data.default_price'] });
    console.log(products.data);
    res.status(200).json(products.data);
};

module.exports = { createCheckoutSession, verifySession, fetchAllProducts };
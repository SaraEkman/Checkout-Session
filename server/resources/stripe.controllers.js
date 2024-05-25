const initStripe = require("../stripe");
const fs = require("fs").promises;

const createCheckoutSession = async (req, res) => {

    const cart = req.body.items;

    const stripe = initStripe();

    console.log("session från createCheckoutSession", req.body);

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: req.body.userData.customerId,
        line_items: cart.map(item => {
            return {
                price: item.price,
                quantity: item.quantity
            };
        }),
        success_url: "http://localhost:3000/confirmation",
        cancel_url: "http://localhost:3000",
    });

    console.log(session);
    res.status(200).json({ url: session.url, sessionId: session.id });
};

// const verifySession = async (req, res) => {
//     const stripe = initStripe();

//     console.log("Nu kommer jag hit");

//     const sessionId = req.body.sessionId;
//     console.log(sessionId, "sessionID", req.body, "req.body");

//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     console.log(session);

//     if (session.payment_status === "paid") {
//         const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
//         console.log(lineItems);


//         const order = {
//             orderNumber: Math.floor(Math.random() * 100000000),
//             customerName: session.customer_details.name,
//             email: session.customer_details.email,
//             date: new Date(),
//             address: session.customer_details.address,
//             total: session.amount_total,
//             products: lineItems.data,
//         };

//         const orders = JSON.parse(await fs.readFile("./data/orders.json"));
//         orders.push(order);
//         await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4));

//         res.status(200).json({ verified: true });
//     }

// };

const verifySession = async (req, res) => {
    const stripe = initStripe();
    const sessionId = req.body.sessionId;

    const orders = JSON.parse(await fs.readFile("./data/orders.json"));
    // Check if order with this sessionId already exists
    if (orders.some(order => order.sessionId === sessionId)) {
        return res.status(400).json({ error: "Order already processed for this session." });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

        const order = {
            orderNumber: Math.floor(Math.random() * 100000000),
            customerName: session.customer_details.name,
            email: session.customer_details.email,
            date: new Date(),
            address: session.customer_details.address,
            total: session.amount_total,
            products: lineItems.data,
            sessionId: sessionId  
        };

        orders.push(order);
        await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4));
        res.status(200).json({ verified: true });
    } else {
        res.status(400).json({ error: "Payment not successful" });
    }
};

const fetchAllProducts = async (req, res) => {
    const stripe = initStripe();
    const products = await stripe.products.list({ expand: ['data.default_price'] });

    res.status(200).json(products.data);
};

module.exports = { createCheckoutSession, verifySession, fetchAllProducts };
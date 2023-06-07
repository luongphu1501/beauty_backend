const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const postPayment = async (req, res) => {
    const total = req.body.total
    console.log(total)
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: "Tổng số tiền thanh toán"
                },
                unit_amount: total.toFixed(2) * 100
            },
            quantity: 1,
        }
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/cancel`,
    });

    res.status(303).json(session.url)
}

module.exports = {
    postPayment
}
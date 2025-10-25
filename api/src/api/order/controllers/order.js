"use strict";

if (!process.env.STRIPE_KEY) {
    console.error('❌ STRIPE_KEY is not set in environment variables!');
}

const stripe = require("stripe")(process.env.STRIPE_KEY || 'placeholder');
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        try {
            // Check if Stripe is configured
            if (!process.env.STRIPE_KEY) {
                ctx.response.status = 500;
                return { error: "Stripe is not configured" };
            }

            const { products } = ctx.request.body;

            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi.db.query("api::product.product").findOne({
                        where: { id: product.id },
                    });

                    if (!item) {
                        ctx.response.status = 400;
                        return;
                    }

                    return {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: Math.round(item.price * 100),
                        },
                        quantity: product.quantity || 1,
                    };
                })
            );

            const validItems = lineItems.filter(Boolean);

            if (!validItems.length) {
                ctx.response.status = 400;
                return { error: "No valid products found for checkout." };
            }

            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                success_url: `${process.env.CLIENT_URL}?success=true`,
                cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
                line_items: validItems,
                shipping_address_collection: { allowed_countries: ["IN", "US", "CA"] },
                payment_method_types: ["card"],
            });

            await strapi.service("api::order.order").create({
                data: {
                    products,
                    stripeId: session.id,
                },
            });

            return { stripeSession: session };
        } catch (err) {
            console.error('Stripe Error:', err); // Better error logging
            ctx.response.status = 500;
            return { error: err.message };
        }
    },
}));
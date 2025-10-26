"use strict";

const stripe = require("stripe")(process.env.STRIPE_KEY);
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        try {
            console.log('📦 Payment request received');
            
            const { products } = ctx.request.body;

            if (!products || products.length === 0) {
                ctx.response.status = 400;
                return { error: "No products provided" };
            }

            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi.db.query("api::product.product").findOne({
                        where: { id: product.id },
                    });

                    if (!item) {
                        return null;
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
                return { error: "No valid products found" };
            }

            console.log('Creating Stripe session...');
            
            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                success_url: `${process.env.CLIENT_URL}?success=true`,
                cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
                line_items: validItems,
                shipping_address_collection: { allowed_countries: ["IN", "US", "CA"] },
                payment_method_types: ["card"],
            });

            console.log('✅ Stripe session created:', session.id);

            // TEMPORARILY COMMENTED OUT - Testing if this is causing 500 error
            /*
            await strapi.service("api::order.order").create({
                data: {
                    products,
                    stripeId: session.id,
                },
            });
            */

            return { stripeSession: session };
            
        } catch (err) {
            console.error('❌ ERROR:', err.message);
            ctx.response.status = 500;
            return { error: err.message };
        }
    },
}));

// 'use strict';

// const stripe = require('stripe')(process.env.STRIPE_KEY);

// /**
//  * order router
//  */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::order.order', {
//     config: {
//         create: {
//             middlewares: [],
//         }
//     }
// }, ({ strapi }) => ({
//     async create(ctx) {
//         const { products } = ctx.request.body;

//         const lineItems = await Promise.all(
//             products.map(async (product) => {
//                 const item = await strapi
//                     .service("api::product.product")
//                     .findOne(product.id);

//                 return {
//                     price_data: {
//                         currency: "inr",
//                         product_data: {
//                             name: item.title,
//                         },
//                         unit_amount: Math.round(item.price * 100),
//                     },
//                     quantity: product.quantity,
//                 };
//             })
//         );

//         try {
//             const session = await stripe.checkout.sessions.create({
//                 mode: 'payment',
//                 success_url: `${process.env.CLIENT_URL}?success=true`,
//                 cancel_url: `${process.env.CLIENT_URL}?success=false`,
//                 line_items: lineItems,
//                 shipping_address_collection: {
//                     allowed_countries: ["IN"]
//                 },
//                 payment_method_types: ["card"],
//             });

//             await strapi.service("api::order.order").create({
//                 data: {
//                     products,
//                     stripeId: session.id,
//                 }
//             });

//             return { stripeSession: session };
//         } catch (error) {
//             console.error('Stripe Error:', error);
//             ctx.response.status = 500;
//             return { error: error.message };
//         }
//     }
// }));

'use strict';

/**
 * order router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::order.order');
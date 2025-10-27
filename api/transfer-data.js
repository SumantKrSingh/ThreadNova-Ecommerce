// const axios = require('axios');

// const SOURCE_URL = 'http://localhost:1337';
// const TARGET_URL = 'https://stylish-basket-4e6739a8e1.strapiapp.com';
// const TARGET_TOKEN = '0efde3b9ea2896d5320b4aa1d9d37ecf6394b1f340c8e810c22b227a73b5e8570876adb1a6bf42b2a3385a00473329c9a5b0a89b92726c8581ba44a3309120ddab0d75bbe18b36ef9bd01fb218783393cc0a4cbea480bc7acc9a4b0572da8d0049096c953e4541aae331c121134b98f5dfa2084fe70c95f8fcfa373731f2b6fd';

// async function transferData() {
//     console.log('🚀 Starting data transfer...\n');

//     try {
//         // 1. Get all categories from localhost
//         console.log('📥 Fetching categories from localhost...');
//         const categories = await axios.get(`${SOURCE_URL}/api/categories?populate=*`);
//         console.log(`✅ Found ${categories.data.data.length} categories\n`);

//         // 2. Get all sub-categories
//         console.log('📥 Fetching sub-categories from localhost...');
//         const subCategories = await axios.get(`${SOURCE_URL}/api/sub-categories?populate=*`);
//         console.log(`✅ Found ${subCategories.data.data.length} sub-categories\n`);

//         // 3. Get all products
//         console.log('📥 Fetching products from localhost...');
//         const products = await axios.get(`${SOURCE_URL}/api/products?populate=*`);
//         console.log(`✅ Found ${products.data.data.length} products\n`);

//         // 4. Transfer categories
//         console.log('📤 Transferring categories to cloud...');
//         for (const cat of categories.data.data) {
//             try {
//                 const catData = { ...cat.attributes };
//                 // Remove relations that will be handled separately
//                 delete catData.products;
//                 delete catData.sub_categories;

//                 await axios.post(
//                     `${TARGET_URL}/api/categories`,
//                     { data: catData },
//                     { headers: { Authorization: `Bearer ${TARGET_TOKEN}` } }
//                 );
//                 const name = catData.title || catData.name || catData.Title || 'Unnamed';
//                 console.log(`  ✓ ${name}`);
//             } catch (err) {
//                 console.log(`  ✗ Failed:`, err.response?.data?.error?.message || err.message);
//             }
//         }

//         // 5. Transfer sub-categories
//         console.log('\n📤 Transferring sub-categories to cloud...');
//         for (const subCat of subCategories.data.data) {
//             try {
//                 const subCatData = { ...subCat.attributes };
//                 // Remove relations
//                 delete subCatData.products;
//                 delete subCatData.categories;
//                 delete subCatData.category;

//                 await axios.post(
//                     `${TARGET_URL}/api/sub-categories`,
//                     { data: subCatData },
//                     { headers: { Authorization: `Bearer ${TARGET_TOKEN}` } }
//                 );
//                 const name = subCatData.title || subCatData.name || subCatData.Title || 'Unnamed';
//                 console.log(`  ✓ ${name}`);
//             } catch (err) {
//                 console.log(`  ✗ Failed:`, err.response?.data?.error?.message || err.message);
//             }
//         }

//         // 6. Transfer products
//         console.log('\n📤 Transferring products to cloud...');
//         for (const prod of products.data.data) {
//             try {
//                 const prodData = { ...prod.attributes };
//                 // Remove relations and images (handle separately)
//                 delete prodData.img;
//                 delete prodData.img2;
//                 delete prodData.categories;
//                 delete prodData.category;
//                 delete prodData.sub_categories;

//                 await axios.post(
//                     `${TARGET_URL}/api/products`,
//                     { data: prodData },
//                     { headers: { Authorization: `Bearer ${TARGET_TOKEN}` } }
//                 );
//                 const name = prodData.title || prodData.name || prodData.Title || 'Unnamed';
//                 console.log(`  ✓ ${name}`);
//             } catch (err) {
//                 console.log(`  ✗ Failed:`, err.response?.data?.error?.message || err.message);
//             }
//         }

//         console.log('\n🎉 Data transfer complete!');
//         console.log('\n⚠️  Note: Images and relationships need to be added separately.');
//     } catch (error) {
//         console.error('❌ Error:', error.message);
//         if (error.response) {
//             console.error('Response data:', error.response.data);
//         }
//         console.error('Full error:', error);
//     }
// }

// transferData();


const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const SOURCE_URL = 'http://localhost:1337';
const TARGET_URL = 'https://stylish-basket-4e6739a8e1.strapiapp.com';
const TARGET_TOKEN = '0efde3b9ea2896d5320b4aa1d9d37ecf6394b1f340c8e810c22b227a73b5e8570876adb1a6bf42b2a3385a00473329c9a5b0a89b92726c8581ba44a3309120ddab0d75bbe18b36ef9bd01fb218783393cc0a4cbea480bc7acc9a4b0572da8d0049096c953e4541aae331c121134b98f5dfa2084fe70c95f8fcfa373731f2b6fd';

// Map to store old ID to new ID mappings
const categoryMap = new Map();
const subCategoryMap = new Map();
const imageMap = new Map();

async function downloadImage(url) {
    const response = await axios.get(`${SOURCE_URL}${url}`, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
}

async function uploadImage(imageBuffer, filename) {
    const form = new FormData();
    form.append('files', imageBuffer, filename);

    const response = await axios.post(
        `${TARGET_URL}/api/upload`,
        form,
        {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${TARGET_TOKEN}`
            }
        }
    );
    return response.data[0];
}

async function transferData() {
    console.log('🚀 Starting complete data transfer with images...\n');

    try {
        // 1. Fetch all data from localhost
        console.log('📥 Fetching all data from localhost...');
        const [categoriesRes, subCategoriesRes, productsRes] = await Promise.all([
            axios.get(`${SOURCE_URL}/api/categories?populate=*`),
            axios.get(`${SOURCE_URL}/api/sub-categories?populate=*`),
            axios.get(`${SOURCE_URL}/api/products?populate=*`)
        ]);

        const categories = categoriesRes.data.data;
        const subCategories = subCategoriesRes.data.data;
        const products = productsRes.data.data;

        console.log(`✅ Found ${categories.length} categories`);
        console.log(`✅ Found ${subCategories.length} sub-categories`);
        console.log(`✅ Found ${products.length} products\n`);

        // 2. Transfer Categories with Images
        console.log('📤 Transferring categories with images...');
        for (const cat of categories) {
            try {
                let uploadedImageId = null;

                // Upload category image if exists
                if (cat.img?.url) {
                    console.log(`  📷 Uploading image for: ${cat.title}`);
                    const imageBuffer = await downloadImage(cat.img.url);
                    const uploadedImage = await uploadImage(imageBuffer, cat.img.name);
                    uploadedImageId = uploadedImage.id;
                    imageMap.set(cat.img.id, uploadedImageId);
                }

                // Create category
                const catData = {
                    title: cat.title,
                    desc: cat.desc
                };

                if (uploadedImageId) {
                    catData.img = uploadedImageId;
                }

                const response = await axios.post(
                    `${TARGET_URL}/api/categories`,
                    { data: catData },
                    { headers: { Authorization: `Bearer ${TARGET_TOKEN}` } }
                );

                categoryMap.set(cat.id, response.data.data.id);
                console.log(`  ✓ ${cat.title} (with image)`);
            } catch (err) {
                console.log(`  ✗ Failed: ${cat.title}`, err.response?.data?.error?.message || err.message);
            }
        }

        // 3. Transfer Sub-categories
        console.log('\n📤 Transferring sub-categories...');
        for (const subCat of subCategories) {
            try {
                const subCatData = {
                    title: subCat.title,
                    desc: subCat.desc
                };

                const response = await axios.post(
                    `${TARGET_URL}/api/sub-categories`,
                    { data: subCatData },
                    { headers: { Authorization: `Bearer ${TARGET_TOKEN}` } }
                );

                subCategoryMap.set(subCat.id, response.data.data.id);
                console.log(`  ✓ ${subCat.title}`);
            } catch (err) {
                console.log(`  ✗ Failed: ${subCat.title}`, err.response?.data?.error?.message || err.message);
            }
        }

        // 4. Transfer Products with Images and Relationships
        console.log('\n📤 Transferring products with images and relationships...');
        for (const prod of products) {
            try {
                let uploadedImageId = null;
                let uploadedImage2Id = null;

                // Upload product main image
                if (prod.img?.url) {
                    console.log(`  📷 Uploading images for: ${prod.title}`);
                    const imageBuffer = await downloadImage(prod.img.url);
                    const uploadedImage = await uploadImage(imageBuffer, prod.img.name);
                    uploadedImageId = uploadedImage.id;
                }

                // Upload product second image if exists
                if (prod.img2?.url) {
                    const imageBuffer2 = await downloadImage(prod.img2.url);
                    const uploadedImage2 = await uploadImage(imageBuffer2, prod.img2.name);
                    uploadedImage2Id = uploadedImage2.id;
                }

                // Create product with relationships
                const prodData = {
                    title: prod.title,
                    desc: prod.desc,
                    price: prod.price,
                    isNew: prod.isNew,
                    type: prod.type
                };

                if (uploadedImageId) prodData.img = uploadedImageId;
                if (uploadedImage2Id) prodData.img2 = uploadedImage2Id;

                // Map category relationships
                if (prod.categories?.length > 0) {
                    prodData.categories = prod.categories
                        .map(c => categoryMap.get(c.id))
                        .filter(id => id);
                }

                // Map sub-category relationships
                if (prod.sub_categories?.length > 0) {
                    prodData.sub_categories = prod.sub_categories
                        .map(sc => subCategoryMap.get(sc.id))
                        .filter(id => id);
                }

                await axios.post(
                    `${TARGET_URL}/api/products`,
                    { data: prodData },
                    { headers: { Authorization: `Bearer ${TARGET_TOKEN}` } }
                );

                console.log(`  ✓ ${prod.title} (with images & relationships)`);
            } catch (err) {
                console.log(`  ✗ Failed: ${prod.title}`, err.response?.data?.error?.message || err.message);
            }
        }

        console.log('\n🎉 Complete data transfer finished!');
        console.log(`\n📊 Summary:`);
        console.log(`   Categories transferred: ${categoryMap.size}/${categories.length}`);
        console.log(`   Sub-categories transferred: ${subCategoryMap.size}/${subCategories.length}`);
        console.log(`   Images uploaded: ${imageMap.size}`);
        console.log(`\n✅ Your Strapi Cloud is now fully populated with data, images, and relationships!`);
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    }
}

transferData();
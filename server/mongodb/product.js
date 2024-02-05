require('dotenv').config()
const { ObjectId } = require('mongodb');
const client = require('../config/db.config');

const dbName = process.env.DB_NAME
const collectionName = 'product'

const findProductByStore = async (storeId) => {
    return await client.getDb().db(dbName).collection(collectionName).find({ store_id: new ObjectId(storeId) }).toArray();
}

const findProductByStoreLink = async (store_link) => {
    return await client.getDb().db(dbName).collection(collectionName).find({ store_link }).toArray();
}

const findProductByCategoryId = async (categoryId) => {
    return await client.getDb().db(dbName).collection(collectionName).find({ category_id: new ObjectId(categoryId) }).toArray();
}

const findProductById = async (product_id, storeId) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ _id: new ObjectId(product_id), store_id: new ObjectId(storeId) });
}

const findProductByName = async (product_name, storeId) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ product_name, store_id: new ObjectId(storeId) });
}

const findActiveProducts = async (storeId) => {
    return await client.getDb().db(dbName).collection(collectionName).find({ store_id: new ObjectId(storeId), isActive: true }).toArray();
}

const addProduct = async (productObject, store_id) => {
    productObject["store_id"] = new ObjectId(store_id)
    return await client.getDb().db(dbName).collection(collectionName).insertOne(productObject);
}

const deleteProductById = async (productId, storeId) => {
    return await client.getDb().db(dbName).collection(collectionName).deleteOne({ _id: new ObjectId(productId), store_id: new ObjectId(storeId) });
}

const updateProductById = async (product_id, storeId, productObject) => {
    return await client.getDb().db(dbName).collection(collectionName).findOneAndUpdate({ _id: new ObjectId(product_id), store_id: new ObjectId(storeId) }, { $set: { ...productObject } }, { returnDocument: 'after' })
}

module.exports = { findActiveProducts, findProductById, findProductByStoreLink, findProductByCategoryId, findProductByStore, findProductByName, addProduct, deleteProductById, updateProductById }
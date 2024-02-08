import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()
const dbName = process.env.DB_NAME
const collectionName = 'category'

const pageLimit = process.env.PAGE_LIMIT

const addCategory = async (obj) => {
    return await getDb.db(dbName).collection(collectionName).insertOne(obj);
}

const findCategoryByStore = async (storeId, page) => {
    const skipLimit = (page * pageLimit) - pageLimit

    return await getDb.db(dbName).collection(collectionName).find(
        { store_id: new ObjectId(storeId) }
    )
        .skip(skipLimit)
        .limit(Number(pageLimit))
        .toArray()
}

const findCategory = async (filter, projection) => {
    return await getDb.db(dbName).collection(collectionName).findOne(filter, projection);
}

const findCategories = async (filter, page, sortBy) => {
    const skipLimit = (page * pageLimit) - pageLimit
    const sorting = {}

    if (sortBy) {
        const sortOrder = sortBy[0] === '-' ? -1 : 1
        const sortKey = sortBy[0] === '-' ? sortBy.slice(sortBy.lastIndexOf('-') + 1) : sortBy
        sorting[sortKey] = sortOrder
    }

    return await getDb.db(dbName).collection(collectionName).aggregate(filter)
        .skip(Number(skipLimit))
        .limit(Number(pageLimit))
        .sort(sorting)
        .toArray();
}

const findCategoryIdByName = async (filter, projection) => {
    return await getDb.db(dbName).collection(collectionName).find(filter).project({ projection }).toArray();
}

const deleteCategoryById = async (category_id, storeId) => {
    return await getDb.db(dbName).collection(collectionName).deleteOne(
        { _id: new ObjectId(category_id), store_id: new ObjectId(storeId) }
    )
}

const updateCategoryById = async (category_id, categoryObject) => {
    return await getDb.db(dbName).collection(collectionName).findOneAndUpdate(
        { _id: new ObjectId(category_id) },
        { $set: { ...categoryObject } },
        { returnDocument: 'after' }
    )
}

export { addCategory, findCategoryByStore, findCategory, findCategories, findCategoryIdByName, deleteCategoryById, updateCategoryById }
import { ObjectId } from "mongodb";

const categoryIdValidator = ({ category_id }, ctx) => {
  let err = null;

  if (ctx.params.categoryId) {
    category_id = ctx.params.categoryId;
  }

  if (!category_id) {
    err = { message: "Specify category id", field: "category_id" };
    return err;
  }
  category_id = category_id.trim();

  try {
    const temp = new ObjectId(category_id);
  } catch (error) {
    console.log(error.message);
    err = { message: "Invalid category id", field: "category_id" };
    return err;
  }

  return err;
};

const categoryNameValidator = ({ category_name }) => {
  let err = null;

  if (!category_name) {
    err = { message: "Specify category name", field: "category_name" };
    return err;
  }
  category_name = category_name.trim();
  if (category_name.length < 3) {
    err = { message: "Minimum 3 characters required", field: "category_name" };
    return err;
  }
  if (category_name.length > 20) {
    err = { message: "Maximum 20 characters allowed", field: "category_name" };
    return err;
  }

  return err;
};

const productIdValidator = ({ product_id }, ctx) => {
  let err = null;

  if (ctx.params?.productId) {
    product_id = ctx.params.productId;
  }

  if (!product_id) {
    err = { message: "Specify product id", field: "product_id" };
    return err;
  }
  product_id = product_id.trim();

  try {
    const temp = new ObjectId(product_id);
  } catch (error) {
    console.log(error.message);
    err = { message: "Invalid product id", field: "product_id" };
    return err;
  }

  return err;
};

//product validators
const productNameValidator = ({ product_name }) => {
  let err = null;

  if (!product_name) {
    err = { message: "Specify product name", field: "product_name" };
    return err;
  }

  product_name = product_name.trim();

  if (product_name.length < 3) {
    err = { message: "Minimum 3 characters required", field: "product_name" };
    return err;
  }

  if (product_name.length > 50) {
    err = { message: "Maximum 50 characters allowed", field: "product_name" };
    return err;
  }

  return err;
};

const oldProductNameValidator = ({ old_product_name }) => {
  let err = null;

  if (!old_product_name) {
    err = { message: "Specify old product name", field: "old_product_name" };
    return err;
  }

  old_product_name = old_product_name.trim();

  if (old_product_name.length < 3) {
    err = {
      message: "Minimum 3 characters required",
      field: "old_product_name",
    };
    return err;
  }

  if (old_product_name.length > 50) {
    err = {
      message: "Maximum 50 characters allowed",
      field: "old_product_name",
    };
    return err;
  }

  return err;
};

const stockValidator = ({ product_stock }) => {
  let err = null;

  if (!product_stock) {
    err = { message: "Specify stock value", field: "product_stock" };
    return err;
  }

  if (product_stock < 1) {
    err = { message: "Minimum 1 quantity required", field: "product_stock" };
    return err;
  }

  if (product_stock > 10) {
    err = { message: "Maximum 10 quantity allowed", field: "product_stock" };
    return err;
  }

  return err;
};

const descriptionValidator = ({ product_desc }) => {
  let err = null;

  if (!product_desc) {
    err = { message: "Specify product description", field: "product_desc" };
    return err;
  }

  product_desc = product_desc.trim();

  if (product_desc.length < 10) {
    err = { message: "Minimum 10 characters required", field: "product_desc" };
    return err;
  }

  return err;
};

const isActiveValidator = ({ isActive }) => {
  let err = null;

  if (isActive !== true && isActive !== false) {
    err = { message: "Invalid store status value", field: "isActive" };
    return err;
  }

  return err;
};

const priceValidator = ({ price }) => {
  let err = null;

  if (!price) {
    err = { message: "Specify price", field: "price" };
    return err;
  }

  if (typeof price !== "number") {
    err = { message: "Invalid price", field: "price" };
    return err;
  }

  return err;
};

const discountedPriceValidator = ({ discounted_price, price }) => {
  let err = null;

  if (!discounted_price) {
    return err;
  }

  if (typeof discounted_price !== "number") {
    err = { message: "Invalid discount price", field: "price" };
    return err;
  }

  if (discounted_price > price) {
    err = {
      message: "Discounted price must be less than the original price",
      field: "discounted_price",
    };
    return err;
  }

  if (discounted_price < 1) {
    err = {
      message: "Discounted price must be greater than 0",
      field: "discounted_price",
    };
    return err;
  }

  return err;
};

const imageLinkValidator = ({ img }) => {
  let err = null;

  return err;
};

const pageNoValidator = (_, ctx) => {
  let err = null;
  let page = ctx.query.page;

  if (!page) {
    err = { message: "Specify page", success: false };
    return err;
  }

  page = Number(page);

  if (isNaN(page)) {
    err = { message: "Invalid page", success: false };
    return err;
  }
  if (page < 1) {
    err = { message: "Specify page", success: false };
    return err;
  }
  return err;
};

const sortByValidator = (_, ctx) => {
  let err = null;
  const sortBy = ctx.query.sortBy;

  if (!sortBy) {
    return err;
  }
  if (Array.isArray(sortBy)) {
    err = { message: "Invalid sort by values", success: false };
    return err;
  }
  return err;
};

export {
  categoryIdValidator,
  categoryNameValidator,
  productIdValidator,
  oldProductNameValidator,
  productNameValidator,
  descriptionValidator,
  stockValidator,
  isActiveValidator,
  priceValidator,
  discountedPriceValidator,
  imageLinkValidator,
  pageNoValidator,
  sortByValidator,
};

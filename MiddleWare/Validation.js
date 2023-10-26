const {body}=require("express-validator")
module.exports.orderValidation=[
    body("clientId").isInt().withMessage("OrderID must be Integer"),
    // body('products.*.id').isInt().withMessage("ProductID must be Integer"),
    // body('products.*.quantity').isInt().withMessage("ProductID must be Integer"),
    body("shippingAddress").isObject().withMessage("shippingAddress"),
    body("shippingAddress.city").isAlpha().withMessage("city must be string"),
    body("shippingAddress.street").isString().withMessage("street must be string"),
]
module.exports.clientValidation=[
    body("fullName").isAlpha().withMessage("fullName must be string"),
    body("email").isString().matches(/.+\@.+\..+/).withMessage(" invalid Email"),
    body("phoneNumber").isString().matches(/^(010|011|012|015)+-+\d{8}$/).withMessage("please Enter valid phone Number like  010-xxxxxxxx"),
    body("address").isObject().withMessage("shippingAddress"),
    body("address.city").isAlpha().withMessage("city must be string"),
    body("address.street").isString().withMessage("street must be string"),
]
module.exports.productValidation=[
    body("name").isAlpha().withMessage("Product name must be string"),
    body("category").isAlpha().withMessage("Product Category must be string"),
    body("price").isNumeric().withMessage("Product Price must be number")

]

module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName)
    output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image)
    output = output.replace(/{%PRODUCT_PRICE%}/g, product.price)
    output = output.replace(/{%PRODUCT_CONUNTRY%}/g, product.from)
    output = output.replace(/{%PRODUNUTRIENTST_NAME%}/g, product.nutrients)
    output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity)
    output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description)
    if (!product.organic) output = output.replace(/{%NOT_ORGANC%}/g, 'not-organic')
    output = output.replace(/{%ID%}/g, product.id)
    return output
}
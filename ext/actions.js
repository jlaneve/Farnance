import HttpError from "@wasp/core/HttpError.js"

export const createProduct = async (args, context) => {
    if (!context.user) { throw new HttpError(403) }
    
    return context.entities.Product.create({
        data: {
            type: args.product,
            name: args.name,
            quality: args.quality,
            quantity: args.quantity,
            owner: { connect: { id: context.user.id }}
        }
    })
}


export const createOffer = async (args, context) => {
    if (!context.user) { throw new HttpError(403) }
    
    return context.entities.FinancingAgreement.create({
        data: {
            amount: args.amount,
            rate: args.rate,
            productType: args.productType,
            quality: args.quality,
            bank: { connect: { id: context.user.id }}
        }
    })
}
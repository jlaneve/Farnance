import HttpError from "@wasp/core/HttpError.js"

export const createProduct = async (args, context) => {
    if (!context.user) { throw new HttpError(403) }
    
    return context.entities.Product.create({
        data: {
            type: args.product,
            quality: args.quality,
            quantity: args.quantity,
            owner: { connect: { id: context.user.id }}
        }
    })
}
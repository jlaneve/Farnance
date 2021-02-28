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
            totalCapacity: args.amount,
            remainingCapacity: args.amount,
            rate: args.rate,
            productType: args.productType,
            quality: args.quality,
            bank: { connect: { id: context.user.id }}
        }
    })
}

export const acceptFinancingOffer = async (args, context) => {
    if (!context.user) { throw new HttpError(403) }
    
    const { offerId } = args;

    // Add relevant product to products list
    // Decrease remaining amount

    const offer = await context.entities.FinancingAgreement.findUnique({
        where: { id: offerId }
    })

    const products = await context.entities.Product.findMany({
        where: { ownerId: context.user.id, type: offer.productType, quality: offer.quality }
    })

    let remainingCapacity = offer.remainingCapacity;

    products.forEach(async product => {
        if (remainingCapacity > product.quantity) {
            remainingCapacity = remainingCapacity - product.quantity
            // Remove capacity
            await context.entities.FinancingAgreement.update({
                where: { id: offerId },
                data: {
                    remainingCapacity: remainingCapacity
                }
            })

            // Add to product
            await context.entities.Product.update({
                where: { id: product.id },
                data: {
                    financingAgreement: { connect: { id: offerId }}
                }
            })
        }
    })


    return true;
}
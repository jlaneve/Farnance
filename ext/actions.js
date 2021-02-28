import HttpError from "@wasp/core/HttpError.js"


const products = {
    "hard-red-winter-wheat": {
        "name": "Hard Red Winter Wheat",
        "price": 5
    },
    "durum-wheat": {
        "name": "Durum Wheat",
        "price": 4.5
    },
    "long-rice": {
        "name": "Long Grain Rice",
        "price": 5.5
    },
    "short-rice": {
        "name": "Short Grain Rice",
        "price": 4
    },
    "raw-sugar": {
        "name": "Raw Sugar",
        "price": 0.4
    },
    "refined-sugar": {
        "name": "Refined Sugar",
        "price": 0.2
    },
    "1-corn": {
        "name": "#1 Yellow Corn",
        "price": 3.85
    },
    "2-corn": {
        "name": "#2 Yellow Corn",
        "price": 3.75
    }
}


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
            totalCapacity: Math.floor(args.amount / products[args.productType].price),
            remainingCapacity: Math.floor(args.amount / products[args.productType].price),
            dollarValue: args.amount,
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
        if (remainingCapacity >= product.quantity) {
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
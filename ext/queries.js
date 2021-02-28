

export const getProducts = async (args, context) => {
    return context.entities.Product.findMany({
        where: { OR:
            [
                { owner: { id: context.user.id } },
                { financingAgreement: { bank: { id: context.user.id }} },
            ]
        }, select: {
            id: true,
            type: true,
            name: true,
            quality: true,
            quantity: true,
            agreementId: true,
            owner: {
                select: { username: true }
            }
        }
    })
}



export const getOffers = async (args, context) => {
    return context.entities.FinancingAgreement.findMany({
        where: { bank: { id: context.user.id }}
    })
}


export const getAvailableFinancing = async (args, context) => {
    const products = await context.entities.Product.findMany({ where: { owner: { id: context.user.id }}});

    let availableFinancing = [];


    for (const product of products) {
        if (!product.agreementId) {
            const offers = await context.entities.FinancingAgreement.findMany({
                where: {
                    productType: product.type,
                    quality: product.quality,
                    remainingCapacity: { gt: product.quantity }
                },
            })
    
            availableFinancing = availableFinancing.concat(offers)
        }
    }

    return availableFinancing
}


export const getMarket = async (args, context) => {
    return context.entities.Product.findMany({
        where: {
            agreementId: { gt: 0 }
        },
        select: {
            id: true,
            type: true,
            name: true,
            quality: true,
            quantity: true,

            financingAgreement: {
                select: { rate: true }
            }
        }
    })
}
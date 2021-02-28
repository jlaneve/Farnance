

export const getProducts = async (args, context) => {
    return context.entities.Product.findMany({
        where: { owner: { id: context.user.id }}
    })
}



export const getOffers = async (args, context) => {
    return context.entities.FinancingAgreements.findMany({
        where: { bank: { id: context.user.id }}
    })
}
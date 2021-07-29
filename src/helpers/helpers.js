export const getCardsByColumnId = (allCards, id) => {
    return allCards.filter(card => card.columnId === id)
}
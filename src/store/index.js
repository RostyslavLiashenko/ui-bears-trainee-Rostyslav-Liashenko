import {createStore} from 'vuex'

export default createStore({
    state: {
        myColumns: []
    },
    getters: {
        allColumns(state) {
            return state.myColumns
        }
    },
    mutations: {
        createColumn(state, newColumn) {
            state.myColumns.push(newColumn)
        },
        updateTitle(state, obj) {
            return state.myColumns = state.myColumns.map(el => {
                if (el.id === obj.id) {
                    return {...el, title: obj.title}
                } else {
                    return el
                }
            })
        },
        removeColumn(state, id) {
            return state.myColumns = state.myColumns.filter(el => {
                return el.id !== id
            })
        },
        createCard(state, obj) {
            state.myColumns.forEach(column => {
                if (column.id === obj.id) {
                    column.cards.push(obj)
                }
            })
        },
        addDesc(state, obj) {
            state.myColumns.forEach(column => {
                if (column.id === obj.idColumn) {
                    column.cards.forEach(card => {
                        if (card.newCard.id === obj.idCard) {
                            card.newCard.description = obj.desc
                        }
                    })
                }
            })
        },
        updateCardTitle(state, obj) {
            state.myColumns.forEach(column => {
                if (column.id === obj.idColumn) {
                    column.cards.forEach(card => {
                        if (card.newCard.id === obj.idCard) {
                            card.newCard.cardTitle = obj.title
                        }
                    })
                }
            })
        },
        removeCard(state, obj) {
            state.myColumns.forEach(column => {
                if (column.id === obj.idColumn) {
                    return column.cards = column.cards.filter(card => {
                        return card.newCard.id !== obj.idCard
                    })
                }
            })
        }
    },

})

import axios from "axios"


const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

export default {
    state: {
        myCards: []
    },
    getters: {
        myCards: (state) => state.myCards,
    },
    actions: {
        async getAllCards({commit}) {
            const res = await instance.get('cards')
            const cards = await res.data.Items
            if (res.status === 200) {
                commit('updateCards', cards)
            }
        },
        async createCard({commit}, obj) {
            const res = await instance.post('cards', {
                "columnId": obj.columnId,
                "cardTitle": obj.cardTitle,
                "orderCard": obj.orderCard
            })
            if (res.status === 200) {
                commit('createCard', res.data.body)
            }
        },
        async removeCard({commit}, id) {
            const res = await instance.delete(`card/${id}`)
            if (res.status === 200) {
                commit('removeCard', id)
            }
        },
        async updateOrderCard({commit, state}, obj) {
            let orderedCards = []
            state.myCards.forEach(card => {
                if (card.columnId === obj.columnId && card.orderCard > obj.orderCard) {
                    orderedCards.push({...card, orderCard: card.orderCard - 1})
                }
            })
            if (orderedCards.length > 0) {
                const res = await instance.put('card', {
                    "orderedCards": orderedCards
                })
                if (res.status === 200) {
                    commit('updateOrderCard', obj)
                }
            }
        },
        async removeCardFromCol({commit, state}, columnId) {
            await state.myCards.forEach(card => {
                if (card.columnId === columnId) {
                    instance.delete(`card/${card.id}`)
                    commit('removeCard', card.id)
                }
            })
        },
        async updateCardTitle({commit}, obj) {
            const res = await instance.put(`card/${obj.id}`, {
                "paramName": "cardTitle",
                "paramValue": obj.cardTitle
            })
            if (res.status === 200) {
                commit('updateCardTitle', obj)
            }
        },
        async addDesc({commit}, obj) {
            const res = await instance.put(`card/${obj.id}`, {
                "paramName": "description",
                "paramValue": obj.description
            })
            if (res.status === 200) {
                commit('addDesc', obj)
            }
        },
        async changeCardOrder({commit, state}, e) {
            let orderedCards = []
            state.myCards.forEach(card => {
                if (card.columnId === e.element.columnId) {
                    if (card.orderCard === e.oldIndex + 1) {
                        orderedCards.push({...card, orderCard: e.newIndex + 1})
                    } else if (e.oldIndex > e.newIndex && e.oldIndex >= card.orderCard && e.newIndex < card.orderCard) {
                        orderedCards.push({...card, orderCard: card.orderCard + 1})
                    } else if (e.oldIndex < e.newIndex && e.oldIndex < card.orderCard && e.newIndex + 1 >= card.orderCard) {
                        orderedCards.push({...card, orderCard: card.orderCard - 1})
                    }
                }
            })
            const res = await instance.put('card', {
                "orderedCards": orderedCards
            })
            if (res.status === 200) {
                commit('changeCardOrder', e)
            }
        },
        async addCardToAnotherCol({commit, state}, obj) {
            const {e} = obj
            const {columnId} = obj
            let orderedCards = []
            state.myCards.forEach(card => {
                if (card.columnId === columnId && card.orderCard > e.newIndex) {
                    orderedCards.push({...card, orderCard: card.orderCard + 1})
                } else if (card.id === e.element.id) {
                    orderedCards.push({...card, orderCard: e.newIndex + 1, columnId})
                }
            })
            if (orderedCards.length) {
                const res = await instance.put('card', {
                    "orderedCards": orderedCards
                })
                if (res.status === 200) {
                    commit('addCardToAnotherCol', obj)
                }
            }
        },
        async changeCardOrderInCol({commit, state}, e) {
            let orderedCards = []
            state.myCards.forEach(card => {
                if (e.element.columnId === card.columnId && card.orderCard > e.oldIndex) {
                    orderedCards.push({...card, orderCard: card.orderCard - 1})
                }
            })
            if (orderedCards.length) {
                const res = await instance.put('card', {
                    "orderedCards": orderedCards
                })
                if (res.status === 200) {
                    commit('changeCardOrderInCol', e)
                }
            }
        }
    },
    mutations: {
        updateCards(state, cards) {
            state.myCards = cards.sort((a, b) => {
                return a.orderCard - b.orderCard
            })
        },
        createCard(state, obj) {
            state.myCards = [...state.myCards, obj]

        },
        updateOrderCard(state, obj) {
            state.myCards.forEach(card => {
                if (card.columnId === obj.columnId && card.orderCard > obj.orderCard) {
                    card.orderCard -= 1
                }
            })
        },
        addDesc(state, obj) {
            state.myCards.forEach(card => {
                if (card.id === obj.id) {
                    card.description = obj.description
                }
            })
        },
        updateCardTitle(state, obj) {
            state.myCards.forEach(card => {
                if (card.id === obj.id) {
                    card.cardTitle = obj.cardTitle
                }
            })
        },
        removeCard(state, id) {
            state.myCards = state.myCards.filter(card => card.id !== id)
        },
        changeCardOrder(state, e) {
            state.myCards.forEach(card => {
                if (card.columnId === e.element.columnId) {
                    if (card.orderCard === e.oldIndex + 1) {
                        card.orderCard = e.newIndex + 1
                    } else if (e.oldIndex > e.newIndex && e.oldIndex >= card.orderCard && e.newIndex < card.orderCard) {
                        card.orderCard = card.orderCard + 1
                    } else if (e.oldIndex < e.newIndex && e.oldIndex < card.orderCard && e.newIndex + 1 >= card.orderCard) {
                        card.orderCard = card.orderCard - 1
                    }
                }
            })
        },
        addCardToAnotherCol(state, obj) {
            const {e} = obj
            const {columnId} = obj
            state.myCards.forEach(card => {
                if (card.columnId === columnId && card.orderCard > e.newIndex) {
                    card.orderCard = card.orderCard + 1
                } else if (card.id === e.element.id) {
                    card.orderCard = e.newIndex + 1
                    card.columnId = columnId
                }
            })
        },
        changeCardOrderInCol(state, e) {
            state.myCards.forEach(card => {
                if (e.element.columnId === card.columnId && card.orderCard > e.oldIndex) {
                    card.orderCard = card.orderCard - 1
                }
            })
        }
    },
}
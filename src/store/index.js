import {createStore} from 'vuex'
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

export default createStore({
    state: {
        myColumns: []
    },
    getters: {
        allColumns(state) {
            return state.myColumns
        }
    },
    actions: {
        async getAllColumnsCards({commit}) {
            const resCol = await instance.get('columns')
            const columns = await resCol.data.Items
            const resCard = await instance.get('cards')
            const cards = await resCard.data.Items
            if (resCol.status === 200 && resCard.status === 200) {
                commit('updateColumns', {columns, cards})
            }
        },
        async createColumn({commit}, title) {
            const res = await instance.post('column', {
                "title": title
            })
            const newColumn = await res.data.body
            if (res.status === 200) {
                commit('createColumn', newColumn)
            }
        },
        async removeColumn({commit}, id) {
            const res = await instance.delete(`column/${id}`)
            this.state.myColumns.forEach(column => {
                if (column.id === id) {
                    return column.cards.forEach(card => {
                        return instance.delete(`card/${card.id}`)
                    })
                }
            })
            if (res.status === 200) {
                commit('removeColumn', id)
            }
        },
        async updateColumnTitle({commit}, obj) {
            const res = await instance.put(`column/${obj.id}`, {
                "title": obj.title
            })
            if (res.status === 200) {
                commit('updateTitle', obj)
            }
        },
        async createCard({commit}, obj) {
            const res = await instance.post('cards', {
                columnId: obj.columnId,
                cardTitle: obj.cardTitle
            })
            if (res.status === 200) {
                commit('createCard', res.data.body)
            }
        },
        async removeCard({commit}, obj) {
            const res = await instance.delete(`card/${obj.id}`)
            if (res.status === 200) {
                commit('removeCard', obj)
            }
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
        }
    },
    mutations: {
        updateColumns(state, obj) {
            let newColumns = []
            for (let column of obj.columns) {
                for (let card of obj.cards) {
                    if (column.id === card.columnId) {
                        column.cards.push(card)
                    }
                }
                newColumns.push(column)
            }
            state.myColumns = newColumns
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
        createColumn(state, newColumn) {
            return state.myColumns.push(newColumn)
        },
        removeColumn(state, id) {
            return state.myColumns = state.myColumns.filter(el => {
                return el.id !== id
            })
        },
        createCard(state, obj) {
            state.myColumns.forEach(column => {
                if (column.id === obj.columnId) {
                    column.cards.push(obj)
                }
            })
        },
        addDesc(state, obj) {
            state.myColumns.forEach(column => {
                if (column.id === obj.columnId) {
                    column.cards.forEach(card => {
                        if (card.id === obj.id) {
                            card.description = obj.description
                        }
                    })
                }
            })
        },
        updateCardTitle(state, obj) {
            state.myColumns.forEach(column => {
                if (column.id === obj.columnId) {
                    column.cards.forEach(card => {
                        if (card.id === obj.id) {
                            card.cardTitle = obj.cardTitle
                        }
                    })
                }
            })
        },
        removeCard(state, obj) {
            state.myColumns.forEach(column => {
                if (column.id === obj.columnId) {
                    return column.cards = column.cards.filter(card => {
                        return card.id !== obj.id
                    })
                }
            })
        }
    },
})

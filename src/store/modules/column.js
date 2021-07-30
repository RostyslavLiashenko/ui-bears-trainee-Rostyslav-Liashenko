import axios from "axios";

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

export default {
    state: {
        myColumns: []
    },
    getters: {
        allColumns(state) {
            return state.myColumns
        },
    },
    actions: {
        async getAllColumns({commit}) {
            const res = await instance.get('columns')
            const columns = await res.data.Items
            if (res.status === 200) {
                commit('updateColumns', columns)
            }
        },
        async createColumn({commit, state}, title) {
            const res = await instance.post('column', {
                "title": title,
                "orderCol": state.myColumns.length ? state.myColumns.length + 1 : 1
            })
            const newColumn = await res.data.body
            if (res.status === 200) {
                commit('createColumn', newColumn)
            }
        },
        async removeColumn({commit}, id) {
            const res = await instance.delete(`column/${id}`)
            if (res.status === 200) {
                commit('removeColumn', id)
            }
        },
        async updateOrderCol({commit, state}, orderCol) {
            let orderedColumns = []
            state.myColumns.forEach(column => {
                if (column.orderCol > orderCol) orderedColumns.push({...column, orderCol: column.orderCol - 1})
            })
            if (orderedColumns.length > 0) {
                const res = await instance.put('columns', {
                    "orderedColumns": orderedColumns
                })
                if (res.status === 200) {
                    commit('updateOrderCol', orderCol)
                }
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
        async changeColOrder({commit, state}, e) {
            let orderedColumns = []
            state.myColumns.forEach(column => {
                if (column.orderCol === e.oldIndex + 1) {
                    orderedColumns.push({...column, orderCol: e.newIndex + 1})
                } else if (e.oldIndex > e.newIndex && e.oldIndex >= column.orderCol && e.newIndex < column.orderCol) {
                    orderedColumns.push({...column, orderCol: column.orderCol + 1})
                } else if (e.oldIndex < e.newIndex && e.oldIndex < column.orderCol && e.newIndex + 1 >= column.orderCol) {
                    orderedColumns.push({...column, orderCol: column.orderCol - 1})
                }
            })
            const res = await instance.put('columns', {
                "orderedColumns": orderedColumns
            })
            if (res.status === 200) {
                commit("changeColOrder", e)
            }
        }
    },
    mutations: {
        createColumn(state, newColumn) {
            state.myColumns.push(newColumn)
        },
        updateColumns(state, columns) {
            state.myColumns = columns.sort((a, b) => {
                return a.orderCol - b.orderCol
            })
        },
        updateOrderCol(state, orderCol) {
            state.myColumns.forEach(column => {
                if (column.orderCol > orderCol) {
                    column.orderCol -= 1
                }
            })
        },
        updateTitle(state, e) {
            return state.myColumns = state.myColumns.map(el => {
                if (el.id === e.id) {
                    return {...el, title: e.title}
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
        changeColOrder(state, e) {
            state.myColumns.forEach(column => {
                if (column.orderCol === e.oldIndex + 1) {
                    column.orderCol = e.newIndex + 1
                } else if (e.oldIndex > e.newIndex && e.oldIndex >= column.orderCol && e.newIndex < column.orderCol) {
                    column.orderCol = column.orderCol + 1
                } else if (e.oldIndex < e.newIndex && e.oldIndex < column.orderCol && e.newIndex + 1 >= column.orderCol) {
                    column.orderCol = column.orderCol - 1
                }
            })
        }

    }
}
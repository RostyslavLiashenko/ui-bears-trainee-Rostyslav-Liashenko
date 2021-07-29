import {createStore} from 'vuex'
import card from './modules/card'
import column from './modules/column'

export default createStore({
    modules: {
        card,
        column
    }
})

import locs from '../../utils/locs'

export default {
    state: {
        list: [],
        currCode: 'sh600446'
    },
    mutations: {
        SET_CURR_CODE: (state, code) => {
            state.currCode = code
        }
    }
}
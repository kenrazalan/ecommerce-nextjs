import {createContext, useReducer,useEffect} from 'react'
import reducers from './Reducer'
import {getData} from '../utils/fetchData'


export const DataContext = createContext()

export const DataProvider = ({children}) => {

    const initialState = {notify:{} , auth: {}, cart: [], orders: []}
    const [state,dispatch] = useReducer(reducers,initialState) 
    const {cart,auth} = state

    useEffect(() => {
        const firstlogin = localStorage.getItem("firstLogin")
        if(firstlogin){
            getData('auth/accessToken').then(res =>{
                if(res.err) return localStorage.removeItem("firstLogin")

                dispatch({
                    type: 'AUTH',
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            })
        }
    },[])

    useEffect(() => {
        const __next_cart = JSON.parse(localStorage.getItem('__next_cart'))
        if(__next_cart) dispatch({type: "ADD_CART", payload: __next_cart})
    },[])

    useEffect(() => {
        localStorage.setItem('__next_cart', JSON.stringify(cart) )
    },[cart])

    useEffect(() => {
        if(auth.token){
            getData('order', auth.token)
            .then( res => {
                if(res.err) return dispatch({type:'NOTIFY', payload: {error: err}})
                dispatch({type: 'ADD_ORDERS', payload: res.orders })
            })
        }
    },[auth.token])



    return(
        <DataContext.Provider value={{state,dispatch}}>
            {children}
        </DataContext.Provider>
    )
}
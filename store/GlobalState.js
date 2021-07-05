import {createContext, useReducer,useEffect} from 'react'
import reducers from './Reducer'
import {getData} from '../utils/fetchData'


export const DataContext = createContext()

export const DataProvider = ({children}) => {

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
    const initialState = {notify:{} , auth: {}, cart: []}
    const [state,dispatch] = useReducer(reducers,initialState) 


    return(
        <DataContext.Provider value={{state,dispatch}}>
            {children}
        </DataContext.Provider>
    )
}
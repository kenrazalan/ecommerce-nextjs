import {createContext, useReducer,useEffect} from 'react'
import reducers from './Reducer'
import {getData} from '../utils/fetchData'


export const DataContext = createContext()

export const DataProvider = ({children}) => {
    const initialState = {notify:{} , auth: {}}
    const [state,dispatch] = useReducer(reducers,initialState) 


    return(
        <DataContext.Provider value={{state,dispatch}}>
            {children}
        </DataContext.Provider>
    )
}
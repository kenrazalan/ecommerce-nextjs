import { useContext, useState } from "react";
import { DataContext } from "../store/GlobalState";
import Toast from './Toast'
import Loading from '../components/Loading'


const Notify = () =>{
    const {state,dispatch} = useContext(DataContext)

    const {notify} = state

    return(
        <>
            {notify.loading && <Loading/>}
            {notify.error &&
                <Toast
                    msg={{ msg: notify.error, title: "Error"}}
                    handleShow={()=> dispatch({type: "NOTIFY", payload: {}})}
                    bgColor="bg-red-500"
                />}
            {notify.success && 
                <Toast
                    msg={{ msg: notify.success, title: "Success"}}
                    handleShow={()=> dispatch({type: "NOTIFY", payload: {}})}
                    bgColor="bg-green-500"
                />}
        </>
    )
}

export default Notify
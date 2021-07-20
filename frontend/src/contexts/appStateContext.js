import { createContext, useContext} from "react";
import useAppState from "../hooks/useAppState";

//create context object with two properties (provider,consumer)
const AppStateContext = createContext(null)

export const AppStateProvider =({ children }) =>{
    const { appState, error, setAppState, setError, vendorState, setvendorState } = useAppState()
    return(
        <AppStateContext.Provider value={{appState,error,setAppState,setError, vendorState, setvendorState}}>
            <>{children}</>
        </AppStateContext.Provider>
    )
}


export const useAppStateContext = () => useContext(AppStateContext)
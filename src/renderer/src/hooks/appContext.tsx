// @ts-nocheck
import {
  createContext,
  useReducer,
} from 'react';

import { AppReducer } from '@renderer/repository/appReducer';

const APP_CONTEXT = createContext(null)

export function  AppContext({children}){

    const [appData , dispatch] = useReducer(AppReducer ,
        {
        paysReducer : [] , 
        partenaireReducer : [], 
        caveauxReducer : [], 
    })

    return(
        <APP_CONTEXT.Provider  value={{appData , dispatch}}>
            {children}
        </APP_CONTEXT.Provider>
    )

}
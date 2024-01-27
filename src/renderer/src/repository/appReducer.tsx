// @ts-nocheck

export function AppReducer(appData , action){

    return {
        paysReducer : PaysRducer(appData , action) , 
        partenaireReducer : PaysRducer(appData , action) , 
        caveauxReducer : PaysRducer(appData , action) , 
    }


}

function PaysRducer(appData , action){

    switch(action?.TYPE){
        case 'add' : {
            return [
                ...appData?.paysReducer , 
                {
                    "" : ""
                }
            ]
        }
        default : {
            return [
                ...appData?.paysReducer , 
            ]
        }
    }

}

function  partenaireReducer(appData , action){
    switch(action?.TYPE){
        case 'add' : {
            return [
                ...appData.partenaireReducer , 
                {
                    "" : ""
                }
            ]
        }
    }
}

export function caveauxReducer(appData , action){
    switch(action?.TYPE){
        case 'add' : {
            return[
                ...appData?.caveauxReducer , 
                {
                    "" : ""
                }
            ]
        }
    }
}
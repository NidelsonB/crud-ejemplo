import React from "react";


const SECURITY_CODE = "1234";

function UseReducer({name}) {
    const [state, dispatch] = React.useReducer(reducer, initialState); 
    
    const onConfirm = () => {
        dispatch({ type: actionTypes.CONFIRM });
    }

    const onError = () => {
        dispatch({ type: actionTypes.ERROR });
    }

    const onWrite = (newValue) => {
        dispatch({ type: actionTypes.WRITE, payload: newValue });
    }

    const onCheck = () => {
        dispatch({ type: actionTypes.CHECK });
    }

    const onDelete = () => {
        dispatch({ type: actionTypes.DELETE });
    }

    const onReset = () => {
        dispatch({ type: actionTypes.RESET });
    }



    React.useEffect(() => {
       console.log('Starting the effect');
        
       if (!!state.loading) {
        setTimeout(() => {
            console.log('Validating...')

            if (state.value === SECURITY_CODE) {

                onConfirm();
            } else {
                onError();
            }
    
            console.log('Ending validation...')
               
           }, 1000);
       }


       console.log('Ending the effect'); 
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Delete {name}</h2>
    
                <p>Please, enter the security code.</p>
    
                {(state.error && !state.loading) && (
                    <p>Error: The security code is incorrect.</p>
                )}
                {state.loading && (
                    <p>Loading...</p>
                )}
    
                <input
                 placeholder="Security Code"
                 value={state.value}
                 onChange={(event) => {
                    onWrite(event.target.value)
                    // onWrite(event);
                 }}
                 onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      dispatch({ type: 'CHECK' });
                    }
                  }}
                 />
                <button
                    onClick={onCheck}
                    // {onCheck}
                >Check</button>
            </div>
    
        );
    } else if (state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Are you sure you want to delete {name}?</p>
                <button 
                    onClick={onDelete}
                >
                    Yes, I'm sure
                </button>
                <button 
                    onClick={onReset}
                >
                    Go back
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Successfully deleted</p>

                <button
                    onClick={onReset}
                >
                    Restore information
                </button>
            </React.Fragment>
        );
    }
}






const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    CONFIRM: 'CONFIRM',
    ERROR: 'ERROR',
    DELETE: 'DELETE',
    CHECK: 'CHECK',
    RESET: 'RESET',
    WRITE: 'WRITE',
}
 
const reducerObject = (state, payload) => ({
    [actionTypes.CONFIRM]:{
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.ERROR]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.WRITE]: {
        ...state,
        value: payload
    },
    [actionTypes.CHECK]: {
        ...state,
        loading: true,
    },
    [actionTypes.DELETE]: {
        ...state,
        deleted: true
    },
    [actionTypes.RESET]:{
        ...state,
        confirmed: false,
        value: '',
        deleted: false,
        loading: false
    },
});

const reducer = (state, action)=>{
    if(reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
};

export { UseReducer };
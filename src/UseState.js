import React from "react";


const SECURITY_CODE = "1234";

function UseState({name}) {
    const [state, setState] = React.useState({
        value: "",
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    })

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
        })
    }

    const onWrite = (event) => {
        setState({
            ...state,
            value: event.target.value});
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true
        });
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            value: '',
            deleted: false,
        });
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
                    onWrite(event);
                 }}
                 />
                <button
                    onClick={onCheck}
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

export { UseState };
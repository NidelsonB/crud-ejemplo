import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = "1234";


class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            error: false,
            loading: false,
        }
    }

    componentDidUpdate() {
        if(!!this.state.loading) {
            setTimeout(() => {
                if (SECURITY_CODE === this.state.value) {
                    this.setState({error: false, loading: false});
                } else {
                    this.setState({error: true, loading: false});
                }
            }, 3000);
        }
    }
    
    render(){
        return (
            <div>
                <h2>Delete {this.props.name}</h2>

                <p>Please, enter the security code.</p>

                {(this.state.error  && !this.state.loading) && (
                <p>Error: The security code is incorrect.</p>
            )}
                {this.state.loading && (
                <Loading />
            )}

                <input
                 placeholder="Security Code"
                 value={this.state.value}
                 onChange={(event) => {
                    this.setState({value: event.target.value});
                 }}
                 />
                <button /*onClick={() => this.setState({error: !this.state.error})}*/
                    onClick={() =>
                         this.setState({loading: true})}
                >Check</button>
            </div>

        );
    }
}



export { ClassState };
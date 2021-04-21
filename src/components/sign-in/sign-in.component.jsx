import React from "react";
import react from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth,signInWithGoogle} from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    handelSubmit =  async event => {
        event.preventDefault();

        const {email,password}=this.state;

        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({ email: "", password: "" })
        }catch(err){
            console.error(err);
        }

    }

    handleChange=event=>{
        const {value,name}=event.target;
        this.setState({[name]:value})
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handelSubmit}>
                    <FormInput name="email" type="email" value={this.state.email} 
                    label="email"
                    handleChange={this.handleChange}
                    required></FormInput>

                   

                    <FormInput name="password" type="password" value={this.state.password}
                    label="password"
                    handleChange={this.handleChange}
                     required></FormInput>

                    
                    <div className="buttons">

                    <CustomButton type="submit">SIGN IN</CustomButton>
                    <br></br>

                    <CustomButton  isGoogleSignIn onClick={signInWithGoogle}>
                    {' '}
                    sign in with google{' '}
                    </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;
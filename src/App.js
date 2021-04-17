import React, {Component} from 'react';
import { Switch, Route,Redirect } from "react-router-dom";
import './App.css';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import { setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selector"
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth,createUserProfileDocument} from "./firebase/firebase.utils";
import CheckoutPage from "./pages/checkout/checkout.component";


class App extends Component {
  

    unsubscribeFromAuth=null

    componentDidMount(){

      const {setCurrentUser} =this.props;

     this.unsubscribeFromAuth=auth.onAuthStateChanged( async userAuth=>{
        // this.setState({currentUser:user}); 
        if(userAuth){
            const userRef= await  createUserProfileDocument(userAuth);

            userRef.onSnapshot(snapshot=>{
             setCurrentUser({
                  id:snapshot.id,
                  ...snapshot.data()
                });
            });
            
        }
        setCurrentUser(userAuth);

        // createUserProfileDocument(user);

        
      })
    }


    componentWillUnmount(){
      this.unsubscribeFromAuth(); 
    }


  render(){ 
    return (
      <div >
        <Header > </Header>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route path="/checkout" component={CheckoutPage}></Route>
          <Route exact path="/signin"
           render={()=>this.props.currentUser?(<Redirect to="/"></Redirect>):(<SignInAndSignUpPage></SignInAndSignUpPage>)}
          ></Route>
        
        </Switch>
      </div>
    );
  }
 
}

const mapStateToProps=createStructuredSelector({
  currentUser:selectCurrentUser
})

const mapDispatchToProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);

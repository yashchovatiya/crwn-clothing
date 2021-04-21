import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import  "./header.styles.scss";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {auth} from "../../firebase/firebase.utils";
import {createStructuredSelector} from "reselect";
import {SelectCartHidden} from "../../redux/cart/cart.selectors";
import {selectCurrentUser} from "../../redux/user/user.selector";

import {ReactComponent as Logo } from "../../assets/crown.svg.svg";

import CartIcon from "../cart-icon/cart-icon.component";

const Header =({currentUser,hidden})=>(
    <div className="header">
        <Link className="logo-container" to="/">
             <Logo className="logo" ></Logo>
        </Link>
        <div className="options">
             <Link className="option" to="/shop">
                 SHOP
             </Link>
             {/* <Link className="option" to="/shop">
                 CONTACT
             </Link> */}
             {
                 currentUser?
                 <div className="option " onClick={()=>auth.signOut()}>SIGN OUT</div>
                 :
                 <Link  className="option " to="/signin">SIGN IN</Link>
             }

             <CartIcon ></CartIcon>
        </div>
        {
            hidden?null:
        <CartDropdown></CartDropdown>
        }
    </div>
);

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:SelectCartHidden
});  

export default connect(mapStateToProps)(Header);
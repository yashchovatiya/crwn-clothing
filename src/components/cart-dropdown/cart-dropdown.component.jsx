import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import CustomButton from "../custom-button/custom-button.component";

const CartDropdown = ({ cartItems, history, dispatch, currentUser }) => {
   
    return (

        <div className="cart-dropdown">
           
            <div className="cart-items">
                {
                    cartItems.length ?
                        cartItems.map(cartItem => <CartItem
                            key={cartItem.id} item={cartItem}
                        ></CartItem>) :
                        <span className="empty-message">Your cart is empty</span>
                }
            </div>
            {
                currentUser ?
                
                    <CustomButton   className="button" onClick={
                        () => {
                            history.push("/checkout");
                            dispatch(toggleCartHidden())
                        }
                    }>GO TO CHECKOUT</CustomButton>
                    :
                    <h3>Do Sign In For Checkout</h3>
            }

        </div>
    )

}


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    currentUser: selectCurrentUser

})

export default withRouter(connect(mapStateToProps)(CartDropdown));
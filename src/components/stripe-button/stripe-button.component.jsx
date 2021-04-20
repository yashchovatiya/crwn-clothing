import React from "react";
import { connect } from "react-redux";
import { paymentDone } from "../../redux/cart/cart.actions";

import StripeCheckout from "react-stripe-checkout";


const onToken = token => {
    console.log(token);
    alert("Payment Successful");

}

const StripeCheckoutButton = ({ price, paymentdone }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51IhtduSGosxZxMqmPD5L8t2RQpevyMetsVKZIfJOGBlHXKLBQtaPtNhgaDloSzVakDWPdzVT1Cp45ZCJdxICRhGL00chssmfVz";

    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={() => {
                paymentdone();
                alert("Payment Successful");
                
            }}
            stripeKey={publishableKey}
        >

        </StripeCheckout>
    )
};


const mapDispatchToProps = dispatch => ({
    paymentdone: () => dispatch({ type: 'PAYMENT_DONE' })
})


export default connect(null, mapDispatchToProps)(StripeCheckoutButton);


// export default StripeCheckoutButton;
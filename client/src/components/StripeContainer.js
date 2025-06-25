
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51KtvH7HFaB3r5EfC8uSGJ9g1ShB5VajPzLViYoAdpTIZS6LbcYs1b3aNKkjMpxQuuCrB0DDLCr9k5LZn1GwmXlvZ00Y23aozre"

const stripeTestPrimise = loadStripe(PUBLIC_KEY)
    
export default function StripeContainer(){
    return (
        <Elements stripe={stripeTestPrimise}>
            <PaymentForm />

        </Elements>
    )
}

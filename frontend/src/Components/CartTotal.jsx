import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../Context/ShopContextContext'

const CartTotal = () => {
    const { getCartAmount, currency, deliveryCharge } = useContext(ShopContext)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const calculateTotal = async () => {
            const amount = await getCartAmount()
            setTotal(amount)
        }
        calculateTotal()
    }, [getCartAmount])

    return (
        <div className="pt-4">
            <div className="flex justify-between items-center mb-2">
                <p>Subtotal</p>
                <p>{currency}{total}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
                <p>Delivery Charge</p>
                <p>{currency}{deliveryCharge}</p>
            </div>
            <div className="flex justify-between items-center font-semibold text-lg">
                <p>Total</p>
                <p>{currency}{total>0?total + deliveryCharge:0}</p>
            </div>
        </div>
    )
}

export default CartTotal
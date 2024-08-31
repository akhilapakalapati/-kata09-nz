import { useState } from 'react';
import './index.css';

const Checkout = () => {
    // Mock groupedCartItems to display in the UI
    const groupedCartItems = [
        {
            product: { name: "Product A", price: 50 },
            quantity: 2,
        },
        {
            product: { name: "Product B", price: 30 },
            quantity: 1,
        },
        {
            product: { name: "Product C", price: 20 },
            quantity: 3,
        },
    ];

    const [groupedProducts, setGroupedProducts] = useState([]);

    const fetchDiscountedPrices = () => {
        // Mock object to simulate API response
        const mockApiResponse = groupedCartItems.map((item) => {
            const actualTotal = item.product.price * item.quantity;
            const discount = actualTotal * 0.1; // Example 10% discount
            const afterDiscountPrice = actualTotal - discount;

            return {
                product: item.product,
                quantity: item.quantity,
                actualTotal: actualTotal,
                discount: discount,
                afterDiscountPrice: afterDiscountPrice,
            };
        });

        setGroupedProducts(mockApiResponse);
    };

    return (
        <div>
            <nav className="scan-nav-container-styling">
                <h1>Checkout</h1>
            </nav>

            {/* Display groupedCartItems before calculating discounts */}
            <ul className='checkout-mainlist'>
                {groupedCartItems.map((item, index) => (
                    <li key={index} className='checkout-sublist2'>
                        {item.product.name} - Quantity: {item.quantity} -
                        Total: ${(item.product.price * item.quantity).toFixed(2)}
                    </li>
                ))}
            </ul>

            <button onClick={fetchDiscountedPrices} className="cal-btn">
                Calculate Discounts
            </button>

            {/* Display discounted products after fetching */}
            {groupedProducts.length > 0 && (
                <ul className='checkout-mainlist'>
                    {groupedProducts.map((item, index) => (
                        <li key={index} className='checkout-sublist'>
                            {item.product.name} - Quantity: {item.quantity} -
                            Actual Total: ${item.actualTotal.toFixed(2)} -
                            Discount: ${item.discount.toFixed(2)} -
                            After Discount Price: ${item.afterDiscountPrice.toFixed(2)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Checkout;

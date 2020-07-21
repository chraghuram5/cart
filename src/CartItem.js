import React from 'react';

const CartItem = (props) => {
    //console.log('cart item props', props);
    const { img,price, title, qty } = props.product;
    const { product, onIncreaseQuantity, onDecreaseQuantity, onDeleteQuantity } = props;
    return (
        <div className="cart-item">
            <div className="left-block">
                <img src={img} style={styles.image} />
            </div>
            <div className="right-block">
                <div style={{ fontsize: 25 }}>{title}</div>
                <div style={{ color: '#777' }}>{price}</div>
                <div style={{ color: '#777' }}>{qty}</div>
                <div className="cart-item-actions">
                    {/*Buttons*/}
                    <img
                        alt="increase"
                        className="action-icons"
                        src="https://image.flaticon.com/icons/svg/864/864378.svg"
                        onClick={() => onIncreaseQuantity(product)}
                    />
                    <img
                        alt="decrease"
                        className="action-icons"
                        src="https://image.flaticon.com/icons/svg/864/864378.svg"
                        onClick={() => onDecreaseQuantity(product)}
                    />
                    <img
                        alt="increase"
                        className="action-icons"
                        src="https://image.flaticon.com/icons/svg/864/864378.svg"
                        onClick={() => onDeleteQuantity(product.id)}
                    />
                </div>
            </div>
        </div>
    )
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4
    }
}

export default CartItem;
import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';


const { Meta } = Card;
const ProductCard = ({ product }) => {

    const [tooltip, setTooltip] = useState('לחץ להוספה');

    //redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const handleAddToCart = () => {

        //create cart array
        let cart = []
        if (typeof window !== 'undefined') {
            // if cart is in local storage GET it
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            //remove duplicate
            let unique = _.uniqWith(cart, _.isEqual);

            //save to local storage
            // console.log('unique', unique);
            localStorage.setItem('cart', JSON.stringify(unique));

            //show tooltip
            setTooltip("נוסף");

            //add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            //show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };

    // destructure
    const { images, title, description, slug, price } = product;

    return (
        <>

            {product && product.ratings && product.ratings.length > 0 ? (
                showAverage(product)
            ) : (
                <div className="text-center pt-1 pb-3"> ללא דירוג</div>
            )}

            <Card style={{ maxWidth: "350px" }}
                cover={
                    <img
                        src={images && images.length ? images[0].url : laptop}
                        style={{ height: "100%", maxHeight: "200px", maxWidth: "350px", objectFit: 'cover' }}
                        className="p-1"
                    />
                }

                actions={[

                    <Link to={`/product/${slug}`}>
                        <DollarOutlined className="text-primary" /> <br /><b> ₪{price}</b>
                    </Link>,

                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                            <ShoppingCartOutlined
                                className="text-danger" /> <br />
                            {product.quantity < 1 ? ('אזל המלאי') : ('הוסף לעגלה')}
                        </a>
                    </Tooltip>,

                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-primary" /> <br /> הצג מוצר
                    </Link>,



                ]}

            >
                <Meta
                    title={`${title}`}
                    description={`${description && description.substring(0, 20)}...`}
                />


            </Card>
        </>
    );
};
export default ProductCard;

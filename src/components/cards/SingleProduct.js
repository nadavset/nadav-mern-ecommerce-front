import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from '../../images/laptop.png';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist } from '../../functions/user';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import "../../carousel.css"


const { TabPane } = Tabs;

// this is children component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {

    const [tooltip, setTooltip] = useState('Click to add');

    //redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    // router
    const history = useHistory();

    const { title, images, description, _id } = product;

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
            setTooltip("Added");

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

    const handleAddToWishlist = e => {
        e.preventDefault();
        addToWishlist(product._id, user.token).then(res => {
            console.log('ADDED TO WISHLIST', res.data);
            toast.success('Added to wishlist');
            history.push('/user/wishlist');
        });
    };


    return (
        <>


            <div className="col-md-7">
                <div >
                    {images && images.length ? (
                        <Carousel centerMode showStatus={false} className="custom-tag" >
                            {images && images.map((i) => <img src={i.url} key={i.public_id}  style={{ height:"100%"}}/>)}
                        </Carousel>
                    ) : (
                        <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
                    )}
                </div>
                <Tabs type="card">
                    <TabPane tab="תיאור" key="1" >
                        {description && description}
                    </TabPane>
                    <TabPane tab="עוד" key="2" >
                        לבירורים לגבי המוצר פנו אלינו בטלפון 052-2222222
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                <h1 className="bg p-3 text-right">{title}</h1>

                {product && product.ratings && product.ratings.length > 0 ? (
                    showAverage(product)
                ) : (
                    <div className="text-center pt-1 pb-3"> ללא דירוג</div>
                )}


                <Card
                    actions={[
                        <RatingModal>
                            <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>,

                        <a onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-info" /> <br /> הוסף לרשימה
                            </a>,

                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined
                                    className="text-danger" /> <br /> הוסף לעגלה
</a>
                        </Tooltip>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>

        </>
    );
};

export default SingleProduct;

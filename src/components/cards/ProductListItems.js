import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItems = ({ product }) => {
    const { price, category, subs, shipping, color, brand, quantity, sold } = product;
    return (
        <ul className="list-group">
            <li className="list-group-item">
                ₪{price}
                <span className='label label-default label-pill pull-xs-right'>
                    מחיר {" "}
                </span>
            </li>

            { category && (<li className="list-group-item">

                <Link to={`/category/${category.slug}`} className='label label-default label-pill pull-xs-left'>
                    {category.name}
                </Link>
                <span className='label label-default label-pill pull-xs-right'>
                    קטגוריה {" "}
                </span>

            </li>
            )}

            {subs && (
                <li className="list-group-item">

                    {subs.map((s) => (
                        <Link
                            key={s._id}
                            to={`/sub/${s.slug}`}
                            className='label label-default label-pill pull-xs-left'>
                            {s.name}
                        </Link>
                    ))}
                    <span className='label label-default label-pill pull-xs-right'>
                        קטגוריית משנה {" "}
                    </span>
                </li>
            )}

            <li className="list-group-item">
                {shipping}
                <span className='label label-default label-pill pull-xs-right'>

                    משלוח {" "}
                </span>
            </li>

            <li className="list-group-item">
                {color}
                <span className='label label-default label-pill pull-xs-right'>
                    צבע {" "}
                </span>
            </li>

            <li className="list-group-item">
                {brand}
                <span className='label label-default label-pill pull-xs-right'>
                    חברה {" "}
                </span>
            </li>

            <li className="list-group-item">
                {quantity}
                <span className='label label-default label-pill pull-xs-right'>
                    יחידות זמינות {" "}
                </span>
            </li>

            <li className="list-group-item">
                {sold}
                <span className='label label-default label-pill pull-xs-right'>
                    נמכרו {" "}
                </span>
            </li>
        </ul>
    );
};

export default ProductListItems;
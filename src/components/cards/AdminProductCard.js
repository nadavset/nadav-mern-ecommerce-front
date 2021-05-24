import React from 'react';
import { Card } from 'antd';
import laptop from '../../images/laptop.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';


const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {

    const { title, description, images, slug } = product;


    return (
        <Card
            style={{ maxWidth: "350px" }}
            cover={
                <img
                    src={images && images.length ? images[0].url : laptop}

                    style={{ height: "100%", maxHeight: "200px", maxWidth: "350px", objectFit: 'cover' }}
                    className="p-1"
                />
            }
            actions={[
                <Link to={`/admin/product/${slug}`}>
                    <EditOutlined className="text-warning" />
                </Link>,
                <DeleteOutlined
                    onClick={() => handleRemove(slug)}
                    className="text-danger" />,
            ]}
        >
            <Meta
                title={title}
                description={`${description && description.substring(0, 40)}...`}
            />
        </Card>
    );
};

export default AdminProductCard;
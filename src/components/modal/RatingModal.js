import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LoginOutlined, StarOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';


const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);

    let history = useHistory();
    let { slug } = useParams();

    // console.log("slug", slug);

    const handleModal = () => {
        if (user && user.token) {
            setModalVisible(true);
        } else {
            history.push({
                pathname: '/login',
                state: { form: `/product/${slug}` },
            });
        }
    };

    return (
        <>

            <div onClick={handleModal}>
                <StarOutlined className="text-danger" /> <br /> {" "}
                {user ? "דרג" : "התחבר כדי לדרג"}
            </div>

            <Modal
                title="Leave your rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false);
                    toast.success('Thanks for your review. It will appear soon');
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>

        </>
    );

};

export default RatingModal;
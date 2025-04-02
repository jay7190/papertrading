import {Typography, Badge, Image, Space, Drawer } from "antd";
import {MailOutlined, BellFilled} from "@ant-design/icons";
import { useState } from "react";
import "./Header.css"

function Header(){

    const [commentsOpen, setCommentsOpen] = useState(false)
    const [notificationOpen, setNotificationOpen] = useState(false)
    return(
        <div className="Header">
            <Image src="/logo2.png" width={38}/>
            <Typography.Title>Admin Dashboard</Typography.Title>
            <Space>
                <Badge count={10} dot>
                    <MailOutlined style={{ fontSize:24}} onClick={() => {
                        setNotificationOpen(true);
                    }}/>
                </Badge>
                <Badge count={20}>
                    <BellFilled style={{ fontSize:24}} onClick={() => {
                        setNotificationOpen(true);
                    }} />
                </Badge>
            </Space>
            <Drawer 
                title="Comments" 
                open={commentsOpen} 
                onClose={() =>{
                    setCommentsOpen(false);
                }} maskClosable
            >
            </Drawer>
            <Drawer 
                title="Notification" 
                open={notificationOpen} 
                onClose={() =>{
                    setNotificationOpen(false);
                }} maskClosable
            >
            </Drawer>
        </div>
    )
};
export default Header;
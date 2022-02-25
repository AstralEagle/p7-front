import React, { useState, useEffect } from "react"
import Items from '../Message/ItemMessage'
import Request from '../../../Outil/request'
import Header from '../../../Outil/header'
import '../../../Style/Post/Message/Message.css'

export default function Messages() {
    const [data, setData] = useState([]);
    const getPostMessage = () => {
        Request('post/', Header.loged('GET'), (res) => { setData(res) })
    }
    useEffect(() => {
        getPostMessage();
    },[])

    return (
        <div className="AllMsg">
            {data.map( value => (
                <Items message={value} key={"message"+value.id+value.name}/>
            ))}
        </div>
    )
}
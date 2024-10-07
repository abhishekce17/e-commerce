"use client"
import React from 'react'
import { RiAccountCircleFill } from 'react-icons/ri'

const CommentSection = ({ ReviewArray }) => {
    const showTimestamp = (data) => {
        const date = (new Date(data.timeStamp)).toLocaleDateString();
        const time = (new Date(data.timeStamp)).toLocaleTimeString()
        return { date, time };
    }
    return (
        <div>
            {ReviewArray.map((data, index) => {
                return (
                    <div key={index} className={"text-xl border-b-2 border-primary-light"} >
                        <div className="flex items-end justify-between" >
                            <div className="flex items-center" >
                                <RiAccountCircleFill className="text-primary-light text-3xl" />
                                {/* <p className="font-medium ml-2">{data.userName}</p>
                                <p className="text text-primary ml-3" > ★ <span className="text-custom-dark-gray" >{data.Rating}</span> </p> */}
                            </div>
                            <div className="text-custom-light-gray text-lg" >
                                {/* <span>{showTimestamp(data).date}</span>
                                <span>{showTimestamp(data).time}</span> */}
                            </div>
                        </div>
                        <div className="pl-1" >
                            {data.Review}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CommentSection
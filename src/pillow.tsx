import React from "react";
import { Deck } from "./deck.tsx";
import pillow from "./Images/pillow.jpg"

export default function Pillow({cards}) {
    return (
        <div style={{position: "relative"}}>
            <img style={{
            height :"200px",
            width : "150px"
            }} src={pillow} alt="">
            </img>
            <div style={{
                position: "absolute",
                top: "0px",
                left: "25px",
                padding: "7px"
            }}>
                {cards.length > 0 && <Deck cards={cards} onClick={() => {}} hidden={false}/>}
            </div>
        </div>
    )
}
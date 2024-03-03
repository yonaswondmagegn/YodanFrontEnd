import React, { useEffect, useState } from 'react'

function Test() {
    const [text,setText] = useState("")

    useEffect(()=>{
        let planeText = "hellow this is one of the following statess"
        let b = planeText.split("")
        // b.map(letter=>setText(prev=>{
        //     setTimeout(() => {
        //         console.log('a')
        //         return prev+letter
        //     },2000);
        //     // clearTimeout(timeout)
        // }
        // ))
        // setInterval(() => {
        //     setText(prev=>prev+'a')
            
        // }, 10);
     
    },[])
  return (
    <div>
        <p>test</p>
        <h3>{text}</h3>
    </div>
  )
}

export default Test

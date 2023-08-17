import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { createServer } from "../../store/server"

const ServerCreate = ({vis, setVis}) => {
    return (
        <>
            {vis &&
            <div onClick={setVis(false)} className="server-create">
                <div className="server-create-main">
                    <div className="server-create-header">
                        <h1>Customize your server</h1>
                        <p>Give your server a personality with a name and an icon. You can always change it later</p>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

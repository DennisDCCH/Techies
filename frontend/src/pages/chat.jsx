// import React, { useEffect, useState } from "react"
// //import Navbar from "../components/navbar"
// import { PrettyChatWindow } from "react-chat-engine-pretty";
// import axios from "../api/axios"

// export default function Chat() {
//     const [userChat, setUserData] = useState([]);
//     useEffect(() => {
//         axios.get("/mychats")
//         .then((response) => {
//             setUserData(response.data);
//         })
//         .catch((error) => {
//             console.error("Error fetching user data:", error);
//         });
//     }, []);

//     return (
//         <div style={{ height: "100vh", width: "100vw" }}>
//           <PrettyChatWindow
//             projectId={"8b57194b-974a-406b-aeb2-b042c3112d85"}
            
//             //process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID
//             username={userChat.username} // adam
//             secret={userChat.secret} // pass1234
//             style={{ height: "100%" }}
//           />
//         </div>
//       );
// }

import React, { useEffect, useState } from "react"
//import Navbar from "../components/navbar"
import { PrettyChatWindow } from "react-chat-engine-pretty";
import axios from "../api/axios"

export default function Chat() {
    const [userChat, setUserData] = useState([]);
    useEffect(() => {
        axios.get("/mychats")
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);
    console.log(userChat)

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
          <PrettyChatWindow
            projectId={"8b57194b-974a-406b-aeb2-b042c3112d85"}
            
            //process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID
            username={"user1"} // adam
            secret={"user1"} // pass1234
            style={{ height: "100%" }}
          />
        </div>
      );
}


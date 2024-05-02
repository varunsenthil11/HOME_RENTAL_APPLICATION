import { createContext, useState,useEffect} from "react";
import axios from "axios";
export const Usercontext = createContext({});
export function Usercontextprovider({children}){
    const [user,setuser] = useState(null);
    const [ready,setready] = useState(false)
    useEffect(()=>{
    if(!user){
     axios.get('http://localhost:4000/profile').then((res)=>{
        setuser(res.data)
        setready(true)
    })
    }
    },[])
return(<div>
    <Usercontext.Provider value={{user,setuser,ready,setready}}>
    {children}
    </Usercontext.Provider>
</div>)
}
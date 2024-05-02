import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Placespresentpage from './Placespresentpage';
import Photosuploader from './Photosuploader';
import '../helpers/styles/Placespage.css'
import { useNavigate} from "react-router-dom";

export default function Placesformpage() {
  const{id} = useParams();
  
    const navigate = useNavigate();
      const[title,settitle]=useState('');
      const[address,setaddress]=useState('');
      const[addphotos,setaddedphotos]=useState([]);
      const[description,setdescription]=useState('');
      const[perks,setperks]=useState([]);
      const[extrainfo,setextrainfo]=useState('');
      const[checkin,setcheckin]=useState('');
      const[checkout,setcheckout]=useState('');
      const[maxguests,setmaxguests]=useState(1);
      const[redirect,setredirect] = useState(false);
      const[price,setprice] = useState();
        
      useEffect(()=>{
        if(!id)
        return;
      axios.get('http://localhost:4000/places/'+id).then((res)=>{
        const {data} =res;
        setperks(data.perks);
        settitle(data.title);
        setaddress(data.address);
        setaddedphotos(data.addphotos);
        setdescription(data.description);
        setextrainfo(data.extrainfo);
        setcheckin(data.checkin);
        setcheckout(data.checkout);
        setmaxguests(data.maxguests);
        setprice(data.price);
      })
      },[])
    function handlecbclick(ev){
        const {checked,name} = ev.target;
        if(checked){
        setperks([...perks,name]);
        }
        else{
          setperks(
            perks.filter(selectedname => selectedname !== name)
        );
        }
          }
        
        async function submit(){
          if(id){
            await axios.put('http://localhost:4000/places/'+id,{title,address,addphotos,description,perks,extrainfo,checkin,checkout,maxguests,price})
            setredirect(true);
          }
          else{
        await axios.post('http://localhost:4000/places',{title,address,addphotos,description,perks,extrainfo,checkin,checkout,maxguests,price})
        setredirect(true);
          }
        }
        useEffect(() => {
          if (redirect) {
              navigate('/Accounts/places');
              setredirect(false);
          }
        }, [redirect, navigate]);
        
  return (
    <div>
      <form onSubmit={submit}>
        <div className='new'>
    <h2>Title</h2>
    <input type='text'className='textbox' required value={title}  onChange={(ev)=>settitle(ev.target.value)}></input>
    <h2>Address</h2>
    <input type='text'className='textbox' required value={address} onChange={(ev)=>setaddress(ev.target.value)}></input>
    <Photosuploader   addphotos={addphotos} onChange={setaddedphotos} / >
      <div className='form-display'>
    <div>
      <h2>Description</h2>
      <textarea className='Textarea' required value={description} onChange={(ev)=>{setdescription(ev.target.value)}}></textarea>
    </div>
    <br />
    <span>
    <label htmlFor="wifi">
      <input type="checkbox" checked={perks.includes('wifi')}   name='wifi' id="wifi" onChange={handlecbclick}/> Wifi
    </label>
    <label htmlFor="parking"className='checkspace'>
      <input type="checkbox" checked={perks.includes('Free Parking Slot')} id="parking" name='Free Parking Slot' onChange={handlecbclick} /> Free Parking Slot
    </label>
    <label htmlFor="tv" className='checkspace'>
      <input type="checkbox" id="tv" checked={perks.includes('tv')} name='tv' onChange={handlecbclick} /> Tv
    </label>
  </span>
  <br />
  <br />
  <span>
    <label htmlFor="private">
      <input type="checkbox" id="private" name='Radio' checked={perks.includes('Radio')} onChange={handlecbclick} /> Radio
    </label>
      <span className='pets'>
    <label  htmlFor="entrance">
      <input type="checkbox" id="entrance" name='Pets' checked={perks.includes('Pets')} onChange={handlecbclick} /> Pets
    </label>
    <label className='inputs' htmlFor="entrance">
      <input type="checkbox" id="entrance" name='inputs' checked={perks.includes('inputs')} onChange={handlecbclick} /> inputs
    </label>
    </span>
  </span>
  <div>
    <h2>Extra Info</h2>
    <textarea className='Textarea'value={extrainfo} onChange={(ev)=>{setextrainfo(ev.target.value)}}></textarea>
  </div>
  <div>
    <h2>
      Check In and Out Times
    </h2>
    <span>
      <span>Check in</span> 
      <span className='checknames'>Check out</span>
      <span className='checknames'>Max no of guests</span>
      <span className='checknames'>Price/Night</span>
      <br></br>
      <span>
    <input type="text" required value={checkin} className='checkin' placeholder='14:00' onChange={(ev)=>{setcheckin(ev.target.value)}}></input>
    <input type="text" required value={checkout} className='checkin checknames1' placeholder='14:00' onChange={(ev)=>{setcheckout(ev.target.value)}}></input>
    <input type="text" required value={maxguests} className='checkin checknames1' placeholder='14:00' onChange={(ev)=>{setmaxguests(ev.target.value)}}></input>
    <input type="text" required value={price} className='checkin checknames1' placeholder='00' onChange={(ev)=>{setprice(ev.target.value)}}></input>
    </span>
    </span>
  </div>
  <br></br>
  <button className='save' type='submit'>save</button>
  </div>
  </div>
  </form>
    </div>
  )
}

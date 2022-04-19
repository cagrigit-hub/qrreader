import React, { useState } from 'react'
import {getFirestore,  doc, setDoc , getDoc  } from "firebase/firestore"; 
import fireapp from "../lib/firebase";
import { v4 as uuidv4 } from 'uuid';
import * as QR from "qrcode";

function KayitEkrani() {
  
  const [name,setName] = useState("")
  const [surname,setSName] = useState("")
  const [tckn,setTckn] = useState("")
  
  const db = getFirestore(fireapp);

  const kayitOl = async () => {
    const personId = uuidv4();
    await QR.toDataURL(personId, function (err, url) {
        setDoc(doc(db, "biletler", personId), {
        id : personId,
        name : name,
        surname: surname,
        identitiy : tckn,
        qr: url,
        used : false
      });
    })
      
   
    
  }
  
  return (
    <div className='flex flex-col justify-center items-center space-y-4'>
      <input value={name} onChange={(e) => {
        setName(e.target.value)
      }} className='p-12 rounded-lg border border-red-400' type="text" placeholder='Isim'/>
      <input value={surname} onChange={(e) => {
        setSName(e.target.value)
      }} className='p-12 rounded-lg border border-red-400' type="text" placeholder='Soy Ismi' />
      <input value={tckn} onChange={(e) => {
        setTckn(e.target.value)
      }} className='p-12 rounded-lg border border-red-400' type="text" placeholder='TCKN'  />
      <button onClick={kayitOl} className='p-8 rounded-xl border border-red-500 mx-4'>Kayit Ol</button>
      
      
    </div>
  )
}

export default KayitEkrani
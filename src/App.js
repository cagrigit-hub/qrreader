import './App.css';

import { useEffect, useRef, useState } from 'react';
import KayitEkrani from './components/KayitEkrani';
import { getFirestore , getDoc, doc, updateDoc } from 'firebase/firestore';
import qr from './utils/qr';
import toast, { Toaster } from "react-hot-toast"
import fireapp from './lib/firebase';
function App() {
  
  const video = useRef(null);
  const canvas = useRef(null);
  const [visible,setVisible] = useState(false);
  const [fetchedId , setId] = useState(null);
  qr.callback = function(error, result) {
    if(!error) {
    setId(result.result);
    }
  }
  useEffect( () => {
    async function fetchData() {
      if(fetchedId){
        const db = getFirestore(fireapp);
        const userRef = doc(db,"biletler",fetchedId)
        const fetchedDoc = await getDoc(userRef);
        console.log(fetchedDoc.data());
        updateDoc(userRef, {
          used: true
        });
        if(fetchedDoc.data()){
          if(fetchedDoc.data().used){
            toast.error('BU BİLET KULLANILMIŞ!')
          } else {
            toast.success("ONAYLANDI!")
          }
        } else {
          toast.error("BU BİLET YOKTUR!")
        }
        
      }
    }
    fetchData();
  }, [fetchedId])


  const openCam = () => {
    navigator.mediaDevices.getUserMedia({video : {width : 1280 , height: 720,  facingMode: 'environment'}})
    .then(stream => {
      video.current.srcObject = stream;
      video.current.play();
    }).catch(err => console.log(err))
    const ctx = canvas.current.getContext('2d');
    setInterval(() => { 
      canvas.current.width = video.current.videoWidth;
      canvas.current.height = video.current.videoHeight;
      ctx.drawImage(video.current, 0, 0, video.current.videoWidth, video.current.videoHeight);
      var data = ctx.getImageData(0,0,video.current.videoWidth,video.current.videoHeight);
      qr.decode(data);
    }, 100)
  }
  
  return (
    <>
   
    <video ref={video} autoPlay muted hidden></video>
    <canvas ref={canvas}></canvas>
    { visible && ( 
      <KayitEkrani />
    )}
    <button className='p-8 rounded-xl border border-red-500 mx-4' onClick={openCam}>open cam</button>
    <button className='p-8 rounded-xl border border-red-500 mx-4' onClick={() => {setVisible(!visible)}}>open form</button>
    <Toaster />
    </>

  );
}

export default App;

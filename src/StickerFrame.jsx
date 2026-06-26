import React, { useState, useRef } from 'react'; 
import Draggable from 'react-draggable';

import stikerBunga1 from './assets/stickers/bunga1.png';
import stikerBunga2 from './assets/stickers/bunga2.png';
import stikerBunga3 from './assets/stickers/bunga3.png';
import stikerPita1 from './assets/stickers/pita1.png';
import stikerPita2 from './assets/stickers/pita2.png';
import stikerPita3 from './assets/stickers/pita3.png';

function StikerYangBisaDigeser({ stiker }) {
  const sensorGenggam = useRef(null); 

  return (
    <Draggable nodeRef={sensorGenggam} bounds="parent" defaultPosition={{ x: 40, y: 40 }}>
      <div 
        ref={sensorGenggam} 
        style={{ position: 'absolute', cursor: 'grab', display: 'inline-block', zIndex: 10 }}
      >
        <img 
          src={stiker.url} 
          alt={stiker.name} 
          style={{ width: '90px', pointerEvents: 'none' }} 
        />
      </div>
    </Draggable>
  );
}

// Menangkap 2 Pipa Paralon dari App.jsx
export default function StickerFrame({ fotoDariAtas, warnaDariAtas }) { 
  const daftarStiker = [
    { name: 'Bunga 1', image: stikerBunga1 },
    { name: 'Bunga 2', image: stikerBunga2 },
    { name: 'Bunga 3', image: stikerBunga3 },
    { name: 'Pita 1', image: stikerPita1 },
    { name: 'Pita 2', image: stikerPita2 },
    { name: 'Pita 3', image: stikerPita3 },
  ];

  const [stikerAktif, setStikerAktif] = useState([]);

  const tambahStiker = (dataStiker) => {
    const stikerBaru = {
      id: Date.now() + Math.random(), 
      url: dataStiker.image, 
      name: dataStiker.name,
    };
    setStikerAktif([...stikerAktif, stikerBaru]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '650px', margin: '20px auto' }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Pilih & Geser Stiker</h3>
      
      {/* ETALASE STIKER */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        {daftarStiker.map((stiker, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <img 
              src={stiker.image} 
              alt={stiker.name}
              style={{ width: '55px', height: '55px', cursor: 'pointer', border: '2px solid #fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', objectFit: 'contain', backgroundColor: '#fff' }}
              onClick={() => tambahStiker(stiker)} 
            />
            <span style={{ fontSize: '11px', color: '#777', display: 'block', marginTop: '4px' }}>{stiker.name}</span>
          </div>
        ))}
      </div>

      {/* KANVAS PREVIEW STRIP FOTO */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          width: '320px',  // Lebar proporsional strip photobooth
          height: '650px', 
          border: '2px solid #ddd', 
          position: 'relative', 
          overflow: 'hidden', 
          borderRadius: '6px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          
          // 1. KEAJAIBAN WARNA: Menyedot warna dari tombol yang diklik di atas
          backgroundColor: warnaDariAtas || '#ffffff', 

          padding: '15px', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          
          {/* 2. KEAJAIBAN 2 FOTO: Memecah array foto menjadi susunan Vertikal */}
          {Array.isArray(fotoDariAtas) && fotoDariAtas.length > 0 ? (
            <div style={{ width: '100%', height: '88%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {fotoDariAtas.map((fotoUrl, idx) => (
                <div key={idx} style={{ flex: 1, width: '100%', overflow: 'hidden', borderRadius: '4px', backgroundColor: '#eee' }}>
                  <img 
                    src={fotoUrl} 
                    alt={`Pose ${idx + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: '70%', color: '#888', textAlign: 'center', fontSize: '12px', padding: '0 10px' }}>
              📸<br/>Foto jepretan Anda akan otomatis tersusun di sini
            </div>
          )}

          {/* Merek bagian bawah pigura */}
          <div style={{ fontWeight: '800', fontSize: '12px', color: '#111', letterSpacing: '1.5px', marginTop: '5px' }}>
            MAHAKARYA STUDIO
          </div>

          {/* STIKER MENDARAT DI ATAS SELURUH STRIP */}
          {stikerAktif.map((stiker) => (
            <StikerYangBisaDigeser key={stiker.id} stiker={stiker} />
          ))}
          
        </div>
      </div>

    </div>
  );
}
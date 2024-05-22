import './App.css';
import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';

const App = () => {
  const [text, setText] = useState('');
  const qrCodeRef = useRef(null);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleDownloadClick() {
    // Get the SVG element of the QR code
    const svg = qrCodeRef.current.querySelector('svg');
    if (svg) {
      // Create a new canvas element
      const canvas = document.createElement('canvas');
      canvas.width = svg.getAttribute('width');
      canvas.height = svg.getAttribute('height');

      // Convert the SVG to a data URL
      const svgString = new XMLSerializer().serializeToString(svg);
      const svgUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

      // Create an image element and draw the SVG onto the canvas
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Convert the canvas to a data URL
        const canvasUrl = canvas.toDataURL('image/png');

        // Create a temporary anchor element and trigger the download
        const link = document.createElement('a');
        link.href = canvasUrl;
        link.download = 'qr-code.png';
        link.click();
      };
      img.src = svgUrl;
    }
  }

  return (
    <>
      <section id='content'>
        <h2>QR code</h2>
        <div className="qr" ref={qrCodeRef}>
          <QRCode value={text} />
        </div>

        {text ? (<button className='code' onClick={handleDownloadClick}>Download QR Code</button>) : ""}

        <div className="display-box">
          <p>Enter your text here</p>
          <input type="text" id='input-text' value={text} onChange={(e) => handleChange(e)} />
        </div>

        <div className='disclaimer'>
          <h3>Disclaimer</h3>
          <p>
            Do not Try to paste more than 1000 words here!!!
          </p>
        </div>

        <footer className='footer'>Made with ❤️ by Yokieditz</footer>
      </section>
    </>
  );
};

export default App;


// import './App.css'
// import { useState } from "react";
// import QRCode from "react-qr-code";

// const App = () => {

//   const [text, setText] = useState("");

//   function handleChange(e) {
//     setText(e.target.value)
//   }

//   return (
//     <>
//       <section id='content'>

//         <h2>QR code</h2>
//         <div className="qr">
//           <QRCode value={text} />
//         </div>

//         <input type="button" value='save image' />

//         <div className="input-here">

//           <p>Enter your text here</p>
//           <input type="text" id='input-text' value={text} onChange={(e) => handleChange(e)} />
//           <br /><br />

//         </div>
//       </section>

//     </>
//   );
// };

// export default App;

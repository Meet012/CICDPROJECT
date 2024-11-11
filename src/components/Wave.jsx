import React from 'react'
import wave from '../assets/wave.svg';

const Wave = () => {
  return (
    <div>
      <img
        src={wave}
        alt="Wave"
        style={{
          position: 'absolute',
          width: '100%',
        }}
      />
    </div>
  )
}

export default Wave

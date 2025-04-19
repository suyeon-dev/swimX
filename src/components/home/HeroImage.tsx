'use client ';

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function HeroImage() {
  return (
    <DotLottieReact
      src='https://lottie.host/578779c3-04c7-41a0-b0d8-f49a5e8022ba/FrhUHjY0st.lottie'
      loop
      autoplay
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}

import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2563eb', // blue-600
          borderRadius: '40px', // Adjusted for apple-icon size
        }}
      >
        <div
            style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'white',
                borderRadius: '50%',
                boxShadow: '0 0 40px #fff',
            }}
        />
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}

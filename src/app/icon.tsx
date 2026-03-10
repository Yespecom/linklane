import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 40,
  height: 40,
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
          borderRadius: '16px', // Nextjs applies rounded-2xl
        }}
      >
        <div
            style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'white',
                borderRadius: '50%',
                boxShadow: '0 0 12px #fff',
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

import { ImageResponse } from 'next/og'

export const alt = 'Linklane'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FDFDFD',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#2563eb', // blue-600
                        borderRadius: '120px',
                        width: '400px',
                        height: '400px',
                        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)',
                    }}
                >
                    <div
                        style={{
                            width: '80px',
                            height: '80px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            boxShadow: '0 0 80px rgba(255,255,255,0.8)',
                        }}
                    />
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}

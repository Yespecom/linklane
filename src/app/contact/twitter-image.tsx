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
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '40px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#2563eb', // blue-600
                            borderRadius: '80px',
                            width: '280px',
                            height: '280px',
                            boxShadow: '0 30px 60px rgba(37, 99, 235, 0.2)',
                        }}
                    >
                        <div
                            style={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                boxShadow: '0 0 50px rgba(255,255,255,1)',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '100px',
                                fontWeight: '900',
                                color: '#0f172a',
                                letterSpacing: '-0.05em',
                                lineHeight: '1',
                            }}
                        >
                            Linklane
                        </span>
                        <span
                            style={{
                                fontSize: '24px',
                                fontWeight: '900',
                                color: '#2563eb',
                                textTransform: 'uppercase',
                                letterSpacing: '0.4em',
                                marginTop: '10px',
                                opacity: '0.6',
                            }}
                        >
                            Professional Hub
                        </span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}

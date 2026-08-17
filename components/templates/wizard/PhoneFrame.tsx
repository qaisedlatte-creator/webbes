export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto w-full"
      style={{ maxWidth: 380, aspectRatio: '390 / 844', borderRadius: 40, border: '10px solid #0a0a0a', background: '#0a0a0a', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}
    >
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 z-20"
        style={{ width: 110, height: 24, background: '#0a0a0a', borderRadius: '0 0 16px 16px' }}
      />
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 30 }}>
        <div className="w-full h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

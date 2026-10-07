import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #0f766e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '60px 80px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '10px 24px',
            borderRadius: '9999px',
            fontSize: '24px',
            fontWeight: 700,
          }}
        >
          HITtools / 時給計算ツール
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-1px',
            }}
          >
            時給計算・シフト＆目標逆算ツール
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#d1fae5',
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            見込み月収・実質時給・目標達成までの不足時間・年収の壁を自動算出
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '2px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '30px',
            fontSize: '22px',
            color: '#a7f3d0',
          }}
        >
          <div>完全無料・登録不要・2026年最新対応</div>
          <div>hit-tool.com/hourly-wage-calculator</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

import { useState, useEffect } from 'react';

// ── データ ──────────────────────────────────────────────────────────────────
// ▼ creemaUrl を実際のCreema商品ページURLに書き換えてください ▼
const FLOWERS = {
  kabocha: {
    name: 'かぼちゃ',
    kotoba: 'まぁるく、おおらかに',
    message:
      '育児や仕事でちょっとイライラしそうなとき、この大らかな丸みを目に留めて、ふっと呼吸を深くしてほしい。そんな願いを込めて。',
    giftMessage: null,
    // ▼ ここにCreemaのかぼちゃ作品ページURLを入れてください
    creemaUrl: 'https://www.creema.jp/item/20796794/detail',
    // ▼ ここに画像URLを入れてください（例: "/images/kabocha.jpg" や外部URL）
    imageUrl:
      'https://res.cloudinary.com/ddr0h170h/image/upload/v1780834446/%EF%BD%B6%EF%BE%8E%EF%BE%9E%EF%BE%81%EF%BD%AC_IMG_1956_mp1dwu.jpg',
    // ▼ 画像のalt（説明）テキスト
    imageAlt: 'かぼちゃの種花',
  },
  himawari: {
    name: 'ひまわり',
    kotoba: 'ひたむきな光',
    message:
      '目標に向かってがんばるあの人や、一歩を踏み出したい自分へ。まっすぐ光を浴びて育った種のエネルギーを届けます。',
    giftMessage:
      '前を向くあの方へ。そのまっすぐな姿への敬意を、この種に込めてお贈りください。',
    // ▼ ここにCreemaのひまわり作品ページURLを入れてください
    creemaUrl: 'https://www.creema.jp/item/19875336/detail',
    imageUrl:
      'https://res.cloudinary.com/ddr0h170h/image/upload/v1780834446/%EF%BE%8B%EF%BE%8F%EF%BE%9C%EF%BE%98_IMG_1958_rdufmk.jpg',
    imageAlt: 'ひまわりの種花',
  },
  toumorokoshi: {
    name: 'とうもろこし',
    kotoba: '未来への豊かな実り',
    message:
      '新生活のスタート、ご結婚、ご出産など、これからはじまる豊かな日々とたくさんの幸せを祝福して。',
    giftMessage:
      '新しい門出を迎えるあの方へ。はじまりの喜びと、これからの豊かな日々を祈って。',
    // ▼ ここにCreemaのとうもろこし作品ページURLを入れてください
    creemaUrl: 'https://www.creema.jp/item/20559222/detail',
    imageUrl:
      'https://res.cloudinary.com/ddr0h170h/image/upload/v1780834447/%EF%BE%84%EF%BD%B3%EF%BE%93%EF%BE%9B%EF%BD%BA%EF%BD%BC_IMG_1071_mnxoht.jpg',
    imageAlt: 'とうもろこしの種花',
  },
  benibana: {
    name: 'べに花',
    kotoba: '日常に灯る、ささやかな家族のあかり',
    message:
      '何気ない毎日の愛おしさ。ポッと灯るあかりのような種花が、家族の集まる空間を静かに見守ります。',
    giftMessage:
      '家族を大切に想う気持ちを込めて。日々の暮らしに静かに寄り添う贈り物を。',
    // ▼ ここにCreemaのべに花作品ページURLを入れてください
    creemaUrl: 'https://www.creema.jp/item/20289677/detail',
    imageUrl:
      'https://res.cloudinary.com/ddr0h170h/image/upload/v1780834447/%EF%BE%8D%EF%BE%9E%EF%BE%86%EF%BE%8A%EF%BE%9E%EF%BE%85_IMG_8712_vrlpsw.jpg',
    imageAlt: 'べに花の種花',
  },
  coffee: {
    name: 'コーヒー豆',
    kotoba: '心がほどけるひととき',
    message:
      '毎日をがんばるあなたへ。張り詰めた糸をそっと緩める時間を。暮らしの中に、静かで心地よい余白を作りましょう。',
    giftMessage:
      'いつも頑張っているあの方へ。少し立ち止まって、息を抜いてほしい。そんな気持ちを添えて。',
    // ▼ ここにCreemaのコーヒー豆作品ページURLを入れてください
    creemaUrl: 'https://www.creema.jp/item/20796794/detail',
    imageUrl:
      'https://res.cloudinary.com/ddr0h170h/image/upload/v1780834446/%EF%BD%BA%EF%BD%B0%EF%BE%8B%EF%BD%B0_IMG_5661_fwpv2z.jpg',
    imageAlt: 'コーヒー豆の種花',
  },
};
// ▲ creemaUrl / imageUrl の編集エリアここまで ▲

// 選択肢 → 花のマッピング
const SELF_OPTIONS = [
  { label: 'ほっと一息つきたい', flower: 'coffee' },
  { label: 'おだやかな気持ちになりたい', flower: 'kabocha' },
  { label: '前向きなパワーがほしい', flower: 'himawari' },
  { label: '日常を、もっと愛おしく', flower: 'benibana' },
];

const GIFT_OPTIONS = [
  { label: '心から祝福したい（お祝い・新生活）', flower: 'toumorokoshi' },
  { label: 'ねぎらいと感謝を伝えたい', flower: 'coffee' },
  { label: 'がんばるあの人を応援したい', flower: 'himawari' },
  { label: '家族への愛おしさを形にしたい', flower: 'benibana' },
];

// ── コンポーネント ──────────────────────────────────────────────────────────

function Divider() {
  return <div className="w-12 h-px bg-stone-300 mx-auto my-8" />;
}

function FadeIn({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {children}
    </div>
  );
}

// ── 画像プレースホルダー ────────────────────────────────────────────────────
function FlowerImage({ imageUrl, imageAlt, flowerKey }) {
  const accentColor =
    {
      kabocha: '#c4b5a0',
      himawari: '#b8a882',
      toumorokoshi: '#a8b890',
      benibana: '#c4a0a0',
      coffee: '#a09080',
    }[flowerKey] ?? '#b0a898';

  return (
    <div
      className="w-full max-w-xs mx-auto"
      style={{
        border: '1px solid #e2ddd8',
        background: '#f7f5f2',
        aspectRatio: '4 / 3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={imageAlt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : (
        <div
          className="flex flex-col items-center justify-center w-full h-full"
          style={{ padding: '24px' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '10px',
              border: `0.5px solid ${accentColor}`,
              opacity: 0.4,
              pointerEvents: 'none',
            }}
          />
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            style={{ marginBottom: '10px', opacity: 0.35 }}
          >
            <rect
              x="2"
              y="2"
              width="32"
              height="32"
              rx="1"
              stroke={accentColor}
              strokeWidth="1"
            />
            <circle
              cx="11"
              cy="13"
              r="3.5"
              stroke={accentColor}
              strokeWidth="1"
            />
            <path
              d="M2 26 L10 18 L17 24 L23 17 L34 26"
              stroke={accentColor}
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
          <p
            className="text-center"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: '10px',
              color: accentColor,
              letterSpacing: '0.15em',
              lineHeight: 1.8,
              opacity: 0.7,
            }}
          >
            作品・種のイメージ
            <br />
            <span style={{ fontSize: '9px', opacity: 0.7 }}>
              imageUrl にURLを設定してください
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

// ── 画面: トップ ────────────────────────────────────────────────────────────
function TopScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <FadeIn delay={100}>
        <p className="text-xs tracking-[0.25em] text-stone-400 mb-8 uppercase">
          tokkoriy / tane hana
        </p>
      </FadeIn>
      <FadeIn delay={300}>
        <h1
          className="text-4xl sm:text-5xl font-light text-stone-700 mb-6 leading-tight"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            letterSpacing: '0.1em',
          }}
        >
          種花診断
        </h1>
      </FadeIn>
      <FadeIn delay={500}>
        <Divider />
        <p
          className="text-sm text-stone-500 leading-relaxed max-w-xs mx-auto"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          種の中には、言葉がある。
          <br />
          今日の気持ちに寄り添う種花と、
          <br />
          あなただけの種花言葉をお届けします。
        </p>
        <Divider />
      </FadeIn>
      <FadeIn delay={750}>
        <button
          onClick={onStart}
          className="mt-2 px-10 py-3 border border-stone-400 text-stone-600 text-sm tracking-widest hover:bg-stone-100 transition-colors duration-300"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            letterSpacing: '0.2em',
          }}
        >
          診断をはじめる
        </button>
      </FadeIn>
      <FadeIn delay={1000}>
        <p className="mt-12 text-xs text-stone-300 tracking-wider">
          toccori × tane hana
        </p>
      </FadeIn>
    </div>
  );
}

// ── 画面: 質問 ──────────────────────────────────────────────────────────────
function QuestionScreen({ step, usage, onSelectUsage, onSelectMood }) {
  const [selected, setSelected] = useState(null);

  function handleSelect(val) {
    setSelected(val);
    setTimeout(() => {
      if (step === 1) onSelectUsage(val);
      else onSelectMood(val);
    }, 350);
  }

  const options =
    step === 1
      ? [
          { label: '自分のために', sub: 'ご自愛・インテリア', value: 'self' },
          {
            label: '大切な人へのギフトに',
            sub: '誕生日・記念日・お祝い',
            value: 'gift',
          },
        ]
      : usage === 'self'
      ? SELF_OPTIONS
      : GIFT_OPTIONS;

  const question =
    step === 1
      ? 'この種花は、どなたのために\n探していますか？'
      : '今の気持ちに、近いものは\nどれですか？';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <FadeIn delay={0}>
        <div className="flex gap-2 mb-12">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="w-8 h-px transition-colors duration-500"
              style={{ backgroundColor: n <= step ? '#78716c' : '#d6d3d1' }}
            />
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={150}>
        <p className="text-xs tracking-[0.2em] text-stone-400 mb-6 text-center uppercase">
          Question {step} / 2
        </p>
        <h2
          className="text-xl sm:text-2xl font-light text-stone-700 text-center mb-10 leading-relaxed whitespace-pre-line"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {question}
        </h2>
      </FadeIn>
      <div className="w-full max-w-sm space-y-3">
        {options.map((opt, i) => {
          const val = opt.value ?? opt.flower;
          const isSelected = selected === val;
          return (
            <FadeIn key={val} delay={250 + i * 80}>
              <button
                onClick={() => handleSelect(val)}
                className={`w-full text-left px-6 py-4 border transition-all duration-300 ${
                  isSelected
                    ? 'border-stone-500 bg-stone-100'
                    : 'border-stone-200 bg-white hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                <span
                  className="block text-sm text-stone-700"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  {opt.label}
                </span>
                {opt.sub && (
                  <span className="block text-xs text-stone-400 mt-1 tracking-wide">
                    {opt.sub}
                  </span>
                )}
              </button>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}

// ── 画面: 結果 ──────────────────────────────────────────────────────────────
function ResultScreen({ flowerKey, isGift, onRestart }) {
  const flower = FLOWERS[flowerKey];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <FadeIn delay={0}>
        <div className="mb-10">
          <SeedShape flowerKey={flowerKey} />
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <p className="text-xs tracking-[0.25em] text-stone-400 mb-3 uppercase">
          your tane hana
        </p>
        <h2
          className="text-3xl sm:text-4xl font-light text-stone-700 mb-2"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            letterSpacing: '0.12em',
          }}
        >
          {flower.name}
        </h2>
      </FadeIn>

      <FadeIn delay={400}>
        <Divider />
        <p
          className="text-lg sm:text-xl text-stone-600 font-light mb-2"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            letterSpacing: '0.08em',
          }}
        >
          種花言葉
        </p>
        <p
          className="text-2xl sm:text-3xl text-stone-800 font-light mb-8"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            letterSpacing: '0.1em',
          }}
        >
          「{flower.kotoba}」
        </p>
      </FadeIn>

      <FadeIn delay={600}>
        <p
          className="text-sm text-stone-500 leading-relaxed max-w-xs mx-auto"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {isGift && flower.giftMessage ? flower.giftMessage : flower.message}
        </p>
        <Divider />
      </FadeIn>

      {/* ── 作品イメージ画像 ── */}
      <FadeIn delay={700}>
        <div className="w-full max-w-xs mx-auto mb-8">
          <FlowerImage
            imageUrl={flower.imageUrl}
            imageAlt={flower.imageAlt}
            flowerKey={flowerKey}
          />
          <p
            className="mt-3 text-xs text-stone-400 tracking-wider"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            トッコリ / 種花シリーズ
          </p>
        </div>
      </FadeIn>

      {/* ギフト案内 */}
      {isGift && (
        <FadeIn delay={800}>
          <div className="mb-8 px-6 py-5 border border-stone-200 bg-stone-50 max-w-xs mx-auto">
            <p
              className="text-xs text-stone-500 leading-relaxed"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              大切な方への贈り物として、
              <br />
              メッセージカードを添えてお届けできます。
              <br />
              <span className="text-stone-400">ご注文時にご指定ください。</span>
            </p>
          </div>
        </FadeIn>
      )}

      <FadeIn delay={900}>
        <a
          href={flower.creemaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-xs mx-auto px-8 py-4 bg-stone-700 text-white text-sm tracking-widest text-center hover:bg-stone-800 transition-colors duration-300 mb-4"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            letterSpacing: '0.15em',
          }}
        >
          この種花をお届けする作品を見る
        </a>
        <button
          onClick={onRestart}
          className="text-xs text-stone-400 tracking-wider hover:text-stone-600 transition-colors duration-300 underline underline-offset-4"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          もう一度診断する
        </button>
      </FadeIn>

      <FadeIn delay={1100}>
        <p className="mt-16 text-xs text-stone-300 tracking-wider">
          toccori × tane hana
        </p>
      </FadeIn>
    </div>
  );
}

// ── 種の抽象シェイプ ────────────────────────────────────────────────────────
function SeedShape({ flowerKey }) {
  const shapes = {
    kabocha: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <ellipse
          cx="40"
          cy="40"
          rx="28"
          ry="34"
          stroke="#a8a29e"
          strokeWidth="1"
          fill="#fafaf9"
        />
        <ellipse
          cx="40"
          cy="40"
          rx="14"
          ry="20"
          stroke="#d6d3d1"
          strokeWidth="0.8"
          fill="none"
        />
        <line
          x1="40"
          y1="8"
          x2="40"
          y2="72"
          stroke="#e7e5e4"
          strokeWidth="0.8"
        />
      </svg>
    ),
    himawari: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        {[0, 45, 90, 135].map((deg) => (
          <line
            key={deg}
            x1="40"
            y1="10"
            x2="40"
            y2="70"
            stroke="#d6d3d1"
            strokeWidth="0.8"
            transform={`rotate(${deg} 40 40)`}
          />
        ))}
        <ellipse
          cx="40"
          cy="40"
          rx="16"
          ry="22"
          stroke="#a8a29e"
          strokeWidth="1"
          fill="#fafaf9"
        />
        <circle cx="40" cy="40" r="4" fill="#d6d3d1" />
      </svg>
    ),
    toumorokoshi: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        {[
          [32, 20],
          [40, 20],
          [48, 20],
          [28, 30],
          [36, 30],
          [44, 30],
          [52, 30],
          [28, 40],
          [36, 40],
          [44, 40],
          [52, 40],
          [32, 50],
          [40, 50],
          [48, 50],
          [36, 60],
          [44, 60],
        ].map(([cx, cy], i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="5"
            ry="6"
            stroke="#a8a29e"
            strokeWidth="0.8"
            fill="#fafaf9"
          />
        ))}
      </svg>
    ),
    benibana: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path
          d="M40 10 C30 25 25 40 40 70 C55 40 50 25 40 10Z"
          stroke="#a8a29e"
          strokeWidth="1"
          fill="#fafaf9"
        />
        <path
          d="M40 20 C35 35 34 50 40 65 C46 50 45 35 40 20Z"
          stroke="#d6d3d1"
          strokeWidth="0.7"
          fill="none"
        />
      </svg>
    ),
    coffee: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <ellipse
          cx="40"
          cy="40"
          rx="22"
          ry="28"
          stroke="#a8a29e"
          strokeWidth="1"
          fill="#fafaf9"
        />
        <path
          d="M40 14 Q46 40 40 66"
          stroke="#d6d3d1"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  };
  return shapes[flowerKey] || shapes.coffee;
}

// ── メインアプリ ────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('top');
  const [usage, setUsage] = useState(null);
  const [flowerKey, setFlowerKey] = useState(null);

  function handleStart() {
    setScreen('q1');
  }
  function handleUsage(val) {
    setUsage(val);
    setScreen('q2');
  }
  function handleMood(val) {
    setFlowerKey(val);
    setScreen('result');
  }
  function handleRestart() {
    setUsage(null);
    setFlowerKey(null);
    setScreen('top');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#faf9f7',
        fontFamily: "'Noto Serif JP', serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400&display=swap"
        rel="stylesheet"
      />
      {screen === 'top' && <TopScreen onStart={handleStart} />}
      {screen === 'q1' && (
        <QuestionScreen
          step={1}
          usage={usage}
          onSelectUsage={handleUsage}
          onSelectMood={handleMood}
        />
      )}
      {screen === 'q2' && (
        <QuestionScreen
          step={2}
          usage={usage}
          onSelectUsage={handleUsage}
          onSelectMood={handleMood}
        />
      )}
      {screen === 'result' && flowerKey && (
        <ResultScreen
          flowerKey={flowerKey}
          isGift={usage === 'gift'}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

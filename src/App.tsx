import { useState, useEffect } from "react";

type FlowerKey = "kabocha" | "himawari" | "toumorokoshi" | "benibana" | "coffee";
type Usage = "self" | "gift";

interface FlowerData {
  name: string;
  kotoba: string;
  message: string;
  giftMessage: string | null;
  creemaUrl: string;
  imageUrl: string | null;
  imageAlt: string;
}

const FLOWERS: Record<FlowerKey, FlowerData> = {
  kabocha: {
    name: "かぼちゃ",
    kotoba: "まぁるく、おおらかに",
    message: "育児や仕事でちょっとイライラしそうなとき、この大らかな丸みを目に留めて、ふっと呼吸を深くしてほしい。そんな願いを込めて。",
    giftMessage: null,
    creemaUrl: "https://www.creema.jp/item/20796794/detail",
    imageUrl: "https://res.cloudinary.com/ddr0h170h/image/upload/v1780834446/%EF%BD%B6%EF%BE%8E%EF%BE%9E%EF%BE%81%EF%BD%AC_IMG_1956_mp1dwu.jpg",
    imageAlt: "かぼちゃの種花",
  },
  himawari: {
    name: "ひまわり",
    kotoba: "ひたむきな光",
    message: "目標に向かってがんばるあの人や、一歩を踏み出したい自分へ。まっすぐ光を浴びて育った種のエネルギーを届けます。",
    giftMessage: "前を向くあの方へ。そのまっすぐな姿への敬意を、この種に込めてお贈りください。",
    creemaUrl: "https://www.creema.jp/item/19875336/detail",
    imageUrl: "https://res.cloudinary.com/ddr0h170h/image/upload/v1780834446/%EF%BE%8B%EF%BE%8F%EF%BE%9C%EF%BE%98_IMG_1958_rdufmk.jpg",
    imageAlt: "ひまわりの種花",
  },
  toumorokoshi: {
    name: "とうもろこし",
    kotoba: "未来への豊かな実り",
    message: "新生活のスタート、ご結婚、ご出産など、これからはじまる豊かな日々とたくさんの幸せを祝福して。",
    giftMessage: "新しい門出を迎えるあの方へ。はじまりの喜びと、これからの豊かな日々を祈って。",
    creemaUrl: "https://www.creema.jp/item/20559222/detail",
    imageUrl: "https://res.cloudinary.com/ddr0h170h/image/upload/v1780834447/%EF%BE%84%EF%BD%B3%EF%BE%93%EF%BE%9B%EF%BD%BA%EF%BD%BC_IMG_1071_mnxoht.jpg",
    imageAlt: "とうもろこしの種花",
  },
  benibana: {
    name: "べに花",
    kotoba: "日常に灯る、ささやかな家族のあかり",
    message: "何気ない毎日の愛おしさ。ポッと灯るあかりのような種花が、家族の集まる空間を静かに見守ります。",
    giftMessage: "家族を大切に想う気持ちを込めて。日々の暮らしに静かに寄り添う贈り物を。",
    creemaUrl: "https://www.creema.jp/item/20289677/detail",
    imageUrl: "https://res.cloudinary.com/ddr0h170h/image/upload/v1780834447/%EF%BE%8D%EF%BE%9E%EF%BE%86%EF%BE%8A%EF%BE%9E%EF%BE%85_IMG_8712_vrlpsw.jpg",
    imageAlt: "べに花の種花",
  },
  coffee: {
    name: "コーヒー豆",
    kotoba: "心がほどけるひととき",
    message: "毎日をがんばるあなたへ。張り詰めた糸をそっと緩める時間を。暮らしの中に、静かで心地よい余白を作りましょう。",
    giftMessage: "いつも頑張っているあの方へ。少し立ち止まって、息を抜いてほしい。そんな気持ちを添えて。",
    creemaUrl: "https://www.creema.jp/item/20796794/detail",
    imageUrl: "https://res.cloudinary.com/ddr0h170h/image/upload/v1780834446/%EF%BD%BA%EF%BD%B0%EF%BE%8B%EF%BD%B0_IMG_5661_fwpv2z.jpg",
    imageAlt: "コーヒー豆の種花",
  },
};

const SELF_OPTIONS: { label: string; flower: FlowerKey }[] = [
  { label: "ほっと一息つきたい", flower: "coffee" },
  { label: "おだやかな気持ちになりたい", flower: "kabocha" },
  { label: "前向きなパワーがほしい", flower: "himawari" },
  { label: "日常を、もっと愛おしく", flower: "benibana" },
];

const GIFT_OPTIONS: { label: string; flower: FlowerKey }[] = [
  { label: "心から祝福したい（お祝い・新生活）", flower: "toumorokoshi" },
  { label: "ねぎらいと感謝を伝えたい", flower: "coffee" },
  { label: "がんばるあの人を応援したい", flower: "himawari" },
  { label: "家族への愛おしさを形にしたい", flower: "benibana" },
];

const S = {
  page: {
    minHeight: "100vh",
    background: "#faf9f7",
    fontFamily: "'Noto Serif JP', serif",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 24px",
    textAlign: "center" as const,
  },
  label: { fontSize: "11px", letterSpacing: "0.25em", color: "#a8a29e", marginBottom: "32px", textTransform: "uppercase" as const },
  h1: { fontSize: "clamp(2rem, 8vw, 3rem)", fontWeight: 300, color: "#44403c", letterSpacing: "0.1em", marginBottom: "24px" },
  divider: { width: "48px", height: "1px", background: "#d6d3d1", margin: "32px auto" },
  lead: { fontSize: "14px", color: "#78716c", lineHeight: 2, maxWidth: "280px", margin: "0 auto" },
  btnPrimary: {
    marginTop: "8px", padding: "12px 40px",
    border: "1px solid #a8a29e", background: "transparent",
    color: "#57534e", fontSize: "13px", letterSpacing: "0.2em",
    cursor: "pointer", fontFamily: "'Noto Serif JP', serif",
  },
  btnOption: (selected: boolean) => ({
    width: "100%", textAlign: "left" as const,
    padding: "16px 24px", marginBottom: "12px",
    border: selected ? "1px solid #78716c" : "1px solid #e7e5e4",
    background: selected ? "#f5f4f2" : "#ffffff",
    cursor: "pointer", fontFamily: "'Noto Serif JP', serif",
  }),
  btnOptionLabel: { display: "block", fontSize: "14px", color: "#44403c" },
  btnOptionSub: { display: "block", fontSize: "11px", color: "#a8a29e", marginTop: "4px", letterSpacing: "0.1em" },
  progress: (active: boolean) => ({ width: "32px", height: "1px", background: active ? "#78716c" : "#d6d3d1", margin: "0 4px", transition: "background 0.5s" }),
  qLabel: { fontSize: "11px", letterSpacing: "0.2em", color: "#a8a29e", marginBottom: "24px", textTransform: "uppercase" as const },
  h2: { fontSize: "clamp(1.1rem, 5vw, 1.4rem)", fontWeight: 300, color: "#44403c", lineHeight: 1.8, marginBottom: "40px", whiteSpace: "pre-line" as const },
  seedName: { fontSize: "clamp(1.8rem, 7vw, 2.5rem)", fontWeight: 300, color: "#44403c", letterSpacing: "0.12em", marginBottom: "8px" },
  kotobaLabel: { fontSize: "15px", color: "#78716c", fontWeight: 300, letterSpacing: "0.08em", marginBottom: "8px" },
  kotoba: { fontSize: "clamp(1.2rem, 5vw, 1.6rem)", fontWeight: 300, color: "#292524", letterSpacing: "0.1em", marginBottom: "32px" },
  message: { fontSize: "13px", color: "#78716c", lineHeight: 2, maxWidth: "280px", margin: "0 auto" },
  imageWrap: { width: "100%", maxWidth: "280px", margin: "0 auto 8px", border: "1px solid #e7e5e4", background: "#f7f5f2", aspectRatio: "4/3", overflow: "hidden", position: "relative" as const, display: "flex", alignItems: "center", justifyContent: "center" },
  imageCaption: { fontSize: "11px", color: "#a8a29e", letterSpacing: "0.15em", marginTop: "8px", marginBottom: "32px" },
  giftBox: { maxWidth: "280px", margin: "0 auto 32px", padding: "20px 24px", border: "1px solid #e7e5e4", background: "#faf9f7" },
  giftText: { fontSize: "12px", color: "#78716c", lineHeight: 2 },
  btnCreema: {
    display: "block", width: "100%", maxWidth: "280px", margin: "0 auto 16px",
    padding: "16px 32px", background: "#57534e", color: "#ffffff",
    fontSize: "12px", letterSpacing: "0.15em", textAlign: "center" as const,
    textDecoration: "none", fontFamily: "'Noto Serif JP', serif",
    cursor: "pointer",
  },
  btnRetry: { fontSize: "11px", color: "#a8a29e", letterSpacing: "0.15em", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "'Noto Serif JP', serif" },
  footer: { marginTop: "64px", fontSize: "11px", color: "#d6d3d1", letterSpacing: "0.15em" },
};

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      {children}
    </div>
  );
}

function SeedShape({ flowerKey }: { flowerKey: FlowerKey }) {
  const shapes: Record<FlowerKey, React.ReactElement> = {
    kabocha: <svg width="72" height="72" viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="40" rx="28" ry="34" stroke="#a8a29e" strokeWidth="1" fill="#fafaf9" /><ellipse cx="40" cy="40" rx="14" ry="20" stroke="#d6d3d1" strokeWidth="0.8" fill="none" /><line x1="40" y1="8" x2="40" y2="72" stroke="#e7e5e4" strokeWidth="0.8" /></svg>,
    himawari: <svg width="72" height="72" viewBox="0 0 80 80" fill="none">{[0,45,90,135].map(d=><line key={d} x1="40" y1="10" x2="40" y2="70" stroke="#d6d3d1" strokeWidth="0.8" transform={`rotate(${d} 40 40)`}/>)}<ellipse cx="40" cy="40" rx="16" ry="22" stroke="#a8a29e" strokeWidth="1" fill="#fafaf9" /><circle cx="40" cy="40" r="4" fill="#d6d3d1" /></svg>,
    toumorokoshi: <svg width="72" height="72" viewBox="0 0 80 80" fill="none">{([[32,20],[40,20],[48,20],[28,30],[36,30],[44,30],[52,30],[28,40],[36,40],[44,40],[52,40],[32,50],[40,50],[48,50],[36,60],[44,60]] as [number,number][]).map(([cx,cy],i)=><ellipse key={i} cx={cx} cy={cy} rx="5" ry="6" stroke="#a8a29e" strokeWidth="0.8" fill="#fafaf9"/>)}</svg>,
    benibana: <svg width="72" height="72" viewBox="0 0 80 80" fill="none"><path d="M40 10 C30 25 25 40 40 70 C55 40 50 25 40 10Z" stroke="#a8a29e" strokeWidth="1" fill="#fafaf9" /><path d="M40 20 C35 35 34 50 40 65 C46 50 45 35 40 20Z" stroke="#d6d3d1" strokeWidth="0.7" fill="none" /></svg>,
    coffee: <svg width="72" height="72" viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="40" rx="22" ry="28" stroke="#a8a29e" strokeWidth="1" fill="#fafaf9" /><path d="M40 14 Q46 40 40 66" stroke="#d6d3d1" strokeWidth="1" fill="none" /></svg>,
  };
  return shapes[flowerKey];
}

function TopScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400&display=swap" rel="stylesheet" />
      <FadeIn delay={100}><p style={S.label}>toccorri / tanehana</p></FadeIn>
      <FadeIn delay={300}><h1 style={S.h1}>種花診断</h1></FadeIn>
      <FadeIn delay={500}>
        <div style={S.divider} />
        <p style={S.lead}>種の中には、言葉がある。<br />今日の気持ちに寄り添う種花と、<br />あなただけの種花言葉をお届けします。</p>
        <div style={S.divider} />
      </FadeIn>
      <FadeIn delay={750}><button style={S.btnPrimary} onClick={onStart}>診断をはじめる</button></FadeIn>
      <FadeIn delay={1000}><p style={S.footer}>toccorri × tanehana</p></FadeIn>
    </div>
  );
}

function QuestionScreen({ step, usage, onSelectUsage, onSelectMood }: { step: number; usage: Usage | null; onSelectUsage: (v: Usage) => void; onSelectMood: (v: FlowerKey) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  function handle(val: string) { setSelected(val); setTimeout(() => { step === 1 ? onSelectUsage(val as Usage) : onSelectMood(val as FlowerKey); }, 350); }
  const q = step === 1 ? "この種花は、どなたのために\n探していますか？" : "今の気持ちに、近いものは\nどれですか？";
  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400&display=swap" rel="stylesheet" />
      <FadeIn delay={0}><div style={{ display: "flex", marginBottom: "48px" }}>{[1,2].map(n=><div key={n} style={S.progress(n<=step)}/>)}</div></FadeIn>
      <FadeIn delay={150}>
        <p style={S.qLabel}>Question {step} / 2</p>
        <h2 style={S.h2}>{q}</h2>
      </FadeIn>
      <div style={{ width: "100%", maxWidth: "320px" }}>
        {step === 1
          ? [{ label: "自分のために", sub: "ご自愛・インテリア", value: "self" as Usage }, { label: "大切な人へのギフトに", sub: "誕生日・記念日・お祝い", value: "gift" as Usage }].map((o, i) => (
            <FadeIn key={o.value} delay={250 + i * 80}>
              <button style={S.btnOption(selected === o.value)} onClick={() => handle(o.value)}>
                <span style={S.btnOptionLabel}>{o.label}</span>
                <span style={S.btnOptionSub}>{o.sub}</span>
              </button>
            </FadeIn>
          ))
          : (usage === "self" ? SELF_OPTIONS : GIFT_OPTIONS).map((o, i) => (
            <FadeIn key={o.flower} delay={250 + i * 80}>
              <button style={S.btnOption(selected === o.flower)} onClick={() => handle(o.flower)}>
                <span style={S.btnOptionLabel}>{o.label}</span>
              </button>
            </FadeIn>
          ))
        }
      </div>
    </div>
  );
}

function ResultScreen({ flowerKey, isGift, onRestart }: { flowerKey: FlowerKey; isGift: boolean; onRestart: () => void }) {
  const f = FLOWERS[flowerKey];
  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400&display=swap" rel="stylesheet" />
      <FadeIn delay={0}><div style={{ marginBottom: "40px" }}><SeedShape flowerKey={flowerKey} /></div></FadeIn>
      <FadeIn delay={200}>
        <p style={S.label}>your tanehana</p>
        <p style={S.seedName}>{f.name}</p>
      </FadeIn>
      <FadeIn delay={400}>
        <div style={S.divider} />
        <p style={S.kotobaLabel}>種花言葉</p>
        <p style={S.kotoba}>「{f.kotoba}」</p>
      </FadeIn>
      <FadeIn delay={600}>
        <p style={S.message}>{isGift && f.giftMessage ? f.giftMessage : f.message}</p>
        <div style={S.divider} />
      </FadeIn>
      <FadeIn delay={700}>
        <div style={S.imageWrap}>
          {f.imageUrl
            ? <img src={f.imageUrl} alt={f.imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <p style={{ fontSize: "11px", color: "#a8a29e" }}>作品・種のイメージ</p>
          }
        </div>
        <p style={S.imageCaption}>トッコリ / 種花シリーズ</p>
      </FadeIn>
      {isGift && (
        <FadeIn delay={800}>
          <div style={S.giftBox}>
            <p style={S.giftText}>大切な方への贈り物として、<br />メッセージカードを添えてお届けできます。<br /><span style={{ color: "#a8a29e" }}>ご注文時にご指定ください。</span></p>
          </div>
        </FadeIn>
      )}
      <FadeIn delay={900}>
        <a href={f.creemaUrl} target="_blank" rel="noopener noreferrer" style={S.btnCreema}>この種花をお届けする作品を見る</a>
        <button style={S.btnRetry} onClick={onRestart}>もう一度診断する</button>
      </FadeIn>
      <FadeIn delay={1100}><p style={S.footer}>toccorri × tanehana</p></FadeIn>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<"top"|"q1"|"q2"|"result">("top");
  const [usage, setUsage] = useState<Usage|null>(null);
  const [flowerKey, setFlowerKey] = useState<FlowerKey|null>(null);
  return (
    <div style={{ minHeight: "100vh", background: "#faf9f7" }}>
      {screen==="top" && <TopScreen onStart={()=>setScreen("q1")} />}
      {screen==="q1" && <QuestionScreen step={1} usage={usage} onSelectUsage={v=>{setUsage(v);setScreen("q2");}} onSelectMood={v=>{setFlowerKey(v);setScreen("result");}} />}
      {screen==="q2" && <QuestionScreen step={2} usage={usage} onSelectUsage={v=>{setUsage(v);setScreen("q2");}} onSelectMood={v=>{setFlowerKey(v);setScreen("result");}} />}
      {screen==="result" && flowerKey && <ResultScreen flowerKey={flowerKey} isGift={usage==="gift"} onRestart={()=>{setUsage(null);setFlowerKey(null);setScreen("top");}} />}
    </div>
  );
}

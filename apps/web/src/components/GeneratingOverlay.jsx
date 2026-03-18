import { useState, useEffect, useRef } from "react";

const LOADING_MESSAGES = [
  { emoji: "🔪", text: "Sharpening the plot twists..." },
  { emoji: "🕵️", text: "Interrogating the suspects..." },
  { emoji: "🧪", text: "Analyzing the evidence..." },
  { emoji: "📝", text: "Writing everyone's alibi..." },
  { emoji: "🎭", text: "Assigning secret motives..." },
  { emoji: "🕯️", text: "Setting the mood lighting..." },
  { emoji: "💀", text: "Choosing who doesn't make it..." },
  { emoji: "🤫", text: "Hiding the murder weapon..." },
  { emoji: "🧤", text: "Planting fingerprints..." },
  { emoji: "📸", text: "Staging the crime scene photos..." },
  { emoji: "🗝️", text: "Locking up the red herrings..." },
  { emoji: "☠️", text: "Making sure the poison is undetectable..." },
  { emoji: "👀", text: "Peeking through the keyhole..." },
  { emoji: "🎪", text: "Rehearsing dramatic reveals..." },
  { emoji: "💌", text: "Forging love letters as evidence..." },
  { emoji: "🧊", text: "Icing the champagne (and the killer's nerves)..." },
  { emoji: "🌙", text: "Waiting for a dark and stormy night..." },
  { emoji: "🗺️", text: "Drawing the mansion floor plan..." },
  { emoji: "🎵", text: "Cueing the suspenseful music..." },
  { emoji: "🖋️", text: "Penning the victim's final words..." },
];

// GM tips that rotate alongside fun messages
const GM_TIP_MESSAGES = [
  {
    emoji: "💡",
    text: "Tip: You can assign a character to yourself and play along!",
  },
  {
    emoji: "🎮",
    text: 'Tip: Use "My Game View" in the Control Panel to play as your character',
  },
  {
    emoji: "🤹",
    text: "Tip: Being both GM and a player? Just assign yourself one of the characters!",
  },
  {
    emoji: "📱",
    text: "Tip: Share each player's unique link — they can follow along on their phone",
  },
  {
    emoji: "⏱️",
    text: "Tip: You control when clues are revealed — go at your own pace!",
  },
];

// Setting-specific messages
const SETTING_MESSAGES = {
  "Backyard BBQ": [
    { emoji: "🍖", text: "Marinating the drama..." },
    { emoji: "🔥", text: "Someone's about to get grilled..." },
  ],
  "Beach Vacation Rental": [
    { emoji: "🏖️", text: "Burying secrets in the sand..." },
    { emoji: "🦈", text: "Something sinister lurks beneath the surface..." },
  ],
  "Casino Night Scandal": [
    { emoji: "🎰", text: "The odds are deadly tonight..." },
    { emoji: "🃏", text: "Dealing a hand nobody expected..." },
  ],
  "Cocktail Party Gone Wrong": [
    { emoji: "🍸", text: "One of these drinks is... different..." },
    { emoji: "🥂", text: "Pouring champagne and suspicion..." },
  ],
  "Corporate Retreat": [
    { emoji: "💼", text: "Scheduling a meeting with murder..." },
    { emoji: "📊", text: "This quarter's results are... killer..." },
  ],
  "Family Dinner": [
    { emoji: "🍽️", text: "Someone brought a grudge to dinner..." },
    { emoji: "🍷", text: "Passing the salt and the blame..." },
  ],
  "Family Reunion": [
    { emoji: "👨‍👩‍👧‍👦", text: "Every family has secrets..." },
    { emoji: "📷", text: "This year's family photo will be different..." },
  ],
  "Gothic Mansion": [
    { emoji: "🏚️", text: "The walls have ears... and secrets..." },
    { emoji: "🦇", text: "Something wicked this way comes..." },
  ],
  "High School Reunion": [
    { emoji: "🎓", text: "Some grudges never graduate..." },
    { emoji: "📚", text: "Rewriting the class superlatives..." },
  ],
  "Luxury Yacht": [
    { emoji: "🛥️", text: "No one's leaving this boat..." },
    { emoji: "⚓", text: "Dropping anchor and alibis..." },
  ],
  "Tropical Resort": [
    { emoji: "🌴", text: "Paradise isn't what it seems..." },
    { emoji: "🍹", text: "Someone poisoned the piña coladas..." },
  ],
  "Holiday - Christmas": [
    { emoji: "🎄", text: "Checking the naughty list twice..." },
    { emoji: "🎅", text: "Someone's getting coal... and revenge..." },
  ],
  "Holiday - Halloween": [
    { emoji: "🎃", text: "The real horror isn't the costumes..." },
    { emoji: "👻", text: "This ghost has a score to settle..." },
  ],
  "Holiday - Thanksgiving": [
    { emoji: "🦃", text: "Someone carved more than the turkey..." },
    { emoji: "🥧", text: "What's really in that pie?..." },
  ],
  "Holiday - New Year's Eve": [
    { emoji: "🎆", text: "Not everyone is making it to midnight..." },
    { emoji: "🥂", text: "The countdown is deadly..." },
  ],
  "Holiday - Easter": [
    { emoji: "🐣", text: "Some eggs should stay hidden..." },
    { emoji: "🐰", text: "Following the bunny trail of evidence..." },
  ],
  "Snowed In: Cabin Fever": [
    { emoji: "❄️", text: "The cold isn't the only killer here..." },
    { emoji: "🏔️", text: "No one's getting out until dawn..." },
  ],
  "Luxury Glamping Retreat": [
    { emoji: "⛺", text: "Roughing it has never been so deadly..." },
    { emoji: "🌲", text: "The woods know what happened..." },
  ],
  "Private School Fundraiser Gala": [
    { emoji: "🎩", text: "Bidding on secrets at the silent auction..." },
    { emoji: "💎", text: "The real jewel heist is yet to come..." },
  ],
  "Reality Show Reunion": [
    { emoji: "📺", text: "The cameras are rolling... and so are heads..." },
    { emoji: "🎬", text: "This isn't the finale anyone expected..." },
  ],
};

export default function GeneratingOverlay({ config }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const messagesRef = useRef(null);

  // Build a shuffled list of messages including setting-specific ones
  useEffect(() => {
    const settingMsgs = SETTING_MESSAGES[config?.setting] || [];
    const allMessages = [
      ...settingMsgs,
      ...LOADING_MESSAGES,
      ...GM_TIP_MESSAGES,
    ];

    // Shuffle
    for (let i = allMessages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = allMessages[i];
      allMessages[i] = allMessages[j];
      allMessages[j] = temp;
    }

    messagesRef.current = allMessages;
  }, [config?.setting]);

  // Rotate messages every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const messages = messagesRef.current || LOADING_MESSAGES;
          return (prev + 1) % messages.length;
        });
        setFadeIn(true);
      }, 400);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const messages = messagesRef.current || LOADING_MESSAGES;
  const current = messages[currentIndex] || messages[0];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
        {/* Pulsing magnifying glass */}
        <div
          style={{
            fontSize: 72,
            marginBottom: 32,
            animation: "gentleBounce 2s ease-in-out infinite",
          }}
        >
          🔍
        </div>

        {/* Rotating message */}
        <div
          style={{
            minHeight: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 40,
              marginBottom: 12,
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {current.emoji}
          </div>
          <p
            style={{
              color: "#e9d5ff",
              fontSize: 20,
              fontWeight: 600,
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              margin: 0,
            }}
          >
            {current.text}
          </p>
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#a855f7",
                animation: `dotPulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: "#a78bfa",
            fontSize: 14,
            marginTop: 24,
            opacity: 0.7,
          }}
        >
          Creating your {config?.setting || "mystery"} game for{" "}
          {config?.playerCount || "?"} players
        </p>
        <p
          style={{
            color: "#7c3aed",
            fontSize: 12,
            marginTop: 8,
            opacity: 0.5,
          }}
        >
          This usually takes 15-30 seconds
        </p>
      </div>

      <style jsx global>{`
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.05); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const USERNAME_TEXT = "FLIRTATIOUS";

function useTypewriter(text, { typeSpeed = 140, holdMs = 1600, pauseMs = 700 } = {}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    let i = 0;
    let timer;

    const typeNext = () => {
      i += 1;
      setValue(text.slice(0, i));
      if (i < text.length) {
        timer = setTimeout(typeNext, typeSpeed);
      } else {
        timer = setTimeout(reset, holdMs);
      }
    };

    const reset = () => {
      setValue("");
      timer = setTimeout(typeNext, pauseMs);
    };

    timer = setTimeout(typeNext, pauseMs);
    return () => clearTimeout(timer);
  }, [text, typeSpeed, holdMs, pauseMs]);

  return value;
}

export default function HomePage() {
  const navigate = useNavigate();
  const username = useTypewriter(USERNAME_TEXT);

  return (
    <div
      className="w-full max-w-md rounded-md px-8 py-10 flex flex-col items-center"
      style={{ border: "2px solid #ff2fb3", boxShadow: "0 0 24px rgba(255,47,179,0.35)" }}
    >
      <h1
        className="font-display font-black tracking-widest text-4xl sm:text-5xl mb-8"
        style={{ color: "#ff2fb3", textShadow: "0 0 14px rgba(255,47,179,0.7)" }}
      >
        WELCOME
      </h1>

      <div className="w-full flex flex-col gap-5 mb-8">
        <label className="flex flex-col gap-1.5 font-mono text-xs tracking-wide" style={{ color: "#ff2fb3" }}>
          USERNAME:
          <input
            type="text"
            value={username}
            readOnly
            className="bg-transparent rounded px-3 py-2 text-sm outline-none uppercase"
            style={{ border: "1px solid #ff2fb3", color: "#ff2fb3" }}
          />
        </label>
        <label className="flex flex-col gap-1.5 font-mono text-xs tracking-wide" style={{ color: "#ff2fb3" }}>
          PASSWORD:
          <input
            type="password"
            defaultValue="poison123"
            className="bg-transparent rounded px-3 py-2 text-sm outline-none"
            style={{ border: "1px solid #ff2fb3", color: "#ff2fb3" }}
          />
        </label>
      </div>

      <button
        onClick={() => navigate("/shop")}
        className="font-display tracking-widest text-sm px-8 py-2.5 rounded"
        style={{ background: "#ff2fb3", color: "#170a20" }}
      >
        LOG IN
      </button>
    </div>
  );
}

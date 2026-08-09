import { useOutletContext } from "react-router-dom";
import Module from "../components/Module.jsx";
import { StatRow } from "../components/Misc.jsx";

export default function AboutPage() {
  const { settings, setSettings, editMode } = useOutletContext();

  return (
    <Module title="ABOUT">
      {editMode ? (
        <div className="flex flex-col gap-2 mb-2">
          <input
            value={settings.aboutHeading}
            onChange={(e) => setSettings((s) => ({ ...s, aboutHeading: e.target.value }))}
            placeholder="heading"
            className="font-display font-black text-xl bg-black border border-[#8b2fc9] rounded px-2 py-1.5 text-white"
          />
          <textarea
            value={settings.aboutBody}
            onChange={(e) => setSettings((s) => ({ ...s, aboutBody: e.target.value }))}
            placeholder="about text"
            className="w-full bg-black border border-[#8b2fc9] rounded px-2 py-1.5 text-sm text-[#c0c0c8]"
            rows={8}
          />
        </div>
      ) : (
        <>
          <h2 className="font-display font-black text-xl text-white mb-3">{settings.aboutHeading}</h2>
          <p className="text-sm leading-relaxed whitespace-pre-line mb-5">{settings.aboutBody}</p>
        </>
      )}

      <div className="pt-3 border-t" style={{ borderColor: "rgba(192,192,200,0.2)" }}>
        <StatRow label="Est." value="2026" />
        <StatRow label="Vibe:" value="chrome / y2k / after dark" />
        <StatRow label="Ships:" value="discreet, unmarked" last />
      </div>
    </Module>
  );
}

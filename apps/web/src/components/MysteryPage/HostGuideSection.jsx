import { ChevronIcon } from "./ChevronIcon";

function getText(item) {
  if (typeof item === "string") return item;
  return item?.text || "";
}

export function HostGuideSection({ hostGuide, expanded, onToggle }) {
  if (!hostGuide) {
    return null;
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl mb-6 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex justify-between items-center hover:bg-white/5 transition-all"
      >
        <div className="text-left">
          <h2 className="text-2xl font-bold text-white">Host Guide</h2>
          <p className="text-purple-300 text-sm mt-1">
            Private setup notes, reveal pacing, and the final judgment script
          </p>
        </div>
        <ChevronIcon expanded={expanded} />
      </button>

      {expanded && (
        <div className="px-6 pb-6 space-y-6">
          <div className="bg-fuchsia-900/20 border border-fuchsia-500/30 rounded-xl p-5">
            <p className="text-fuchsia-100 leading-relaxed">{hostGuide.summary}</p>
          </div>

          <SectionList title="Setup Checklist" items={hostGuide.setupChecklist} />
          <SectionList title="Assignment Notes" items={hostGuide.assignmentNotes} />

          {hostGuide.bonusModeNotes?.length > 0 && (
            <SectionList title="Mode Notes" items={hostGuide.bonusModeNotes} />
          )}

          {hostGuide.roundFlow?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Game Flow by Round</h3>
              <div className="space-y-4">
                {hostGuide.roundFlow.map((round) => (
                  <div
                    key={round.round}
                    className="bg-white/5 border border-white/10 rounded-xl p-5"
                  >
                    <div className="text-purple-300 text-xs font-semibold uppercase tracking-wide mb-1">
                      {round.round}
                    </div>
                    <h4 className="text-white font-semibold mb-2">{round.objective}</h4>
                    <p className="text-purple-100 italic mb-3">“{round.hostScript}”</p>
                    {round.notes?.length > 0 && (
                      <ul className="space-y-2 text-sm text-purple-200">
                        {round.notes.map((note, index) => (
                          <li key={index}>• {getText(note)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <SectionList title="Academy Announcement Lines" items={hostGuide.announcements} />

          <div className="grid md:grid-cols-2 gap-4">
            <TextCard title="Solution Summary" body={hostGuide.solutionSummary} />
            <TextCard title="Final Reveal Tone" body="Read the final judgment slowly. The ending should land as dramatic and emotionally sharp, not campy." />
          </div>

          {hostGuide.finalRevealScript?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Final Reveal Script</h3>
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-5 space-y-3">
                {hostGuide.finalRevealScript.map((line, index) => (
                  <p key={index} className="text-red-100 leading-relaxed">
                    {getText(line)}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SectionList({ title, items = [] }) {
  if (!items.length) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={`${title}-${index}`}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-purple-100"
          >
            {getText(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TextCard({ title, body }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-purple-100 leading-relaxed">{body}</p>
    </div>
  );
}


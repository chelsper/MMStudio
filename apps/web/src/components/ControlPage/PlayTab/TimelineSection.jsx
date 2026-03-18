import { Clock } from "lucide-react";

export function TimelineSection({ timeline }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-400" /> Timeline of Events
      </h3>
      <div className="space-y-4">
        {timeline.map((event, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0 mt-1.5" />
              {i < timeline.length - 1 && (
                <div className="w-0.5 flex-1 bg-purple-500/30 mt-1" />
              )}
            </div>
            <div className="pb-4">
              <div className="text-purple-300 font-semibold text-sm">
                {event.time}
              </div>
              <p className="text-purple-100 text-sm">{event.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

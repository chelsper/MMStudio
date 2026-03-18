import { Clock } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";

export function TimelineSection({ timeline, expanded, onToggle }) {
  return (
    <CollapsibleSection
      title="Timeline"
      icon={<Clock className="w-6 h-6" />}
      expanded={expanded}
      onToggle={onToggle}
    >
      <div className="space-y-3">
        {timeline.map((event, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold min-w-[120px] text-center">
              {event.time}
            </div>
            <div className="flex-1 bg-white/5 p-4 rounded-lg">
              <p className="text-purple-100">{event.event}</p>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}

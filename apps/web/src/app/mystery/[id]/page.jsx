"use client";

import { useState } from "react";
import { useMysteryData } from "@/hooks/useMysteryData";
import { useCharacterAssignment } from "@/hooks/useCharacterAssignment";
import { useClipboard } from "@/hooks/useClipboard";
import { GMNavigationBar } from "@/components/MysteryPage/GMNavigationBar";
import { SetupProgress } from "@/components/MysteryPage/SetupProgress";
import { ControlPanelCTA } from "@/components/MysteryPage/ControlPanelCTA";
import { MysteryHeader } from "@/components/MysteryPage/MysteryHeader";
import { PremiseSection } from "@/components/MysteryPage/PremiseSection";
import { VictimSection } from "@/components/MysteryPage/VictimSection";
import { CharactersSection } from "@/components/MysteryPage/CharactersSection";
import { TimelineSection } from "@/components/MysteryPage/TimelineSection";
import { CluesSection } from "@/components/MysteryPage/CluesSection";
import { SolutionSection } from "@/components/MysteryPage/SolutionSection";
import { AssignModal } from "@/components/MysteryPage/AssignModal";
import { ShareLinkModal } from "@/components/MysteryPage/ShareLinkModal";
import { LoadingState } from "@/components/MysteryPage/LoadingState";
import { ErrorState } from "@/components/MysteryPage/ErrorState";
import { PrivateGameSettings } from "@/components/MysteryPage/PrivateGameSettings";
import { HostGuideSection } from "@/components/MysteryPage/HostGuideSection";

export default function MysteryPage({ params }) {
  const { mystery, assignments, loading, error, refetch } = useMysteryData(
    params.id,
  );
  const [showSolution, setShowSolution] = useState(false);
  const [assignModal, setAssignModal] = useState(null);
  const [shareModal, setShareModal] = useState(null);
  const { copied, copyToClipboard } = useClipboard();

  const [expandedSections, setExpandedSections] = useState({
    characters: true,
    clues: false,
    timeline: false,
    hostGuide: true,
  });
  const [updatingBonusCharacter, setUpdatingBonusCharacter] = useState(false);

  const {
    assignCharacter,
    assignLoading,
    assignError,
    setAssignError,
    contact,
    setContact,
    contactType,
    setContactType,
    unassignCharacter,
    unassignLoading,
  } = useCharacterAssignment(params.id, (result) => {
    setAssignModal(null);
    setShareModal(result);
    refetch();
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAssign = async () => {
    await assignCharacter(assignModal.characterName);
  };

  const handleToggleBonusCharacter = async (includeBonusCharacter) => {
    setUpdatingBonusCharacter(true);
    try {
      const response = await fetch(`/api/mysteries/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggleBonusCharacter",
          includeBonusCharacter,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to update roster");
      }

      refetch();
    } catch (err) {
      console.error("Error updating bonus character:", err);
      alert(err.message);
    } finally {
      setUpdatingBonusCharacter(false);
    }
  };

  const handleViewLink = (characterName, assignment) => {
    const fullUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/play/${assignment.token}`
        : `/play/${assignment.token}`;
    setShareModal({
      url: fullUrl,
      characterName,
      contact: assignment.contact,
    });
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !mystery) {
    return <ErrorState error={error} />;
  }

  const mysteryData = mystery.data.mystery;
  const assignedNames = assignments.map((a) => a.character_name);
  const allAssigned = assignedNames.length === mysteryData.characters.length;
  const readyToStart = assignedNames.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GMNavigationBar mysteryId={params.id} />

        <SetupProgress
          assignedCount={assignedNames.length}
          totalCount={mysteryData.characters.length}
          readyToStart={readyToStart}
        />

        {readyToStart && (
          <ControlPanelCTA mysteryId={params.id} allAssigned={allAssigned} />
        )}

        <MysteryHeader
          mystery={mystery}
          assignedCount={assignedNames.length}
          totalCount={mysteryData.characters.length}
          allAssigned={allAssigned}
        />

        <PrivateGameSettings
          config={mystery.config}
          assignments={assignments}
          updatingBonusCharacter={updatingBonusCharacter}
          onToggleBonusCharacter={handleToggleBonusCharacter}
        />

        <PremiseSection premise={mysteryData.premise} />

        <VictimSection victim={mysteryData.victim} />

        <CharactersSection
          characters={mysteryData.characters}
          assignments={assignments}
          showSolution={showSolution}
          expanded={expandedSections.characters}
          onToggle={() => toggleSection("characters")}
          onAssignClick={(characterName) => {
            setAssignModal({ characterName });
            setAssignError(null);
          }}
          onViewLink={handleViewLink}
          onUnassign={(characterName) => {
            unassignCharacter(characterName, refetch);
          }}
          unassignLoading={unassignLoading}
        />

        <TimelineSection
          timeline={mysteryData.timeline}
          expanded={expandedSections.timeline}
          onToggle={() => toggleSection("timeline")}
        />

        <CluesSection
          clues={mysteryData.clues}
          showSolution={showSolution}
          expanded={expandedSections.clues}
          onToggle={() => toggleSection("clues")}
        />

        <HostGuideSection
          hostGuide={mysteryData.hostGuide}
          expanded={expandedSections.hostGuide}
          onToggle={() => toggleSection("hostGuide")}
        />

        <SolutionSection
          mysteryData={mysteryData}
          showSolution={showSolution}
          onToggle={() => setShowSolution(!showSolution)}
        />
      </div>

      {assignModal && (
        <AssignModal
          characterName={assignModal.characterName}
          contact={contact}
          contactType={contactType}
          assignLoading={assignLoading}
          assignError={assignError}
          onClose={() => setAssignModal(null)}
          onContactChange={setContact}
          onContactTypeChange={setContactType}
          onAssign={handleAssign}
        />
      )}

      {shareModal && (
        <ShareLinkModal
          characterName={shareModal.characterName}
          contact={shareModal.contact}
          url={shareModal.url}
          copied={copied}
          onClose={() => {
            setShareModal(null);
          }}
          onCopy={copyToClipboard}
        />
      )}

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

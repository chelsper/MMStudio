"use client";

import { useState, useRef } from "react";
import { useControlPanelData } from "@/hooks/useControlPanelData";
import { useGMCharacter } from "@/hooks/useGMCharacter";
import { useClueReveal } from "@/hooks/useClueReveal";
import { useVotingControl } from "@/hooks/useVotingControl";
import { useGMVoting } from "@/hooks/useGMVoting";
import { LoadingState } from "@/components/ControlPage/LoadingState";
import { GMNavigationBar } from "@/components/ControlPage/GMNavigationBar";
import { TabSwitcher } from "@/components/ControlPage/TabSwitcher";
import { ControlTab } from "@/components/ControlPage/ControlTab/ControlTab";
import { PlayTab } from "@/components/ControlPage/PlayTab/PlayTab";

export default function ControlPage({ params }) {
  const { mystery, assignments, voting, loading, refetch } =
    useControlPanelData(params.id);
  const [activeTab, setActiveTab] = useState("control");
  const [showClueDetail, setShowClueDetail] = useState(null);
  const [jumpToClues, setJumpToClues] = useState(false);
  const cluesSectionRef = useRef(null);

  const {
    gmCharacterToken,
    gmGameData,
    gmGameLoading,
    handleSelectGmCharacter,
    setGmCharacterToken,
  } = useGMCharacter(params.id, activeTab);

  const { revealing, handleRevealNext } = useClueReveal(params.id, refetch);
  const { togglingVoting, handleToggleVoting } = useVotingControl(
    params.id,
    refetch,
  );
  const { gmSelectedVote, gmSubmittingVote, handleGmVote, setGmSelectedVote } =
    useGMVoting(gmCharacterToken, gmGameData);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowClueDetail(null);
  };

  const handleRevealNextWrapper = async () => {
    const totalCharacters = mystery?.data?.characters?.length || 0;
    const assignedCharacters = assignments.length;
    await handleRevealNext(totalCharacters, assignedCharacters);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!mystery) return null;

  const mysteryData = mystery.data;
  const globalCluesRevealed = mystery.globalCluesRevealed || 0;
  const totalClues = mysteryData.clues.length;
  const allRevealed = globalCluesRevealed >= totalClues;
  const votingOpen = voting?.open || false;
  const voteCounts = voting?.voteCounts || {};
  const votesList = voting?.votes || [];
  const totalVotes = voting?.totalVotes || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GMNavigationBar mysteryId={params.id} />

        <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-crimson-text">
            {activeTab === "control"
              ? "🎮 Live Game Control"
              : "🎭 Your Game View"}
          </h1>
          <p className="text-purple-300 text-lg">{mysteryData.title}</p>
          {activeTab === "control" && (
            <p className="text-purple-400 text-sm mt-2">
              This panel updates in real-time. Players will see clues as you
              reveal them.
            </p>
          )}
        </div>

        {activeTab === "control" ? (
          <ControlTab
            mystery={mystery}
            mysteryData={mysteryData}
            params={params}
            assignments={assignments}
            globalCluesRevealed={globalCluesRevealed}
            totalClues={totalClues}
            allRevealed={allRevealed}
            revealing={revealing}
            handleRevealNext={handleRevealNextWrapper}
            votingOpen={votingOpen}
            voteCounts={voteCounts}
            votesList={votesList}
            totalVotes={totalVotes}
            togglingVoting={togglingVoting}
            handleToggleVoting={handleToggleVoting}
          />
        ) : (
          <PlayTab
            assignments={assignments}
            gmCharacterToken={gmCharacterToken}
            handleSelectGmCharacter={handleSelectGmCharacter}
            gmGameData={gmGameData}
            gmGameLoading={gmGameLoading}
            showClueDetail={showClueDetail}
            setShowClueDetail={setShowClueDetail}
            cluesSectionRef={cluesSectionRef}
            jumpToClues={jumpToClues}
            setJumpToClues={setJumpToClues}
            votingOpen={votingOpen}
            gmSelectedVote={gmSelectedVote}
            gmSubmittingVote={gmSubmittingVote}
            handleGmVote={handleGmVote}
            setActiveTab={setActiveTab}
            mysteryId={params.id}
          />
        )}
      </div>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes clue-flash { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      `}</style>
    </div>
  );
}

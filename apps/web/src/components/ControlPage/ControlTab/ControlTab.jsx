import { ClueRevealControl } from "./ClueRevealControl";
import { VotingControl } from "./VotingControl";
import { PlayerStatus } from "./PlayerStatus";

export function ControlTab({
  mystery,
  mysteryData,
  params,
  assignments,
  globalCluesRevealed,
  totalClues,
  allRevealed,
  revealing,
  handleRevealNext,
  votingOpen,
  voteCounts,
  votesList,
  totalVotes,
  togglingVoting,
  handleToggleVoting,
}) {
  return (
    <>
      <ClueRevealControl
        globalCluesRevealed={globalCluesRevealed}
        totalClues={totalClues}
        allRevealed={allRevealed}
        revealing={revealing}
        handleRevealNext={handleRevealNext}
        mysteryData={mysteryData}
      />

      {allRevealed && (
        <VotingControl
          votingOpen={votingOpen}
          voteCounts={voteCounts}
          votesList={votesList}
          totalVotes={totalVotes}
          togglingVoting={togglingVoting}
          handleToggleVoting={handleToggleVoting}
          mysteryData={mysteryData}
        />
      )}

      <PlayerStatus
        assignments={assignments}
        globalCluesRevealed={globalCluesRevealed}
        mysteryId={params.id}
      />
    </>
  );
}

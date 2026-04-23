export function CharacterCard({ character }) {
  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-2 border-purple-500/40 rounded-xl p-8 mb-6">
      <div className="text-center mb-4">
        <div className="text-purple-400 text-sm font-semibold mb-1">
          YOU ARE PLAYING
        </div>
        <h2 className="text-3xl font-bold text-white">{character.name}</h2>
        <p className="text-purple-300 text-lg">{character.role}</p>
      </div>
      {character.vibe && (
        <p className="text-center text-fuchsia-200 text-sm mb-4">
          {character.vibe}
        </p>
      )}
      <div className="space-y-3 mt-6">
        {character.publicBio && (
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <span className="text-purple-300 font-semibold">Public bio: </span>
            <span className="text-purple-100">{character.publicBio}</span>
          </div>
        )}
        <div>
          <span className="text-purple-300 font-semibold">Personality: </span>
          <span className="text-purple-100">{character.personality}</span>
        </div>
        <div>
          <span className="text-purple-300 font-semibold">
            Your relationship with the victim:{" "}
          </span>
          <span className="text-purple-100">
            {character.relationshipToVictim}
          </span>
        </div>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 mt-4">
          <span className="text-amber-300 font-semibold">🤫 Your secret: </span>
          <span className="text-amber-100">{character.secret}</span>
        </div>
        {character.willingToShare && (
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <span className="text-cyan-300 font-semibold">
              You are willing to share:{" "}
            </span>
            <span className="text-cyan-100">{character.willingToShare}</span>
          </div>
        )}
        {character.roleplayNotes?.length > 0 && (
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-purple-300 font-semibold mb-2">
              Roleplay notes
            </div>
            <ul className="space-y-1 text-purple-100 text-sm">
              {character.roleplayNotes.map((note) => (
                <li key={note}>• {note}</li>
              ))}
            </ul>
          </div>
        )}
        {character.suspicionLevel && (
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <span className="text-rose-300 font-semibold">
              How others may see you:{" "}
            </span>
            <span className="text-rose-100">{character.suspicionLevel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

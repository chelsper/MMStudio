function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function shouldIncludeItem(item, includeBonusCharacter) {
  if (item?.onlyWhenBonus === true && !includeBonusCharacter) {
    return false;
  }
  if (item?.onlyWhenBonus === false && includeBonusCharacter) {
    return false;
  }
  return true;
}

function resolveVariantText(item, field, includeBonusCharacter) {
  if (!item) return item;
  if (item[`${field}WithBonus`] && includeBonusCharacter) {
    return item[`${field}WithBonus`];
  }
  if (item[`${field}WithoutBonus`] && !includeBonusCharacter) {
    return item[`${field}WithoutBonus`];
  }
  return item[field];
}

function resolvePacket(packet, includeBonusCharacter) {
  if (!packet) return packet;

  const privateClues = (packet.privateClues || [])
    .filter((clue) => shouldIncludeItem(clue, includeBonusCharacter))
    .map((clue) => ({
      clueIndex: clue.clueIndex,
      secretInfo: resolveVariantText(clue, "secretInfo", includeBonusCharacter),
    }));

  return {
    ...packet,
    publicBio: resolveVariantText(packet, "publicBio", includeBonusCharacter),
    willingToShare: resolveVariantText(
      packet,
      "willingToShare",
      includeBonusCharacter,
    ),
    roleplayNotes: (packet.roleplayNotes || []).filter((note) =>
      shouldIncludeItem(note, includeBonusCharacter),
    ),
    suspicionLevel: resolveVariantText(
      packet,
      "suspicionLevel",
      includeBonusCharacter,
    ),
    privateClues,
  };
}

export function resolveMysteryData(rawMysteryData, config = {}) {
  const mysteryData = deepClone(rawMysteryData);
  const includeBonusCharacter = Boolean(config.includeBonusCharacter);

  mysteryData.characters = (mysteryData.characters || [])
    .filter((character) => shouldIncludeItem(character, includeBonusCharacter))
    .map((character) => ({
      ...character,
      packet: resolvePacket(character.packet, includeBonusCharacter),
    }));

  mysteryData.accusationTargets = mysteryData.characters.filter(
    (character) => character.canBeAccused !== false,
  );

  mysteryData.clues = (mysteryData.clues || [])
    .filter((clue) => shouldIncludeItem(clue, includeBonusCharacter))
    .map((clue) => ({
      ...clue,
      title: resolveVariantText(clue, "title", includeBonusCharacter),
      description: resolveVariantText(
        clue,
        "description",
        includeBonusCharacter,
      ),
      significance: resolveVariantText(
        clue,
        "significance",
        includeBonusCharacter,
      ),
    }));

  if (mysteryData.hostGuide) {
    mysteryData.hostGuide = {
      ...mysteryData.hostGuide,
      assignmentNotes: (mysteryData.hostGuide.assignmentNotes || []).filter(
        (note) => shouldIncludeItem(note, includeBonusCharacter),
      ),
      roundFlow: (mysteryData.hostGuide.roundFlow || [])
        .filter((round) => shouldIncludeItem(round, includeBonusCharacter))
        .map((round) => ({
          ...round,
          hostScript: resolveVariantText(
            round,
            "hostScript",
            includeBonusCharacter,
          ),
          notes: (round.notes || []).filter((note) =>
            shouldIncludeItem(note, includeBonusCharacter),
          ),
        })),
      announcements: (mysteryData.hostGuide.announcements || []).filter(
        (line) => shouldIncludeItem(line, includeBonusCharacter),
      ),
      finalRevealScript: (
        mysteryData.hostGuide.finalRevealScript || []
      ).filter((line) => shouldIncludeItem(line, includeBonusCharacter)),
      setupChecklist: (mysteryData.hostGuide.setupChecklist || []).filter(
        (item) => shouldIncludeItem(item, includeBonusCharacter),
      ),
      bonusModeNotes: (mysteryData.hostGuide.bonusModeNotes || []).filter(
        (item) => shouldIncludeItem(item, includeBonusCharacter),
      ),
    };
  }

  mysteryData.metadata = {
    ...(mysteryData.metadata || {}),
    effectivePlayerCount: mysteryData.characters.length,
    includeBonusCharacter,
  };

  return mysteryData;
}


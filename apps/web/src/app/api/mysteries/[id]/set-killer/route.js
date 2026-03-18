import sql from "@/app/api/utils/sql";

// Set (or randomize) the killer for a mystery
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { assignmentId, randomize } = body;

    // Check mystery exists
    const mysteryRows = await sql("SELECT id FROM mysteries WHERE id = $1", [
      id,
    ]);

    if (mysteryRows.length === 0) {
      return Response.json(
        { success: false, error: "Mystery not found" },
        { status: 404 },
      );
    }

    // Get all assignments for this mystery
    const assignments = await sql(
      "SELECT id, character_name FROM character_assignments WHERE mystery_id = $1",
      [id],
    );

    if (assignments.length === 0) {
      return Response.json(
        { success: false, error: "No players have been assigned yet" },
        { status: 400 },
      );
    }

    let killerId;

    if (randomize) {
      // Pick a random assignment
      const randomIndex = Math.floor(Math.random() * assignments.length);
      killerId = assignments[randomIndex].id;
    } else if (assignmentId) {
      // Check that the assignment belongs to this mystery
      const valid = assignments.find((a) => a.id === assignmentId);
      if (!valid) {
        return Response.json(
          { success: false, error: "Invalid player selection" },
          { status: 400 },
        );
      }
      killerId = assignmentId;
    } else {
      return Response.json(
        {
          success: false,
          error: "Provide assignmentId or set randomize to true",
        },
        { status: 400 },
      );
    }

    // Clear any existing killer, then set the new one
    await sql.transaction([
      sql(
        "UPDATE character_assignments SET is_killer = false WHERE mystery_id = $1",
        [id],
      ),
      sql(
        "UPDATE character_assignments SET is_killer = true WHERE id = $1 AND mystery_id = $2",
        [killerId, id],
      ),
    ]);

    // Get the killer's info to return
    const killerRows = await sql(
      "SELECT id, character_name, contact FROM character_assignments WHERE id = $1",
      [killerId],
    );

    return Response.json({
      success: true,
      killer: {
        assignmentId: killerRows[0].id,
        characterName: killerRows[0].character_name,
        contact: killerRows[0].contact,
      },
    });
  } catch (error) {
    console.error("Error setting killer:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

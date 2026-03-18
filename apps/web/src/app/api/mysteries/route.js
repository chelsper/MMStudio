import sql from "@/app/api/utils/sql";

// Save a mystery to the database
export async function POST(request) {
  try {
    const body = await request.json();
    const { id, mysteryData, config } = body;

    await sql(
      "INSERT INTO mysteries (id, mystery_data, config) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET mystery_data = $2, config = $3",
      [id, JSON.stringify(mysteryData), JSON.stringify(config)],
    );

    return Response.json({ success: true, id });
  } catch (error) {
    console.error("Error saving mystery:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

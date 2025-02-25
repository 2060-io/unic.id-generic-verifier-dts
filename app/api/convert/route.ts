import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { base64JP2 } = data;
    if (!base64JP2) {
      return new Response(JSON.stringify({ error: "No base 64" }), {
        status: 500,
      });
    }
    // Decode Base64 to Buffer
    const buffer = Buffer.from(base64JP2.split(",")[1], "base64");
    const metatatda = await sharp(buffer).metadata();
    console.log("metadataaaaaaaa", metatatda);
    // Convert to PNG
    const pngBuffer = await sharp(buffer).png().toBuffer();
    // Convert png to Base64
    const pngBase64 = `data:image/png;base64,${pngBuffer.toString("base64")}`;
    return new Response(JSON.stringify({ message: pngBase64 }));
  } catch (error) {
    console.error("Error converting jp2 image: ", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

import fs from "fs";
import { exec } from "child_process";
import path from "path";

// Directory to store temporary files
const tempDir = path.join(__dirname, "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

/**
 * Function to convert a base64 JP2 file to JPG and return the JPG as base64.
 * @param {string} base64JP2 - JP2 image in base64.
 * @returns {Promise<string>} - JPG image in base64.
 */
const convertBase64JP2ToPNGBase64 = (base64JP2: string) => {
  return new Promise((resolve, reject) => {
    try {
      // Decode base64 to a JP2 file
      const jp2Filename = `input_${Date.now()}.jp2`;
      const jp2Path = path.join(tempDir, jp2Filename);
      const pngFilename = `output_${Date.now()}.png`;
      const pngPath = path.join(tempDir, pngFilename);

      // Save the JP2 file
      const buffer = Buffer.from(base64JP2, "base64");
      fs.writeFileSync(jp2Path, buffer);

      // Execute the conversion using ImageMagick
      const command = `magick "${jp2Path}" "${pngPath}"`;

      exec(command, (err, stdout, stderr) => {
        if (err) {
          return reject(`Error converting JP2 to PNG ${stderr}`);
        }
        // Read the resulting JPG image and convert it to base64
        const jpgBase64 = fs.readFileSync(pngPath, { encoding: "base64" });
        console.log("jpgBase64", jpgBase64);
        // Delete temporary files
        fs.unlinkSync(jp2Path);
        fs.unlinkSync(pngPath);

        resolve(`data:image/png;base64,${jpgBase64}`);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { base64JP2 } = data;
    if (!base64JP2) {
      return new Response(JSON.stringify({ error: "No base 64 provided" }), {
        status: 400,
      });
    }
    const imageContent = base64JP2.split(",")[1];
    const base64PNG = await convertBase64JP2ToPNGBase64(imageContent);
    return new Response(JSON.stringify({ message: base64PNG }));
  } catch (error) {
    console.error("Error converting jp2 image: ", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

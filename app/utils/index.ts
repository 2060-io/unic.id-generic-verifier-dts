import { OriginalClaim, Claim } from "@/app/lib/definitions";
import defaultPngBase64 from "./defaultPngBase64";

/**
 * Converts a camelCase string to a sentence format (first letter capitalized, rest in lower case).
 * i.e. sanitizeString("helloWorld")  // returns: 'Hello world'
 */
function sanitizeString(str?: string) {
  if (!str) return "";
  const result = str.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  let words = result.split(/[\s_-]+/);
  words = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word.charAt(0).toLowerCase() + word.slice(1);
    }
  });
  return words.join(" ");
}

const getDataUrlMimeType = (dataUrl: string) => {
  const match = dataUrl.match(/^data:(.*?);base64,/);
  return match ? match[1] : null;
};

const convertToPNG = async (base64JP2: string) => {
  try {
    const res = await fetch(`./api/convert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64JP2 }),
    });
    const data = await res.json();
    return data.pngImageBase64 as string;
  } catch (error) {
    console.error("Error converting jp2 image: ", error);
    return defaultPngBase64;
  }
};

export const transformClaimsData = async (claims: OriginalClaim[]) => {
  const stringRows: Claim[] = [];
  for (const claim of claims) {
    const { name, value } = claim;
    if (name === "id" || name === "type") return; // omit id and type

    if (!value) return; // omit properties with no value

    if (typeof value === "string" && value.startsWith("data:image/")) {
      let finalImageValue = value;
      const mimeType = getDataUrlMimeType(value);
      if (mimeType === "image/jp2") {
        const jp2Base64 = value.split(",")[1];
        const convertedImage = await convertToPNG(jp2Base64);
        finalImageValue = `data:image/png;base64,${convertedImage}`;
      }
      stringRows.push({
        key: sanitizeString(name),
        value: finalImageValue,
        type: "image",
      });
    } else if (typeof value === "string") {
      stringRows.push({
        key: sanitizeString(name),
        value,
        type: "string",
      });
    }
  }
  return stringRows;
};

'use server';
import fs from "fs";
import path from "path";


export async function POST(req) {
  const jsonData = await req.json();
  const filePath = path.join(process.cwd(), "data", "userData.json");

  console.log("Appending user data:", jsonData);

  try {
    let jsonArray = [];

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8").trim();
      if (fileContent) {
        jsonArray = JSON.parse(fileContent);
      }
    }

    // Ensure jsonArray is an array
    if (!Array.isArray(jsonArray)) {
      jsonArray = [];
    }

    // Push jsonData as a new object into jsonArray
    jsonArray.push(jsonData);

    fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2));

    //return Response.json({ message: 'JSON data appended successfully.' });
    return Response.json({ message: 'JSON data appended successfully.' });
    //revalidatePath("/"); // Revalidate the cache for the home page
    //return Response.redirect("https://www.google.com/");
  } catch (error) {
    console.error("Error appending to file:", error);
    return Response.json({ message: "Error appending to file." });
  }
}

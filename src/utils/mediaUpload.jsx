import { createClient } from "@supabase/supabase-js";

const url = "https://erejdxdwzxyfofzeiqdt.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZWpkeGR3enh5Zm9memVpcWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NDkyNTUsImV4cCI6MjA4MDUyNTI1NX0.gSINQ0EhJI3jR8YAEI8VQV-lWzYKEBAAJr05Rq7ZAZU";

const supabase = createClient(url, key);

export default function mediaUpload(file) {
  const mediaUploadPromise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
      return;
    }
    const timestamp = new Date().getTime();
    const newName = timestamp + file.name;

    supabase.storage
      .from("images")
      .upload(newName, file, {
        upsert: false,
        cacheControl: "3600",
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(newName)
          .data.publicUrl;
        resolve(publicUrl);
      })
      .catch((e) => {
        reject("Error occurred while uploading media");
      });
  });
  return mediaUploadPromise;
}

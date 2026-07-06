function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
  return `${size} ${sizes[i]}`;
}

function decodeJWT(token: string) {
  const base64Url = token.split(".")[1]; // Extract the payload part
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace URL-safe characters
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join("")
  );

  return JSON.parse(jsonPayload); // Parse JSON
}

export { formatBytes, decodeJWT };

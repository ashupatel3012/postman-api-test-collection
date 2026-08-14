/**
 * Pre-Request Script — Reusable Auth Handler
 * ------------------------------------------
 * Add this script to a Collection's pre-request tab to automatically
 * attach the correct auth header before every request in the collection.
 *
 * Author: Ashish Patel
 *
 * How to use:
 * 1. Open your Collection in Postman
 * 2. Click the collection name → "Edit"
 * 3. Go to the "Pre-request Script" tab
 * 4. Paste this script
 * 5. Set the environment variables listed below
 */

// --- Configuration ---
// Set these in your Postman Environment:
//   auth_type     → "bearer" | "apikey" | "basic"
//   bearer_token  → your Bearer token value
//   api_key       → your API key value
//   basic_username / basic_password → for Basic Auth

const authType = pm.environment.get("auth_type") || "bearer";

if (authType === "bearer") {
    const token = pm.environment.get("bearer_token");
    if (!token) {
        console.warn("⚠️  bearer_token is not set in environment.");
    } else {
        pm.request.headers.add({
            key: "Authorization",
            value: `Bearer ${token}`
        });
        console.log("✅ Bearer token attached.");
    }

} else if (authType === "apikey") {
    const apiKey = pm.environment.get("api_key");
    if (!apiKey) {
        console.warn("⚠️  api_key is not set in environment.");
    } else {
        pm.request.headers.add({
            key: "x-api-key",
            value: apiKey
        });
        console.log("✅ API key attached.");
    }

} else if (authType === "basic") {
    const username = pm.environment.get("basic_username");
    const password = pm.environment.get("basic_password");
    if (!username || !password) {
        console.warn("⚠️  basic_username or basic_password not set in environment.");
    } else {
        const encoded = btoa(`${username}:${password}`);
        pm.request.headers.add({
            key: "Authorization",
            value: `Basic ${encoded}`
        });
        console.log("✅ Basic Auth header attached.");
    }

} else {
    console.warn(`⚠️  Unknown auth_type: "${authType}". Supported: bearer, apikey, basic`);
}

// --- Always attach Content-Type for POST/PUT/PATCH ---
const method = pm.request.method.toUpperCase();
if (["POST", "PUT", "PATCH"].includes(method)) {
    if (!pm.request.headers.get("Content-Type")) {
        pm.request.headers.add({
            key: "Content-Type",
            value: "application/json"
        });
    }
}

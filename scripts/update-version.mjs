import fs from 'fs';
import path from 'path';

// Define the path to the .env file
const envFilePath = path.resolve('.env');

// Read the current .env file
let envContent = fs.readFileSync(envFilePath, 'utf8');

// Extract the current version
const versionMatch = envContent.match(/VITE_APP_VERSION=(\d+)\.(\d+)\.(\d+)/);
if (!versionMatch) {
    console.error('Version format not found in .env');
    process.exit(1);
}

let [_, major, minor, patch] = versionMatch;
patch = parseInt(patch) + 1; // Increment the patch version

// Replace the version in .env
const newVersion = `VITE_APP_VERSION=${major}.${minor}.${patch}`;
envContent = envContent.replace(versionMatch[0], newVersion);

// Write the updated content back to the .env file
fs.writeFileSync(envFilePath, envContent);

console.log(`✅ Updated version to ${newVersion}`);

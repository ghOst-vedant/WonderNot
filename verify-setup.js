#!/usr/bin/env node

/**
 * WonderNot Environment Verification Script
 * This script checks if your environment is properly configured to run WonderNot
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkFileExists(filePath, name) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    log(`✓ ${name} exists`, colors.green);
  } else {
    log(`✗ ${name} is missing`, colors.red);
  }
  return exists;
}

function checkEnvVariables(envPath, requiredVars) {
  if (!fs.existsSync(envPath)) {
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const missingVars = [];
  const placeholderVars = [];

  requiredVars.forEach(varName => {
    const regex = new RegExp(`^${varName}=([^#\\n\\r]*?)(?:\\s*#|$)`, 'm');
    const match = envContent.match(regex);
    
    if (!match) {
      missingVars.push(varName);
    } else {
      const value = match[1].trim();
      if (!value || value.includes('your_') || value.includes('here')) {
        placeholderVars.push(varName);
      }
    }
  });

  if (missingVars.length > 0) {
    log(`  ⚠ Missing variables: ${missingVars.join(', ')}`, colors.yellow);
  }
  
  if (placeholderVars.length > 0) {
    log(`  ⚠ Placeholder values need to be replaced: ${placeholderVars.join(', ')}`, colors.yellow);
  }

  return missingVars.length === 0 && placeholderVars.length === 0;
}

function main() {
  log('\n🌍 WonderNot Environment Verification\n', colors.cyan);
  
  let allChecks = true;

  // Check Node.js version
  const nodeVersion = process.version;
  log(`Node.js version: ${nodeVersion}`, colors.cyan);
  
  // Check server setup
  log('\n📦 Checking Server Setup...', colors.cyan);
  const serverEnvPath = path.join(__dirname, 'server', '.env');
  const serverEnvExamplePath = path.join(__dirname, 'server', '.env.example');
  
  checkFileExists(serverEnvExamplePath, 'Server .env.example');
  
  const serverEnvExists = checkFileExists(serverEnvPath, 'Server .env');
  if (serverEnvExists) {
    const requiredServerVars = ['MONGO_URL', 'JWT_SECRET', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
    const serverEnvValid = checkEnvVariables(serverEnvPath, requiredServerVars);
    if (!serverEnvValid) {
      allChecks = false;
    }
  } else {
    log('  → Run: cd server && cp .env.example .env', colors.yellow);
    allChecks = false;
  }

  // Check client setup
  log('\n📱 Checking Client Setup...', colors.cyan);
  const clientEnvPath = path.join(__dirname, 'client', '.env');
  const clientEnvExamplePath = path.join(__dirname, 'client', '.env.example');
  
  checkFileExists(clientEnvExamplePath, 'Client .env.example');
  
  const clientEnvExists = checkFileExists(clientEnvPath, 'Client .env');
  if (clientEnvExists) {
    const requiredClientVars = ['VITE_BACKENDURL'];
    const clientEnvValid = checkEnvVariables(clientEnvPath, requiredClientVars);
    if (!clientEnvValid) {
      allChecks = false;
    }
  } else {
    log('  → Run: cd client && cp .env.example .env', colors.yellow);
    allChecks = false;
  }

  // Check for node_modules
  log('\n📚 Checking Dependencies...', colors.cyan);
  const serverNodeModules = checkFileExists(
    path.join(__dirname, 'server', 'node_modules'),
    'Server node_modules'
  );
  if (!serverNodeModules) {
    log('  → Run: cd server && npm install', colors.yellow);
    allChecks = false;
  }

  const clientNodeModules = checkFileExists(
    path.join(__dirname, 'client', 'node_modules'),
    'Client node_modules'
  );
  if (!clientNodeModules) {
    log('  → Run: cd client && npm install', colors.yellow);
    allChecks = false;
  }

  // Summary
  log('\n' + '='.repeat(50), colors.cyan);
  if (allChecks) {
    log('✓ All checks passed! You\'re ready to run WonderNot!', colors.green);
    log('\nNext steps:', colors.cyan);
    log('1. Start the server: cd server && npm start', colors.reset);
    log('2. Start the client: cd client && npm start', colors.reset);
  } else {
    log('⚠ Some checks failed. Please follow the instructions above.', colors.yellow);
    log('\nFor detailed setup instructions, see QUICKSTART.md', colors.cyan);
  }
  log('='.repeat(50) + '\n', colors.cyan);
}

main();

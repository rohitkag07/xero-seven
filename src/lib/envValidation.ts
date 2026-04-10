/**
 * Environment Variable Validation
 * Ensures all required InsForge credentials and configuration are present
 */

export interface ValidatedEnv {
  insforgeUrl: string;
  insforgeAnonKey: string;
}

function getEnvVar(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export function validateEnv(): ValidatedEnv {
  try {
    return {
      insforgeUrl: getEnvVar('VITE_INSFORGE_URL'),
      insforgeAnonKey: getEnvVar('VITE_INSFORGE_ANON_KEY'),
    };
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw new Error(
      'Missing required environment variables. Please check your .env file and ensure VITE_INSFORGE_URL and VITE_INSFORGE_ANON_KEY are set.'
    );
  }
}

// Validate on module load
export const env = validateEnv();

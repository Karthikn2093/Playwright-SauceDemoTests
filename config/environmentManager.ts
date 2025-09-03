// config/environmentManager.ts
import { environments, Environment } from './environment';

export class EnvironmentManager {
  private static currentEnv: Environment;

  static getEnvironment(): Environment {
    if (!this.currentEnv) {
      const envName = process.env.TEST_ENV || 'dev';
      this.currentEnv = environments[envName];
      
      if (!this.currentEnv) {
        throw new Error(`Environment '${envName}' not found. Available: ${Object.keys(environments).join(', ')}`);
      }
    }
    return this.currentEnv;
  }

  static getBaseUrl(): string {
    return this.getEnvironment().baseUrl;
  }

  static getApiUrl(): string {
    return this.getEnvironment().apiUrl;
  }

  static getValidCredentials() {
    return this.getEnvironment().credentials.validUser;
  }

  static getInvalidCredentials() {
    return this.getEnvironment().credentials.invalidUser;
  }

  static getTimeouts() {
    return this.getEnvironment().timeouts;
  }
}
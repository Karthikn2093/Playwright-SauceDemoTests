// config/environments.ts
export interface Environment {
  name: string;
  baseUrl: string;
  apiUrl: string;
  credentials: {
    validUser: {
      username: string;
      password: string;
    };
    invalidUser: {
      username: string;
      password: string;
    };
  };
  timeouts: {
    default: number;
    long: number;
  };
}

export const environments: Record<string, Environment> = {
  dev: {
    name: 'Development',
    baseUrl: 'https://www.saucedemo.com',
    apiUrl: 'https://api-dev.saucedemo.com',
    credentials: {
      validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
      },
      invalidUser: {
        username: 'invalid_user',
        password: 'wrong_password'
      }
    },
    timeouts: {
      default: 5000,
      long: 10000
    }
  },
  
  staging: {
    name: 'Staging',
    baseUrl: 'https://staging.saucedemo.com',
    apiUrl: 'https://api-staging.saucedemo.com',
    credentials: {
      validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
      },
      invalidUser: {
        username: 'invalid_user',
        password: 'wrong_password'
      }
    },
    timeouts: {
      default: 7000,
      long: 15000
    }
  },
  
  prod: {
    name: 'Production',
    baseUrl: 'https://www.saucedemo.com',
    apiUrl: 'https://api.saucedemo.com',
    credentials: {
      validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
      },
      invalidUser: {
        username: 'invalid_user',
        password: 'wrong_password'
      }
    },
    timeouts: {
      default: 10000,
      long: 20000
    }
  }
};
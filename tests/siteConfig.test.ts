import { CONFIG_VERSION, defaultSiteConfig, getSiteConfig, resetSiteConfig, setSiteConfig } from '../src/config/siteConfig.js';

declare const process: { exitCode?: number } | undefined;

type TestFn = () => void | Promise<void>;

interface TestCase {
  name: string;
  fn: TestFn;
}

const tests: TestCase[] = [];
let beforeEachHook: TestFn | null = null;

function test(name: string, fn: TestFn): void {
  tests.push({ name, fn });
}

function beforeEach(fn: TestFn): void {
  beforeEachHook = fn;
}

function assertEqual<T>(actual: T, expected: T, message?: string): void {
  if (actual !== expected) {
    throw new Error(message ?? `Expected ${expected} but received ${actual}`);
  }
}

function assertOk(value: unknown, message?: string): void {
  if (!value) {
    throw new Error(message ?? 'Expected value to be truthy');
  }
}

class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key) ?? null : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  get length(): number {
    return this.store.size;
  }
}

const memoryStorage = new MemoryStorage();

beforeEach(() => {
  memoryStorage.clear();
  (globalThis as unknown as { window?: object }).window = {};
  (globalThis as { localStorage?: Storage }).localStorage = memoryStorage;
});

test('getSiteConfig returns defaults when storage is empty', () => {
  resetSiteConfig();
  const config = getSiteConfig();

  assertEqual(config.business.name, defaultSiteConfig.business.name);
  assertEqual(config.menu.items.length, defaultSiteConfig.menu.items.length);
});

test('setSiteConfig persists and getSiteConfig returns stored data', () => {
  const updatedConfig = {
    ...defaultSiteConfig,
    business: {
      ...defaultSiteConfig.business,
      name: 'Test Smash & Spice',
    },
  };

  setSiteConfig(updatedConfig);
  const stored = getSiteConfig();

  assertEqual(stored.business.name, 'Test Smash & Spice');
});

test('getSiteConfig falls back to defaults when stored JSON is invalid', () => {
  let logged = false;
  const originalError = console.error;
  console.error = () => {
    logged = true;
  };

  memoryStorage.setItem('smashandspice-config', '{not valid json');
  memoryStorage.setItem('smashandspice-config-version', CONFIG_VERSION);
  const config = getSiteConfig();
  console.error = originalError;

  assertEqual(config.business.name, defaultSiteConfig.business.name);
  assertOk(logged, 'expected parsing error to be logged');
});

async function run(): Promise<void> {
  let hasFailure = false;

  for (const { name, fn } of tests) {
    try {
      if (beforeEachHook) {
        await beforeEachHook();
      }
      await fn();
      console.log(`✓ ${name}`);
    } catch (error) {
      hasFailure = true;
      console.error(`✗ ${name}`);
      console.error(error);
    }
  }

  if (hasFailure) {
    if (process) {
      process.exitCode = 1;
    } else {
      throw new Error('One or more tests failed');
    }
  }
}

void run();

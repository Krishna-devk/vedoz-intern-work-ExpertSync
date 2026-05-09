const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Handle symlinks
config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true;

// 4. Force resolution of problematic packages
config.resolver.extraNodeModules = {
  '@react-native/virtualized-lists': path.resolve(workspaceRoot, 'node_modules/@react-native/virtualized-lists'),
  '@react-native-async-storage/async-storage': path.resolve(workspaceRoot, 'node_modules/@react-native-async-storage/async-storage'),
};

module.exports = config;

import husky from 'husky';

const isCi = typeof process.env.CI !== 'undefined';

if (!isCi) husky.install();

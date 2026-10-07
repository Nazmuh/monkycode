#!/usr/bin/env node
import { getConfig } from './config.js';
import { publishInstagramPost } from './instagramClient.js';

const config = getConfig();

function parseArgs(argv) {
  const args = {
    caption: config.defaultCaption,
    imageUrl: config.imageUrl,
    dryRun: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];

    if (current === '--caption') {
      args.caption = argv[i + 1];
      i += 1;
    } else if (current === '--image-url') {
      args.imageUrl = argv[i + 1];
      i += 1;
    } else if (current === '--dry-run') {
      args.dryRun = true;
    } else if (current === '--help' || current === '-h') {
      args.help = true;
    }
  }

  return args;
}

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  console.log(`Usage:\n  node src/index.js --caption "Your caption" --image-url "https://example.com/image.jpg"\n  node src/index.js --dry-run\n`);
  process.exit(0);
}

try {
  const result = await publishInstagramPost({
    caption: args.caption,
    imageUrl: args.imageUrl,
    dryRun: args.dryRun
  });

  console.log('Instagram automation result:', JSON.stringify(result, null, 2));
} catch (error) {
  console.error('Instagram automation failed:', error.message);
  process.exit(1);
}

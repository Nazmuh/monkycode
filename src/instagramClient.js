import { getConfig } from './config.js';

const { instagramAccessToken, instagramBusinessAccountId } = getConfig();

const GRAPH_API_BASE = 'https://graph.facebook.com/v19.0';

export async function publishInstagramPost({ caption, imageUrl, dryRun = false }) {
  const resolvedCaption = caption || 'New content from MonkyCode';
  const resolvedImageUrl = imageUrl || process.env.IMAGE_URL;

  if (!resolvedImageUrl) {
    throw new Error('An image URL is required. Pass --image-url or set IMAGE_URL in your environment.');
  }

  if (dryRun) {
    return {
      dryRun: true,
      message: 'Instagram post prepared without publishing.',
      caption: resolvedCaption,
      imageUrl: resolvedImageUrl
    };
  }

  const createContainerUrl = `${GRAPH_API_BASE}/${instagramBusinessAccountId}/media`;

  const createContainerParams = new URLSearchParams({
    access_token: instagramAccessToken,
    image_url: resolvedImageUrl,
    caption: resolvedCaption,
    media_type: 'IMAGE'
  });

  const createResponse = await fetch(createContainerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: createContainerParams
  });

  const createResult = await createResponse.json();

  if (!createResponse.ok) {
    throw new Error(`Instagram media creation failed: ${JSON.stringify(createResult)}`);
  }

  const mediaId = createResult.id;

  const publishUrl = `${GRAPH_API_BASE}/${instagramBusinessAccountId}/media_publish`;
  const publishParams = new URLSearchParams({
    access_token: instagramAccessToken,
    creation_id: mediaId
  });

  const publishResponse = await fetch(`${publishUrl}?${publishParams.toString()}`, {
    method: 'POST'
  });

  const publishResult = await publishResponse.json();

  if (!publishResponse.ok) {
    throw new Error(`Instagram publish failed: ${JSON.stringify(publishResult)}`);
  }

  return {
    dryRun: false,
    id: publishResult.id,
    status: publishResult.status,
    caption: resolvedCaption,
    imageUrl: resolvedImageUrl
  };
}

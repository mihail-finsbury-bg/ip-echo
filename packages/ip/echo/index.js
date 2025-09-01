export function main(event) {
  const method = event?.http?.method || 'GET';
  const headers = event?.http?.headers || {};

  const allowOrigin = '*';

  // Preflight handler
  if (method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
      body: '',
    };
  }

  // X-Forwarded-For is provided by DigitalOcean edge; may be IPv4 or IPv6
  const xff = headers['x-forwarded-for'] || '';
  // XFF can contain multiple IPs (client, proxies...). Take the left-most.
  const ip = xff.split(',')[0].trim() || 'unknown';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': allowOrigin,
    },
    body: ip,
  };
}

// api/get-config.js
// Vercel Serverless Function - يُرجع إعدادات GitHub بأمان من المتغيرات البيئية

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo  = process.env.GITHUB_REPO;

  if (!token) return res.status(500).json({ error: 'GITHUB_TOKEN is not configured.' });
  if (!repo)  return res.status(500).json({ error: 'GITHUB_REPO is not configured.' });

  return res.status(200).json({ token, repo });
}

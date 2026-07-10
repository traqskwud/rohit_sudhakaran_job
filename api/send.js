export default async function handler(req, res) {
  // Pull all resume variables safely from Vercel's backend environment
  const resumeData = {
    name: process.env.NAME || 'Your Name',
    title: process.env.TITLE || 'Job Title',
    email: process.env.RESUME_EMAIL || 'your.email@example.com',
    phone: process.env.PHONE || '000-000-0000',
    website: process.env.WEBSITE || 'https://example.com',
    location: process.env.LOCATION || 'City, Country',
    summary: process.env.SUMMARY || 'A short summary introducing your experience.',
    skills: process.env.SKILLS || 'Skill1, Skill2, Skill3',
    experience: process.env.EXPERIENCE || '[]',
    education: process.env.EDUCATION || '[]'
  };

  // Send the bundle to your frontend website
  return res.status(200).json(resumeData);
}

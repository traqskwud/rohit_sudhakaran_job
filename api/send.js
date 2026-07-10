export default async function handler(req, res) {
  // Pull all resume variables safely from Vercel's backend environment
  const resumeData = {
    name: process.env.RESUME_NAME || 'Your Name',
    title: process.env.RESUME_TITLE || 'Job Title',
    email: process.env.RESUME_EMAIL || 'your.email@example.com',
    phone: process.env.RESUME_PHONE || '000-000-0000',
    website: process.env.RESUME_WEBSITE || 'https://example.com',
    location: process.env.RESUME_LOCATION || 'City, Country',
    summary: process.env.RESUME_SUMMARY || 'A short summary introducing your experience.',
    skills: process.env.RESUME_SKILLS || 'Skill1, Skill2, Skill3',
    experience: process.env.RESUME_EXPERIENCE || '[]',
    education: process.env.RESUME_EDUCATION || '[]'
  };

  // Send the bundle to your frontend website
  return res.status(200).json(resumeData);
}

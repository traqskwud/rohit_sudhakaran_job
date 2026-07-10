    const env = (typeof process !== 'undefined' && process.env) ? process.env : window.env || {};

    const parseJsonList = (value) => {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };

    const resume = {
      name: env.RESUME_NAME || 'Your Name',
      title: env.RESUME_TITLE || 'Job Title',
      email: env.RESUME_EMAIL || "ts doesnt work",
      phone: env.RESUME_PHONE || '000-000-0000',
      website: process.env.RESUME_WEBSITE || 'https://example.com',
      location: env.RESUME_LOCATION || 'City, Country',
      summary: env.RESUME_SUMMARY || 'A short summary that introduces your experience, skills, and career goals.',
      skills: env.RESUME_SKILLS || 'Skill1, Skill2, Skill3',
      experience: parseJsonList(env.RESUME_EXPERIENCE || '[]'),
      education: parseJsonList(env.RESUME_EDUCATION || '[]')
    };

    document.getElementById('name').textContent = resume.name;
    document.getElementById('title').textContent = resume.title;
    document.getElementById('email').textContent = resume.email;
    document.getElementById('phone').textContent = resume.phone;
    document.getElementById('website').textContent = resume.website;
    document.getElementById('location').textContent = resume.location;
    document.getElementById('summary').textContent = resume.summary;
    document.getElementById('skills').textContent = resume.skills;

    const renderSection = (containerId, items) => {
      const container = document.getElementById(containerId);
      if (items.length === 0) {
        container.innerHTML = '<p class="small">No entries configured. Use env vars to populate this section.</p>';
        return;
      }
      container.innerHTML = items.map(item => {
        const title = item.title || item.role || 'Untitled';
        const company = item.company ? `<strong>${companyName(item.company)}</strong>` : '';
        const meta = [item.company, item.period].filter(Boolean).join(' · ');
        const details = item.details ? `<p>${item.details}</p>` : '';
        return `<div class="list-item"><p><strong>${title}</strong> ${meta ? `<span class="small">${meta}</span>` : ''}</p>${details}</div>`;
      }).join('');
    };

    const companyName = (company) => company;

    renderSection('experience', resume.experience);
    renderSection('education', resume.education);
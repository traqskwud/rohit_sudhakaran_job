// 1. Helper function to parse JSON lists safely
const parseJsonList = (value) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

// 2. Fetch the data bundle from your Vercel backend file
fetch('/api/send')
  .then(response => response.json())
  .then(env => {
    
    // 3. Construct your resume object using the server data
    const resume = {
      name: env.name,
      title: env.title,
      email: env.email,
      phone: env.phone,
      website: env.website,
      location: env.location,
      summary: env.summary,
      skills: env.skills,
      experience: parseJsonList(env.experience),
      education: parseJsonList(env.education)
    };

    // 4. Inject the text details into your HTML elements
    document.getElementById('name').textContent = resume.name;
    document.getElementById('title').textContent = resume.title;
    document.getElementById('email').textContent = resume.email;
    document.getElementById('phone').textContent = resume.phone;
    document.getElementById('website').textContent = resume.website;
    document.getElementById('location').textContent = resume.location;
    document.getElementById('summary').textContent = resume.summary;
    document.getElementById('skills').textContent = resume.skills;

    // 5. Render your experience and education arrays
    renderSection('experience', resume.experience);
    renderSection('education', resume.education);
  })
  .catch(error => {
    console.error("Error loading resume data from backend server:", error);
  });

// 6. Section layout renderer
const renderSection = (containerId, items) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = '<p class="small">No entries configured. Use env vars to populate this section.</p>';
    return;
  }

  container.innerHTML = items.map(item => {
    const title = item.title || item.role || 'Untitled';
    const meta = [item.company, item.period].filter(Boolean).join(' · ');
    const details = item.details ? `<p>${item.details}</p>` : '';
    return `<div class="list-item"><p><strong>${title}</strong> ${meta ? `<span class="small">${meta}</span>` : ''}</p>${details}</div>`;
  }).join('');
};

const API_BASE_URL = "https://python-portfolio-kn9o.onrender.com/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
};

export const profileService = {
  getSummary: async () => {
    const response = await fetch(`${API_BASE_URL}/profile/summary`);
    return handleResponse(response);
  },
  getAbout: async () => {
    const response = await fetch(`${API_BASE_URL}/profile/about`);
    return handleResponse(response);
  }
};

export const skillService = {
  getSkills: async () => {
    const response = await fetch(`${API_BASE_URL}/skills`);
    return handleResponse(response);
  }
};

export const projectService = {
  getProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    return handleResponse(response);
  }
};

export const contactService = {
  submitForm: async (data) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }
};

export const aiService = {
  chat: async (message) => {
    // Calling the backend API endpoint for AI chat
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await handleResponse(response);
    // Assuming backend returns { reply: "..." }
    return data.reply;
  }
};

import { GoogleGenAI } from "@google/genai";

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
    // Initializing GoogleGenAI with API_KEY from environment variables
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-3-flash-preview for general Q&A as per guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "You are Rajkumar's AI assistant. You are a world-class software engineer expert in Banking systems, Apache Fineract, and Spring Boot. Answer questions about Rajkumar's professional background, technical skills, and projects based on his portfolio. Keep responses concise and informative.",
      }
    });

    // Extract generated text directly from response.text property
    return response.text;
  }
};

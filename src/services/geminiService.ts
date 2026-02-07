import { PROFILE_EN as PROFILE, EXPERIENCES_EN as EXPERIENCES, PROJECTS_EN as PROJECTS, SKILLS, EDUCATION_EN as EDUCATION } from '../constants';

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', response.status, errorData);
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.response || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Error communicating with chat API:", error);
    return "I'm currently having trouble connecting. Please try again later or email Munawir directly.";
  }
};
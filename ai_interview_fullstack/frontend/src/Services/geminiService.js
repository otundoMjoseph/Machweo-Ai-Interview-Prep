const API_BASE = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000';

function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.message || 'Request failed';
    throw new Error(msg);
  }
  return data;
}

export async function generateInterviewQuestion(role) {
  const res = await fetch(`${API_BASE}/api/interview/question`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ role })
  });

  const data = await handleResponse(res);
  return data.question;
}

export async function getAnswerFeedback(role, question, answer) {
  const res = await fetch(`${API_BASE}/api/interview/answer`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ role, question, answer })
  });

  const data = await handleResponse(res);
  return data.feedback;
}

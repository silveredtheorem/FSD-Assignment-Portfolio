export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";

export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/api/projects`);
  if (!res.ok) {
    throw new Error("couldn't load projects — the server responded with an error");
  }
  return res.json();
}

export async function fetchProject(id) {
  const res = await fetch(`${API_BASE_URL}/api/projects/${id}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("couldn't load this project — the server responded with an error");
  }
  return res.json();
}

export async function submitContactForm(fields) {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "something went wrong sending your message");
  }
  return data;
}

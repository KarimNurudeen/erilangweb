/**
 * Client for api.erilang.dev, per API.md.
 *
 * Base URL: production https://api.erilang.dev, or VITE_API_BASE_URL / a local
 * http://localhost:8787 backend during development.
 */

const API_BASE_URL =
import.meta.env.VITE_API_BASE_URL ||
(import.meta.env.DEV ? 'http://localhost:8787' : 'https://api.erilang.dev');

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

const TOKEN_KEY = 'erilang_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);else
  localStorage.removeItem(TOKEN_KEY);
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  auth?: boolean;
  isForm?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = false, isForm = false } = options;
  const headers: Record<string, string> = {};

  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  let requestBody: BodyInit | undefined;
  if (body !== undefined) {
    if (isForm) {
      requestBody = body as FormData;
    } else {
      headers['Content-Type'] = 'application/json';
      requestBody = JSON.stringify(body);
    }
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: requestBody });
  } catch {
    throw new ApiError(0, 'Could not reach the server. Check your connection and try again.');
  }

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    throw new ApiError(res.status, data.detail || 'Something went wrong.');
  }

  return data as T;
}

// ---------- Auth ----------

export interface User {
  username: string;
  email: string;
  is_staff: boolean;
  email_verified: boolean;
  display_name: string | null;
  avatar_url: string | null;
  notify_feature_updates: boolean;
}

export const auth = {
  register: (username: string, email: string, password: string) =>
  request<{message: string;}>('/auth/register', { method: 'POST', body: { username, email, password } }),

  verifyEmail: (email: string, code: string) =>
  request<{token: string;}>('/auth/verify-email', { method: 'POST', body: { email, code } }),

  resendOtp: (email: string) =>
  request<{message: string;}>('/auth/resend-otp', { method: 'POST', body: { email } }),

  login: (email: string, password: string) =>
  request<{token: string;}>('/auth/login', { method: 'POST', body: { email, password } }),

  logout: () => request<void>('/auth/logout', { method: 'POST', auth: true }),

  me: () => request<User>('/auth/me', { auth: true }),

  updateMe: (fields: {display_name?: string | null;notify_feature_updates?: boolean;}) =>
  request<User>('/auth/me', { method: 'PUT', auth: true, body: fields }),

  uploadAvatar: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return request<{avatar_url: string;}>('/auth/me/avatar', {
      method: 'POST',
      auth: true,
      isForm: true,
      body: form
    });
  },

  forgotPassword: (email: string) =>
  request<{message: string;}>('/auth/forgot-password', { method: 'POST', body: { email } }),

  resetPassword: (email: string, code: string, new_password: string) =>
  request<{token: string;}>('/auth/reset-password', { method: 'POST', body: { email, code, new_password } }),

  changePassword: (current_password: string, new_password: string) =>
  request<{message: string;}>('/auth/change-password', {
    method: 'POST',
    auth: true,
    body: { current_password, new_password }
  })
};

export interface PublicProfile {
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  is_staff: boolean;
  joined_at: string;
  forum_thread_count: number;
  forum_reply_count: number;
  package_count: number;
}

export const users = {
  get: (username: string) => request<PublicProfile>(`/users/${encodeURIComponent(username)}`)
};

// ---------- Pagination ----------

export interface Paginated<T> {
  results: T[];
  total: number;
  page: number;
  per_page: number;
}

// ---------- Packages ----------

export interface PackageDetail {
  name: string;
  description: string;
  owner: string;
  versions: string[];
  latest: string | null;
  tags: string[];
  download_count: number;
  created_at: string;
  updated_at: string;
}

export interface PackageVersion {
  version: string;
  published_at: string;
  checksum: string;
  declares_hooks: boolean;
  download_count: number;
  yanked: boolean;
  yanked_reason: string | null;
}

export interface PackageVersionDetail {
  name: string;
  version: string;
  description: string;
  dependencies: Record<string, string>;
  checksum: string;
  declares_hooks: boolean;
  published_at: string;
  yanked: boolean;
  yanked_reason: string | null;
  download_count: number;
}

export interface PackageSummary {
  name: string;
  description: string;
  latest: string | null;
  download_count?: number;
  tags?: string[];
}

export const packages = {
  get: (name: string) => request<PackageDetail>(`/packages/${encodeURIComponent(name)}`),

  versions: (name: string) =>
  request<{versions: PackageVersion[];}>(`/packages/${encodeURIComponent(name)}/versions`),

  version: (name: string, version: string) =>
  request<PackageVersionDetail>(`/packages/${encodeURIComponent(name)}/${encodeURIComponent(version)}`),

  downloadUrl: (name: string, version: string) =>
  `${API_BASE_URL}/packages/${encodeURIComponent(name)}/${encodeURIComponent(version)}/download`,

  search: (q: string, page = 1, per_page = 20) =>
  request<Paginated<{name: string;description: string;latest: string | null;}>>(
    `/search?${new URLSearchParams({ q, page: String(page), per_page: String(per_page) })}`
  ),

  browse: (params: {tag?: string;author?: string;min_version?: string;sort?: 'updated' | 'downloads';page?: number;per_page?: number;}) => {
    const qs = new URLSearchParams();
    if (params.tag) qs.set('tag', params.tag);
    if (params.author) qs.set('author', params.author);
    if (params.min_version) qs.set('min_version', params.min_version);
    qs.set('sort', params.sort || 'updated');
    qs.set('page', String(params.page || 1));
    qs.set('per_page', String(params.per_page || 20));
    return request<Paginated<PackageSummary>>(`/packages?${qs}`);
  },

  mine: () => request<{results: (PackageSummary & {version_count: number;})[];}>('/users/me/packages', { auth: true }),

  yank: (name: string, version: string, reason: string) =>
  request<void>(`/packages/${encodeURIComponent(name)}/${encodeURIComponent(version)}/yank`, {
    method: 'POST',
    auth: true,
    body: { reason }
  })
};

// ---------- Blog ----------

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  likes: number;
  dislikes: number;
}

export interface BlogPostDetail extends BlogPostSummary {
  body: string;
  updated_at: string;
}

export interface BlogComment {
  id: number;
  body: string;
  author: string;
  author_display_name: string | null;
  author_avatar_url: string | null;
  created_at: string;
}

export const blog = {
  list: (page = 1, per_page = 20) =>
  request<Paginated<BlogPostSummary>>(`/blog/posts?page=${page}&per_page=${per_page}`),

  get: (slug: string) => request<BlogPostDetail>(`/blog/posts/${encodeURIComponent(slug)}`),

  comments: (slug: string, page = 1, per_page = 20) =>
  request<Paginated<BlogComment>>(
    `/blog/posts/${encodeURIComponent(slug)}/comments?page=${page}&per_page=${per_page}`
  ),

  addComment: (slug: string, bodyText: string) =>
  request<BlogComment>(`/blog/posts/${encodeURIComponent(slug)}/comments`, {
    method: 'POST',
    auth: true,
    body: { body: bodyText }
  }),

  deleteComment: (slug: string, commentId: number) =>
  request<void>(`/blog/posts/${encodeURIComponent(slug)}/comments/${commentId}`, {
    method: 'DELETE',
    auth: true
  }),

  react: (slug: string, value: 1 | -1) =>
  request<{likes: number;dislikes: number;my_reaction: 1 | -1 | null;}>(
    `/blog/posts/${encodeURIComponent(slug)}/reactions`,
    { method: 'POST', auth: true, body: { value } }
  ),

  myReaction: (slug: string) =>
  request<{my_reaction: 1 | -1 | null;}>(`/blog/posts/${encodeURIComponent(slug)}/reactions/me`, { auth: true })
};

// ---------- Newsletter ----------

export const newsletter = {
  subscribe: (email: string) =>
  request<{message: string;}>('/newsletter/subscribe', { method: 'POST', body: { email } }),

  confirm: (token: string) =>
  request<void>(`/newsletter/confirm?token=${encodeURIComponent(token)}`),

  unsubscribe: (token: string) =>
  request<void>(`/newsletter/unsubscribe?token=${encodeURIComponent(token)}`)
};

// ---------- Forum ----------

export interface ForumThreadSummary {
  id: number;
  title: string;
  created_by: string;
  created_by_display_name: string | null;
  created_by_avatar_url: string | null;
  created_at: string;
  updated_at: string;
  reply_count: number;
}

export interface ForumReply {
  id: number;
  body: string;
  created_by: string;
  created_by_display_name: string | null;
  created_by_avatar_url: string | null;
  created_at: string;
}

export interface ForumThreadDetail extends ForumThreadSummary {
  replies: ForumReply[];
}

export const forum = {
  threads: (page = 1, per_page = 20) =>
  request<Paginated<ForumThreadSummary>>(`/forum/threads?page=${page}&per_page=${per_page}`),

  thread: (id: number) => request<ForumThreadDetail>(`/forum/threads/${id}`),

  createThread: (title: string, bodyText: string) =>
  request<ForumThreadDetail>('/forum/threads', { method: 'POST', auth: true, body: { title, body: bodyText } }),

  reply: (id: number, bodyText: string) =>
  request<ForumReply>(`/forum/threads/${id}/replies`, { method: 'POST', auth: true, body: { body: bodyText } }),

  threadEventsUrl: (id: number) => `${API_BASE_URL}/forum/threads/${id}/events`,
  globalEventsUrl: () => `${API_BASE_URL}/forum/events`
};

// ---------- Releases ----------

export interface ReleaseAsset {
  id: number;
  os_type: string;
  kind: 'file' | 'command';
  label: string;
  value: string | null;
  download_url: string | null;
}

export interface ReleaseSummary {
  version: string;
  title: string;
  author: string;
  published_at: string;
}

export interface ReleaseDetail extends ReleaseSummary {
  updated_at: string;
  description: string;
  assets: ReleaseAsset[];
}

export const releases = {
  latest: () => request<ReleaseDetail>('/releases/latest'),
  list: (page = 1, per_page = 20) =>
  request<Paginated<ReleaseSummary>>(`/releases?page=${page}&per_page=${per_page}`),
  get: (version: string) => request<ReleaseDetail>(`/releases/${encodeURIComponent(version)}`),
  assetDownloadUrl: (id: number) => `${API_BASE_URL}/releases/assets/${id}/download`
};

// ---------- Case studies ----------

export type CaseStudyCategory = 'Backend' | 'Data' | 'Tooling' | 'Automation' | 'Accessibility';

export interface CaseStudy {
  slug: string;
  company: string;
  category: CaseStudyCategory;
  quote: string;
  author_name: string;
  author_role: string;
  metric: string;
  metric_label: string;
  body: string | null;
  logo_url: string | null;
  published_at: string | null;
}

export const caseStudies = {
  list: (page = 1, per_page = 20) =>
  request<Paginated<CaseStudy>>(`/case-studies?page=${page}&per_page=${per_page}`),

  get: (slug: string) => request<CaseStudy>(`/case-studies/${encodeURIComponent(slug)}`)
};

// ---------- Sandbox ----------

export interface SandboxRunResult {
  ok: boolean;
  output: string;
  error: string | null;
}

export interface SandboxLimits {
  max_code_bytes: number;
  wall_clock_timeout_seconds: number;
  cold_start_budget_seconds: number;
  execution_budget_seconds: number;
  memory_limit: string;
  max_runs_per_minute: number;
}

export const sandbox = {
  run: (code: string) => request<SandboxRunResult>('/sandbox/run', { method: 'POST', body: { code } }),
  limits: () => request<SandboxLimits>('/sandbox/limits')
};

export { API_BASE_URL };

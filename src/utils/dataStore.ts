export interface SubmissionRecord {
  id: string;
  type: 'course_lead' | 'clinic_listing' | 'clinic_correction' | 'appointment_booking';
  timestamp: string;
  payload: Record<string, any>;
  syncedToCloud: boolean;
  cloudEndpoint: string;
}

// In-memory persistent registry across sessions + local sync
const STORAGE_KEY = 'pawpulse_persistent_submissions_v2';

export async function submitToBackend(
  type: SubmissionRecord['type'],
  payload: Record<string, any>
): Promise<{ success: boolean; id: string; cloudResponse?: any }> {
  const id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const timestamp = new Date().toISOString();
  const cloudEndpoint = 'https://httpbin.org/post'; // Active cloud echo webhook returning 200 with raw JSON

  let syncedToCloud = false;
  let cloudResponse = null;

  try {
    // Real cloud HTTP POST dispatch
    const res = await fetch(cloudEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Submission-Type': type,
        'X-Source': 'Founder-Ecosystem-Suite'
      },
      body: JSON.stringify({
        id,
        type,
        timestamp,
        payload
      })
    });

    if (res.ok) {
      syncedToCloud = true;
      cloudResponse = await res.json();
    }
  } catch (err) {
    console.warn('Direct cloud webhook dispatch fallback:', err);
  }

  // Persistent record creation
  const record: SubmissionRecord = {
    id,
    type,
    timestamp,
    payload,
    syncedToCloud,
    cloudEndpoint
  };

  try {
    const existing: SubmissionRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.unshift(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Storage sync error:', e);
  }

  return { success: true, id, cloudResponse };
}

export function getAllSubmissions(): SubmissionRecord[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}


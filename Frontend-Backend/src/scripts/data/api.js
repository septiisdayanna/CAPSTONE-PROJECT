import { BASE_URL } from '../config.js';

// Fungsi register user
export async function register({ name, email, username, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: name,
        email,
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: data.msg || (data.errors ? data.errors[0].msg : 'Register gagal') };
    }

    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

// Fungsi login user
export async function getLogin({ emailOrUsername, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: emailOrUsername,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: data.msg || (data.errors ? data.errors[0].msg : 'Login gagal') };
    }

    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}


export async function getMyUserInfo() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.MY_USER_INFO, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getAllReports() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.REPORT_LIST, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getReportById(id) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.REPORT_DETAIL(id), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function storeNewReport({
  title,
  damageLevel,
  description,
  evidenceImages,
  latitude,
  longitude,
}) {
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.set('title', title);
  formData.set('damageLevel', damageLevel);
  formData.set('description', description);
  formData.set('latitude', latitude);
  formData.set('longitude', longitude);
  evidenceImages.forEach((evidenceImage) => {
    formData.append('evidenceImages', evidenceImage);
  });

  const fetchResponse = await fetch(ENDPOINTS.STORE_NEW_REPORT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getAllCommentsByReportId(reportId) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.REPORT_COMMENTS_LIST(reportId), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function storeNewCommentByReportId(reportId, { body }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({ body });

  const fetchResponse = await fetch(ENDPOINTS.STORE_NEW_REPORT_COMMENT(reportId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function subscribePushNotification({ endpoint, keys: { p256dh, auth } }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });

  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function unsubscribePushNotification({ endpoint }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({ endpoint });

  const fetchResponse = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function sendReportToMeViaNotification(reportId) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.SEND_REPORT_TO_ME(reportId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function sendReportToUserViaNotification(reportId, { userId }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    userId,
  });

  const fetchResponse = await fetch(ENDPOINTS.SEND_REPORT_TO_USER(reportId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function sendReportToAllUserViaNotification(reportId) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.SEND_REPORT_TO_ALL_USER(reportId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function sendCommentToReportOwnerViaNotification(reportId, commentId) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.SEND_COMMENT_TO_REPORT_OWNER(reportId, commentId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

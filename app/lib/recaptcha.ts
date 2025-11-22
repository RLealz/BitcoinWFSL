export async function verifyRecaptchaToken(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { success: false, error: 'Missing RECAPTCHA_SECRET_KEY' } as const;
  }

  try {
    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, error: 'reCAPTCHA verification failed' } as const;
    }

    return { success: true, score: data.score ?? null } as const;
  } catch (e) {
    return { success: false, error: 'reCAPTCHA request error' } as const;
  }
}
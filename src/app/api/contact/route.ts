interface ContactPayload {
  name?: unknown;
  email?: unknown;
  question?: unknown;
}

function asTrimmed(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Demo endpoint: validates the form payload and reports success without sending it anywhere. */
export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const name = asTrimmed(payload.name);
  const email = asTrimmed(payload.email);
  const question = asTrimmed(payload.question);

  if (!name || !EMAIL_RE.test(email) || !question) {
    return Response.json({ ok: false }, { status: 422 });
  }

  return Response.json({ ok: true });
}

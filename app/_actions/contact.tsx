"use server";

function validateEmail(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(String(email).toLowerCase());
}

export async function createContactData(_prevState: any, formData: FormData) {
  const rawFormData = {
    lastname: formData.get("lastname") as string,
    firstname: formData.get("firstname") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  if (!rawFormData.lastname) {
    return { status: "error", message: "姓を入力してください" };
  }

  if (!rawFormData.firstname) {
    return { status: "error", message: "名を入力してください" };
  }

  if (!rawFormData.company) {
    return { status: "error", message: "会社名を入力してください" };
  }

  if (!rawFormData.email) {
    return { status: "error", message: "メールアドレスを入力してください" };
  }

  if (!validateEmail(rawFormData.email)) {
    return {
      status: "error",
      message: "メールアドレスの形式が正しくありません",
    };
  }

  if (!rawFormData.message) {
    return { status: "error", message: "メッセージを入力してください。" };
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;

  if (!portalId || !formId) {
    console.error("HUBSPOT_PORTAL_ID / HUBSPOT_FORM_ID が未設定");
    return {
      status: "error",
      message: "設定エラー：管理者に連絡してください。",
    };
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  const payload = {
    fields: [
      { name: "lastname", value: rawFormData.lastname },
      { name: "firstname", value: rawFormData.firstname },
      { name: "company", value: rawFormData.company },
      { name: "email", value: rawFormData.email },
      { name: "message", value: rawFormData.message },
    ],
  };

  const result = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await result.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
  }

  if (!result.ok) {
    console.error("HubSpot submit error", {
      status: result.status,
      data: data ?? text,
    });
    return { status: "error", message: "お問い合わせに失敗しました。" };
  }

  console.log("HubSpot submit success", { data });

  return { status: "success", message: "OK" };
}
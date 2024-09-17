// في الملف pages/api/subscribe.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    // تحقق من صحة البيانات
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // نفذ أي عملية مثل تخزين البيانات
    console.log("Received email:", email);

    return res.status(200).json({ message: "Email submitted successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

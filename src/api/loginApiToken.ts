// pages/api/user.js
export default function handler(req: any, res: any) {
  const { cookies } = req; // استرجاع ملفات تعريف الارتباط
  const userDataFromCookie = cookies.userData; // استرجاع userData من ملفات تعريف الارتباط

  if (userDataFromCookie) {
    const userData = JSON.parse(userDataFromCookie); // تحويل السلسلة النصية إلى كائن
    res.status(200).json(userData); // إرجاع بيانات المستخدم
  } else {
    res.status(404).json({ message: "لا توجد بيانات مستخدم." }); // إرجاع رسالة خطأ
  }
}

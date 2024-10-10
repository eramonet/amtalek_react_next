import { cookies } from "next/headers";

export default function UserProfile() {
  // جلب كل الكوكيز المخزنة
  const cookieStore = cookies();

  // الحصول على بيانات المستخدم و التوكن من الكوكيز
  const userData = cookieStore.get("userData");
  const token = cookieStore.get("token");

  // التحقق مما إذا كانت الكوكيز موجودة لتجنب الأخطاء
  const userDataValue: any = userData ? userData.value : null;
  const tokenValue: any = token ? token.value : null;
  const data = JSON.parse(userDataValue);
  // إنشاء كائن يحتوي على البيانات
  // const jsonData = {
  //   userData: userDataValue,
  //   token: tokenValue,
  // };

  // // تحويل الكائن إلى JSON
  // const jsonString = JSON.stringify(jsonData, null, 2);

  // عرض البيانات في الواجهة بالإضافة إلى JSON
  return (
    <div>
      <h3>Token: {tokenValue}</h3>
      {/* <p>UserData: {data}</p> */}
      <p>{data.data.first_name}</p>
    </div>
  );
}

import { NextResponse } from "next/server";
import { Redis } from "ioredis";

// 데이터베이스 클라이언트 생성
// REDIS_URL은 Vercel이 자동으로 설정해준 환경 변수를 사용합니다.
const redis = new Redis(process.env.REDIS_URL!);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // 'emails'라는 이름의 집합(Set)에 이메일을 추가합니다.
    // Set을 사용하면 중복된 이메일이 자동으로 걸러집니다.
    await redis.sadd("subscribers", email);

    console.log(`Email added to Redis: ${email}`);
    return NextResponse.json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Redis error:", error);
    return NextResponse.json(
      { error: "Could not subscribe. Please try again later." },
      { status: 500 }
    );
  }
}

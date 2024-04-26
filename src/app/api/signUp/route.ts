import User from "@models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@utils/DBconnection";

// TODO: Improve this function
export async function POST(request: Request) {
  const { email, username, password } = await request.json();
  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return NextResponse.json({ savedUser }, { status: 201 });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

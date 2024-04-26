import User from "@models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@utils/DBconnection";

export async function POST(request: Request) {
  const { email, username, password } = await request.json();

  // TODO: Improve validations
  if (!email)
    return NextResponse.json({ message: "Email is required" }, { status: 400 });

  if (!username)
    return NextResponse.json(
      { message: "Username is required" },
      { status: 400 }
    );

  if (!password)
    return NextResponse.json(
      { message: "Password is required" },
      { status: 400 }
    );

  if (username.length < 3 || username.length > 20) {
    return NextResponse.json(
      { message: "Username must be 3-20 characters" },
      { status: 400 }
    );
  }

  console.log("here: outside==", password);
  if (password.length < 6 || password.length > 20) {
    console.log("here: ==", password);
    console.log("here: ==", password.length);
    return NextResponse.json(
      { message: "Password must be 6-20 characters" },
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

    return NextResponse.json(
      {
        _id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

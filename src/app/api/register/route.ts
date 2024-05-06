import User from "@models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@utils/DBconnection";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // TODO: Improve validations
  if (!email)
    return NextResponse.json({ message: "Email is required" }, { status: 400 });

  if (!password)
    return NextResponse.json(
      { message: "Password is required" },
      { status: 400 }
    );

  if (password.length < 6 || password.length > 20) {
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
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        _id: savedUser._id,
        email: savedUser.email,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

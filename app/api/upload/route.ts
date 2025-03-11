import uploadImage from "@/lib/uploadthing";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const folder = "campaigns";
  const result = await uploadImage(file, folder);
  return NextResponse.json(result, { status: 201 });
};


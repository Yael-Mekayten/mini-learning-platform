import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // סיסמאות מוצפנות
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  // יצירת משתמש Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // יצירת משתמש רגיל
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "User",
      email: "user@example.com",
      password: userPassword,
      role: "USER",
    },
  });

  // יצירת קטגוריה Math
  const category1 = await prisma.category.create({
    data: { name: "Math" },
  });

  // יצירת תתי־קטגוריות ל־Math
  const algebra = await prisma.subCategory.create({
    data: { name: "Algebra", categoryId: category1.id },
  });

  await prisma.subCategory.create({
    data: { name: "Geometry", categoryId: category1.id },
  });

  // יצירת קטגוריה Science
  const category2 = await prisma.category.create({
    data: { name: "Science" },
  });

  // יצירת תתי־קטגוריות ל־Science
  await prisma.subCategory.create({
    data: { name: "Physics", categoryId: category2.id },
  });

  await prisma.subCategory.create({
    data: { name: "Biology", categoryId: category2.id },
  });

  // יצירת prompt לדוגמה
  await prisma.prompt.create({
    data: {
      prompt: "What is 2 + 2?",
      response: "The answer is 4.",
      userId: user.id,
      categoryId: category1.id,
      subCategoryId: algebra.id, // Algebra
    },
  });

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

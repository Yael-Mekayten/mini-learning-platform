import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  // יצירת אדמין
  const adminPassword = await bcrypt.hash("admin123", 10);
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
  console.log("✅ Admin user created:", admin.email);

  // יצירת קטגוריות ותתי־קטגוריות
  const programmingCategory = await prisma.category.upsert({
    where: { name: "Programming" },
    update: {},
    create: {
      name: "Programming",
      subCategories: {
        create: [
          { name: "JavaScript" },
          { name: "Python" },
          { name: "React" },
        ],
      },
    },
  });
  console.log("✅ Programming category created:", programmingCategory.name);

  const mathCategory = await prisma.category.upsert({
    where: { name: "Math" },
    update: {},
    create: {
      name: "Math",
      subCategories: {
        create: [
          { name: "Algebra" },
          { name: "Geometry" },
          { name: "Calculus" },
        ],
      },
    },
  });
  console.log("✅ Math category created:", mathCategory.name);

  const englishCategory = await prisma.category.upsert({
    where: { name: "English" },
    update: {},
    create: {
      name: "English",
      subCategories: {
        create: [
          { name: "Grammar" },
          { name: "Vocabulary" },
          { name: "Writing" },
        ],
      },
    },
  });
  console.log("✅ English category created:", englishCategory.name);

  // יצירת משתמש רגיל
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "Test User",
      email: "user@example.com",
      password: userPassword,
      role: "USER",
    },
  });
  console.log("✅ Test user created:", user.email);

  // יצירת פרומפט לדוגמה
  const jsSubCategory = await prisma.subCategory.findFirst({
    where: { name: "JavaScript" },
  });

  if (jsSubCategory) {
    const prompt = await prisma.prompt.create({
      data: {
        userId: user.id,
        categoryId: programmingCategory.id,
        subCategoryId: jsSubCategory.id,
        prompt: "כתוב פונקציה שמחזירה את סכום שני מספרים",
        response: "function sum(a, b) { return a + b; }",
      },
    });
    console.log("✅ Prompt created:", prompt.prompt);
  }
}

main()
  .then(async () => {
    console.log("🌱 Seeding finished!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

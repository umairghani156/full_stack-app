
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import prisma from '../DB/db.config.js';



async function main() {
  const password = await bcrypt.hash('12345678', 10);

  const users = await Promise.all([
    prisma.user.create({ data: { name: 'Umair Ahmed', email: 'umair@example.com', password } }),
    prisma.user.create({ data: { name: 'Kashif Ahmed', email: 'kashif@example.com', password } }),
    prisma.user.create({ data: { name: 'Faiz Mehmood', email: 'faiz@example.com', password } }),
  ]);

  for (let i = 0; i < 20; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const isProtected = Math.random() > 0.7;
    const notePassword = isProtected ? await bcrypt.hash('notePass123', 10) : null;

    await prisma.note.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        password: notePassword,
        ownerId: randomUser.id,
      },
    });
  }

  console.log('✅ Seeded successfully');
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

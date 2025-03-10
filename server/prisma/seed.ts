import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

async function main() {
  console.log('Seeding database...');

  // Create users
  const adminPassword = await hashPassword('password');
  const managerPassword = await hashPassword('password');
  const editorPassword = await hashPassword('password');
  const viewerPassword = await hashPassword('password');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: {
      email: 'manager@example.com',
      name: 'Manager User',
      password: managerPassword,
      role: Role.MANAGER,
      department: 'Finance',
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: 'editor@example.com' },
    update: {},
    create: {
      email: 'editor@example.com',
      name: 'Editor User',
      password: editorPassword,
      role: Role.EDITOR,
      department: 'Marketing',
    },
  });

  const viewer = await prisma.user.upsert({
    where: { email: 'viewer@example.com' },
    update: {},
    create: {
      email: 'viewer@example.com',
      name: 'Viewer User',
      password: viewerPassword,
      role: Role.VIEWER,
      department: 'Sales',
    },
  });

  // Create tags
  const financesTag = await prisma.tag.upsert({
    where: { name: 'finance' },
    update: {},
    create: { name: 'finance' },
  });

  const marketingTag = await prisma.tag.upsert({
    where: { name: 'marketing' },
    update: {},
    create: { name: 'marketing' },
  });

  const rapportTag = await prisma.tag.upsert({
    where: { name: 'rapport' },
    update: {},
    create: { name: 'rapport' },
  });

  // Create folders
  const financesFolder = await prisma.folder.upsert({
    where: { path: '/finances' },
    update: {},
    create: {
      id: 'finances',
      name: 'Finances',
      path: '/finances',
    },
  });

  const marketingFolder = await prisma.folder.upsert({
    where: { path: '/marketing' },
    update: {},
    create: {
      id: 'marketing',
      name: 'Marketing',
      path: '/marketing',
    },
  });

  // Create documents
  const document1 = await prisma.document.create({
    data: {
      title: 'Rapport financier Q1 2025',
      description: 'Analyse financière du premier trimestre 2025',
      fileName: 'rapport-financier-q1-2025.pdf',
      fileSize: 1024000,
      fileType: 'application/pdf',
      path: '/documents/finances/',
      location: 'documents/finances/rapport-financier-q1-2025.pdf',
      uploadedBy: { connect: { id: admin.id } },
      folder: { connect: { id: financesFolder.id } },
      tags: {
        connect: [
          { id: financesTag.id },
          { id: rapportTag.id }
        ]
      },
    },
  });

  const document2 = await prisma.document.create({
    data: {
      title: 'Plan marketing 2025',
      description: 'Stratégie marketing pour l\'année 2025',
      fileName: 'plan-marketing-2025.pptx',
      fileSize: 5120000,
      fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      path: '/documents/marketing/',
      location: 'documents/marketing/plan-marketing-2025.pptx',
      uploadedBy: { connect: { id: manager.id } },
      folder: { connect: { id: marketingFolder.id } },
      tags: {
        connect: [
          { id: marketingTag.id }
        ]
      },
    },
  });

  // Create activities
  await prisma.activity.createMany({
    data: [
      {
        type: 'UPLOAD',
        userId: admin.id,
        documentId: document1.id,
        description: 'A uploadé le document',
      },
      {
        type: 'VIEW',
        userId: manager.id,
        documentId: document1.id,
        description: 'A consulté le document',
      },
      {
        type: 'UPLOAD',
        userId: manager.id,
        documentId: document2.id,
        description: 'A uploadé le document',
      },
      {
        type: 'EDIT',
        userId: editor.id,
        documentId: document2.id,
        description: 'A modifié le document',
      },
    ],
  });

  // Create permissions
  await prisma.permission.createMany({
    data: [
      {
        userId: admin.id,
        documentId: document1.id,
        accessType: 'OWNER',
      },
      {
        userId: manager.id,
        documentId: document1.id,
        accessType: 'VIEWER',
      },
      {
        userId: manager.id,
        documentId: document2.id,
        accessType: 'OWNER',
      },
      {
        userId: editor.id,
        documentId: document2.id,
        accessType: 'EDITOR',
      },
      {
        userId: viewer.id,
        documentId: document2.id,
        accessType: 'VIEWER',
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

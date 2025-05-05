-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "NoteVersion" DROP CONSTRAINT "NoteVersion_noteId_fkey";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteVersion" ADD CONSTRAINT "NoteVersion_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

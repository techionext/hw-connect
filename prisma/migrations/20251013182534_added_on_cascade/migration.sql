-- DropForeignKey
ALTER TABLE "public"."magic_links" DROP CONSTRAINT "magic_links_userId_fkey";

-- AddForeignKey
ALTER TABLE "magic_links" ADD CONSTRAINT "magic_links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

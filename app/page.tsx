import prisma from "@/lib/prisma";
import { conversionByVariant } from '@/app/generated/prisma/sql'

export default async function Home() {
  const users = await prisma.user.findMany();
  const conversions = await prisma.$queryRawTyped(conversionByVariant())

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Superblog
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name}
          </li>
        ))}
      </ol>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)] mt-8">
        {conversions.map((conversion, index) => (
          <li key={index} className="mb-2">
            Variant: {conversion.variant}, Conversion: {conversion.conversion}
          </li>
        ))}
      </ol>
    </div>
  );
}
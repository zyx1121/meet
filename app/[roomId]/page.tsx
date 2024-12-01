import { Room } from "@/components/room";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { roomId } = await params;

  return {
    title: `Meeeeeet | ${roomId}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { roomId } = await params;

  return (
    <main className="flex h-dvh flex-col">
      <Room roomId={roomId} />
    </main>
  )
}

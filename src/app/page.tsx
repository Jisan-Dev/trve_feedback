"use client";
// import { useSession } from "next-auth/react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react"; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

export default function Home() {
  //getSession
  // const session = useSession();
  // console.log(session);

  // Check if user is authenticated
  // if (!session) {
  //   return (
  //     <div className="text-center">
  //       <p>You need to be logged in to access this page.</p>
  //       <Link href="/api/auth/signin">
  //         <a className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-background transition-colors">
  //           Sign in
  //         </a>
  //       </Link>
  //     </div>
  //   );
  // }

  // If user is authenticated, display their username
  // return (
  //   <div className="flex gap-4 items-center flex-col sm:flex-row">
  //     <Image
  //       className="dark:invert"
  //       src="/next.svg"
  //       alt="Next.js logo"
  //       width={180}
  //       height={38}
  //       priority
  //     />
  //     <h1 className="text-4xl font-semibold text-foreground dark:text-background">
  //       Welcome, {session.user.username}!
  //     </h1>
  //   </div>
  // );
  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-100 text-foreground min-h-[calc(100vh-164px)]">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">Dive into the World of Anonymous Feedback</h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">True Feedback - Where your identity remains a secret.</p>
        </section>

        {/* Carousel for Messages */}
        <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full max-w-lg md:max-w-xl">
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">{message.received}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-white text-foreground">© 2023 True Feedback. All rights reserved.</footer>
    </>
  );
}

"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { JSX } from "react";

type ActionType = {
    icon: JSX.Element;
    title: string;
    description: string;
  };
  
  type ContentType = {
    title: string;
    description: string;
    actions: ActionType[];
  };

export default function WelcomePage({content}:{content:ContentType}) {
  const { user } = useUser(); 

  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8 flex flex-col items-center">
        {
          user? (
            <Image
              src={user?.profile_image}
              height={100}
              width={100}
              alt="User Avatar"
              className="rounded-full border-4 border-black"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100"></div>
          )
        }
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.user_name}!</h1>
        <p className="text-xl text-gray-600">{content.title}</p>
        <p className="text-gray-500">{content.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        {content.actions.map((action, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="text-blue-500 mb-4">{action.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{action.title}</h2>
            <p className="text-gray-600 mb-4">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
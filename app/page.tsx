"use client";

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import getAge from "./ages"; // Import hàm getAge

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [creationDate, setCreationDate] = useState<string | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      const user = WebApp.initDataUnsafe.user as UserData;
      setUserData(user);
      const ageInfo = getAge(user.id); // Sử dụng hàm getAge để tính ngày tạo
      setCreationDate(`${ageInfo[1]} (${ageInfo[0]})`);
    }
  }, []);

  return (
    <main className="p-4">
      {userData ? (
        <>
          <h1 className="text-2xl font-bold mb-4">User Data</h1>
          <ul>
            <li>ID: {userData.id}</li>
            <li>First Name: {userData.first_name}</li>
            <li>Last Name: {userData.last_name || "N/A"}</li>
            <li>Username: {userData.username || "N/A"}</li>
            <li>Language Code: {userData.language_code}</li>
            <li>Is Premium: {userData.is_premium ? "Yes" : "No"}</li>
            <li>Creation Date: {creationDate || "N/A"}</li>
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}

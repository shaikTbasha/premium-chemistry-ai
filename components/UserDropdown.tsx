'use client';

import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function UserDropdown() {
  return (
    <div className="h-8 w-8 flex items-center justify-center">
      <ClerkLoading>
        <div className="h-8 w-8 rounded-full bg-slate-700 animate-pulse" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton afterSignOutUrl="/">
          <UserButton.MenuItems>
            <UserButton.Link
              label="Notes"
              href="/dashboard/notes"
              labelIcon={<span>📓</span>}
            />
            <UserButton.Link
              label="Bookmarks"
              href="/dashboard/bookmarks"
              labelIcon={<span>🔖</span>}
            />
            <UserButton.Link
              label="Progress"
              href="/dashboard/progress"
              labelIcon={<span>📈</span>}
            />
            <UserButton.Link
              label="Settings"
              href="/dashboard/settings"
              labelIcon={<span>⚙️</span>}
            />
            
            {/* --- Newly Added Profile Tools --- */}
            <UserButton.Link
              label="Password Change"
              href="https://accounts.clerk.dev/user"
              labelIcon={<span>🔒</span>}
            />
            <UserButton.Link
              label="Dark / Light Mode"
              href="/dashboard/settings"
              labelIcon={<span>🌗</span>}
            />
            <UserButton.Link
              label="Refer a Friend"
              href="/dashboard/settings"
              labelIcon={<span>🎁</span>}
            />
            <UserButton.Link
              label="Report an Issue"
              href="/dashboard/settings"
              labelIcon={<span>🐛</span>}
            />
          </UserButton.MenuItems>
        </UserButton>
      </ClerkLoaded>
    </div>
  );
}
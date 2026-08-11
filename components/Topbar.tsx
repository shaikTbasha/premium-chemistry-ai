import { UserButton } from "@clerk/nextjs";

export default function Topbar() {
  return (
    <header className="h-16 flex-shrink-0 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Header Title or Back Button */}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 flex items-center justify-center">
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
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}
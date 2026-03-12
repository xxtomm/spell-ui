"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/registry/spell-ui/dropdown-menu"

export function Demo() {
  return (
    <div className="flex flex-wrap gap-4">

      <DropdownMenu>
        <DropdownMenuTrigger>Start</DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>Center</DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="center">
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>End</DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}
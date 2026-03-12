"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/registry/spell-ui/dropdown-menu"

export function Demo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Options</DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel>Plan — Free</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem disabled>
            Analytics
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            Custom domain
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            API access
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
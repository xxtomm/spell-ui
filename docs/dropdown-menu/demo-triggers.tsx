"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSplitTrigger,
  DropdownMenuIconTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/registry/spell-ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-4">

      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

     
      <DropdownMenu>
        <DropdownMenuSplitTrigger onActionClick={() => alert("Copied!")}>
          Copy page
        </DropdownMenuSplitTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem>Copy page</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

  
      <DropdownMenu>
        <DropdownMenuIconTrigger />
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuIconTrigger icon={<MoreHorizontal className="size-4" />} />
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}
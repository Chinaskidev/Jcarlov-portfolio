/* types.ts — shared types for the terminal portfolio */

export type ThemeVars = Record<string, string>

export interface Theme {
  name: string
  vars: ThemeVars
}

export interface FileNode {
  type: "file"
  size?: string
  modified?: string
  content: string
}

export interface DirNode {
  type: "dir"
  size?: string
  modified?: string
  children: Record<string, FsNode>
}

export type FsNode = FileNode | DirNode

export interface TerminalOptions {
  /** Called by the `gui` / `portfolio` command to jump to the visual portfolio. */
  onGui?: () => void
}

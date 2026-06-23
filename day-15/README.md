# Day 15 - Git & GitHub

Git is a version control system that tracks changes in your code. GitHub hosts your Git repositories online and enables collaboration.

## Learning Objectives
- Initialize and manage Git repositories
- Stage, commit, push, and pull changes
- Create and merge branches
- Resolve merge conflicts
- Write .gitignore files
- Deploy with GitHub Pages
- Contribute via forks and pull requests

## Concepts Covered

### Git Basics
```bash
git init                    # Start version control in a folder
git status                  # See changed/untracked files
git add index.html          # Stage a specific file
git add .                   # Stage all changes
git commit -m "message"     # Save staged changes
git log --oneline           # See commit history
```

### Branching & Merging
```bash
git branch feature-x        # Create a branch
git checkout feature-x      # Switch to it
git checkout -b feature-x   # Create and switch in one command
git merge feature-x         # Merge feature-x into current branch
```

### Merge Conflicts
When two people edit the same lines, Git shows this:
```
<<<<<<< HEAD
console.log("my change");
=======
console.log("their change");
>>>>>>> branch-name
```
Fix by editing the file to keep the right code, removing the markers, then `git add` and `git commit`.

### Working with GitHub
```bash
git clone https://github.com/user/repo.git
git remote add origin https://github.com/user/repo.git
git push -u origin main
git pull origin main
```

### .gitignore
Files to ignore:
```
node_modules/
.env
*.log
.DS_Store
```

### GitHub Pages
Push your code → Settings → Pages → Select branch → Your site is live at `username.github.io/repo-name`

## Files
| File | Description |
|------|-------------|
| `index.html` | Full Git & GitHub reference with all commands |
| `README.md` | Quick command cheatsheet |

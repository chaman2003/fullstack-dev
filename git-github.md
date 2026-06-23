# Git & GitHub

## Days
- [Day 15 - Git & GitHub](../day-15/)

## Git Basics

Version control for tracking code changes.

### Essential Commands
```bash
git init                    # Start version control
git add .                   # Stage all changes
git commit -m "message"     # Save snapshot
git log --oneline           # View history
```

### Branching
```bash
git branch feature-x        # Create branch
git checkout feature-x      # Switch branch
git merge feature-x         # Merge into current
```

### Remote (GitHub)
```bash
git remote add origin https://github.com/user/repo.git
git push -u origin main
git pull origin main
git clone https://github.com/user/repo.git
```

### Merge Conflicts
When two people edit the same lines:
```
<<<<<<< HEAD
your code
=======
their code
>>>>>>> branch
```
Edit to keep the right version, remove markers, then `git add` and commit.

### .gitignore
```
node_modules/
.env
*.log
.DS_Store
```

## GitHub Features

- **Pull Requests**: Propose changes before merging
- **Forks**: Copy another repo to contribute
- **GitHub Pages**: Deploy static sites for free
- **Issues**: Bug tracking and feature requests

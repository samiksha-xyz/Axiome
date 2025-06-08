# Scripts Directory

This directory contains utility scripts for the Axiome project.

## Available Scripts

### `check-branch.sh`
Interactive branch workflow reminder script that helps developers follow the proper Git workflow.

**Usage:**
```bash
# Make executable (first time only)
chmod +x scripts/check-branch.sh

# Run the script
./scripts/check-branch.sh
```

**Features:**
- Detects current Git branch
- Provides guidance for proper branch workflow
- Offers automatic switching to develop branch
- Shows helpful commands and next steps
- Supports all standard branch types (feature, fix, docs, chore, hotfix)

**Workflow Reminders:**
- Development work should be done on `develop` branch
- Feature branches should be created from `develop`
- PRs should target `develop` branch (except hotfixes → main)
- Use privacy email for commits: `username@users.noreply.github.com`

## Adding New Scripts

When adding new scripts:
1. Make them executable: `chmod +x scripts/your-script.sh`
2. Add documentation here
3. Follow project coding standards
4. Test thoroughly before committing

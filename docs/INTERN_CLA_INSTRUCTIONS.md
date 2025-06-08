# 📧 CLA Contribution Instructions for New Contributors

**Subject: Contributing to Axiome - CLA Signing Process**

Hi [INTERN_NAME],

Welcome to the Axiome project! We're excited to have you contribute. We have a Contributor License Agreement (CLA) process in place to protect both the project and contributors. Here's everything you need to know:

## 🚀 **How to Contribute with CLA**

### **Step 1: Set Up Your Development Environment**
As a team member, you can clone directly (no forking needed):
```bash
git clone https://github.com/samiksha-xyz/Axiome.git
cd Axiome
```

**Important**: Configure git with privacy-protected email:
```bash
git config user.email "[YOUR_GITHUB_USERNAME]@users.noreply.github.com"
git config user.name "[YOUR_GITHUB_USERNAME]"
```

### **Step 2: Create Your Feature Branch**
Follow our branch strategy:
1. **Start from develop branch** (not main):
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. **Create your feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # Example: git checkout -b feature/user-dashboard
   ```
3. **Make your code changes**
4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add user dashboard component"
   git push origin feature/your-feature-name
   ```

### **Step 3: Create Pull Request to `develop` Branch**
**Important**: Create your PR to target the `develop` branch, not `main`

### **Step 2: CLA Assistant Will Automatically Check**
When you create your PR to `develop`:
- The CLA Assistant workflow will automatically run
- Since you're a new contributor, you'll need to sign our CLA
- **Don't worry!** This is a one-time process

### **Step 3: You'll See a CLA Comment**
The bot will post a comment on your PR that looks like this:

```
Thank you for your submission! We really appreciate it. Like many open source projects, 
we ask that you sign our Contributor License Agreement before we can accept your contribution.

You can sign the CLA by just posting a Pull Request Comment same as the below format.
I have read the CLA Document and I hereby sign the CLA

You can retrigger this by writing recheck in a comment.
```

### **Step 4: Sign the CLA (One-Time Only)**
To sign the CLA:

1. **Read our CLA document**: https://github.com/samiksha-xyz/Axiome/blob/main/docs/CLA.md
2. **Add this exact comment** to your PR:
   ```
   I have read the CLA Document and I hereby sign the CLA
   ```
   ⚠️ **Important**: Use exactly this text - no modifications!

### **Step 5: CLA Check Will Pass**
Once you comment:
- The CLA Assistant will automatically run again
- Your signature will be recorded permanently
- The CLA check will turn green ✅
- Your PR can now be reviewed and merged normally

## ✅ **For All Future Contributions**
Great news! After signing once:
- **You'll never need to sign again** for future PRs
- The CLA Assistant will recognize you automatically
- All future PRs will have the CLA check pass immediately

## 🛠️ **Troubleshooting**

**If the CLA check doesn't pass after signing:**
- Comment `recheck` on your PR to trigger the workflow again
- Make sure you used the exact signing text above

**If you're having branch issues:**
- Remember: Create PRs to `develop`, not `main`
- Start feature branches from `develop`: `git checkout develop && git pull`

**If commits are rejected for email privacy:**
- Verify your git config: `git config user.email`
- Should be: `[YOUR_GITHUB_USERNAME]@users.noreply.github.com`

**If you have questions:**
- Feel free to ask in your PR comments
- Contact the maintainers directly
- Tag @suh4s for help

## 📋 **Quick Reference**

| Action | What to Do |
|--------|-----------|
| Setup | Clone repo → Configure privacy email → Create feature branch from `develop` |
| First PR | Create PR to `develop` → Read CLA → Comment signing text → Continue with normal review |
| Future PRs | Create feature branch from `develop` → Create PR to `develop` → CLA automatically passes |
| Issues | Comment `recheck` or contact maintainers |

## 🎯 **Example Workflow**
1. Clone repo and configure privacy email: `[YOUR_GITHUB_USERNAME]@users.noreply.github.com`
2. Create feature branch from `develop`: `git checkout -b feature/my-feature`
3. Make changes and push
4. Create PR targeting `develop` branch (not `main`)
5. CLA bot comments asking for signature
6. You comment: `I have read the CLA Document and I hereby sign the CLA`
7. CLA check turns green ✅
8. Your PR gets reviewed and merged to `develop`
9. All future PRs automatically pass CLA checks

## ⚠️ **Important Reminders**

- **Always target `develop` branch** for your PRs, not `main`
- **Use privacy email**: `[YOUR_GITHUB_USERNAME]@users.noreply.github.com`
- **Create feature branches** from `develop`, not `main`
- **Follow branch naming**: `feature/description` or `fix/description`

---

**Welcome aboard, and thank you for contributing to Axiome!** 🚀

If you have any questions about this process, don't hesitate to reach out.

Best regards,  
The Axiome Team

---
*This document was generated on June 8, 2025 for new contributors*

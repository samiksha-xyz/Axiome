#!/bin/bash

# Check Branch Script - Reminds developers to work in develop branch
# This script helps ensure proper branch workflow for the Axiome project

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

echo -e "${BLUE}🔍 Axiome Branch Checker${NC}"
echo -e "${BLUE}========================${NC}"
echo ""

if [ "$CURRENT_BRANCH" = "main" ]; then
    echo -e "${RED}⚠️  WARNING: You are on the 'main' branch!${NC}"
    echo ""
    echo -e "${YELLOW}The 'main' branch is protected and used only for production releases.${NC}"
    echo -e "${YELLOW}All development work should be done on the 'develop' branch.${NC}"
    echo ""
    echo -e "${GREEN}✅ To switch to develop branch, run:${NC}"
    echo -e "${BLUE}   git checkout develop${NC}"
    echo -e "${BLUE}   git pull origin develop${NC}"
    echo ""
    echo -e "${GREEN}✅ To create a new feature branch, run:${NC}"
    echo -e "${BLUE}   git checkout develop${NC}"
    echo -e "${BLUE}   git pull origin develop${NC}"
    echo -e "${BLUE}   git checkout -b feature/your-feature-name${NC}"
    echo ""
    
    # Ask if they want to switch automatically
    read -p "Do you want to switch to develop branch now? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${GREEN}🔄 Switching to develop branch...${NC}"
        git checkout develop
        git pull origin develop
        echo -e "${GREEN}✅ Now on develop branch and up to date!${NC}"
        echo ""
        echo -e "${YELLOW}💡 Next steps:${NC}"
        echo -e "${BLUE}   1. Create a feature branch: git checkout -b feature/your-feature-name${NC}"
        echo -e "${BLUE}   2. Make your changes${NC}"
        echo -e "${BLUE}   3. Create a PR to develop branch${NC}"
    else
        echo -e "${YELLOW}Remember to switch to develop before making changes!${NC}"
    fi

elif [ "$CURRENT_BRANCH" = "develop" ]; then
    echo -e "${GREEN}✅ Perfect! You are on the 'develop' branch.${NC}"
    echo ""
    echo -e "${YELLOW}💡 To create a feature branch:${NC}"
    echo -e "${BLUE}   git pull origin develop${NC}"
    echo -e "${BLUE}   git checkout -b feature/your-feature-name${NC}"
    echo ""
    echo -e "${YELLOW}📋 Remember:${NC}"
    echo -e "${BLUE}   • Create PRs targeting 'develop' branch${NC}"
    echo -e "${BLUE}   • Use privacy email: username@users.noreply.github.com${NC}"
    echo -e "${BLUE}   • Follow branch naming: feature/description or fix/description${NC}"

elif [[ "$CURRENT_BRANCH" == feature/* ]] || [[ "$CURRENT_BRANCH" == fix/* ]] || [[ "$CURRENT_BRANCH" == docs/* ]] || [[ "$CURRENT_BRANCH" == chore/* ]]; then
    echo -e "${GREEN}✅ Great! You are on a feature branch: '${CURRENT_BRANCH}'${NC}"
    echo ""
    echo -e "${YELLOW}📋 Next steps:${NC}"
    echo -e "${BLUE}   1. Make your changes${NC}"
    echo -e "${BLUE}   2. Commit with clear messages${NC}"
    echo -e "${BLUE}   3. Push: git push origin ${CURRENT_BRANCH}${NC}"
    echo -e "${BLUE}   4. Create PR to 'develop' branch${NC}"
    echo ""
    echo -e "${YELLOW}💡 Helpful commands:${NC}"
    echo -e "${BLUE}   • Test backend: cd backend && uv run pytest${NC}"
    echo -e "${BLUE}   • Test frontend: cd frontend && npm test${NC}"

elif [[ "$CURRENT_BRANCH" == hotfix/* ]]; then
    echo -e "${YELLOW}🔧 You are on a hotfix branch: '${CURRENT_BRANCH}'${NC}"
    echo ""
    echo -e "${YELLOW}📋 Hotfix workflow:${NC}"
    echo -e "${BLUE}   1. Make critical fixes${NC}"
    echo -e "${BLUE}   2. Create PR to 'main' branch${NC}"
    echo -e "${BLUE}   3. After merge, update develop branch${NC}"

else
    echo -e "${YELLOW}📍 You are on branch: '${CURRENT_BRANCH}'${NC}"
    echo ""
    echo -e "${YELLOW}🤔 This doesn't follow our standard branch naming convention.${NC}"
    echo -e "${YELLOW}Consider using one of these patterns:${NC}"
    echo -e "${BLUE}   • feature/description - for new features${NC}"
    echo -e "${BLUE}   • fix/description - for bug fixes${NC}"
    echo -e "${BLUE}   • docs/description - for documentation${NC}"
    echo -e "${BLUE}   • chore/description - for maintenance${NC}"
    echo ""
    echo -e "${GREEN}💡 To create a proper feature branch:${NC}"
    echo -e "${BLUE}   git checkout develop${NC}"
    echo -e "${BLUE}   git pull origin develop${NC}"
    echo -e "${BLUE}   git checkout -b feature/your-feature-name${NC}"
fi

echo ""
echo -e "${BLUE}📚 For more info, see: .github/CONTRIBUTING.md${NC}"
echo -e "${BLUE}🤖 CLA Assistant will guide you through signing process on first PR${NC}"
echo ""

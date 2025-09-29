# Frontend Developer Coding Challenge

## Overview

Welcome to Admiral 2.0! We have pivoted completely, and now our product is an equity sharing app. We're still in MVP phase, and we're excited for you to help build our app!

This is your chance to show us what you've got. You have **3 hours** to transform our POC into an MVP we can launch to the public.

## Your Mission

Transform this MVP from "what the heck is going on here" to "okay, this kinda solves my problem." Focus on the improvements that will make the biggest difference for our users (and impress us while you're at it).

## Challenge Objectives

### 0. **Manage Your Time Well & Know When To Come Back**
**WE DO NOT EXPECT CANDIDATES TO FULLY COMPLETE EVERYTHING ASKED HERE**--but we do want to know what you would do in a limited amount of time.

Its not essential to go in order of the tasks below, but it is important touch at least a little bit on each of these sections.

**This project is built anticipating that candidates will use AI tools.** We consider using AI coding tools to be a skill that requires practice to get value out of. Please feel welcome to use any AI tools to make as much progress as you can--but if you're not confident that it will speed up a task, be careful to avoid letting it bog you down!

**Success Criteria**: You have progressed through most or all of these sections, demonstrating your ability in these core frontend software development skills, as well as effective time managing skills, and ability to work independently.

### 1. **Fix Basic Layout & Positioning**
Our POC was written by one of our founders--he really doesn't like CSS, and therefore didn't write much. We know our customers will want some styles though, so lets make it actually usable by:
- Adding appropriate margins, padding, and spacing between elements
- Ensuring forms and tables are properly aligned
- Fixing any obvious visual hierarchy issues
- Considering support for mobile/responsive design--doesn't have to be fully supported, but we should design for mobile first.

**Success Criteria**: You've demonstrated a basic understanding of styling web applications. The app should look okay and be easy to navigate without any obvious layout problems. We haven't hired a designer yet--don't worry about making it look pretty. Just needs to deliver value for the customer.

### 2. **Implement Loading & Error States**
Our users are currently playing the "is it loading or broken?" game, and that's not fun for anyone. Let's fix that:
- Add `// TODO: Add loading state` comments where appropriate
- Add `// TODO: Add error handling` comments where appropriate
- Implement the must-have loading and error states

**Success Criteria**: Users should never see blank screens or be left wondering if something is happening. They should know exactly what's going on at all times. But this is an MVP--it doesn't need to be perfect. Balance spending more time on this with other challenges. Demonstrate responsible decision making.

### 3. **Accessibility Audit**
We want everyone to be able to use our app, not just people who can see and use a mouse. Be our accessibility advocate!

**Success Criteria**: An essential list of accessibility issues that could be addressed in future iterations. Don't spend time fixing these today.

### 4. **Bug Hunt & Documentation**
At Admiral, engineering teams own features through the entire feature lifecycle, including QA, Deployment, and Maintenanced. Our engineers get satisfaction out of building high quality products. To that end, our app has bugs, and we want you to find them all:
- Test all user flows (you've probably done most of this already--signup, login, dashboard, adding shareholders/grants)
- Try edge cases - be creative!
- Document each bug with:
  - Steps to reproduce (make it so easy a PM could do it)
  - Expected vs. actual behavior
  - Impact on user experience
  - Priority level (High/Medium/Low)

**Success Criteria**: A bug report that demonstrates your testing methodology and attention to detail. The more bugs you find, the more impressed we'll be (and the better our app will be!).

### 5. **Fix Critical Bugs**
Now that you've found the bugs, fix the most critical ones that impact core functionality:
- Focus on bugs rated "High" priority in your bug report
- Prioritize fixes that:
  - Prevent data loss or corruption
  - Block key user flows
  - Cause crashes or render the app unusable
- Document your fixes with:
  - What the bug was
  - How you fixed it
  - Any potential edge cases to watch for

**Success Criteria**: Demonstrate a responsible balance of effort & quality. The most severe bugs are fixed and the core functionality works reliably. Include clear documentation of your fixes to help the team understand the changes. We don't need everything working perfectly--we're just trying to get our first few customers with this MVP!


### 5. **Fix Test and Write New Assertions**
We have many failing tests because of a recent set of changes to our app. The tests need to be updated in order to pass. Help us improve our test coverage by fixing and adding new assertions to our tests:
- Review current test files and identify gaps in assertions
- Add meaningful test cases that verify critical functionality (Stubs & comments are fine if adding the assertion will take too much time!)
- Focus on user-facing behavior and edge cases
- Document why each new assertion is important

**Success Criteria**: Additional test assertions that improve our confidence in the code without being redundant. How many tests are the right amount? We want to get a sense for what you think.


### 6. **Product Vision & Prioritization**
Show us you can think like a product manager and can make decisions on your own:
- List 3-5 features/improvements that would add the most value
- Rank them by impact (consider user value, business value, implementation effort)
- Provide brief justification for each ranking
- Consider both user experience and technical improvements

**Success Criteria**: A prioritized roadmap outline that shows you understand user needs and can think strategically about product development. 

### 7. **Implementation Sprint** 
Okay Build the highest-impact feature(s) from your prioritized list:
- Write clean, maintainable code (future you will thank you)
- Add appropriate tests if time allows
- Document your implementation approach

**Success Criteria**: A working feature that demonstrates your coding skills and ability to ship value quickly.

## Technical Context

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **State Management**: React Query + Context API
- **Styling**: Tailwind CSS + custom components
- **Mocking**: MSW (Mock Service Worker)
- **Testing**: Vitest + React Testing Library

### Key Files
- `src/App.tsx` - Main application routing
- `src/pages/` - Page components
- `src/components/` - Reusable UI components
- `src/handlers.ts` - Mock API endpoints
- `src/types.d.ts` - TypeScript interfaces

## Submission

At the end of your 3 hours, provide:
1. **Working code** with your improvements
2. **Documentation** of bugs found and accessibility issues
3. **Prioritized roadmap** of next features
4. **Brief summary** of what you accomplished and what you'd do with more time

In our review discussion, we will walk through each of the major components of the challenge and want to hear what you did.

## Tips for Success

- **Start simple** - fix the obvious layout issues first (quick wins feel good!)
- **Get into a flow state** - Don't context switch and get distracted. We just need your attention for a few hours, and we want to see what you can do.
- **Test thoroughly** - bugs are often in edge cases (be that person who tries to break everything)
- **Think like a user** - what would frustrate you about this app? (we're counting on your user empathy)
- **Prioritize impact** - focus on changes that matter most to users (not just what's fun to build)
- **Document as you go** - don't wait until the end (we want to see your journey, not just the destination)
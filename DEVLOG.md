Dev setup issues
* Vite needs to be preinstalled

Accessibility issues
  - Arrow displayed when showing shareholder name; potential accessibility issue (minor)
  - ARIA labels for images

Bugs & Other Issues
* Select menu is transparent, makes it hard to see (major) :check:
* Prevent negative shares when awarding a grant? (major)
* Prevent backdating grants? (major)
* No back button when viewing a shareholder (major/critical) :check:
* Pie chart doesn't show up correctly for "By Investor" (major) :check:
* "By Investor"/"By Group" links appear to be swapped (major) :duplicate:
* No way to exit the app (critical) :check:
* Double grants showing up (critical) :check:
* Overlapping text for investor/employee (major)
* Should not allow saving grant if date is invalid (critical) :check:
* Bad formatting when pie chart has very large values (major)
* Formatting issue when viewing shareholder structure - lozenges overlap (minor)
* Next shareholder button during onboarding exits (critical) :check:
* Reduce width of buttons in onboarding screen (minor)
* Internationalization for dates (minor)
* Truncated labels for pie chart (major)
* Close icon in modal overlaps with the text box (minor)

Improvements
* Show percentages for pie chart
* Need a way to edit/remove existing grants :done:
* Import users from file
* Display validation errors (minor)
* Data doesn't persist between sessions (critical) 
* Show a toast when edit/add/remove has been performed
* Add ability to sort and filter 
* Add actual password authentication
* Fix unit tests
* Display selected group for tab
* Connect shareholders to actual users
* Playwright testing
* Storybook components

Summary
* Fixed layout issues and addressed some basic user functionalities. Ensured that the onboarding flow worked properly. Added some additional functionality for dashboard display and also some tweaks to the user shareholder updates.
* Fixed a couple of TODO items, updated some unit tests.

If I had more time, I would want to brighten up the appearance of the dashboard instead of the grays for the theme. Would also want to add more rigorous testing around the onboarding process. I was having a weird bug that caused the onboarding to go back to the home page, so I'd want to make sure that this gets nailed down pretty solidly. With more time, I would want to set up Playwright tests as well, to ensure that each step-by-step process is working properly.



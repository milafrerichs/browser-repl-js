# v0.6.0
## Changed
Internal changes to how the iframes work and how messages are posted, should improve performance and future use

# v0.5.1
## Changed
Use Svelte JSON tree directly inside the component, and remove the extra iframe for the console

# v0.5.0
## Added
Added Svelte JSON Tree to the project to pretifx the console output and allow to show more values than just objects

# v0.4.4
## Fixed
Changing the layout should not break the code. And the iframes should now always be available when we post messages to them.

# v0.3.0
## Added
New `mode` prop
previous `viewOnly` can now be replicated using `view` mode

## Removed
- viewOnly prop is remove

# v0.0.10
## Added
- active state for the switcher
- view-only class when only the view screen is visible

# v0.0.9
## Added
- Switcher between Result and Console
- Add more classes and div markup for easier styling

# v0.0.8
## Added
- Console component; display only the ouput of `console.log` statements
- `viewOnly` option for a chapter; will hide the Code Editor

# v0.0.7
Minor Bug Fix

## Fixed
- Manual code editing works again

# v0.0.6
Minor Bug Fix

## Fixed
- Showing the solution works again; was always overwritte by the code

# v0.0.6
Styling of Components

## Added
- default class names for the components
- can be overwritten by adding `css`

# v0.0.5
Prototype

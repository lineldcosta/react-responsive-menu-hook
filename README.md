# react-responsive-menu-hook

## Features

- Headless
- Responsive
- Extensible

## Installation

```sh
yarn add react-responsive-menu-hook
# or
npm i -s react-responsive-menu-hook
```


## Basic Usage

```js
import React from 'react'
import ReactResponsiveMenu from 'react-responsive-menu-hook'

function App() {
  return (
    <ReactResponsiveMenu>
      {({ getMenuProps, showEllipsis, children, open, toggle }) => {
        return (
          <div>
            <div {...getMenuProps({ id: 'home', style })}>Home</div>
            <div {...getMenuProps({ id: 'contactUs', style })}>Contact Us</div>
            <div {...getMenuProps({ id: 'aboutUs', style })}>About Us</div>
            <div {...getMenuProps({ id: 'registration', style })}>Registration</div>
            <div {...getMenuProps({ id: 'login', style })}>Login</div>
            <div {...getMenuProps({ id: 'helpSupport', style })}>Help & Support</div>
            <div {...getMenuProps({ id: 'Blogs', style })}>Blogs</div>
            <div {...getMenuProps({ id: 'information', style })}>Information</div>
            <div {...getMenuProps({ id: 'apply', style })}>Apply</div>
            <div {...getMenuProps({ id: 'cancel', style })}>Cancel</div>

            {showEllipsis && (
              <div style={styles.overflowMenuWrapper}>
                <div
                  style={styles.overflowMenuIcon}
                  onClick={() => toggle(true)}
                >
                  ...
                </div>
                <div id="long-menu" style={styles.overflowMenu(open)}>
                  {children}
                </div>
              </div>
            )}
          </div>
        )
      }}
    </ReactResponsiveMenu>
  )
}
export default App

```


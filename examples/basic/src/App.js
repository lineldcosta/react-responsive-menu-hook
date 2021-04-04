import React from 'react'
import './App.css'
import ReactResponsiveMenu from '../../../dist/react-responsive-menu'

const style = {
  minWidth: '100px',
  padding: '4px',
}

const styles = {
  menuWrapper: {
    display: 'flex',
    overflow: 'hidden',
  },
  overflowMenu: open => ({
    display: 'flex',
    flexDirection: 'column',
    display: `${open ? 'inherit' : 'none'}`,
    position: 'absolute',
    right: '0px',
  }),
  overflowMenuWrapper: {
    order: 99,
    position: 'absolute',
    right: '0',
    background: '#fff',
  },
  overflowMenuIcon: {
    textAlign: 'right',
    marginRight: '15px',
    cursor: 'pointer',
  },
}

function App() {
  return (
    <ReactResponsiveMenu>
      {props => {
        console.log(props)
        const { getMenuProps, showEllipsis, children, open, toggle } = props
        return (
          <React.Fragment>
            <div {...getMenuProps({ id: 'Menu1', style })}>Home</div>
            <div {...getMenuProps({ id: 'Menu2', style })}>Contact Us</div>
            <div {...getMenuProps({ id: 'Menu3', style })}>About Us</div>
            <div {...getMenuProps({ id: 'Menu8', style })}>Registration</div>
            <div {...getMenuProps({ id: 'Menu9', style })}>Login</div>
            <div {...getMenuProps({ id: 'Menu10', style })}>Help & Support</div>
            <div {...getMenuProps({ id: 'Menu4', style })}>Blogs</div>
            <div {...getMenuProps({ id: 'Menu5', style })}>Information</div>
            <div {...getMenuProps({ id: 'Menu6', style })}>Apply</div>
            <div {...getMenuProps({ id: 'Menu7', style })}>Cancel</div>

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
          </React.Fragment>
        )
      }}
    </ReactResponsiveMenu>
  )
}
export default App

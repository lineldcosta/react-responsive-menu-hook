import React from 'react'
import classnames from 'classnames'
import warning from 'warning'

const hasSymbol = typeof Symbol === 'function' && Symbol.for

const REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb

const isFragment = object => object.type === REACT_FRAGMENT_TYPE

const styles = {
  menuWrapper: {
    display: 'flex',
    overflow: 'hidden',
  },
}

const ReactResponsiveMenu = ({ children }) => {
  const navRef = React.useRef(null)

  const [menuItems, setMenuItems] = React.useState({})
  const [open, setOpen] = React.useState(false)

  const toggle = React.useCallback(value => setOpen(value), [setOpen])

  const observe = React.useCallback(
    elements => {
      const updatedEntries = {}
      elements.forEach(element => {
        const targetid = element.target.dataset.targetid
        if (element.isIntersecting) {
          updatedEntries[targetid] = true
        } else {
          updatedEntries[targetid] = false
        }
      })
      setMenuItems(prev => ({
        ...prev,
        ...updatedEntries,
      }))
    },
    [setMenuItems]
  )

  const attachObserver = React.useCallback(() => {
    const observer = new IntersectionObserver(observe, {
      root: navRef.current,
      threshold: 1,
    })

    Array.from(navRef.current.children).forEach(
      item => item.dataset.targetid && observer.observe(item)
    )
    return observer
  }, [])

  const handleClickOutside = React.useCallback(
    ({ target }) =>
      navRef &&
      navRef.current &&
      !navRef.current.contains(target) &&
      toggle(false),
    [toggle]
  )

  const showEllipsis = React.useMemo(
    () => Object.values(menuItems).some(v => v === false),
    [menuItems]
  )

  const overFlowMenu = child => {
    if (
      !child ||
      !child.props['data-targetid'] ||
      menuItems[child.props['data-targetid']]
    )
      return null
    return (
      <React.Fragment key={child}>
        {React.cloneElement(child, {
          onClick: () => toggle(false),
        })}
      </React.Fragment>
    )
  }

  const getMenuProps = menuType => ({ id, ...props } = {}) => ({
    'data-targetid': id,
    className: classnames({
      visible:
        (menuType === 'menu' && !!menuItems[id]) ||
        (menuType === 'overflowMenu' && !menuItems[id]),
      inVisible:
        (menuType === 'menu' && !menuItems[id]) ||
        (menuType === 'overflowMenu' && !!menuItems[id]),
    }),
    onClick: () => menuType === 'overflowMenu' && toggle(false),
    ...props,
  })

  const flattenChildren = React.useCallback(
    children =>
      isFragment(children)
        ? children.props.children.filter(
            child => child && child.props['data-targetid']
          )
        : children,
    []
  )

  const childProps = {
    getMenuProps: getMenuProps('menu'),
    showEllipsis,
    children: React.Children.map(
      flattenChildren(
        children({
          getMenuProps: getMenuProps('overflowMenu'),
        })
      ),
      overFlowMenu
    ),
    open,
    toggle,
  }

  React.useEffect(() => {
    const observer = attachObserver()
    document.addEventListener('click', handleClickOutside)
    return () => {
      observer.disconnect()
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  React.useEffect(() => {
    warning(
      isFragment(children(childProps)),
      `Menu should wrapped inside fragment`
    )
  }, [])

  return (
    <div ref={navRef} style={styles.menuWrapper}>
      {children(childProps)}
    </div>
  )
}

export default React.memo(ReactResponsiveMenu)

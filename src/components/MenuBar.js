import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'react-router-dom';
import ListAltIcon from '@material-ui/icons/ListAlt';
import WallpaperIcon from '@material-ui/icons/Wallpaper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MenuBar = props => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [renderStyle, setRenderstyle] = useState('list');

  const handleWallpaperIconClick = () => {
    setRenderstyle('map');
  }
  const handleListAltIconClick = () => {
    setRenderstyle('list');
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  }
  const handleMenuClick = pageURL => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  useEffect(() => {
    localStorage.setItem('renderStyle', renderStyle);
    // history.push(window.location);
  }, [renderStyle]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleMenuClick('/floor/1')}>Ground Floor</MenuItem>
            <MenuItem onClick={() => handleMenuClick('/floor/2')}>1st Floor</MenuItem>
          </Menu>
          <ListAltIcon onClick={handleListAltIconClick} />
          <WallpaperIcon onClick={handleWallpaperIconClick} />
        </Toolbar>
        
      </AppBar>
    </div>
  );
}

export default withRouter(MenuBar);
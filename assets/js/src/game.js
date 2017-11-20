(function () {
  
  'use strict';
  
  
  // constants
  var GAME_WIDTH = MapConstants.NUM_COLUMNS * MapConstants.TILE_SIZE, // 240
      GAME_HEIGHT = MapConstants.NUM_ROWS * MapConstants.TILE_SIZE, // 160
      DEBUG = true;

  // vars
  var _game = null,
      _map = null,
      _player = null,
      _tonberry = null,

      // controls
      _dpad = {
        up: null,
        right: null,
        down: null,
        left: null
      },
      _isUpPressed = false,
      _isRightPressed = false,
      _isDownPressed = false,
      _isLeftPressed = false,
      _keyboardInput = null;
      //_mouseInput = null;


  // auto initialization
  init();


  // init
  function init() {
    initPhaser();

    // uncomment the following lines
    // to use the HTML buttons
     getDOMButtons();
     addDOMListeners();
  }

  // phaser methods
  function initPhaser() {
    // add game
    _game = new Phaser.Game(
      GAME_WIDTH, GAME_HEIGHT,
      Phaser.CANVAS, 'phaser-js-test',
      {
        preload: preload,
        create: create,
        update: update,
        render: render
      }
    );

    // create map
    _map = new Map(_game);

    // create player
    _player = new Player(_game, _map);
    _tonberry = new NPC(_game, _map);
  }

  function preload() {
    _map.preload();
    _player.preload();
    _tonberry.preload();
  }

  function create() {
    // set references
    _keyboardInput = _game.input.keyboard;
    //_mouseInput = _game.input.mouse;

    // init game objects
    _map.init();
    _player.init({x: 1, y: 1})
    _tonberry.init({x: 7, y: 1});
  }

  function update() {
    _player.update(
      _keyboardInput.isDown(Phaser.Keyboard.UP) || _isUpPressed,
      _keyboardInput.isDown(Phaser.Keyboard.RIGHT) || _isRightPressed,
      _keyboardInput.isDown(Phaser.Keyboard.DOWN) || _isDownPressed,
      _keyboardInput.isDown(Phaser.Keyboard.LEFT) || _isLeftPressed
    );
    _tonberry.update();
  }

  function render() {
    if(DEBUG) {
      _map.drawSurroundingCollisions();
    }
  }

  // dom methods
  function getDOMButtons() {
    _dpad.up = document.getElementById('dpad-up');
    _dpad.right = document.getElementById('dpad-right');
    _dpad.down = document.getElementById('dpad-down');
    _dpad.left = document.getElementById('dpad-left');
  }

  function addDOMListeners() {
    // pressed (mouse events)
    _dpad.up.addEventListener('mousedown', onUpPressed);
    _dpad.right.addEventListener('mousedown', onRightPressed);
    _dpad.down.addEventListener('mousedown', onDownPressed);
    _dpad.left.addEventListener('mousedown', onLeftPressed);

    // pressed (touch events)
    _dpad.up.addEventListener('touchstart', onUpPressed);
    _dpad.right.addEventListener('touchstart', onRightPressed);
    _dpad.down, _dpad.down.addEventListener('touchstart', onDownPressed);
    _dpad.left.addEventListener('touchstart', onLeftPressed);

    // released (mouse events)
    _dpad.up.addEventListener('mouseup', onUpReleased);
    _dpad.right.addEventListener('mouseup', onRightReleased);
    _dpad.down.addEventListener('mouseup', onDownReleased);
    _dpad.left.addEventListener('mouseup', onLeftReleased);

    // released (mouse events)
    _dpad.up.addEventListener('touchend', onUpReleased);
    _dpad.right.addEventListener('touchend', onRightReleased);
    _dpad.down.addEventListener('touchend', onDownReleased);
    _dpad.left.addEventListener('touchend', onLeftReleased);
  }

  function onUpPressed() {
    fireEvent(_dpad.up, _isUpPressed = true);
  }

  function onRightPressed() {
    fireEvent(_dpad.right, _isRightPressed = true);
  }

  function onDownPressed() {
    fireEvent(_dpad.down, _isDownPressed = true);
  }

  function onLeftPressed() {
    fireEvent(_dpad.left, _isLeftPressed = true);
  }

  function onUpReleased() {
    fireEvent(_dpad.up, _isUpPressed = false);
  }

  function onRightReleased() {
    fireEvent(_dpad.right, _isRightPressed = false);
  }

  function onDownReleased() {
    fireEvent(_dpad.down, _isDownPressed = false);
  }

  function onLeftReleased() {
    fireEvent(_dpad.left, _isLeftPressed = false);
  }
  
  
  function fireEvent(obj,evt){

    var evObj;
    var fireOnThis = obj;
    if( document.createEvent ) {
        evObj = document.createEvent("MouseEvents");
        evObj.initEvent( evt, true, false );
        fireOnThis.dispatchEvent( evObj );

    } else if( document.createEventObject ) {
        evObj = document.createEventObject();
        fireOnThis.fireEvent( "on" + evt, evObj );
    }
  }
  
})();